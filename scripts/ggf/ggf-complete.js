async function main() {
  const keys = {};

  const data = await chrome.storage.sync.get("choice");
  const choice = data.choice;
  const hasIgnoreWrong = choice?.hasIgnoreWrong;

  const CLASS_TYPE = {
    QUESTION_ELEMENT: ".Qr7Oae",
    QUESTION_TEXT: ".M7eMe",
    RADIO_ELEMENT: ".yUJIWb",
    MULTI_ELEMENT: ".hfh9V",
    TEXT_ELEMENT: ".Mh5jwe",
    POINT_ELEMENT: ".RGoode",
    RIGHT_ELEMENT: ".D42QGf .muwQbd",
  };

  const questionElements = document.querySelectorAll(
    CLASS_TYPE.QUESTION_ELEMENT
  );

  questionElements.forEach((questionElement, idx) => {
    const $ = questionElement.querySelector.bind(questionElement);

    const questionValue = $(CLASS_TYPE.QUESTION_TEXT).innerText.trim();

    const radioElement = $(CLASS_TYPE.RADIO_ELEMENT);
    const multiElement = $(CLASS_TYPE.MULTI_ELEMENT);
    const textElement = $(CLASS_TYPE.TEXT_ELEMENT);

    if (radioElement) {
      const radioValue = getRadioValue(questionElement);
      keys[questionValue] = radioValue;
    }

    if (multiElement) {
      const multiValues = getMultiValues(questionElement);
      keys[questionValue] = multiValues;
    }

    if (textElement) {
      const textValue = getTextValue(textElement);
      keys[questionValue] = textValue;
    }

    if (hasIgnoreWrong) {
      handleCopyIgnore(questionElement, questionValue);
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
    const multiElements = questionElement.querySelectorAll(
      CLASS_TYPE.MULTI_ELEMENT
    );
    const multiValues = [];

    multiElements.forEach((currElement) => {
      const checkedElement = currElement.querySelector('[aria-checked="true"]');
      if (checkedElement) {
        multiValues.push(currElement.innerText.trim());
      }
    });

    return multiValues;
  }

  function getTextValue(textElement) {
    return textElement.innerText.trim();
  }

  function handleCopyIgnore(questionElement, questionValue) {
    const point = questionElement?.querySelector(CLASS_TYPE.POINT_ELEMENT);

    if (point?.innerText !== "1/1") {
      const rightElement = questionElement.querySelector(
        CLASS_TYPE.RIGHT_ELEMENT
      );
      if (rightElement) {
        const multiRightElement = rightElement.querySelector(".zTE4wf");
        const shortAnswerElement = rightElement.querySelector(".ZYU5Rd");

        if (shortAnswerElement) {
          // Deal with short answer
          keys[questionValue] = shortAnswerElement.innerText.trim();
        } else if (multiRightElement) {
          // Deal with Multiple boxes
          const rightElements = multiRightElement.querySelectorAll(".YEVVod");
          const multiValues = [];
          for (let i = 0; i < rightElements.length; i++) {
            const rightValue = rightElements[i].innerText;
            multiValues.push(rightValue.trim());
          }
          keys[questionValue] = multiValues;
        } else {
          // Else deal with Radio box
          keys[questionValue] = rightElement.innerText.trim();
        }
      } else {
        // Ignore wrong answer by delete it from keys
        delete keys[questionValue];
      }
    }
  }

  sendMessage({
    type: "scrape-ggf",
    data: {
      keys,
    },
  });
}

main();
