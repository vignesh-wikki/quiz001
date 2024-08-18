function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let correctIndex;
function generateMathQuestion() {
  const operations = ["+", "-", "*", "/"];
  const operation = operations[getRandomInt(0, operations.length - 1)];

  let num1, num2, questionText, correctAnswer;

  switch (operation) {
    case "+":
      num1 = getRandomInt(1, 20);
      num2 = getRandomInt(1, 20);
      questionText = `What is ${num1} + ${num2}?`;
      correctAnswer = num1 + num2;
      break;
    case "-":
      num1 = getRandomInt(1, 20);
      num2 = getRandomInt(1, num1);
      questionText = `What is ${num1} - ${num2}?`;
      correctAnswer = num1 - num2;
      break;
    case "*":
      num1 = getRandomInt(1, 10);
      num2 = getRandomInt(1, 10);
      questionText = `What is ${num1} * ${num2}?`;
      correctAnswer = num1 * num2;
      break;
    case "/":
      num2 = getRandomInt(1, 10);
      correctAnswer = getRandomInt(1, 10);
      num1 = num2 * correctAnswer;
      questionText = `What is ${num1} / ${num2}?`;
      break;
  }

  const options = [correctAnswer];
  while (options.length < 4) {
    const randomOption = getRandomInt(correctAnswer - 5, correctAnswer + 5);
    if (!options.includes(randomOption) && randomOption > 0) {
      options.push(randomOption);
    }
  }

  options.sort(() => Math.random() - 0.5);
  const Options = options.map(String);
  correctIndex = options.indexOf(correctAnswer);
  return {
    questionText,
    Options,
    correctIndex
  };
}
module.exports = {generateMathQuestion,correctIndex};

