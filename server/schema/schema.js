const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt } = graphql;

// dummy datadd
const books = [
    { id: '0', name: 'Test 1', genre: 'Fantasy', authorId: '0' },
    { id: '1', name: 'Test 2', genre: 'Comedy', authorId: '2' },
    { id: '2', name: 'Test 3', genre: 'Horror', authorId: '1' },
]

const authors = [
    { id: '0', name: 'Author 1', age: 22 },
    { id: '1', name: 'Author 2', age: 45 },
    { id: '2', name: 'Author 3', age: 34 },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID} },
            resolve(parent, args) {
                return _.find(authors, { id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
}); 