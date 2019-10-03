'use strict';

const { documentClient } = require('@restapi/core/lib/dynamodb');

module.exports.handler = async ({ pathParameters, requestContext }) => {
  const params = {
    TableName: `ContactsTable-${requestContext.stage}`,
    KeyConditionExpression: 'Id = :id',
    ExpressionAttributeValues: {
      ':id': pathParameters.id,
    },
  };

  const response = await documentClient.query(params).promise();

  if (response.Items.length === 1) {
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items[0]),
    };
  }

  return {
    statusCode: 404,
  };
};
