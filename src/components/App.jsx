/**
 * @flow strict
 * @format
 */
'use strict';

import RelayEnvironment from '../relay/RelayEnvironment.jsx';

import { useState } from 'react';
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

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export component TestSnapshot(page: string, children: React.Node) {
  const [status, setStatus] = useState(STATUS.NORMAL);

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED);
  };

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL);
  };

  return (
    <a
      className={status}
      href={page || '#'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </a>
  );
}

component App() {
  const data = useLazyLoadQuery(AppQuery, {});

  return (
    <div className="app">
      <h1>Initial App</h1>
    </div>
  );
}

export default App;
