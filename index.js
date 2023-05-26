const express = require('express');
const { graphqlHTTP } = require('express-graphql'); 
const {mySchema}=(require('./GraphQL.js/schema'))
const app = express();
 
app.get('/',(req,res)=>{
   res.send('Hello Server!')
})

app.use('/graphql',graphqlHTTP({
    schema:mySchema,
    graphiql:true,
  }),
);
 
app.listen(5000,()=>{
  console.log(`server is running port:5000`)
});