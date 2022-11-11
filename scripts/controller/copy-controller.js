function main() {
  const QUERY_TYPE = {
    GGF_INCOMPLETE: ".geS5n",
    GGF_COMPLETE: ".OxAavc",
    SDA_SHARE: "#sda-word-extract",
    MYALOHA_INCOMPLETE: "#confirmFinishModal",
  };

  if (document.querySelector(QUERY_TYPE.GGF_INCOMPLETE)) {
    sendMessage({
      type: "ggf-incomplete",
    });
  }

  if (document.querySelector(QUERY_TYPE.GGF_COMPLETE)) {
    sendMessage({
      type: "ggf-complete",
    });
  }

  if (document.querySelector(QUERY_TYPE.MYALOHA_INCOMPLETE)) {
    sendMessage({
      type: "myaloha-incomplete",
    });
  }

  if (document.querySelector(QUERY_TYPE.SDA_SHARE)) {
    sendMessage({
      type: "sda-copy",
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
