// sanity/schemaTypes/commentAuthor.ts

import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const commentAuthor = defineType({
  name: 'commentAuthor',
  title: 'CommentAuthor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'comment',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
