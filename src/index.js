// TODO: update subjects to include all nouns instead of just people
// TODO: export strings to their own deal
'use strict';

var AlexaSkill = require('./AlexaSkill'),
    config = require('./config'),
    eventHandlers = require('./eventHandlers'),
    intentHandlers = require('./intentHandlers'),
    APP_ID = config.appId
;

var Feels = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Feels.prototype = Object.create(AlexaSkill.prototype);
Feels.prototype.constructor = Feels;

eventHandlers.register(Feels.prototype.eventHandlers);
intentHandlers.register(Feels.prototype.intentHandlers);

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    var feels = new Feels();
    feels.execute(event, context);
};