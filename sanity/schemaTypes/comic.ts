// sanity/schemaTypes/comic.ts

import { defineField, defineType } from "sanity";

export const comic = defineType({
  name: "comic",
  title: "Comic",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
        name: "description",
        type: "blockContent",
      }),
    defineField({
      name: "coverImage",
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
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "views",
      type: "number",
    }),
    defineField({
      name: "issues",
      type: "array",
      of: [{
        type: "reference",
        to: { type: "issue" }
      }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "coverImage",
    },
  },
});