import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const tokenDecode = atob(token);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${tokenDecode}` : "",
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export default apolloProvider;
