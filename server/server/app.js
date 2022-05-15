const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin request
app.use(cors());

mongoose.connect('mongodb+srv://miles:test123@cluster0.ekypx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
   console.log('Connection successful');
});

app.use('/graphql', graphqlHTTP({
   schema,
   graphiql: true
})); 

app.listen(4000, () => {
   console.log("Server listening on port 4000...");
})