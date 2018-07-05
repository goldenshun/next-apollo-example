# The idea behind the example
Demonstrates a possible way to control which GraphQL queries execute via `getInitialProps`, which calls react-apollo's `getDataFromTree`.

# Why you might want this
`getDataFromTree` will execute _all_ queries and wait for them to return before the page is ready to render.  If your route can execute 5 possible queries you may identify only 1 or 2 of them that need to be rendered initially and the rest can be lazily fetched.

# How it works
Using React's context API, a provider sets a boolean `isInitialProps` value.  This value is `false` by default but is set to `true` when the `getDataFromTree` function is called:
```
await getDataFromTree(
 <App
  {...appProps}
  Component={Component}
  router={router}
  apolloState={apolloState}
  apolloClient={apollo}
  isInitialProps={true}
 />
)
```

Then anywhere in the component tree, a component can be wrapped in `withNextApollo` to conditionally skip the query if `isInitialProps` is true:

```
export default withNextApollo(
  graphql(allUsers, {
    skip: ({ isInitialProps }) => {
      return isInitialProps === true;
    }
  })(UserList)
);
```
