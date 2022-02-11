import { ApolloServer } from 'apollo-server-express';
import { 
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import '../config.js';
import schema from './modules/index.js';

async function startApolloServer(typeDefs, resolvers) {
    const PORT = process.env.PORT || 4000

    const app = express();
    const httpServer = http.createServer(app);
    
    const server = new ApolloServer({
        introspection: true,
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    });

    await server.start();
    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
};

startApolloServer()