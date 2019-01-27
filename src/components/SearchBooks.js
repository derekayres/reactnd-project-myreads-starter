import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI';
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    booksSearch: []
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.updatebooksSearch(query);
  }

updatebooksSearch = (query) => {
  if (query) {
    BooksAPI.search(query).then((booksSearch) => {
      if (booksSearch.error) {
        this.setState({booksSearch: [] });
      } else {
        this.setState({ booksSearch: booksSearch})
      }
    })
  } else {
    this.setState({booksSearch: [] });
  }
}

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">

            <input type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>

        </div>
        <div className="search-books-results">

        <ol className="books-grid">
          {
            this.state.booksSearch.map(booksSearch => (

                <Book book={booksSearch}
                key={booksSearch.id}
                shelfChange={this.props.shelfChange}/>
            ))
          }
        </ol>

        </div>
      </div>
    )
  }
}

export default SearchBooks
