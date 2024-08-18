let intervalId;

const timer = async (ctx) => {
  try {
    let remainingTime = 10;
    const initialMessage = `⏳ Time remaining: ${remainingTime} seconds`;
    let timerMessage = await ctx.telegram.sendMessage(
      ctx.from.id,
      initialMessage
    );

    intervalId = setInterval(async () => {
      remainingTime -= 1;

      if (remainingTime > 0) {
        const newMessage = `⏳ Time remaining: ${remainingTime} seconds`;

        if (timerMessage.text !== newMessage) {
          try {
            await ctx.telegram.editMessageText(
              timerMessage.chat.id,
              timerMessage.message_id,
              null,
              newMessage
            );
          } catch (error) {
            if (error.response && error.response.error_code === 400) {
              console.log("Message content is the same. Skipping update.");
            } else {
              console.error("Error updating timer message:", error);
            }
          }
        }
      } else {
        clearInterval(intervalId);
        try {
          await ctx.telegram.editMessageText(
            timerMessage.chat.id,
            timerMessage.message_id,
            null,
            "⏰ Time's up! You didn't answer in time."
          );
        } catch (error) {
          console.error("Error finalizing timer message:", error);
        }

        await ctx.telegram.sendMessage(
          ctx.from.id,
          "Click the button below to get the next question:",
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: "Next Question", callback_data: "next_question" }],
              ],
            },
          }
        );
      }
    }, 1000);
  } catch (error) {
    console.error("Error occurred during timer:", error);
  }
};

const stopTimer = () => {
  clearInterval(intervalId);
};

module.exports = { timer, stopTimer };
