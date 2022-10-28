async function main() {
  const data = await chrome.storage.sync.get("keys");
  const keys = data.keys;

  const wordExtract = formatWord(keys);

  const textField = document.querySelector("textarea");
  textField.value = wordExtract;

  const copyBtn = document.querySelector("#copy-btn");

  copyBtn.onclick = function () {
    console.log("COpied");
  };
}

function formatWord(keys) {
  // return a string that in Word Format

  var result = `${JSON.stringify(keys)}\n\n`;

  Object.keys(keys).forEach((question, idx) => {
    let key = keys[question];

    if (!Array.isArray(key)) {
      result += `Câu hỏi ${idx + 1}: ${question}\n\tTrả lời: ${key}\n\n`;
    } else {
      result += `Câu hỏi ${idx + 1}: ${question}\n\tTrả lời: \n`;
      key.forEach((currValue, idx) => {
        result += `- ${currValue}\n`;

        if (key.length - 1 === idx) {
          // Break lines at the end
          result += "\n";
        }
      });
    }
  });
  return result;
}

function extractAnswers() {
  /**
   * Function to extract the answers from a given string
   * Input: None
   * Output: answers dictionary that the extension could use
   */

  var answers = {};

  var textField = document.querySelector("textarea");

  var textValue = textField.value;

  console.log(JSON.parse(textValue.split("\n\n")[0]));
  var questions = textValue.split("\n\n");

  return;

  questions.forEach((currBlock, idx) => {
    var [question, answer] = currBlock.split("\n\t");

    if (question && answer) {
      var qIndex = question?.indexOf(": ");
      var aIndex = answer?.indexOf(": ");

      var qSplits = [question.slice(0, qIndex), question.slice(qIndex + 2)];
      var aSplits = [answer.slice(0, aIndex), answer.slice(aIndex + 2)];

      question = qSplits[1].trim();
      answer = aSplits[1].trim();

      if (answer.match("\n- ")) {
        // Multiple boxes
        answer = answer.split("\n- ");
        answers[question] = answer.splice(1);
      } else {
        // Radio box
        answers[question] = answer;
      }
    }
  });

  return answers;
}

main();
