const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const cors = require('cors')

const app = express();

app.use('/graphql', cors() ,expressGraphQL({
    schema:schema,
    graphiql:true
}));
app.use(cors())

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});