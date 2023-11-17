async function main() {
  const textField = document.querySelector("textarea");

  const plainText = textField.value;
  const keys = extractKeys(plainText);

  sendMessage({
    type: "save-keys",
    data: {
      keys,
      type: "normalize-keys",
    },
  });
}

function extractKeys(plainText) {
  /**
   * Function to extract keys from a formatted plain text (using function formatWord)
   * Input: plainText
   * Output: keys that the extension uses to paste
   */

  const keys = {};

  const questions = plainText.split("\n\n");

  questions.forEach((currBlock, idx) => {
    var [question, answer] = currBlock.split("\n\t");

    if (question && answer) {
      const qIndex = question?.indexOf(": ");
      const aIndex = answer?.indexOf(": ");

      const qSplits = [question.slice(0, qIndex), question.slice(qIndex + 2)];
      const aSplits = [answer.slice(0, aIndex), answer.slice(aIndex + 2)];

      question = qSplits[1];
      answer = aSplits[1];

      if (answer.match("\n- ")) {
        // Multiple
<<<<<<< HEAD
        console.log("multiple");

=======
        console.log(answer);
>>>>>>> 6ece1a6a91de054f75217c50e5192b151ceb1393
        answer = answer.split("\n- ");
        keys[question] = answer.splice(1);
      } else {
        // Radio & Text
        keys[question] = answer.trim();
      }
    }
  });

  return keys;
}

main();
