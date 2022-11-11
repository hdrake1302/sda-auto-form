async function main() {
  const { keys } = await chrome.storage.local.get("keys");
  const { choice } = await chrome.storage.sync.get("choice");

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
      } else if (choice.hasRandom) {
        handleRandom(radioElement, multiElement);
      }
    });
  }

  function handleRandom(radioElement, multiElement) {
    if (radioElement) {
      const allRadios = radioElement.querySelectorAll('[aria-checked="false"]');
      const randomIndex = generateInputIndex();

      allRadios[randomIndex].click();
    }

    if (multiElement) {
      const allMultis = multiElement.querySelectorAll('[aria-checked="false"]');
      const randomIndexes = generateInputIndex((isMulti = true));

      for (randomIndex of randomIndexes) {
        allMultis[randomIndex].click();
      }
    }
  }

  function generateInputIndex(isMulti = false) {
    // Generate random index for clicking purpose
    if (isMulti) {
      const randomIndexes = [];
      const numOfAnswers = generateRandomNum();

      let i = 0;
      while (i <= numOfAnswers) {
        const randomIndex = generateRandomNum();
        if (randomIndexes.includes(randomIndex)) {
          continue;
        }

        randomIndexes.push(randomIndex);
        i++;
      }

      return randomIndexes;
    }

    // If radio then return randomIndex
    const randomIndex = generateRandomNum();
    return randomIndex;
  }

  function generateRandomNum() {
    // Generate a random number from 0 to 3
    return Math.floor(Math.random() * 4);
  }
}

main();
