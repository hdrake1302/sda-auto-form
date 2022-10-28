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

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
}
