const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`

function getOrders(orderId) {
    if (typeof orderId === 'undefined')
    {
        console.log('All orders');

        return docClient.scan({
            TableName: tableName
        }).promise()
            .then(result => result.Items)
    
    }
    console.log('One order');

    return docClient.get({
        TableName: tableName,
        Key: {
            orderId: orderId
        }
    }).promise()
        .then(result => result.Item)
}

module.exports = getOrders