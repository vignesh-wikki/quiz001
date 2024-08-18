const delay = (sec) => new Promise((resolve) => setTimeout(resolve, sec));

const finalScoreAnimation = async (ctx, score) => {
  try {
    await ctx.reply("Calculating your final score...");
    await delay(1000);
    await ctx.reply("🤔");
    await delay(500);
    await ctx.reply("🤔🤔");
    await delay(500);
    await ctx.reply("🤔🤔🤔");
    await delay(1000);

    await ctx.reply("✨ Here is your final score... ✨");
    await delay(1500);

    await ctx.reply(`🎉 Your final score is: ${score} 🎉`);
    if (score == 10) {
      await ctx.reply("Excellent");
    }
    else if(score>5){
await ctx.reply("Good");
    }
    else{
        await ctx.reply("Its ok, practice more");
    }
  } catch (error) {
    console.error("Error displaying final score:", error);
  }
};

module.exports = finalScoreAnimation;
