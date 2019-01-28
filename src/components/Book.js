import React, { Component } from 'react'

class Book extends Component {

  shelfChanged(event) {
      const newShelf = event.target.value;
      this.props.shelfChange(this.props.book, newShelf);
    }

  render() {

    if (this.props.books !== undefined) {
      const matchingBook = this.props.books.filter(book => {
        if (book.id === this.props.book.id) {
            return book
          }
        })
          this.props.book.shelf =

          matchingBook.length > 0 ?
          matchingBook[0].shelf : 'none'
      }
      console.log (matchingBook)

    }





    let displayedThumbnail = this.props.book.imageLinks ?
    this.props.book.imageLinks.thumbnail : '';
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${displayedThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select defaultValue={this.props.book.shelf} onChange={this.shelfChanged.bind(this)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{this.props.book.authors}</div>
        </div>
      </li>
    )
  }
}


export default Book
