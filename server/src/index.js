const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const mongoose = require('mongoose');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

require('dotenv').config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`MongoDB Connected`);
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
