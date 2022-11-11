async function main() {
  // My AloHa
  var questions = document.querySelectorAll(".quiz-list-wrap .content");
  const keys = {};

  if (questions.length !== 0) {
    // Loop through the questions
    for (let index = 0; index < questions.length; index++) {
      const questionBlock = questions[index];

      const question = questionBlock
        .querySelector(".description p")
        .innerText.trim();

      // inputted answer
      const checkedInput = questionBlock.querySelector("input:checked");
      if (checkedInput) {
        const answerBlock = checkedInput.closest(".item-sheet");
        const answer = answerBlock.querySelector(".desc").innerText;

        keys[question] = answer;
      }
    }
  }

  sendMessage({
    type: "save-keys",
    data: {
      keys,
    },
  });
}

main();
