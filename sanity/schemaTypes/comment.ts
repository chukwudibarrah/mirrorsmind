// sanity/schemaTypes/comment.ts

import { defineField, defineType } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Comment Text",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "issue",
      title: "Issue",
      type: "reference",
      to: [{ type: "issue" }],
    }),
    defineField({
      name: "parent",
      title: "Parent Comment",
      type: "reference",
      to: [{ type: "comment" }],
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "name",
    },
  },
});
