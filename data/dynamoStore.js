const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'});

const dynamodb = new AWS.DynamoDB();

function putItem (table, item, callback) {
    let params = {
        TableName: table,
        Item: {}
    };

    // This loops through our keys determines the type of the value
    // and maps the value to a dyanmodb type.
    for (let key of Object.keys(item)) {
        let val;
        if (typeof item[key] === 'string') {
            val = { S: item[key] };
        } else if (typeof item[key] === 'number') {
            val = { N: '' + item[key]};
        } else if (item[key] instanceof Array) {
            val = { SS: item[key] }; // SS = "Sorted Set"
        }
        params.Item[key] = val;
    }

    dynamodb.putItem(params, callback);
}

function getAllItems (table, callback) {
    let params = {
        TableName : table
    };

    // scan will only pull 1 MB of data at a time.  Pulls in random order.
    // if you need more you have to recursively call with a start index.
    dynamodb.scan(params, callback);
}

function getItem (table, idName, id, callback) {
    let params = {
        TableName : table,
        Key : {}
    };

    params.Key[idName] = { S: id };

    dynamodb.getItem(params, callback);
}

module.exports.putItem = putItem;
module.exports.getAllItems = getAllItems;
module.exports.getItem = getItem;
