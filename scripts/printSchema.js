/**
 * @flow strict
 * @format
 */
'use strict';

const { printSchema } = require('graphql');
const schema = require('../server/schema.js');

console.log(
  '# @generated\n# run `yarn print-schema` to re-generate this file.\n\n' +
    printSchema(schema),
);
