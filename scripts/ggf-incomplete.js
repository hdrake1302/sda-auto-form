function main() {
  var keys = {};
  const CLASS_TYPE = {
    QUESTION_ELEMENT: ".geS5n",
    QUESTION_TEXT: ".M7eMe",
    ANSWER_ELEMENT: "SG0AAe",
    RADIO_ELEMENT: ".oyXaNc",
    MULTI_ELEMENT: ".Y6Myld",
  };
  const questionElements = document.querySelectorAll(
    CLASS_TYPE.QUESTION_ELEMENT
  );
  questionElements.forEach((questionElement, idx) => {
    radioElement = questionElement.querySelector(CLASS_TYPE.RADIO_ELEMENT);
    multiElement = questionElement.querySelector(CLASS_TYPE.MULTI_ELEMENT);

    questionValue = questionElement.querySelector(
      CLASS_TYPE.QUESTION_TEXT
    ).innerText;

    if (radioElement) {
      handleRadio(questionValue, radioElement);
    }

    if (multiElement) {
      handleMulti(questionValue, multiElement);
    }
  });

  function handleRadio(questionValue, radioElement) {
    radioValue = radioElement.querySelector('[aria-checked="true"]');
    radioValue = radioValue.dataset.value;

    keys[questionValue] = radioValue.trim();
  }

  function handleMulti(questionValue, multiElement) {
    multiResult = [];
    multiValues = multiElement.querySelectorAll('[aria-checked="true"]');

    multiValues.forEach((multiValue) => {
      value = multiValue.dataset.answerValue;
      multiResult.push(value.trim());
    });

    keys[questionValue] = multiResult;
  }

  sendMessage({
    type: "scrape-ggf",
    data: {
      keys,
    },
  });
}

main();

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
}
