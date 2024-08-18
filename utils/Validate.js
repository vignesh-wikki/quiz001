function validateAnswer(userAnswer, correctAnswerIndex) {
  if (userAnswer === correctAnswerIndex) {
    return "Correct! 🎉";
  } else {
    return "Wrong! 😔";
  }
}

module.exports =  validateAnswer ;
