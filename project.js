// ------------------------------------------------------------------
// JOVO PROJECT CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    alexaSkill: {
       nlu: 'alexa',
       manifest: {
        apis: {
            custom: {
                interfaces: [
                    {
                        type: 'CAN_FULFILL_INTENT_REQUEST',
                    }
                ],
            },
        },
    },
    },
    endpoint: 'arn:aws:lambda:us-east-1:335282899168:function:Digit',
};
 