function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
}

function normalizeString(string) {
  // Remove different whitespace (by character)
  return string.replace(/\s+/g, " ");
}
