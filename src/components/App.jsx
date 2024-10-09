/**
 * @flow strict
 * @format
 */
'use strict';

import RelayEnvironment from '../relay/RelayEnvironment.jsx';

import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

const AppQuery = graphql`
  query AppQuery {
    viewer {
      actor {
        id
        name
        profilePicture {
          url
          altText
        }
        joined
      }
    }
  }
`;

component App() {
  const data = useLazyLoadQuery(AppQuery, {});

  return (
    <div className="app">
      <h1>Initial App</h1>
    </div>
  );
}

export default App;
