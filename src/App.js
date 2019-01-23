import React from 'react'
import Book from './components/Book'
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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false



    /*onShelfChange(book, newShelf) {
      const newBooks = this.state.books.map(currBook => {
        if (currBook === book) {
          currBook.shelf = newShelf;
        }
        return currBook;
      });
      this.setState({
        books: newBooks
      });
    }
    */

    onSelfChange(book, newShelf) {
      BooksAPI.update(book, newShelf);
      const newBooks = this.state.books.filter(currBook => {
        return currBook.id !== book.id
        return newBooks;
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
    console.log(currentlyReading, wantToRead, read)
    if (this.state.books.length === 0) return (  <div className="app">No Books</div> )
    else return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

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
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {currentlyReading.map(book => {
                      return (
                        <Book book={book} key={book.id} shelfChange={this.onShelfChange} />
                      );
                    })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {wantToRead.map(book => {
                      return (
                        <Book book={book} key={book.id} shelfChange={this.onShelfChange} />
                      );
                    })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {read.map(book => {
                      return (
                        <Book book={book} key={book.id} shelfChange={this.onShelfChange} />
                      );
                    })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
