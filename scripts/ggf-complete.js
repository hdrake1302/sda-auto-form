async function main() {
  var keys = {};

  const choice = await chrome.storage.sync.get("choice");
  const hasIgnoreWrong = choice.hasIgnoreWrong;

  const CLASS_TYPE = {
    QUESTION_ELEMENT: ".Qr7Oae",
    QUESTION_TEXT: ".M7eMe",
    RADIO_ELEMENT: ".yUJIWb",
    MULTI_ELEMENT: ".hfh9V",
  };

  const questionElements = document.querySelectorAll(
    CLASS_TYPE.QUESTION_ELEMENT
  );

  questionElements.forEach((questionElement, idx) => {
    const questionValue = questionElement.querySelector(
      CLASS_TYPE.QUESTION_TEXT
    ).innerText;

    radioElement = questionElement.querySelector(CLASS_TYPE.RADIO_ELEMENT);
    multiElement = questionElement.querySelector(CLASS_TYPE.MULTI_ELEMENT);

    if (radioElement) {
      const radioValue = getRadioValue(questionElement);
      keys[questionValue] = radioValue;
    }

    if (multiElement) {
      const multiValues = getMultiValues(questionElement);
      keys[questionValue] = multiValues;
    }
  });

  function getRadioValue(questionElement) {
    const checkedElement = questionElement.querySelector(
      '[aria-checked="true"]'
    );
    const radioValue = checkedElement.dataset.value;

    return radioValue.trim();
  }

  function getMultiValues(questionElement) {
    multiElements = questionElement.querySelectorAll(CLASS_TYPE.MULTI_ELEMENT);
    multiValues = [];

    multiElements.forEach((currElement) => {
      const checkedElement = currElement.querySelector('[aria-checked="true"]');
      if (checkedElement) {
        multiValues.push(currElement.innerText.trim());
      }
    });

    return multiValues;
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
