const screens = [...document.querySelectorAll(".screen")];
const visited = new Set();
const $ = (id) => document.getElementById(id);

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function unlockCards() {
  const unlock = (id) => {
    const card = $(id);
    card.disabled = false;
    card.classList.remove("locked");
    const lock = card.querySelector(".lock");
    if (lock) lock.remove();
    const small = card.querySelector("small");
    if (small) small.textContent = "ready when you are ♡";
  };
  if (visited.has("intro")) unlock("moreCard");
  if (visited.has("more")) unlock("pointsCard");
}

$("startBtn").addEventListener("click", () => showScreen("menuScreen"));

$("introCard").addEventListener("click", () => {
  showScreen("introScreen");
});

$("introReturn").addEventListener("click", () => {
  visited.add("intro");
  unlockCards();
  showScreen("menuScreen");
});

$("moreCard").addEventListener("click", () => {
  if (!visited.has("intro")) return;
  showScreen("moreScreen");
});

$("moreReturn").addEventListener("click", () => {
  visited.add("more");
  unlockCards();
  showScreen("menuScreen");
});

$("doYouLoveMe").addEventListener("click", () => {
  showScreen("loveScreen");
});

$("loveReturn").addEventListener("click", () => {
  showScreen("menuScreen");
});

$("pointsCard").addEventListener("click", () => {
  if (!visited.has("more")) return;
  showScreen("pointsScreen");
});

$("pointsReturn").addEventListener("click", () => {
  visited.add("points");
  showScreen("menuScreen");
  if (visited.has("points")) {
    $("pointsCard").querySelector("small").textContent = "you can read this again ♡";
  }
});

$("toFinal").addEventListener("click", () => showScreen("finalScreen"));

$("finalReturn").addEventListener("click", () => {
  showScreen("menuScreen");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") showScreen("menuScreen");
});

// Background motion is intentionally slow and subtle.
