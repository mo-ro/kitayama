function setup() {
      createCanvas(innerWidth, innerHeight);
    }
    function draw() {
      colorMode(HSL);
      // background(0, 0, 100);
      fill(0, 0, 100, .1);
      rect(0, 0, width, height);
      // noFill();
      const lineNum = 15;
      const segmentNum = 12;
      [...Array(lineNum).keys()].forEach(j => {
        const time = Date.now() / 10000;
        const coefficient = 50 + j;
        const h = Math.round(j / lineNum * 60) + 280; // 色相
        const s = 100; // 彩度
        const l = Math.round(j / lineNum * 75) + 25; // 明度
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