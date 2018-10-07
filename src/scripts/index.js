let hue = null;

function setup() {
  createCanvas(innerWidth, innerHeight);
  hue = Math.random() * 300;
}
function draw() {
  colorMode(HSL);
  fill(0, 0, 99.5, .1);
  rect(0, 0, width, height);
  const lineNum = 15;
  const segmentNum = 12;
  let bgFlg = false;
  [...Array(lineNum).keys()].forEach(j => {
    const time = Date.now() / 10000;
    const coefficient = 50 + j;
    const h = Math.round(j / lineNum * 60) + hue; // 色相
    const s = 100; // 彩度
    const l = Math.round(j / lineNum * 75) + 25; // 明度
    if(bgFlg === false && j === lineNum - 2) {
      $("main").css('background', 'linear-gradient(transparent, hsla(' + h +',' + s + '%,' + l + '%, .4)');
      bgFlg = true;
    }
    beginShape();
    stroke(h, s, l, .1);
    [...Array(segmentNum).keys()].forEach(i => {
      const x = i / (segmentNum - 1) * width;
      const px = i / coefficient;
      const py = (j / 10 + time);
      const randomValue = noise(px, py);
      const y = randomValue * height;
      vertex(x, y);
    });
    endShape();
  });
}

$(window).on('resize', function() {
  createCanvas(innerWidth, innerHeight);
});

$(window).on('load', function() {
  TweenMax.to(".js-lyric-fadein", .5, {
    filter: 'blur(0)',
    opacity: 1,
    transform: 'scale(1)',
    delay: .5
  })
})