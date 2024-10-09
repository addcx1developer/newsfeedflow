/**
 * @flow strict
 * @format
 */
'use strict';

const http = require('http');
const { execute, validateSchema, parse, validate } = require('graphql');
const schema = require('./schema.js');
const { rootValue } = require('./resolvers.js');

const graphql = (args: Object): Object => {
  const schemaValidationErrors = validateSchema(schema);
  if (schemaValidationErrors.length > 0) {
    return { errors: schemaValidationErrors };
  }

  let document;
  try {
    document = parse(args.source);
  } catch (syntaxError) {
    return { errors: [syntaxError] };
  }

  const validationErrors = validate(schema, document);
  if (validationErrors.length > 0) {
    return { errors: validationErrors };
  }

  return execute({
    schema: args.schema,
    rootValue: args.rootValue,
    document,
    variableValues: args.variableValues,
  });
};

const PORT: number = 8080;
const server = http.createServer(
  async (req: http.IncomingMessage, res: http.ServerResponse): Object => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    let response: Object = { data: null };
    if (req.method === 'POST') {
      const buffers: Buffer[] = [];
      for await (const chunk of req) {
        if (typeof chunk !== 'string') {
          buffers.push(chunk);
        } else {
          buffers.push(Buffer.from(chunk, 'utf-8'));
        }
      }

      const requestParameters = JSON.parse(Buffer.concat(buffers).toString());

      response = await graphql({
        schema,
        rootValue,
        source: requestParameters.query,
        variableValues: requestParameters.variables,
      });
    }

    if (response?.errors !== null) {
      console.log(`GraphQL server errors ${response.errors}`);
    }

    res.end(JSON.stringify(response));
  },
);

server.listen(PORT).addListener('listening', () => {
  console.log(`Server is listening on port ${PORT}.`);
});
