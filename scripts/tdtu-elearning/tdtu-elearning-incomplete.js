async function main() {
  const { choice } = await chrome.storage.sync.get("choice");

  const questions = document.querySelectorAll(".multichoice");
  const keys = {};

  for (const questionEle of questions) {
    const question = questionEle?.querySelector(".qtext").innerText.trim();
    const answers_element = questionEle?.querySelector(".answer");
    const checked_input = answers_element?.querySelector("input:checked");

    const answerEle = checked_input?.closest("div");

    if (question && answerEle) {
      const answer = answerEle.querySelector("label p").innerText.trim();

      keys[question] = answer;
    }
  }

  if (choice.selectValue === CHOICE_VALUE.APPEND) {
    let data = await chrome.storage.local.get("keys");
    let old_keys = data.keys;

    // Append keys cũ vào keys mới
    sendMessage({
      type: "save-keys",
      data: {
        keys: Object.assign({}, keys, old_keys),
      },
    });
  } else {
    sendMessage({
      type: "save-keys",
      data: {
        keys,
      },
    });
  }
}

main();
