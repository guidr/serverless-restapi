'use strict';

const { documentClient } = require('@restapi/core/lib/dynamodb');

module.exports.handler = async ({ pathParameters, requestContext }) => {
  const params = {
    TableName: `ContactsTable-${requestContext.stage}`,
    Key: {
      Id: pathParameters.id,
    },
    ReturnValues: 'ALL_OLD',
  };

  const response = await documentClient.delete(params).promise();

  if (response.Attributes) {
    return {
      statusCode: 200,
    };
  }

  return {
    statusCode: 404,
  };
};
