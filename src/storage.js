'use strict';
var AWS = require("aws-sdk"),
    tableName = 'FeelingsData';
var storage = (function () {
    var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    /*
     * The Feelings class stores all the feelings for the user
     */
    function Feelings(session, data) {
        if (data && data.length) {
            this.data = data;
        }
        else {
            this.data = {}; // subject:feeling
        }
        this._session = session;
    }

    Feelings.prototype = {};

    return {
        loadFeelings: function (session, subject, callback) {
            console.log('subject to query by: ', subject);
            dynamodb.getItem({
                TableName: tableName,
                Key: {
                    UserAndSubjectKey: {
                        S: (session.user.userId + subject),
                    },
                }
            }, function (err, data) {
                var currentFeelings = {};
                if (err) {
                    console.log('query unsuccessful');
                    console.log(err, err.stack);
                    // currentFeelings = new Feelings(session);
                    // session.attributes.currentFeelings = currentFeelings.data;
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
                    console.log('Subject', data.Item.Subject.S, 'Feeling, data.Item.Feeling.S');
                    currentFeelings[data.Item.Subject.S] = data.Item.Feeling.S;

                    // session.attributes.currentFeelings = currentFeelings;
                    callback(currentFeelings);
                }
            });
        },
        save: function (session, subject, feeling, callback) {
            // save feelings to db
            // var currentFeelings = {};
            // currentFeelings[subject] = feeling;
            // console.log('currentFeelings', currentFeelings);
            dynamodb.putItem({
                TableName: tableName,
                Item: {
                    UserAndSubjectKey: {
                        S: session.user.userId + subject,
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
