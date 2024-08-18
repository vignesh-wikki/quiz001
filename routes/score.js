const { User } = require("../models/user");
const finalScoreAnimation = require("../utils/scoreBoard");

const userScore = async (ctx, score) => {
  await ctx.reply("Quiz completed! Thank you for participating.");
  await finalScoreAnimation(ctx, score);
  let user = await User.findOne({
    telegramId: ctx.from.id.toString(),
  });
  if (user) {
    user.results.push({
      score: score,
    });
    await user.save();
  }
  score = -1;
  return { score };
};

module.exports = userScore;
