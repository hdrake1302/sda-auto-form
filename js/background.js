async function main() {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
        url: "https://youtu.be/VJ5C2IVfhFM",
      });
    }
  });

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

      // Copy Myaloha
      if (request.type === "bg-myaloha-incomplete") {
        const contentScriptPath = "scripts/myaloha/myaloha-incomplete.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Paste to the target
      if (request.type === "bg-myaloha-target") {
        const contentScriptPath = "scripts/myaloha/myaloha-target.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Paste to the sda target
      if (request.type === "bg-sda-target") {
        const contentScriptPath = "scripts/sda/sda-target.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Copy from the sda web
      if (request.type === "bg-sda-copy") {
        const contentScriptPath = "scripts/sda/sda-copy.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Paste to the target
      if (request.type === "bg-tdtu-elearning-incomplete") {
        const contentScriptPath =
          "scripts/tdtu-elearning/tdtu-elearning-incomplete.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Paste to the target
      if (request.type === "bg-tdtu-elearning-complete") {
        const contentScriptPath =
          "scripts/tdtu-elearning/tdtu-elearning-complete.js";

        chrome.scripting.executeScript({
          target: { tabId: currentTab.id },
          files: [contentScriptPath],
        });
      }

      // Paste to the target
      if (request.type === "bg-tdtu-elearning-target") {
        const contentScriptPath =
          "scripts/tdtu-elearning/tdtu-elearning-target.js";

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
