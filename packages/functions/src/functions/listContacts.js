'use strict';

const { documentClient } = require('@restapi/core/lib/dynamodb');

module.exports.handler = async ({ queryStringParameters, requestContext }) => {
  const params = {
    TableName: `ContactsTable-${requestContext.stage}`,
    ...(queryStringParameters && queryStringParameters.query && {
      FilterExpression: 'contains (FirstName, :query)',
      ExpressionAttributeValues: {
        ':query': queryStringParameters.query,
      }
    }),
  };

  const response = await documentClient.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items),
  };
};
