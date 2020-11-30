let symbolSize = 26;
let streams = [];
let fadeInterval = 1.6;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  let y = random(-1000, 0);
  for (let i = 0; i < width / symbolSize; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, y);
    streams.push(stream);
    x += symbolSize;
  }

  textSize(symbolSize);
}

function draw() {
  background(0, 130);
  streams.forEach(x => x.render());
  fill(255);
  textAlign(CENTER);
  let t = "Have a Nice 🤙🏾".toUpperCase();
  text(t, width / 2, height / 2);
}

class MSymbol {
  value;
  switchInterval;
  constructor(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.first = first;
    this.switchInterval = round(random(2, 20));
    this.opacity = opacity;
  }

  setToRandomSymbol() {
    let charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      this.value =
        charType > 1
          ? String.fromCharCode(0x30a0 + round(random(0, 96)))
          : floor(random(0, 10));
    }
  }

  render() {
    this.first
      ? fill(180, 255, 180, this.opacity)
      : fill(0, 255, 70, this.opacity);
    text(this.value, this.x, this.y);
    this.rain();
    this.setToRandomSymbol();
  }
  rain() {
    this.y = this.y >= height ? 0 : this.y + this.speed;
  }
}

class Stream {
  constructor() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(1, 5);
  }

  generateSymbols(x, y) {
    let opacity = 255;
    let first = round(random(0, 4)) == 1;
    for (let i = 0; i < this.totalSymbols; i++) {
      let symbol = new MSymbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
      opacity -= 255 / this.totalSymbols / fadeInterval;
    }
  }

  render() {
    this.symbols.forEach(symbol => symbol.render());
  }
}
