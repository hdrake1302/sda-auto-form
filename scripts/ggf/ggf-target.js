async function main() {
  const data = await chrome.storage.local.get("keys");
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

      const questionValue = normalizeString(
        $(CLASS_TYPE.QUESTION_TEXT).innerText.trim()
      );

      const key = keys[questionValue];

      if (key) {
        if (radioElement) {
          $(`[data-value="${key}"]`).click();
        }

        if (multiElement) {
          for (k of key) {
            $(`[data-answer-value="${k}"]`).click();
          }
        }

        if (textElement) {
          const inputElement = textElement.querySelector("input");
          const inputWrap = inputElement.closest(".rFrNMe");

          // so that the placeholder will disappear
          inputWrap.classList.add("CDELXb");

          inputElement.value = key;
          inputElement.dataset.initialValue = key;
          inputElement.setAttribute("badinput", false);
        }
      }
    });
  }
}

main();
