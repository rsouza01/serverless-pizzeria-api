const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const tableName = `${process.env.APP_NAME}-orders-${process.env.NODE_ENV}`

function deleteOrder(orderId) {
    return docClient.delete({
        TableName: tableName,
        Key: {
            orderId: orderId
        }
    }).promise()
        .then((result) => {
            console.log('Order is deleted!', result)
            return result
        })
        .catch((deleteError) => {
            console.log(`Oops, order is not deleted :(`, deleteError)
            throw deleteError
        })
}

module.exports = deleteOrder