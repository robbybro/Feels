'use strict';

var storage = require('./storage');

var registerIntentHandlers = function (intentHandlers) {
    intentHandlers.TellFeelingsIntent = function (intent, session, response) {
        var subject = intent.slots.subject.value,
            feeling = intent.slots.feeling.value;

        storage.save(session, subject, feeling, function () {
            var speechOutput = 'You ' + feeling + subject;
            response.tellWithCard(speechOutput, "Feels", speechOutput);
        });
    };

    intentHandlers.RecallFeelingsIntent = function(intent, session, response) {
        // TODO: Recall feelings
        var subject = intent.slots.subject.value;
        console.log('query stuff about ', subject);
        storage.loadFeelings(session, subject, function (feelings) {
            console.log('feelingsss', feelings);
            if (feelings[subject]) {
                response.tell('you ' + feelings[subject] + ' ' + subject);
            }
            else {
                response.tell(
                    'you feel no feelings towards ' + subject + ' yet'
                );
            }
        });
    };

    intentHandlers['AMAZON.HelpIntent'] = function (intent, session, response) {
        response.ask("You can tell me how you feel about something");
    };
};

exports.register = registerIntentHandlers;