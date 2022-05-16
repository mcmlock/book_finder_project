import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import BookList from "./components/BookListComponent";
import AddBook from './components/AddBookComponent';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
