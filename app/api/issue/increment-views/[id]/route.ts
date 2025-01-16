// app/api/issue/increment-views/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/client";
import { cookies } from "next/headers";

interface Context {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { message: "Issue ID is required" },
        { status: 400 }
      );
    }

    const viewKey = `view_${id}`;
    const cookieStore = await cookies();
    const existingCookie = cookieStore.get(viewKey);
    
    if (existingCookie) {
      return NextResponse.json({ message: "Already viewed" }, { status: 200 });
    }

    const exists = await writeClient.fetch(
      `*[_type == "issue" && _id == $id][0]._id`,
      { id }
    );

    if (!exists) {
      return NextResponse.json({ message: "Issue not found" }, { status: 404 });
    }

    const result = await writeClient
      .patch(id)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    // Set cookie after successful view increment
    cookieStore.set(viewKey, "true", {
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json(
      {
        message: "View count incremented",
        views: result.views,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return NextResponse.json(
      { message: "Error incrementing view count", error: String(error) },
      { status: 500 }
    );
  }
}
