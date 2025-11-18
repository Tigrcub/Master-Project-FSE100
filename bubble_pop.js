// In bubble_pop.js we *don't* load images; we just assume bbgbg was set in preload.
// So this function is good:
function drawBubbleGame() {
  if (typeof bbgbg !== "undefined" && bbgbg) {
    background(bbgbg);
  } else {
    background(0, 0, 80);
  }
}
