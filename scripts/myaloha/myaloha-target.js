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
        const question = normalizeString(questionText);

        const radioBoxes = questionBlock.querySelectorAll(".item-sheet");

        radioBoxes.forEach((radioBlock, idx) => {
          let answer = radioBlock.querySelector(".desc").innerText;

          if (keys[question] === answer) {
            radioBlock.querySelector("input").click();
          }
        });
      }
    }
  }
}

main();
