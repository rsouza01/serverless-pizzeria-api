'use strict'

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`

module.exports = function updateDeliveryStatus(request) {
    if (!request.deliveryId || !request.status) {
        throw new Error('Status and delivery ID are required')
    }

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
        .then((result) => {
            console.log('Order is updated via DELIVERY api!', result)
            return {}
        })
        .catch((updateError) => {
            console.log(`Oops, order is not updated via DELIVERY api :(`, updateError)
            throw updateError
        })

}