const { generateMathQuestion } = require("../utils/generateQuestion");
const { timer } = require("../utils/timer");

const nextQuestion = async (ctx, numberOfQuestions, correctIndexAnswer) => {
  await ctx.answerCbQuery();
  if (numberOfQuestions > 0) {
    const { questionText, Options, correctIndex } = generateMathQuestion();
    correctIndexAnswer = correctIndex;
    numberOfQuestions--;

    await ctx.replyWithPoll(questionText, Options, {
      is_anonymous: false,
    });
   await timer(ctx,10);
  }
  return { numberOfQuestions, correctIndexAnswer };
};

module.exports = nextQuestion;
