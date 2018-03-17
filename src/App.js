import React from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: {},
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      const books = {}
      const shelves = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      }

      allBooks.forEach((book) => {
        books[book.id] = {
          id: book.id,
          coverURL: book.imageLinks.thumbnail,
          title: book.title,
          authors: book.authors,
        }
        shelves[book.shelf].push(book.id)
      })

      this.setState({ books, shelves })
    })
  }

  updateShelf = (bookToMove, shelf) => {
    BooksAPI.update(bookToMove, shelf).then((shelves) => {
      this.setState({ shelves })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <Bookshelf
                  title="Currently Reading"
                  value="currentlyReading"
                  books={this.state.shelves.currentlyReading.map((shelf) => this.state.books[shelf])}
                  onChangeShelf={this.updateShelf}
                />
                <Bookshelf
                  title="Want to Read"
                  value="wantToRead"
                  books={this.state.shelves.wantToRead.map((shelf) => this.state.books[shelf])}
                  onChangeShelf={this.updateShelf}
                />
                <Bookshelf
                  title="Read"
                  value="read"
                  books={this.state.shelves.read.map((shelf) => this.state.books[shelf])}
                  onChangeShelf={this.updateShelf}
                />
              </div>
              <div className="open-search">
                <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
