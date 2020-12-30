'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`

module.exports = function updateDeliveryStatus(request) {
    if (!request.deliveryId || !request.status)
        throw new Error('Status and delivery ID are required')
    return docClient.update({
        TableName: tableName,
        Key: {
            orderId: request.deliveryId
        },
        AttributeUpdates: {
            deliveryStatus: {
                Action: 'PUT',
                Value: request.status
            }
        }
    }).promise()
        .then(() => {
            return {}
        })
}