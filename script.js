const yearEl = document.getElementById("year");
const gramsInput = document.getElementById("gramsUsed");
const rateInput = document.getElementById("pricePerGram");
const totalPriceEl = document.getElementById("totalPrice");
const calcDetailEl = document.getElementById("calcDetail");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const pesoFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
});

function toNonNegativeNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function updatePrice() {
  if (!gramsInput || !rateInput || !totalPriceEl || !calcDetailEl) {
    return;
  }

  const grams = toNonNegativeNumber(gramsInput.value);
  const rate = toNonNegativeNumber(rateInput.value);
  const total = grams * rate;

  totalPriceEl.textContent = pesoFormatter.format(total);
  calcDetailEl.textContent = `${grams}g x ${pesoFormatter.format(rate)}/g`;
}

let frameRequested = false;

function schedulePriceUpdate() {
  if (frameRequested) {
    return;
  }

  frameRequested = true;
  requestAnimationFrame(() => {
    updatePrice();
    frameRequested = false;
  });
}

if (gramsInput && rateInput) {
  gramsInput.addEventListener("input", schedulePriceUpdate);
  rateInput.addEventListener("input", schedulePriceUpdate);
  updatePrice();
}

function attachButtonEffects(button) {
  button.addEventListener("pointerdown", () => {
    button.classList.add("is-pressed");
  });

  const release = () => button.classList.remove("is-pressed");
  button.addEventListener("pointerup", release);
  button.addEventListener("pointerleave", release);
  button.addEventListener("blur", release);

  button.addEventListener("click", (event) => {
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "btn-ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  });
}

document.querySelectorAll(".btn, .nav-link").forEach(attachButtonEffects);
