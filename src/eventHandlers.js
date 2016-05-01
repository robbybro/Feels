'use strict';

var storage = require('./storage');

var registerEventHandlers = function (eventHandlers, skillContext) {
    eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
        console.log(
            "Feels onSessionStarted requestId: " +
            sessionStartedRequest.requestId +
            ", sessionId: " + session.sessionId
        );
        // any initialization logic goes here
    };

    eventHandlers.onLaunch = function (launchRequest, session, response) {
        console.log(
            "Feels onLaunch requestId: " +
            launchRequest.requestId +
            ", sessionId: " +
            session.sessionId
        );
        var speechOutput = "Tell Feels how you feel about stuff'n'things";
        var repromptText = "Tell feels how you feel about something.";
        response.ask(speechOutput, repromptText);
    };

    eventHandlers.onSessionEnded = function (sessionEndedRequest,session) {
        console.log(
            "Feels onSessionEnded requestId: " +
            sessionEndedRequest.requestId +
            ", sessionId: " +
            session.sessionId
        );
        // any cleanup logic goes here
    };
};

exports.register = registerEventHandlers;