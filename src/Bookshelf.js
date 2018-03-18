import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BookList from './BookList'

class Bookshelf extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <BookList
            books={this.props.books}
            onChangeShelf={this.props.onChangeShelf}
          />
        </div>
      </div>
    )
  }
}

export default Bookshelf
