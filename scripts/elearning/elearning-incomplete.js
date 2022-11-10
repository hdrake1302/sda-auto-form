async function main() {
  const questions = document.querySelectorAll(".multichoice");

  for (const questionEle of questions) {
    const question = questionEle.querySelector(".qtext").innerText.trim();
    const input = questionEle.querySelector('[checked="checked"]');

    const answerEle = input.closest("div");

    if (question && answerEle) {
      const answer = answerEle.querySelector("label").innerText;

      console.log(question);
      console.log(answer);
    }
  }
}

main();
