function getQuestionsBlock() {
  // return a question element in GF from current answer
  var questionsBlock = document.querySelectorAll(".Qr7Oae");
  return questionsBlock;
}

function getQuestion(questionBlock, opts) {
  // Return a string that represent a question

  var questionClass = "";
  switch (opts) {
    case "copy":
      questionClass = ".cTDvob.D1wxyf .M7eMe";
      break;

    case "paste":
      questionClass = ".HoXoMd.D1wxyf .M7eMe";
      break;

    case "copyInProgress":
      questionClass = ".HoXoMd.D1wxyf .M7eMe";
      break;

    default:
      break;
  }
  var questionHolder = questionBlock.querySelector(questionClass);

  return questionHolder?.innerText?.trim();
}

function getAnswer(questionBlock) {
  var form = document.querySelector("form");

  var isCompletedForm = form === null;

  // Return a string that represent an checked answer
  var result;
  var answerHolder = questionBlock.querySelector('[aria-checked="true"]');

  result = answerHolder?.getAttribute("data-value");

  var isMultipleBoxes =
    answerHolder?.closest(".eBFwI") || answerHolder?.closest(".hfh9V");

  if (isMultipleBoxes) {
    // Handle multiple boxes answer

    result = [];
    answerHolders = questionBlock.querySelectorAll('[aria-checked="true"]');

    answerHolders.forEach((curr, idx) => {
      var dataValue;
      if (!isCompletedForm) {
        // Handle copy with an uncompleted form
        dataValue = curr.getAttribute("data-answer-value");
      } else {
        // Handle copy form a completed form
        dataValue = curr.closest(".hfh9V")?.getAttribute("data-value");
      }

      if (dataValue) {
        result.push(dataValue);
      }
    });
  }

  return result;
}

function formatWord(answers) {
  // return a string that in Word Format

  var result = "";

  Object.keys(answers).forEach((question, idx) => {
    let answer = answers[question];

    if (!Array.isArray(answer)) {
      result += `Câu hỏi ${idx + 1}: ${question}\n\tTrả lời: ${answer}\n\n`;
    } else {
      result += `Câu hỏi ${idx + 1}: ${question}\n\tTrả lời: \n`;
      answer.forEach((currValue, idx) => {
        result += `- ${currValue}\n`;

        if (answer.length - 1 === idx) {
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

  var questions = textValue.split("\n\n");

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
