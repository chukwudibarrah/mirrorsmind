// sanity/schemaTypes/page.ts

import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "pageNumber",
      type: "number",
    }),
    defineField({
      name: "pageImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          options: {
            source: "title"
          }
        },
      ],
    }),
    defineField({
      name: "comments",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
