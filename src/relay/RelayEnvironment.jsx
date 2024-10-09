/**
 * @flow strict
 * @format
 */
'use strict';

import { createRelayEnvironment } from './environment.js';

import { useMemo } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

component RelayEnvironment(children: React.Node) {
  const environment = useMemo(() => {
    return createRelayEnvironment();
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}

export default RelayEnvironment;
