/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, tell Greeter to say hello"
 *  Alexa: "Hello World!"
 */

/**
 * App ID for the skill
 */

var config = require('./config');
var APP_ID = config.appId;

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');
var Feels = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Feels.prototype = Object.create(AlexaSkill.prototype);
Feels.prototype.constructor = Feels;

Feels.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Feels onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Feels.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
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

Feels.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Feels onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Feels.prototype.intentHandlers = {
    // register custom intent handlers
    "FeelsIntent": function (intent, session, response) {
        console.log(intent);
        console.log('====================', intent.slots.subject.value, intent.slots.feeling.value);
        var subject = intent.slots.subject.value,
            feeling = intent.slots.feeling.value,
            speechOutput = 'Robby ' + feeling +'s ' + subject;
        console.log('OUTPUTTT', speechOutput);
        response.tellWithCard(speechOutput, "Feels", speechOutput);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can tell me how you feel about something");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Feels skill.
    var feels = new Feels();
    feels.execute(event, context);
};

