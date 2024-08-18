const { stopTimer } = require("../utils/timer");
const validateAnswer = require("../utils/Validate");

const poll = async (ctx, score, correctIndexAnswer) => {
  stopTimer(ctx);
  const pollAnswer = ctx.pollAnswer.option_ids[0];

  const feedback = validateAnswer(pollAnswer, correctIndexAnswer);
  if (feedback === "Correct! 🎉") {
    score++;
  }
  await ctx.telegram.sendMessage(ctx.from.id, feedback);
  await ctx.telegram.sendMessage(
    ctx.from.id,
    "Click the button below to get the next question:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Next Question",
              callback_data: "next_question",
            },
          ],
        ],
      },
    }
  );
  correctIndexAnswer = -1;

  return { score, correctIndexAnswer };
};

module.exports = poll;
