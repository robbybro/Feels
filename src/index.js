'use strict';

var AlexaSkill = require('./AlexaSkill'),
    config = require('./config'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers'),
    APP_ID = config.appId,
    skillContext = {}
;

var Feels = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Feels.prototype = Object.create(AlexaSkill.prototype);
Feels.prototype.constructor = Feels;

eventHandlers.register(Feels.prototype.eventHandlers, skillContext);
intentHandlers.register(Feels.prototype.intentHandlers, skillContext);

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Feels skill.
    var feels = new Feels();
    feels.execute(event, context);
};