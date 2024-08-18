const { generateMathQuestion } = require("../utils/generateQuestion");
const { timer } = require("../utils/timer");

const startQuiz = async (ctx, numberOfQuestions, correctIndexAnswer) => {
  await ctx.answerCbQuery();
  await ctx.reply("Great! The quiz is starting now...");
  const { questionText, Options, correctIndex } = generateMathQuestion();
  correctIndexAnswer = correctIndex;
  numberOfQuestions--;

  await ctx.replyWithPoll(questionText, Options, {
    is_anonymous: false,
  });

  await timer(ctx);

  return { numberOfQuestions, correctIndexAnswer };
};
module.exports = startQuiz;
