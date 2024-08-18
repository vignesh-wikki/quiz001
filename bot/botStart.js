const { Telegraf, session } = require("telegraf");
const startQuiz = require("../routes/startQuiz");
const nextQuestion = require("../routes/nextQuestion");
const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
const startOfBot = require("../routes/startOfBot");

const { stopTimer } = require("../utils/timer");

const Userscore = require("../routes/score");

const poll = require("../routes/poll");

let correctIndexAnswer = -1;
let numberOfQuestions = 0;
let score = 0;
let states = {
  quizStarted: false,
  quizEnded: false,
};

const startBot = async () => {
  try {
    bot.start(async (ctx) => startOfBot(ctx));

    bot.on("callback_query", async (ctx) => {
      const data = ctx.callbackQuery.data;
      states.quizStarted = true;
      if (data === "start_quiz") {
        const updatedValues = await startQuiz(
          ctx,
          numberOfQuestions,
          correctIndexAnswer
        );

        numberOfQuestions = updatedValues.numberOfQuestions;
        correctIndexAnswer = updatedValues.correctIndexAnswer;
      } else if (data === "next_question") {
        if (numberOfQuestions > 0) {
          const updatedValues = await nextQuestion(
            ctx,
            numberOfQuestions,
            correctIndexAnswer
          );
          numberOfQuestions = updatedValues.numberOfQuestions;
          correctIndexAnswer = updatedValues.correctIndexAnswer;
        } else {
          states.quizEnded = true;
          const updatedScore = await Userscore(ctx, score);
          score = updatedScore.score;
        }
      } else if (["10", "20", "30"].includes(data)) {
        numberOfQuestions = parseInt(data);
        await ctx.answerCbQuery();
        await ctx.reply("Quiz setup complete. Click 'Start Quiz' to begin.", {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Start Quiz 🎓",
                  callback_data: "start_quiz",
                },
              ],
            ],
          },
        });
      }
    });
    bot.on("poll_answer", async (ctx) => {
      const updatedPollValues = await poll(ctx, score, correctIndexAnswer);
      correctIndexAnswer = updatedPollValues.correctIndexAnswer;
      score = updatedPollValues.score;
    });

    bot.command("pausequiz", async (ctx) => {
      if (states.quizStarted) {
       await ctx.reply(
          "The quiz is paused, if continue then put /startquiz or end up put /end"
        );
        stopTimer();
      }
    });
    bot.command("startquiz", async (ctx) => {
      if (states.quizStarted) {
       await ctx.reply(
         "The quiz is started, if you want to pause then put /pause or end up put /end",
         {
           reply_markup: {
             inline_keyboard: [
               [
                 {
                   text: "Start Quiz 🎓",
                   callback_data: "start_quiz",
                 },
               ],
             ],
           },
         }
       );
      }
    });
    bot.command("endquiz", async (ctx) => {
      if (!states.quizEnded) {
       await ctx.reply(
         "The quiz is end if you click below button, if you want to start a new quiz then put /start"
       );
        const updatedScore = await Userscore(ctx, score);
        score = updatedScore.score;
      }
    });
    await bot.launch(); // Launch the bot
  } catch (err) {
    console.error("Error connecting bot to Telegram:", err);
  }
};

module.exports = startBot;
