/**
 * @flow strict
 * @format
 */
'use strict';

import type {
  FetchFunction,
  IEnvironment,
  RequestParameters,
  Variables,
} from 'relay-runtime';

import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
} from 'relay-runtime';

const fetchFn: FetchFunction = (
  params: RequestParameters,
  variables: Variables,
) => {
  const response = fetch('/graphql', {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify({ query: params.text, variables }),
  });

  return Observable.from(response.then(data => data.json()));
};

export const createRelayEnvironment = (): IEnvironment => {
  const network = Network.create(fetchFn);
  const store = new Store(new RecordSource());
  return new Environment({ network, store });
};
