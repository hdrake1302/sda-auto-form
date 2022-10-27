async function main() {
  const data = await chrome.storage.sync.get("keys");
  const keys = data.keys;

  const CLASS_TYPE = {
    QUESTION_ELEMENT: ".geS5n",
    QUESTION_TEXT: ".M7eMe",
    ANSWER_ELEMENT: "SG0AAe",
    RADIO_ELEMENT: ".oyXaNc",
    MULTI_ELEMENT: ".Y6Myld",
  };

  if (keys) {
    const questionElements = document.querySelectorAll(
      CLASS_TYPE.QUESTION_ELEMENT
    );

    questionElements.forEach((questionElement, idx) => {
      radioElement = questionElement.querySelector(CLASS_TYPE.RADIO_ELEMENT);
      multiElement = questionElement.querySelector(CLASS_TYPE.MULTI_ELEMENT);

      questionValue = questionElement.querySelector(
        CLASS_TYPE.QUESTION_TEXT
      ).innerText;

      console.log(questionValue);
      console.log(keys[questionValue]);
    });
  }
}

main();

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
}
