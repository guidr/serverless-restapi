'use strict';

const { DynamoDB } = require('aws-sdk');

module.exports.documentClient = new DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.IS_OFFLINE
    ? 'http://localhost:8000'
    : `https://dynamodb.${process.env.AWS_REGION}.amazonaws.com`,
});

module.exports.objectToUpdateExpression = object => {
  return Object.keys(object).map(key => `${key} = :${key}`).join(', ');
};

module.exports.objectToExpressionAttributeValues = object => {
  let values = {};

  Object.entries(object).forEach(([key, value]) => {
    values = { ...values, [`:${key}`]: value };
  });

  return values;
};
