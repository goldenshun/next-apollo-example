import App, {Container} from 'next/app'
import React from 'react'
import withApolloClient from '../lib/with-apollo-client'
import NextApolloContext from '../lib/NextApolloContext';
import { ApolloProvider } from 'react-apollo'

class MyApp extends App {
  render () {
    const {Component, pageProps, apolloClient, isInitialProps} = this.props
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <NextApolloContext.Provider value={{ isInitialProps: isInitialProps || false }}>
            <Component {...pageProps} />
          </NextApolloContext.Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp)
