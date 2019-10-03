'use strict';

const { documentClient } = require('@restapi/core/lib/dynamodb');
const uuid = require('uuid/v4');
const validationSchema = require('../validation-schema');

module.exports.handler = async ({ body, requestContext }) => {
  try {
    const validation = validationSchema.validate(JSON.parse(body), { presence: 'required' });

    if (validation.error) {
      return {
        statusCode: 422,
        body: JSON.stringify({
          errors: validation.error.details,
        }),
      };
    }

    const newContact = {
      Id: uuid(),
      ...validation.value,
    };

    const params = {
      TableName: `ContactsTable-${requestContext.stage}`,
      Item: newContact,
    };

    await documentClient.put(params).promise();

    return {
      statusCode: 201,
      body: JSON.stringify(newContact),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
