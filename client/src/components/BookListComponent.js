import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends React.Component {
    renderBooks() {
        
    }
    render() {
        var data = this.props.data;
        let bookList;
        if (data.loading) {
            bookList = (
                <div>
                    Books loading...
                </div>
            )
        } else {
             bookList = data.books.map(book => {
                return <li key={book.id}>{book.name}</li> 
             })
        } 

        return (
            <div>
                <ul id="book-list">
                   {bookList}
                </ul>
            </div> 
        );
    }
}

export default graphql(getBooksQuery)(BookList);