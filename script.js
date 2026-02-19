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
