async function main() {
  const data = await chrome.storage.local.get("keys");
  const keys = data.keys;

  console.log(keys);
  if (keys) {
    // My AloHa
    var questions = document.querySelectorAll(".quiz-list-wrap .content");

    if (questions.length !== 0) {
      // MyAloha Paste
      for (let index = 0; index < questions.length; index++) {
        const questionBlock = questions[index];

        const question = questionBlock
          .querySelector(".description p")
          .innerText.trim();

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
