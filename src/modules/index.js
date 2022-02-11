import { makeExecutableSchema } from "@graphql-tools/schema";
import userModules  from "./users/index.js";
import productModules from './products/index.js';
// import orderModules from './orders/index.js';

export default makeExecutableSchema({
    typeDefs: [
        userModules.typeDefs,
        productModules.typeDefs,
        // orderModules.typeDefs
    ],
    resolvers: [
        userModules.resolvers,
        productModules.resolvers,
        // orderModules.resolvers
    ]
})
