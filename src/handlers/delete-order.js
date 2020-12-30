const AWS = require('aws-sdk')
const rp = require('minimal-request-promise')

const docClient = new AWS.DynamoDB.DocumentClient()

const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`

module.exports = function deleteOrder(orderId) {
    return docClient.get({
        TableName: tableName,
        Key: {
            orderId: orderId
        }
    }).promise()
        .then(result => result.Item)
        .then(item => {
            if (item.orderStatus !== 'pending') {
                throw new Error('Order status is not pending')
            }
            
            return rp.delete(`process.env.DELIVERY_API_URL/${orderId}`, {
                headers: {
                    "Authorization": "aunt-marias-pizzeria-1234567890",
                    "Content-type": "application/json"
                }
            })
        })
        .then(() => {
            return docClient.delete({
                TableName: tableName,
                Key: {
                    orderId: orderId
                }
            }).promise()
        })
}