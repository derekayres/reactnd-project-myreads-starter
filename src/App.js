import React from 'react'
import HomePage from'./components/HomePage'
import { Route } from 'react-router-dom'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
      books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
          books: books
      });
    })
  }


    onShelfChange = (book, newShelf) => {
      BooksAPI.update(book, newShelf);
      const newBooks = this.state.books.filter(currBook => {
        return currBook.id !== book.id
      });
      book.shelf = newShelf;
      newBooks.push(book);
      this.setState({
        books: newBooks
      });
    }

  render() {
    if (this.state.books.length === 0) return (  <div className="app">No Books</div> )
    else

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomePage
          books={this.state.books}
          shelfChange={this.onShelfChange}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
          shelfChange={this.onShelfChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
