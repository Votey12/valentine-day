// Floating hearts background
const hearts = document.getElementById("hearts");
const heartEmojis = ["💗","💖","💘","💝","💞","💕","❤️","🐾"];

function spawnHeart() {
  const s = document.createElement("span");
  s.className = "heart";
  s.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 8;
  const size = 14 + Math.random() * 22;

  s.style.left = left + "vw";
  s.style.animationDuration = duration + "s";
  s.style.fontSize = size + "px";
  s.style.opacity = (0.25 + Math.random() * 0.6).toFixed(2);

  hearts.appendChild(s);
  setTimeout(() => s.remove(), duration * 1000);
}
setInterval(spawnHeart, 250);

// Buttons behavior
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const card = document.getElementById("card");
const hint = document.getElementById("hint");

yesBtn.addEventListener("click", () => {
  popup.style.display = "grid";
  popup.setAttribute("aria-hidden", "false");
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  popup.setAttribute("aria-hidden", "true");
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
    popup.setAttribute("aria-hidden", "true");
  }
});

// Make the "No" button dodge
let dodges = 0;

function dodge() {
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const pad = 16;
  const maxX = cardRect.width - btnRect.width - pad;
  const maxY = cardRect.height - btnRect.height - pad;

  const x = pad + Math.random() * Math.max(0, maxX);
  const y = pad + Math.random() * Math.max(0, maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  dodges++;
  if (dodges === 4) hint.textContent = "Puppy says… you sure? 🥺🐶";
  if (dodges === 7) hint.textContent = "Okay okay… just press YES 😭🐾";
  if (dodges >= 9) {
    noBtn.textContent = "Fine 😳";
    noBtn.style.background = "#f59e0b";
  }
}

noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, { passive: false });
