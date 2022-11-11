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

function generateRandomNum(length = 4) {
  // Generate a random number from 0 to length - 1
  return Math.floor(Math.random() * length);
}
