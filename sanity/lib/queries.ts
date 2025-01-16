// sanity/lib/queries.ts

import { defineQuery } from "next-sanity";

export const COMICS_QUERY =
  defineQuery(`*[_type == "comic" && defined(slug.current) && !defined($search) || title match $search] | order(_title desc) {
  _id, 
  title, 
  slug,
  description,
  views,
  coverImage,
  issues,
}`);

export const ISSUES_QUERY = defineQuery(`
  *[_type == "comic" && slug.current == $slug][0]{
    issues[]->{
      _id,
      title,
      slug,
      releaseDate,
      coverImage,
      description,
      pages
    }
  }
`);

export const PAGES_QUERY =
  defineQuery(`*[_type == "page" && defined(slug.current) && !defined($search) || title match $search] | order(_title desc) {
  _id, 
  title,
  pageNumber,
  pageImage,
  views,
  comments,
}`);

export const COMIC_ISSUES_QUERY = defineQuery(`
  *[_type == "comic" && slug.current == $slug][0]{
    issues[]->{
      _id,
      title,
      slug,
      releaseDate,
      coverImage,
      description,
      pages
    }
  }
`);

export const COMIC_BY_SLUG_QUERY = defineQuery(
  `*[_type == "comic" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    views,
    coverImage,
    "issues": issues[]->{
      _id,
      title,
      slug,
      releaseDate,
      coverImage,
      pages
    }
  }`
);


export const ISSUES_BY_SLUG_QUERY = defineQuery(`
  *[_type == "issue" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    releaseDate,
    coverImage,
    description,
    pages[]-> {
      _id,
      title,
      pageNumber,
      pageImage
    }
  }
`);

export const ISSUE_VIEWS_QUERY = defineQuery(`
  *[_type == "issue" && _id == $id][0]{
      _id, views
  }
`);



export const AUTHOR_BY_ID_QUERY = defineQuery(`
*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
}
`);
