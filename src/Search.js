import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import { simplifyBookData } from './helper'

class Search extends Component {

  state = {
    booksFound: {},
  }

  static propTypes = {
    books: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  searchBooks(query) {
    if (!query) {
      // If the query is empty, there is no need to send an API request
      this.setState({ booksFound: {} })
    } else {
      BooksAPI.search(query).then((searchResults) => {
        if (searchResults && !searchResults.error) {
          const booksFound = {}

          searchResults.forEach((book) => {
            if (this.props.books[book.id]) {
              /* If the book is already in a bookshelf, use the existing data
                 because it contains which shelf the book belongs to */
              booksFound[book.id] = (this.props.books[book.id])
            } else {
              booksFound[book.id] = simplifyBookData(book)
            }
          })

          this.setState({ booksFound })
        } else {
          this.setState({ booksFound: {} })
        }
      })
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input type="text" placeholder="Search by title or author" onKeyUp={(event) => this.searchBooks(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <BookList
            books={Object.values(this.state.booksFound)}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
      </div>
    )
  }
}

export default Search
