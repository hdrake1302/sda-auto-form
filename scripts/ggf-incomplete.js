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
      const radioValue = getRadioValue(radioElement);
      keys[questionValue] = radioValue;
    }

    if (multiElement) {
      const multiValues = getMultiValues(multiElement);
      keys[questionValue] = multiValues;
    }
  });

  function getRadioValue(radioElement) {
    radioValue = radioElement.querySelector('[aria-checked="true"]');
    radioValue = radioValue.dataset.value;

    return radioValue.trim();
  }

  function getMultiValues(multiElement) {
    multiResult = [];
    multiValues = multiElement.querySelectorAll('[aria-checked="true"]');

    multiValues.forEach((multiValue) => {
      value = multiValue.dataset.answerValue;
      multiResult.push(value.trim());
    });

    return multiResult;
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
