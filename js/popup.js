function main() {
  // Initialize button with user's preferred color
  const copyForm = document.getElementById("copyForm");
  const pasteForm = document.getElementById("pasteForm");
  const ignoreChoice = document.getElementById("ignore");

  const keyElement = document.querySelector(".modal-header__key");

  var hasIgnoreWrong = localStorage.getItem("hasIgnoreWrong");
  if (hasIgnoreWrong === "true") {
    ignoreChoice.checked = true;
  }

  ignoreChoice.addEventListener("change", async () => {
    hasIgnoreWrong = ignoreChoice.checked;
    localStorage.setItem("hasIgnoreWrong", hasIgnoreWrong);

    chrome.storage.local.set({
      choice: {
        hasIgnoreWrong,
      },
    });
  });

  copyForm.addEventListener("click", async () => {
    const currentTab = await getCurrentTab();

    // Get the choice from user and send it
    sendMessage({
      type: "bg-handle-copy",
      data: {
        currentTab,
      },
    });
  });

  pasteForm.addEventListener("click", async () => {
    const currentTab = await getCurrentTab();

    // Get the choice from user and send it
    sendMessage({
      type: "bg-handle-paste",
      data: {
        currentTab,
      },
    });
  });

  // Get keys from user input
  keyElement.addEventListener("click", async () => {
    const inputKey = document.querySelector(".modal-header__input");
    const title = document.querySelector(".modal-header__title");

    title.classList.toggle("modal-header__title--hidden");
    inputKey.classList.toggle("modal-header__input--hidden");

    if (inputKey.classList.contains("modal-header__input--hidden")) {
      const inputValue = inputKey.value;
      const keys = inputValue ? JSON.parse(inputValue) : null;

      if (keys) {
        await chrome.storage.local.set({ keys });
      }
    }
  });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  const currentTab = await getCurrentTab();

  // Send signal to background to handle COPY incomplete Google Form
  if (request.type === "ggf-incomplete") {
    sendMessage({
      type: "bg-ggf-incomplete",
      data: {
        currentTab,
      },
    });
  }

  // Send signal to background to handle COPY complete Google Form
  if (request.type === "ggf-complete") {
    sendMessage({
      type: "bg-ggf-complete",
      data: {
        currentTab,
      },
    });
  }

  // Send signal to background to handle PASTE target Google Form
  if (request.type === "ggf-target") {
    sendMessage({
      type: "bg-ggf-target",
      data: {
        currentTab,
      },
    });
  }

  // Send signal to background to handle COPY incomplete My Aloha
  if (request.type === "myaloha-incomplete") {
    sendMessage({
      type: "bg-myaloha-incomplete",
      data: {
        currentTab,
      },
    });
  }

  // Send signal to background to handle PASTE target My Aloha
  if (request.type === "myaloha-target") {
    sendMessage({
      type: "bg-myaloha-target",
      data: {
        currentTab,
      },
    });
  }

  // Send signal to background to handle PASTE target Google Form
  if (request.type === "sda-target") {
    sendMessage({
      type: "bg-sda-target",
      data: {
        currentTab,
      },
    });
  }

  // Finish handle copy Google Form
  if (request.type === "scrape-ggf") {
    const keys = request.data.keys;

    // Save the key
    chrome.storage.local.set({ keys });
  }

  // Keep the message channel open
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
