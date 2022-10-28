function main() {
  const QUERY_TYPE = {
    GGF_TARGET: ".geS5n",
    SDA_SHARE: "#sda-word-extract",
  };

  if (document.querySelector(QUERY_TYPE.GGF_TARGET)) {
    sendMessage({
      type: "ggf-target",
    });
  }

  if (document.querySelector(QUERY_TYPE.SDA_SHARE)) {
    sendMessage({
      type: "sda-target",
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
