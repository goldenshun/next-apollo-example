import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import NextApolloContext from './NextApolloContext';

function enhance(WrappedComponent) {
  const WithNextApollo = props => (
    <NextApolloContext.Consumer>
      {context =>
        (<WrappedComponent
          {...props}
          {...context}
        />)
      }
    </NextApolloContext.Consumer>
  );

  hoistNonReactStatics(WithNextApollo, WrappedComponent);
  WithNextApollo.displayName = `WithNextApollo(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithNextApollo;
}


export default enhance;
