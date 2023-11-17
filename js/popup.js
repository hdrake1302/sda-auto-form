async function main() {
  const CHOICE_VALUE = {
    EMPTY: "",
    IGNORE: "ignore",
    RANDOM: "random",
    APPEND: "append",
  };
  // Initialize button with user's preferred color
  const copyForm = document.getElementById("copyForm");
  const pasteForm = document.getElementById("pasteForm");

  const confirmYes = document.getElementById("confirm-yes");
  const confirmNo = document.getElementById("confirm-no");

  confirmYes.addEventListener("click", async () => {
    const currentTab = await getCurrentTab();

    // Get the choice from user and send it
    sendMessage({
      type: "bg-handle-paste",
      data: {
        currentTab,
      },
    });

    hideConfirmBox();
  });

  confirmNo.addEventListener("click", () => {
    hideConfirmBox();
  });

  const selectBox = document.getElementById("choices");

  const keyElement = document.querySelector(".modal-header__key");
  const inputKey = document.getElementById("inputKey");

  var { choice } = await chrome.storage.sync.get("choice");
  var { keys } = await chrome.storage.local.get("keys");

  if (!choice) {
    // Init choice
    choice = {
      selectValue: CHOICE_VALUE.EMPTY,
      shouldNormalized: false,
    };

    await chrome.storage.sync.set({ choice });
  }

  if (keys && Object.keys(keys).length > 0) {
    // Có keys thì vẫn giữ trên
    inputKey.value = JSON.stringify(keys);
  }

  selectBox.value = choice?.selectValue || CHOICE_VALUE.EMPTY;

  selectBox.addEventListener("change", async () => {
    choice.selectValue = selectBox.value;
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
    if (choice.selectValue === CHOICE_VALUE.RANDOM) {
      showConfirmBox();
    } else {
      // Reset confirm random
      const currentTab = await getCurrentTab();

      // Get the choice from user and send it
      sendMessage({
        type: "bg-handle-paste",
        data: {
          currentTab,
        },
      });
    }
  });

  // Get keys from user input
  keyElement.addEventListener("click", async () => {
    const title = document.querySelector(".modal-header__title");

    title.classList.toggle("modal-header__title--hidden");
    inputKey.classList.toggle("modal-header__input--hidden");

    if (inputKey.classList.contains("modal-header__input--hidden")) {
      const inputValue = inputKey.value;
      try {
        const inputKeys = inputValue ? JSON.parse(inputValue) : {};

        // Normalize string with different white spaces
        const keys = normalizeKeys(inputKeys);
        choice.shouldNormalized = true;
        await chrome.storage.sync.set({ choice });
        await chrome.storage.local.set({ keys });
      } catch (error) {
        console.error("Invalid Keycode!");
        await chrome.storage.local.set({ keys: {} });
      }
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

      // Send signal to background to handle COPY keys from sda website
      if (request.type === "sda-copy") {
        choice.shouldNormalized = true;
        await chrome.storage.sync.set({ choice });

        sendMessage({
          type: "bg-sda-copy",
          data: {
            currentTab,
          },
        });
      }

      // Send signal to background to handle COPY incomplete Google Form
      if (request.type === "tdtu-elearning-incomplete") {
        sendMessage({
          type: "bg-tdtu-elearning-incomplete",
          data: {
            currentTab,
          },
        });
      }

      // Send signal to background to handle COPY complete Google Form
      if (request.type === "tdtu-elearning-complete") {
        sendMessage({
          type: "bg-tdtu-elearning-complete",
          data: {
            currentTab,
          },
        });
      }

      // Send signal to background to handle PASTE target Google Form
      if (request.type === "tdtu-elearning-target") {
        sendMessage({
          type: "bg-tdtu-elearning-target",
          data: {
            currentTab,
          },
        });
      }

      // Save the keys from any supported source
      if (request.type === "save-keys") {
        let keys = request.data.keys;
        const type = request.data.type;

        // If the type is normalize-keys then we will normalize the keys
        if (type !== "normalize-keys") {
          choice.shouldNormalized = false;
        } else {
          choice.shouldNormalized = true;
          keys = normalizeKeys(keys);
        }

        inputKey.value = JSON.stringify(keys);
        await chrome.storage.sync.set({ choice });
        await chrome.storage.local.set({ keys });
      }

      // Keep the message channel open
      return true;
    }
  );
}

function hideConfirmBox() {
  const modalBody = document.querySelector(".modal-body");
  modalBody.classList.remove("modal-confirm");
}

async function showConfirmBox() {
  const { keys } = await chrome.storage.local.get("keys");
  const modalBody = document.querySelector(".modal-body");

  const keyQuantity = modalBody.querySelector("#key-quantity");
  keyQuantity.innerText = Object.keys(keys)?.length || "0";
  modalBody.classList.add("modal-confirm");
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
