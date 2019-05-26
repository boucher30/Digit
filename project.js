// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    alexaSkill: {
       nlu: 'alexa',
    },
//arn:aws:lambda:us-east-1:335282899168:function:Digit
    endpoint: '${JOVO_WEBHOOK_URL}',
};
 