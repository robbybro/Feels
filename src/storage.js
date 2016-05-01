'use strict';
var AWS = require("aws-sdk"),
    tableName = 'FeelingsData';

// composite userId and subject for querying dynamo
function compositeKey(userId, subject) {
    return userId + subject;
}

var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    return {
        loadFeelings: function (session, subject, callback) {
            console.log('subject to query by: ', subject);
            // UserAndSubject key is a composite key because apparently
            // dynamodb doesn't support AND'ing. You can get one item or
            // nothing. Composite the subject and user id so you can find
            // items by user and subject later.
            dynamodb.getItem({
                TableName: tableName,
                Key: {
                    UserAndSubjectKey: {
                        S: compositeKey(session.user.userId, subject),
                    },
                }
            }, function (err, data) {
                var currentFeelings = {};
                if (err) {
                    console.log('query unsuccessful', err, err.stack);
                    callback(currentFeelings);
                }
                else if (!data.Item) {
                    // no feelings exist - return empty callback
                    console.log('query successful, but no data', data);
                    // TODO: if no feelings are found, reprompt user asking how
                    // they feel about the subject
                    callback(data);
                }
                else {
                    console.log('query successful, data returned', data);
                    currentFeelings[data.Item.Subject.S] = data.Item.Feeling.S;
                    callback(currentFeelings);
                }
            });
        },
        save: function (session, subject, feeling, callback) {
            // TODO: check to see if a feeling has already been saved
            // for the subject and ask user if they'd like to overwrite it
            // if there is one
            dynamodb.putItem({
                TableName: tableName,
                Item: {
                    UserAndSubjectKey: {
                        S: compositeKey(session.user.userId, subject),
                    },
                    Subject: {
                        S: subject,
                    },
                    Feeling: {
                        S: feeling,
                    }
                }
            }, function (err, data) {
                console.log(data);
                if (err) {
                    console.log('error saving ');
                    console.log(err, err.stack);
                }
                if (callback) {
                    console.log('save successful');
                    callback();
                }
            });
        }
    };
})();
module.exports = storage;
