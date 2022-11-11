async function main() {
  // Initialize button with user's preferred color
  const copyForm = document.getElementById("copyForm");
  const pasteForm = document.getElementById("pasteForm");
  const ignoreChoice = document.getElementById("ignore");
  const randomChoice = document.getElementById("random");

  const keyElement = document.querySelector(".modal-header__key");

  const { choice } = await chrome.storage.sync.get("choice");

  if (!choice) {
    // Init choice

    chrome.storage.sync.set({
      choice: {
        hasIgnoreWrong: false,
        hasRandom: false,
        isInput: false,
      },
    });
  } else {
    ignoreChoice.checked = choice.hasIgnoreWrong;
    randomChoice.checked = choice.hasRandom;
  }

  ignoreChoice.addEventListener("change", async () => {
    choice.hasIgnoreWrong = ignoreChoice.checked;
    chrome.storage.sync.set({ choice });
  });

  randomChoice.addEventListener("change", async () => {
    choice.hasRandom = randomChoice.checked;
    chrome.storage.sync.set({ choice });
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
      const inputKeys = inputValue ? JSON.parse(inputValue) : null;

      let keys = {};
      if (inputKeys) {
        // Normalize string with different white spaces
        keys = normalizeKeys(inputKeys);
        choice.isInput = true;
        await chrome.storage.sync.set({ choice });
      }
      await chrome.storage.local.set({ keys });
    }
  });

  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
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

      // Send signal to background to handle PASTE keys
      if (request.type === "sda-target") {
        sendMessage({
          type: "bg-sda-target",
          data: {
            currentTab,
          },
        });
      }

      // Send signal to background to handle COPY keys
      if (request.type === "sda-copy") {
        sendMessage({
          type: "bg-sda-copy",
          data: {
            currentTab,
          },
        });
      }

      // Finish handle copy Google Form
      if (request.type === "save-keys") {
        const keys = request.data.keys;

        choice.isInput = false;
        await chrome.storage.sync.set({ choice });
        // Save the key
        await chrome.storage.local.set({ keys });
      }

      // Keep the message channel open
      return true;
    }
  );
}

function normalizeString(string) {
  // Remove different whitespace (by character)
  return string.replace(/\s+/g, " ");
}

function normalizeKeys(keys) {
  const normalizeKeys = {};
  Object.keys(keys).forEach((key) => {
    normalizeKeys[normalizeString(key)] = keys[key];
  });

  return normalizeKeys;
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

main();
