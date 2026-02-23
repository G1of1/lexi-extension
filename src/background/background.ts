// background.ts
const API_URL: string = import.meta.env.VITE_API_URL;
console.log({ API_URL});
// ==========================
// Context Menu Setup
// ==========================
chrome.runtime.onInstalled.addListener(() => {
  // ==========================
  // Root Menu
  // ==========================
  chrome.contextMenus.create({
    id: "lexi-root",
    title: "LexiAI ✨",
    contexts: ["selection"],
  });

  // ==========================
  // SUMMARIZE PARENT
  // ==========================
  chrome.contextMenus.create({
    id: "lexi-summarize-parent",
    title: "Summarize",
    parentId: "lexi-root",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "summarize-detailed",
    title: "Detailed Summary",
    parentId: "lexi-summarize-parent",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "summarize-bullet-points",
    title: "Bullet Points",
    parentId: "lexi-summarize-parent",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "summarize-tldr",
    title: "TL;DR",
    parentId: "lexi-summarize-parent",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "summarize-study-notes",
    title: "Study Notes",
    parentId: "lexi-summarize-parent",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "summarize-simplification",
    title: "Simplified",
    parentId: "lexi-summarize-parent",
    contexts: ["selection"],
  });

  // ==========================
  // PARAPHRASE PARENT
  // ==========================
  chrome.contextMenus.create({
    id: "lexi-paraphrase-parent",
    title: "Paraphrase",
    parentId: "lexi-root",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "paraphrase-standard",
    title: "Standard",
    parentId: "lexi-paraphrase-parent",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "paraphrase-shorten",
    title: "Shorten",
    parentId: "lexi-paraphrase-parent",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "paraphrase-expand",
    title: "Expand",
    parentId: "lexi-paraphrase-parent",
    contexts: ["selection"],
  });


  chrome.contextMenus.create({
    id: "paraphrase-academic",
    title: "Academic",
    parentId: "lexi-paraphrase-parent",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "paraphrase-formal",
    title: "Formal",
    parentId: "lexi-paraphrase-parent",
    contexts: ["selection"],
  });
});


// ==========================
// Helper: Send to Content Script
// ==========================
const sendToContent = async (tabId: number, message: any) => {
  try {
    await chrome.tabs.sendMessage(tabId, message);
  } catch {
    console.warn("Content script not found. Injecting...");
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ["content/content.js"],
    });

    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, message);
    }, 500);
  }
};

const callLexiAPI = async (
  endpoint: string,
  payload: any
) => {
  console.log(`Calling ${API_URL}/${endpoint} with payload: ${JSON.stringify(payload)}`);
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
};

// ==========================
// Context Menu Click Handler
// ==========================
chrome.contextMenus.onClicked.addListener(async (info: any, tab: any) => {
  console.log({info, tab});
  if (!info.selectionText || !tab?.id) return;

  const text = info.selectionText;
  const endpoint = info.menuItemId;

  try {
    if (info.parentMenuItemId === "lexi-summarize-parent") {
      console.log("Summarizing...");
      const data = await callLexiAPI(endpoint, {
        text,
        level: "basic",
      });
      console.log(data);

      if (data.error) {
        await sendToContent(tab.id, {
          type: "lexi-error",
          error: data.error,
        });
        return;
      }

      await sendToContent(tab.id, {
        type: "lexi-summary-data",
        data: data.summary,
      });
    }

    else if (info.parentMenuItemId === "lexi-paraphrase-parent") {
      console.log("Paraphrasing...");
      const data = await callLexiAPI(endpoint, {
        text,
        level: "basic"
      });
      console.log(data);

      if (data.error) {
        await sendToContent(tab.id, {
          type: "lexi-error",
          error: data.error,
        });
        return;
      }

      await sendToContent(tab.id, {
        type: "lexi-paraphrase-data",
        data: data.paraphrased_text,
      });
    }
  } catch (err) {
    console.error("LexiAI Error:", err);

    await sendToContent(tab.id, {
      type: "lexi-error",
      error: "Something went wrong communicating with LexiAI.",
    });
  }
});
