const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports.save = (name, data, callback) => {
    let params = {
        Bucket: 'pizza-luvrs-mpegram',
        Key: `pizzas/${name}.png`,
        Body: new Buffer(data, 'base64'),
        ContentEncoding: 'base64',
        ContentType: 'image/png'
    };

    s3.putObject(params, (err, data) => {
        // Correct URL to the Pizza Image uploaded.
        callback(err, `//s3.amazonaws.com/pizza-luvrs-mpegram/${params.Key}`)
    });
};
