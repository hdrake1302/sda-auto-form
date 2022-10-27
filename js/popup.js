function main() {
  // Initialize button with user's preferred color
  const copyForm = document.getElementById("copyForm");
  const pasteForm = document.getElementById("pasteForm");
  const ignoreChoice = document.getElementById("ignore");

  let hasIgnoreWrong = localStorage.getItem("hasIgnoreWrong");
  if (hasIgnoreWrong === "true") {
    ignoreChoice.checked = true;
  }

  ignoreChoice.addEventListener("change", async () => {
    localStorage.setItem("hasIgnoreWrong", ignoreChoice.checked);
  });

  copyForm.addEventListener("click", async () => {
    const currentTab = await getCurrentTab();
    const hasIgnoreWrong = ignoreChoice.checked;

    // Get the choice from user and send it
    sendMessage({
      type: "copy-form",
      data: {
        hasIgnoreWrong,
        currentTab,
      },
    });
  });

  pasteForm.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: handlePaste,
    });
  });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const currentTab = await getCurrentTab();

  if (request.type === "ggf-incomplete") {
    sendMessage({
      type: "bg-ggf-incomplete",
      data: {
        currentTab,
      },
    });
  }

  if (request.type === "ggf-complete") {
    sendMessage({
      type: "bg-ggf-complete",
      data: {
        currentTab,
      },
    });
  }

  if (request.type === "scrape-ggf") {
    const keys = request.data.keys;
    // Save the key
    chrome.storage.sync.set({ keys });
  }
  return true;
});

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

main();
