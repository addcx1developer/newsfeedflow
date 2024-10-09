/**
 * @flow strict
 * @format
 */
'use strict';

import App from './components/App.jsx';

import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement?.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
