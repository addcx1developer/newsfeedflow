/**
 * @flow strict
 * @format
 */
'use strict';

import App from './components/App.jsx';
import RelayEnvironment from './relay/RelayEnvironment.jsx';

import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement?.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <RelayEnvironment>
      <Suspense fallback={<p>Loading...</p>}>
        <App />
      </Suspense>
    </RelayEnvironment>,
  );
}
