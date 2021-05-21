/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    /**
     * Detect when a message has a sticker attached
     */
    controller.hears(
  ['.*'],
  ['direct_message', 'direct_mention', 'mention'],
  async function(bot, message) {
    if (message.watsonError) {
      await bot.reply(
        message,
        "I'm sorry, but for technical reasons I can't respond to your message",
      );
    } else {
      await bot.reply(message, message.watsonData.output.text.join('\n'));
    }
  },
);

    controller.on('facebook_postback', async(bot, message) => {
        await bot.reply(message,`I heard you posting back a post_back about ${ message.text }`);
    });


}