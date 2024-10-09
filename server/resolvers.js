/**
 * @flow strict
 * @format
 */
'use strict';

const { nodes } = require('./data.js');

function nodeResolver({ id }: { id: string }) {
  return nodes.find(node => node.id === id);
}

const rootValue = {
  viewer: (): Object => {
    return {
      actor: nodes.find(node => node.id === 'the-viewer'),
    };
  },
};

module.exports = { rootValue };
