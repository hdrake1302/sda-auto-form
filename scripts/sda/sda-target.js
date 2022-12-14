async function main() {
  const { keys } = await chrome.storage.local.get("keys");

  const wordExtract = formatWord(keys);

  const textField = document.querySelector("textarea");

  textField.value = wordExtract;
  textField.dataset.value = JSON.stringify(keys);
}

function formatWord(keys) {
  // return a string that in Word Format

  var result = ``;

  Object.keys(keys).forEach((question, idx) => {
    let key = keys[question];

    if (!Array.isArray(key)) {
      result += `Câu hỏi ${idx + 1}: ${question}\n\tTrả lời: ${key}\n\n`;
    } else {
      result += `Câu hỏi ${idx + 1}: ${question}\n\tTrả lời: \n`;
      key.forEach((currValue, idx) => {
        result += `- ${currValue}\n`;

        if (key.length - 1 === idx) {
          // Break lines at the end
          result += "\n";
        }
      });
    }
  });
  return result;
}

main();
