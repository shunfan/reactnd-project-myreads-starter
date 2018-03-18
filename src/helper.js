export function simplifyBookData(book) {
    // Book's ID is preserved because the update API needs it.
    return {
      id: book.id,
      coverURL: book.imageLinks ? book.imageLinks.thumbnail : undefined,
      title: book.title,
      authors: book.authors,
      shelf: book.shelf ? book.shelf : 'none',
    }
  }
  