const { User } = require("../models/user");

const startOfBot = async (ctx) => {
  const chatId = ctx.chat.id;
  let user = await User.findOne({
    telegramId: chatId.toString(),
  });
  if (user) {
    await ctx.reply(`Hello👋 ${ctx.from.first_name} , `);
    await ctx.reply(`Welcome🙏 to our mathQuiz ${ctx.from.first_name}.`);
  } else {
    user = new User({
      telegramId: chatId.toString(),
      userName: ctx.from.first_name,
    });
    await user.save();
  }

  await ctx.reply("Please select the number of questions you want", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "10",
            callback_data: "10",
          },
          {
            text: "20",
            callback_data: "20",
          },
          {
            text: "30",
            callback_data: "30",
          },
        ],
      ],
    },
  });
  await ctx.reply("General instructions:");
  await ctx.reply(
    "Inbetween the quiz if want pause, start or endup then use these commands are , /pausequiz for pausing quiz, /startquiz for resumeing the quiz, /endquiz for end up quiz and it shows your final score also."
  );
};

module.exports = startOfBot;
