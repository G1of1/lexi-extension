chrome.runtime.onMessage.addListener((message: any) => {
  const allowedTypes = ["lexi-summary-data", "lexi-paraphrase-data", "lexi-error"];
  if (!allowedTypes.includes(message.type)) {
    return;
  }
  console.log({message});
  renderLexiOverlay(message);
});

function renderLexiOverlay(message: any) {
  // Remove existing overlay
  const existing = document.getElementById("lexi-overlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "lexi-overlay";

  Object.assign(overlay.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "340px",
    maxHeight: "420px",
    background: "#000",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "16px",
    padding: "16px",
    zIndex: "999999",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 10px 25px rgba(0,0,0,.45)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  });

  // ===== Header =====
  const header = document.createElement("div");
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";
  header.style.marginBottom = "12px";

  const title = document.createElement("div");
  title.style.fontWeight = "bold";
  title.style.fontSize = "15px";

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  Object.assign(closeBtn.style, {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer"
  });
  closeBtn.onclick = () => overlay.remove();

  header.appendChild(title);
  header.appendChild(closeBtn);
  overlay.appendChild(header);

  // ===== Body =====
  const body = document.createElement("div");
  body.style.whiteSpace = "pre-wrap";
  body.style.lineHeight = "1.5";
  body.style.overflowY = "auto";
  body.style.flex = "1";
  const data = message.data || {};

  // ==========================
  // SUMMARY MODE
  // ==========================
  if (message.type === "lexi-summary-data") {
    title.textContent = `🧠 Lexi Summary`;

    if (Array.isArray(data.points)) {
      const ul = document.createElement("ul");
      data.points.forEach((point: string) => {
        const li = document.createElement("li");
        li.textContent = point;
        li.style.marginBottom = "6px";
        ul.appendChild(li);
      });
      body.appendChild(ul);
    } else if (data.simplified_explanation) {
      const domain = document.createElement("div");
    domain.textContent = `Domain: ${data.domain || "—"}`;
    domain.style.fontSize = "12px";
    domain.style.opacity = "0.7";
    domain.style.marginBottom = "8px";

    const explanation = document.createElement("div");
    explanation.textContent =
      data.simplified_explanation || "No explanation available.";
    explanation.style.marginBottom = "10px";

    const exampleHeader = document.createElement("div");
    exampleHeader.textContent = "Example / Analogy";
    exampleHeader.style.fontWeight = "bold";
    exampleHeader.style.marginBottom = "4px";

    const example = document.createElement("div");
    example.textContent =
      data.example_or_analogy || "No example provided.";
    example.style.marginBottom = "10px";

    const relatedHeader = document.createElement("div");
    relatedHeader.textContent = "Related Terms";
    relatedHeader.style.fontWeight = "bold";
    relatedHeader.style.marginBottom = "4px";

    const relatedList = document.createElement("ul");
    (data.related_terms || []).forEach((term: string) => {
      const li = document.createElement("li");
      li.textContent = term;
      li.style.marginBottom = "4px";
      relatedList.appendChild(li);
    });

    const readingLevel = document.createElement("div");
    readingLevel.textContent = `Reading Level: ${data.reading_level || "—"}`;
    readingLevel.style.marginTop = "10px";
    readingLevel.style.fontSize = "12px";
    readingLevel.style.opacity = "0.7";

    body.appendChild(domain);
    body.appendChild(explanation);
    body.appendChild(exampleHeader);
    body.appendChild(example);
    body.appendChild(relatedHeader);
    body.appendChild(relatedList);
    body.appendChild(readingLevel);
  } else {
      body.textContent =
        data.summary ||
        "Issue providing summary...";
    }
  }

  // ==========================
  // PARAPHRASE MODE
  // ==========================
  if (message.type === "lexi-paraphrase-data") {
    title.textContent = `✍️ Lexi Paraphrase`;
    body.textContent =
      data.paraphrased_text || "No paraphrased text returned.";
  }

  // ==========================
  // ERROR MODE
  // ==========================
  if (message.type === "lexi-error") {
    title.textContent = "⚠️ LexiAI Error";
    body.textContent = message.error || "Something went wrong.";
    body.style.color = "#ff6b6b";
  }

  overlay.appendChild(body);
  document.body.appendChild(overlay);

  // ===== Entrance Animation =====
  overlay.style.opacity = "0";
  overlay.style.transform = "translateY(20px)";
  overlay.style.transition = "opacity .3s ease, transform .3s ease";

  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    overlay.style.transform = "translateY(0)";
  });
}
