// sanity/schemaTypes/issue.ts

import { defineField, defineType } from "sanity";

export const issue = defineType({
  name: "issue",
  title: "Issue",
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
      name: "releaseDate",
      type: "datetime",
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
            source: "coverImage",
          },
        },
      ],
    }),
    defineField({
      name: "comments",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "author" },
        }
      ]
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "views",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "pages",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "page" },
        },
      ],
      options: {
        sortable: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      image: "coverImage",
    },
  },
});
