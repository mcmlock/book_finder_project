import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            genre: '',
            authorId: ''
        }
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        }); 
    }

    render() {
        var data = this.props.getAuthorsQuery;
        console.log(this.props.getAuthorsQuery);
        var options = [];
        if (data.loading) {
            options.push(<option disabled key={-1}>Authors Loading...</option>);
        } else {
            options.push(<option key={-1}>Select Author</option>);
            options.push(data.authors.map(author => {
                return (
                    <option
                        key={author.id}
                        value={author.id} 
                        onSelect={e => { 
                            console.log('test');
                        }}
                        >
                        {author.name}
                    </option>)
            }));
        }
        return (
            <form id="add-book" onSubmit={(e) => this.submitForm(e)}>
                <div className='field'>
                    <label>Book name:</label>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={e => {
                            this.setState({ name: e.target.value });
                        }}
                    />
                </div>


                <div className='field'>
                    <label>Genre:</label>
                    <input
                        type="text"
                        value={this.state.genre}
                        onChange={e => {
                            this.setState({ genre: e.target.value });
                        }}
                    />
                </div>

                <div className='field'>
                    <label>Author:</label>
                    <select
                        onChange={e => {
                            this.setState({ authorId: e.target.value })
                        }}
                    >
                        {options}
                    </select>
                </div>

                <button type='submit'>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);