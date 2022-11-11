async function main() {
  const textField = document.querySelector("textarea");

  const plainText = textField.value;
  const keys = extractAnswers(plainText);

  sendMessage({
    type: "save-keys",
    data: {
      keys,
    },
  });
}

function extractAnswers(plainText) {
  /**
   * Function to extract the answers from a given string
   * Input: None
   * Output: answers dictionary that the extension could use
   */

  const keys = {};

  const questions = plainText.split("\n\n");

  questions.forEach((currBlock, idx) => {
    var [question, answer] = currBlock.split("\n\t");

    if (question && answer) {
      var qIndex = question?.indexOf(": ");
      var aIndex = answer?.indexOf(": ");

      var qSplits = [question.slice(0, qIndex), question.slice(qIndex + 2)];
      var aSplits = [answer.slice(0, aIndex), answer.slice(aIndex + 2)];

      question = qSplits[1];
      answer = aSplits[1];

      if (answer.match("\n- ")) {
        // Multiple boxes
        answer = answer.split("\n- ");
        keys[question] = answer.splice(1);
      } else {
        // Radio box
        keys[question] = answer;
      }
    }
  });

  return keys;
}

main();
