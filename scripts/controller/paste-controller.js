function main() {
  const QUERY_TYPE = {
    GGF_TARGET: ".geS5n",
  };

  if (document.querySelector(QUERY_TYPE.GGF_TARGET)) {
    sendMessage({
      type: "ggf-target",
    });
  }
}
main();

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
}
