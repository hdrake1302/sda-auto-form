async function main() {
  var keys = {};

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

    console.log(questionValue);
    radioElement = questionElement.querySelector(CLASS_TYPE.RADIO_ELEMENT);
    multiElement = questionElement.querySelector(CLASS_TYPE.MULTI_ELEMENT);

    if (radioElement) {
      const radioValue = handleRadio(questionElement);
      keys[questionValue] = radioValue;
    }

    if (multiElement) {
      handleMulti(questionElement);
    }
  });

  function handleRadio(questionElement) {
    const checkedElement = questionElement.querySelector(
      '[aria-checked="true"]'
    );
    const radioValue = checkedElement.dataset.value;

    return radioValue.trim();
  }

  function handleMulti(questionElement) {
    multiElements = questionElement.querySelectorAll(CLASS_TYPE.MULTI_ELEMENT);

    multiElements.forEach((currElement) => {
      const checkedElement = currElement.querySelector('[aria-checked="true"]');
    });
  }

  console.log(keys);
}

main();

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
}
