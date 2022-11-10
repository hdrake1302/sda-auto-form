function main() {
  const QUERY_TYPE = {
    GGF_TARGET: ".geS5n",
    SDA_SHARE: "#sda-word-extract",
    MYALOHA_TARGET: "#confirmFinishModal",
    ELEARNING_TARGET: ".multichoice.deferredfeedback",
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

  if (document.querySelector(QUERY_TYPE.MYALOHA_TARGET)) {
    sendMessage({
      type: "myaloha-target",
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
