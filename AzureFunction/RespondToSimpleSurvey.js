
// RespondToSimpleSurvey.js
// Azure Function v2.0 in Javascript to read a JSON body and submit a response card.
// See also BUILD 2019 conference video at https://www.youtube.com/watch?v=GJkep8wToVA
/* The card should submit to this function with an Action.Http request (currently Outlook only)
"actions": [
    {
        "type": "Action.Http",
        "title": "Submit",
        "body": "{\"rating\": \"{{rating.value}}\"}",
        "url": "<somehttpendpoint>",
        "method": "POST"
    }
]
*/
module.exports = async function (context, req) {
    var msg = "Thank you for submitting your rating " + req.body.rating + ".";
    //var timestamp = new Date().toISOString();
    var timestamp = new Date().toLocaleString('en-US',{ timeZone: 'America/Los_Angeles' });
    context.log('JavaScript HTTP trigger function processed a request: ' + msg);

    context.res = {
        status: 200,
        headers: { 'CARD-UPDATE-IN-BODY': 'true' },
        isRaw: true,
        body:  {
            "type": "AdaptiveCard",
            "version": "1.0",
            "hideOriginalBody": true,
            "body": [ 
                {
                    "type": "Image",
                    "url": "https://<some>.blob.core.windows.net/newsletter/banner1.png"
                },                
                { 
                    "type": "TextBlock",
                    "text": "Hello. "+ msg
                },
{ 
                    "type": "TextBlock",
                    "text": "Your request has been processed at " + timestamp
                }                
            ]
        }
        
    };

    context.done();
};