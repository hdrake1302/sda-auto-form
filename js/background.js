async function main() {
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["/functions.js"],
    });
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const currentTab = request?.data?.currentTab;

    if (currentTab) {
      if (request.type === "bg-handle-copy") {
        const contentScriptPath = "scripts/controller/copy-controller.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      if (request.type === "bg-handle-paste") {
        const contentScriptPath = "scripts/controller/paste-controller.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      if (request.type === "bg-ggf-incomplete") {
        const contentScriptPath = "scripts/ggf/ggf-incomplete.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      if (request.type === "bg-ggf-complete") {
        const contentScriptPath = "scripts/ggf/ggf-complete.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Paste to the target
      if (request.type === "bg-ggf-target") {
        const contentScriptPath = "scripts/ggf/ggf-target.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Paste to the target
      if (request.type === "bg-sda-target") {
        const contentScriptPath = "scripts/sda-target.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }
    }

    return true;
  });
}

main();

async function focusTab(tab) {
  await chrome.tabs.highlight({ tabs: tab.index });
}

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
