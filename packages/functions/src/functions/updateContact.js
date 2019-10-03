'use strict';

const {
  documentClient,
  objectToUpdateExpression,
  objectToExpressionAttributeValues,
} = require('@restapi/core/lib/dynamodb');

const validationSchema = require('../validation-schema');

module.exports.handler = async ({ pathParameters, body, requestContext }) => {
  try {
    const { error, value } = validationSchema.validate(JSON.parse(body), { presence: 'optional' });

    if (error) {
      return {
        statusCode: 422,
        body: JSON.stringify({
          errors: error.details,
        }),
      };
    }

    const params = {
      TableName: `ContactsTable-${requestContext.stage}`,
      Key: {
        Id: pathParameters.id,
      },
      UpdateExpression: `set ${objectToUpdateExpression(value)}`,
      ExpressionAttributeValues: objectToExpressionAttributeValues(value),
      ReturnValues: 'ALL_NEW',
    };

    const response = await documentClient.update(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(response.Attributes),
    };
  } catch (error) {
    return {
      statusCode: 400,
      error: JSON.stringify(error),
    };
  }
};
