import React from 'react'
import { Link, Route } from 'react-router-dom'

import './App.css'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import { simplifyBookData } from './helper'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: {},
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      const books = {}

      allBooks.forEach((book) => {
        books[book.id] = simplifyBookData(book)
      })

      this.setState({ books })
    })
  }

  updateShelf = (bookToMove, shelf) => {
    BooksAPI.update(bookToMove, shelf).then((shelves) => {
      this.setState((prevState) => {
        const bookMoved = Object.assign({}, bookToMove, { shelf })
        return {
          books: Object.assign({}, prevState.books, { [bookToMove.id]: bookMoved }),
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
          <Search books={this.state.books} onChangeShelf={this.updateShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
