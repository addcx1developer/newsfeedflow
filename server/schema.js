/**
 * @flow strict
 * @format
 */
'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const DateTimeType = GraphQLString;

const ImageType = new GraphQLObjectType({
  name: 'Image',
  fields: {
    url: { type: new GraphQLNonNull(GraphQLString) },
    altText: { type: GraphQLString },
  },
});

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ActorInterface = new GraphQLInterfaceType({
  name: 'Actor',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    profilePicture: { type: ImageType },
    joined: { type: DateTimeType },
  },
});

const PersonType = new GraphQLObjectType({
  name: 'Person',
  interfaces: [ActorInterface],
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    profilePicture: { type: ImageType },
    joined: { type: DateTimeType },
    email: { type: GraphQLString },
    location: { type: LocationType },
  },
});

const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    actor: { type: ActorInterface },
  },
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: { type: ViewerType },
  },
});

const schema: $FlowFixMe = new GraphQLSchema({
  query: QueryType,
  types: [PersonType],
});

module.exports = schema;
