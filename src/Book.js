import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    coverURL: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: '100%', height: '100%', backgroundImage: `url("${this.props.coverURL}")`, backgroundSize: 'cover' }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.shelf} onChange={(shelf) => this.props.onChangeShelf(shelf.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book
