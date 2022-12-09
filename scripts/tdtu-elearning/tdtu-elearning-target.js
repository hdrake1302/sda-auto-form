async function main() {
  const questions = document.querySelectorAll(".multichoice");

  const { keys } = await chrome.storage.local.get("keys");
  const { choice } = await chrome.storage.sync.get("choice");

  for (const questionEle of questions) {
    const question = questionEle?.querySelector(".qtext")?.innerText?.trim();
    const answerElements = questionEle?.querySelectorAll(".answer div");

    const key = keys[question];
    if (key) {
      for (const answerEle of answerElements) {
        const answer = answerEle.querySelector("label p").innerText.trim();

        if (key === answer) {
          answerEle.querySelector("input").click();
        }
      }
    } else if (choice.selectValue === CHOICE_VALUE.RANDOM) {
      handleRandom(answerElements);
    }
  }
}

function handleRandom(radioBoxes) {
  const randomIdx = generateRandomNum();
  radioBoxes[randomIdx].querySelector("input").click();
}

main();
