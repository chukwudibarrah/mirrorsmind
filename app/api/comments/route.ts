// app/api/comments/route.ts

import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    const { text, issueId, name, email, parentId } = await request.json();

    if (!name || !email || !text || !issueId) {
      return NextResponse.json(
        { message: 'Name, email, comment text, and issue ID are required' },
        { status: 400 }
      );
    }

    const newComment: any = {
      _type: 'comment',
      text,
      name,
      email,
      createdAt: new Date().toISOString(),
      issue: {
        _type: 'reference',
        _ref: issueId,
      },
    };

    if (parentId) {
      newComment.parent = {
        _type: 'reference',
        _ref: parentId,
      };
    }

    const comment = await writeClient.create(newComment);

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { message: 'Error creating comment' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const issueId = searchParams.get('issueId');

    if (!issueId) {
      return NextResponse.json(
        { message: 'Issue ID is required' },
        { status: 400 }
      );
    }

    const comments = await writeClient.fetch(
      `*[_type == "comment" && issue._ref == $issueId] | order(createdAt asc) {
        _id,
        text,
        name,
        createdAt,
        parent->{_id},
      }`,
      { issueId }
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { message: 'Error fetching comments' },
      { status: 500 }
    );
  }
}
