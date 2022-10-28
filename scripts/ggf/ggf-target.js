async function main() {
  const data = await chrome.storage.sync.get("keys");
  const keys = data.keys;

  const CLASS_TYPE = {
    QUESTION_ELEMENT: ".geS5n",
    QUESTION_TEXT: ".M7eMe",
    ANSWER_ELEMENT: "SG0AAe",
    RADIO_ELEMENT: ".oyXaNc",
    MULTI_ELEMENT: ".Y6Myld",
    TEXT_ELEMENT: ".AgroKb",
  };

  if (keys) {
    const questionElements = document.querySelectorAll(
      CLASS_TYPE.QUESTION_ELEMENT
    );

    questionElements.forEach((questionElement, idx) => {
      const $ = questionElement.querySelector.bind(questionElement);

      const radioElement = $(CLASS_TYPE.RADIO_ELEMENT);
      const multiElement = $(CLASS_TYPE.MULTI_ELEMENT);
      const textElement = $(CLASS_TYPE.TEXT_ELEMENT);

      const questionValue = $(CLASS_TYPE.QUESTION_TEXT).innerText.trim();

      const key = keys[questionValue];

      if (radioElement) {
        $(`[data-value="${key}"]`).click();
      }

      if (multiElement) {
        for (k of key) {
          $(`[data-answer-value="${k}"]`).click();
        }
      }

      // need to research more
      // if (textElement) {
      //   const inputElement = textElement.querySelector("input");
      //   inputElement.value = key;
      //   inputElement.dataset.initialValue = key;
      // }
    });
  }
}

main();
