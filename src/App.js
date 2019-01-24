import React from 'react'
import Book from './components/Book'
import HomePage from'./components/HomePage'
import { Link } from 'react-router-dom'
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
        //return newBooks
      });
      book.shelf = newShelf;
      newBooks.push(book);
      this.setState({
        books: newBooks
      });
    }



  render() {
    const books = this.state.books
    const currentlyReading =books.filter( book => book.shelf  === 'currentlyReading')
    const wantToRead =books.filter( book => book.shelf  === 'wantToRead')
    const read =books.filter( book => book.shelf  === 'read')
    //console.log(currentlyReading, wantToRead, read)
    if (this.state.books.length === 0) return (  <div className="app">No Books</div> )
    else return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks />
        )}/>
        <Route exact path="/" render={() => (
          <HomePage />
        )}/>
        <SearchBooks/>
      </div>
    )
  }
}

export default BooksApp
