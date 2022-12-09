async function main() {
  const questions = document.querySelectorAll(".multichoice");

  const keys = {};
  for (const questionEle of questions) {
    const question = questionEle.querySelector(".qtext")?.innerText?.trim();
    const input = questionEle.querySelector('[checked="checked"]');

    const answerEle = input.closest("div");

    if (question && answerEle) {
      const answer = answerEle.querySelector("label").innerText.trim();

      keys[question] = answer.slice(3);
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
