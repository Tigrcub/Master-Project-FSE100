//=========== JELLYFISHING variables ============
let jellyInitialized = false;

// Jellyfishing — 3-Ring Bullseye + Early End + Personal Best + Time Bonus 

let score = 0;
let hits = 0, misses = 0;
const MAX_MISSES = 5;

let roundLength = 10_000; // 10 seconds base
let roundEndAt;
let endReason = "";       // "time" | "miss-limit"
let radius = 60;
let margin = 16;

let target = null;        // {x, y, r, spawnTime}
let floaters = [];        // feedback text + ripple particles

// Optional transparent jellyfish image (PNG looks best)
const jellyfishURL =
  "https://raw.githubusercontent.com/Tigrcub/Master-Project-FSE100/jellyfishing/jellyfish.png";

// 3 rings (outer -> inner)
const ringFractions = [1.0, 0.6, 0.3];   // radii fractions
const basePoints    = [25, 60, 120];     // OK, Good, Great
const labels        = ["OK", "Good", "Great"];

// Speed bonus window (ms)
const SPEED_MIN = 150;
const SPEED_MAX = 900;

// Personal best (persisted via localStorage)
let personalBest = 0;
let isNewBest = false;

// =========== JELLYFISHING Placeholder ========
function playJellyfishing() {
  if (!jellyInitialized) {
    initJellyfishing();
  }
  drawJellyfishingGame();
}

function initJellyfishing() {
  textFont("Arial");
  try {
    const stored = localStorage.getItem("jelly_best");
    personalBest = stored ? int(stored) : 0;
  } catch (_) {
    personalBest = 0;
  }

  restartRound();
  jellyInitialized = true;
}

function drawJellyfishingGame() {
  background(18, 22, 30);
  drawHUD();

  if (millis() >= roundEndAt && endReason === "") {
    endRound("time");
  }

  if (endReason !== "") {
    drawResults();
    return;
  }

  drawTarget();
  updateFloaters();
}

function drawHUD() {
  noStroke();
  fill(255, 255, 255, 18);
  rect(0, 0, width, 54);

  fill(240);
  textSize(18);
  textAlign(LEFT, CENTER);
  text(`Score: ${score}`, 16, 27);
  text(`Hits: ${hits}`, 160, 27);
  text(`Misses: ${misses}/${MAX_MISSES}`, 255, 27);

  const remaining = max(0, roundEndAt - millis());
  const secs = nf(floor(remaining / 1000), 2);
  text(`Time: ${secs}s`, 400, 27);

  const elapsed = constrain(millis() - (roundEndAt - roundLength), 0, roundLength);
  const pct = constrain(elapsed / roundLength, 0, 1);
  noStroke();
  fill(90, 180, 255, 120);
  rect(500, 18, 280 * pct, 18, 9);
  noFill();
  stroke(180);
  rect(500, 18, 280, 18, 9);
}

function drawTarget() {
  if (!target) return;

  push();
  translate(target.x, target.y);
  const bob = sin((millis() - target.spawnTime) * 0.005) * 2;

  if (typeof jellyImg !== "undefined" && jellyImg) {
    push();
    imageMode(CENTER);
    const d = target.r * 2 + bob;
    tint(255, 220);
    image(jellyImg, 0, 0, d, d);
    pop();
  }

  // bullseye rings (outer → inner)
  noStroke();
  for (let i = 0; i < ringFractions.length; i++) {
    const frac = ringFractions[i];
    const r = target.r * frac + bob;
    const t = map(i, 0, ringFractions.length - 1, 0, 1);
    const c = lerpColor(color(120, 200, 255), color(230, 70, 200), t);
    fill(red(c), green(c), blue(c), 80);
    circle(0, 0, r * 2);

    noFill();
    stroke(255, 255, 255, 150);
    strokeWeight(i === ringFractions.length - 1 ? 2 : 1);
    circle(0, 0, r * 2);
    noStroke();
  }

  fill(255);
  circle(0, 0, 3);
  pop();
}

// This replaces your old mousePressed/mouseClicked for jellyfishing
function handleJellyMousePressed() {
  if (endReason !== "") {
    restartRound();
    return;
  }
  if (!target) return;

  const d = dist(mouseX, mouseY, target.x, target.y);
  let band = -1;
  for (let i = ringFractions.length - 1; i >= 0; i--) {
    if (d <= target.r * ringFractions[i]) {
      band = i;
      break;
    }
  }

  if (band === -1) {
    misses++;
    addFloater(mouseX, mouseY, "-5", color(255, 80, 80));
    score = max(0, score - 5);
    if (misses >= MAX_MISSES) endRound("miss-limit");
    return;
  }

  hits++;
  const rt = millis() - target.spawnTime;
  const base = basePoints[band];
  const speed = constrain(1 - (rt - SPEED_MIN) / (SPEED_MAX - SPEED_MIN), 0, 1);
  const bonus = round(20 * speed);
  const pts = base + bonus;
  score += pts;

  //  add +1 second for "Great"
  if (labels[band] === "Great") {
    roundEndAt += 1000; // add 1 second
    addFloater(mouseX, mouseY, "+1s Time!", color(255, 220, 100));
  }

  const t = map(band, 0, ringFractions.length - 1, 0, 1);
  const bandColor = lerpColor(color(120, 200, 255), color(230, 70, 200), t);
  addFloater(mouseX, mouseY, `+${pts}  ${labels[band]}`, bandColor);
  ripple(mouseX, mouseY, bandColor);

  spawnTarget();
}

function spawnTarget() {
  if (hits > 0 && hits % 6 === 0) {
    const avg = score / hits;
    if (avg > 60) radius = max(28, radius - 4);
    else radius = min(90, radius + 4);
  }

  const safe = radius + margin;
  const x = random(safe, width - safe);
  const y = random(54 + safe, height - safe);
  target = { x, y, r: radius, spawnTime: millis() };
}

function endRound(reason) {
  endReason = reason;
  roundEndAt = millis();
  isNewBest = score > personalBest;
  if (isNewBest) {
    personalBest = score;
    try {
      localStorage.setItem("jelly_best", String(personalBest));
    } catch (_) {}
  }
}

function restartRound() {
  score = 0;
  hits = 0;
  misses = 0;
  floaters = [];
  radius = 60;
  endReason = "";
  isNewBest = false;
  roundEndAt = millis() + roundLength;
  spawnTarget();
}

function addFloater(x, y, textStr, col) {
  floaters.push({ x, y, text: textStr, col, life: 0, maxLife: 900, size: 18 });
}

function ripple(x, y, col) {
  for (let i = 0; i < 3; i++) {
    floaters.push({
      x,
      y,
      ring: true,
      r: 0,
      col,
      life: 0,
      maxLife: 600 + i * 120,
    });
  }
}

function updateFloaters() {
  for (let i = floaters.length - 1; i >= 0; i--) {
    const f = floaters[i];
    f.life += deltaTime;
    const a = 1 - f.life / f.maxLife;
    if (a <= 0) {
      floaters.splice(i, 1);
      continue;
    }

    if (f.ring) {
      noFill();
      const c = color(red(f.col), green(f.col), blue(f.col), 120 * a);
      stroke(c);
      strokeWeight(2);
      circle(f.x, f.y, (f.r += 0.3 * deltaTime));
      noStroke();
    } else {
      const c = color(red(f.col), green(f.col), blue(f.col), 255 * a);
      fill(c);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(f.size);
      text(f.text, f.x, f.y - map(f.life, 0, f.maxLife, 0, 30));
    }
  }
}

function drawResults() {
  noStroke();
  fill(0, 180);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Jellyfishing — Results", width / 2, height / 2 - 100);

  textSize(18);
  const reasonText =
    endReason === "miss-limit"
      ? "Ended early: miss limit reached"
      : "Time's up";
  text(reasonText, width / 2, height / 2 - 60);

  text(`Score: ${score}`, width / 2, height / 2 - 20);
  text(
    `Hits: ${hits}   Misses: ${misses}/${MAX_MISSES}`,
    width / 2,
    height / 2 + 10
  );

  let bestLine = `Personal Best: ${personalBest}`;
  if (isNewBest) bestLine += "   NEW! ";
  text(bestLine, width / 2, height / 2 + 40);

  text("Click to play again", width / 2, height / 2 + 80);
}
