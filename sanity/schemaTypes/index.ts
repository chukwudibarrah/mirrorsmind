import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import { author } from "./author";
import { commentAuthor } from "./commentAuthor";
import { comment } from "./comment";
import { comic } from "./comic";
import { page } from "./page";
import { issue } from "./issue";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, author, commentAuthor, comment, comic, page, issue ],
}
