import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BookList extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <li key={book.id}>
            <Book
              coverURL={book.coverURL}
              shelf={book.shelf}
              title={book.title}
              authors={book.authors}
              onChangeShelf={(shelf) => {
                this.props.onChangeShelf(book, shelf)
              }}
            />
          </li>
        ))}
      </ol>
    )
  }
}

export default BookList
