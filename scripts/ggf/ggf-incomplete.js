async function main() {
  const keys = {};
  const choice = await chrome.storage.sync.get("choice");
  const hasIgnoreWrong = choice.hasIgnoreWrong;

  const CLASS_TYPE = {
    QUESTION_ELEMENT: ".geS5n",
    QUESTION_TEXT: ".M7eMe",
    ANSWER_ELEMENT: "SG0AAe",
    RADIO_ELEMENT: ".oyXaNc",
    MULTI_ELEMENT: ".Y6Myld",
    TEXT_ELEMENT: ".AgroKb",
  };
  const questionElements = document.querySelectorAll(
    CLASS_TYPE.QUESTION_ELEMENT
  );
  questionElements.forEach((questionElement, idx) => {
    const $ = questionElement.querySelector.bind(questionElement);

    const radioElement = $(CLASS_TYPE.RADIO_ELEMENT);
    const multiElement = $(CLASS_TYPE.MULTI_ELEMENT);
    const textElement = $(CLASS_TYPE.TEXT_ELEMENT);

    const questionValue = $(CLASS_TYPE.QUESTION_TEXT).innerText.trim();

    if (radioElement) {
      const radioValue = getRadioValue(radioElement);
      if (radioValue) keys[questionValue] = radioValue;
    }

    if (multiElement) {
      const multiValues = getMultiValues(multiElement);
      if (multiValues.length > 0) keys[questionValue] = multiValues;
    }

    if (textElement) {
      const textValue = getTextValue(textElement);
      if (textValue) keys[questionValue] = textValue;
    }
  });

  function getRadioValue(radioElement) {
    const checkedElement = radioElement.querySelector('[aria-checked="true"]');
    const radioValue = checkedElement.dataset.value;

    return radioValue.trim();
  }

  function getMultiValues(multiElement) {
    const multiValues = [];
    const checkedElements = multiElement.querySelectorAll(
      '[aria-checked="true"]'
    );

    checkedElements.forEach((checkedElement) => {
      const multiValue = checkedElement.dataset.answerValue;
      multiValues.push(multiValue.trim());
    });

    return multiValues;
  }

  function getTextValue(textElement) {
    const inputElement = textElement.querySelector("input");
    const textValue = inputElement.dataset.initialValue;

    return textValue;
  }

  sendMessage({
    type: "scrape-ggf",
    data: {
      keys,
    },
  });
}

main();
