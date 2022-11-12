async function main() {
  const { keys } = await chrome.storage.local.get("keys");
  const { choice } = await chrome.storage.sync.get("choice");

  if (keys) {
    // My AloHa
    var questions = document.querySelectorAll(".quiz-list-wrap .content");

    if (questions.length !== 0) {
      // MyAloha Paste
      for (let index = 0; index < questions.length; index++) {
        const questionBlock = questions[index];

        const questionText = questionBlock
          .querySelector(".description p")
          .innerText.trim();

        const question = choice.shouldNormalized
          ? normalizeString(questionText)
          : questionText;

        const radioBoxes = questionBlock.querySelectorAll(".item-sheet");
        const key = keys[question];

        if (key) {
          radioBoxes.forEach((radioBlock, idx) => {
            const answer = radioBlock.querySelector(".desc").innerText;

            if (key === answer) {
              radioBlock.querySelector("input").click();
            }
          });
        } else if (choice.hasRandom) {
          handleRandom(radioBoxes);
        }
      }
    }
  }
}

function handleRandom(radioBoxes) {
  const randomIdx = generateRandomNum();
  radioBoxes[randomIdx].querySelector("input").click();
}

main();
