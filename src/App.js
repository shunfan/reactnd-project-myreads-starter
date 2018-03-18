import React from 'react'
import { Link, Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BookList from './BookList'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: {},
    booksFound: {},
  }

  simplifyBookData(book) {
    /* Book's ID is preserved because the update API needs it. */
    return {
      id: book.id,
      coverURL: book.imageLinks.thumbnail,
      title: book.title,
      authors: book.authors,
      shelf: book.shelf ? book.shelf : 'none',
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      const books = {}

      allBooks.forEach((book) => {
        books[book.id] = this.simplifyBookData(book)
      })

      this.setState({ books })
    })
  }

  searchBooks(query) {
    BooksAPI.search(query).then((searchResults) => {
      if (searchResults && !searchResults.error) {
        this.setState((prevState) => {
          const booksFound = {}

          searchResults.forEach((book) => {
            if (prevState.books[book.id]) {
              /* If the book is already in a bookshelf, use the existing data
                 because it contains which shelf the book belongs to */
              booksFound[book.id] = (prevState.books[book.id])
            } else {
              booksFound[book.id] = this.simplifyBookData(book)
            }
          })

          return { booksFound }
        })
      }
    })
  }

  updateShelf = (bookToMove, shelf) => {
    BooksAPI.update(bookToMove, shelf).then((shelves) => {
      this.setState((prevState) => {
        const bookMoved = Object.assign({}, bookToMove, { shelf })

        return {
          books: Object.assign({}, prevState.books, { [bookToMove.id]: bookMoved }),
          booksFound: Object.assign({}, prevState.booksFound, { [bookToMove.id]: bookMoved }),
        }
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf
                title="Currently Reading"
                books={Object.values(this.state.books).filter((book) => book.shelf === 'currentlyReading')}
                onChangeShelf={this.updateShelf}
              />
              <Bookshelf
                title="Want to Read"
                books={Object.values(this.state.books).filter((book) => book.shelf === 'wantToRead')}
                onChangeShelf={this.updateShelf}
              />
              <Bookshelf
                title="Read"
                books={Object.values(this.state.books).filter((book) => book.shelf === 'read')}
                onChangeShelf={this.updateShelf}
              />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
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
                onChangeShelf={this.updateShelf}
              />
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
