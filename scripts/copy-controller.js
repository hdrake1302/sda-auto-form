function main() {
  const QUERY_TYPE = {
    GGF_INCOMPLETE: ".geS5n",
    GGF_COMPLETE: ".OxAavc",
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
}
main();

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
}

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
