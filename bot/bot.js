//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the botGalicia bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
const { WatsonMiddleware } = require ('botkit-middleware-watson');

// Import a platform-specific adapter for facebook.

const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');

// Load process.env values from .env file
require('dotenv').config();


const watsonMiddleware = new WatsonMiddleware({
  iam_apikey: '3AsaG1wUi8ZJEA7KsVEKS3I40QGNVnT7jpuQqLI5CJLu',
  url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/fb7a677d-06db-400d-9f7e-a6c130089f78',
  workspace_id: 'f688d844-4216-46b3-8957-0c8cc0adb521',
  version: '2018-09-20',
  minimum_confidence: 0.5, // (Optional) Default is 0.75
});


/*const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV1({
  version: '2018-09-20',
  authenticator: new IamAuthenticator({
    apikey: '3AsaG1wUi8ZJEA7KsVEKS3I40QGNVnT7jpuQqLI5CJLu',
  }),
  serviceUrl: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/fb7a677d-06db-400d-9f7e-a6c130089f78',
});

const params = {
  workspaceId: 'f688d844-4216-46b3-8957-0c8cc0adb521'
  }*/



const adapter = new FacebookAdapter({

    verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,
    app_secret: process.env.FACEBOOK_APP_SECRET,
})


const controller = new Botkit({
    webhook_uri: '/api/messages',

    adapter: adapter,

});

adapter.use(new FacebookEventTypeMiddleware());

controller.hears(['.*'], ['direct_message', 'direct_mention', 'mention'], async (bot, message) => {

  await middleware.interpret(bot, message);
  if (message.watsonError) {
    console.log(message.watsonError);
    await bot.reply(message, message.watsonError.description || message.watsonError.error);
  } else if (message.watsonData && 'output' in message.watsonData) {
    await bot.reply(message, message.watsonData.output.text.join('\n'));
  } else {
    console.log('Error: received message in unknown format. (Is your connection with Watson Assistant up and running?)');
    await bot.reply(message, 'I\'m sorry, but for technical reasons I can\'t respond to your message');
  }
});