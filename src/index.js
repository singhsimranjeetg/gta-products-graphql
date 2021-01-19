import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import {ApolloProvider} from "react-apollo" //this provider stores theb state 
import {createHttpLink} from "apollo-link-http" //connect our client to the graphql server or db 
import {InMemoryCache } from "apollo-cache-inmemory" //apollo uses to cache the data we fetch
import {ApolloClient, gql} from "apollo-boost"
import { resolvers, typeDefs } from "./graphql/resolvers"



import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri : "https://crwn-clothing.com"
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link : httpLink,
  cache, //using shorthand which means cache : cache
  resolvers,
  typeDefs
})

client.writeData({
  data: {
    cartHidden : true,
    cartItems: [],
    itemsCount: 0
  
  }
})

/*
client.query({   //query will return us a promise that get resolve if the data matches the query pattern
  query: gql`
  {
    collections{
      id
      title
      items{
        name
      }
    }
  }

  
  `
}).then(res => console.log(res))
*/
ReactDOM.render(
  <ApolloProvider client = { client}>
    <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
   </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
