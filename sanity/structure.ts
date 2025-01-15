import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('author').title('Author'),
      S.documentTypeListItem('commentAuthor').title('CommentAuthor'),
      S.documentTypeListItem('comment').title('Comment'),
      S.documentTypeListItem('comic').title('Comic'),
      S.documentTypeListItem('issue').title('Issue'),
      S.documentTypeListItem('page').title('Page'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['author', 'commentAuthor', 'comment', 'comic', 'issue', 'page'].includes(item.getId()!),
      ),
    ])
