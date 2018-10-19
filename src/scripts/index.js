let hue = null;
let bgFlg = false;
let buttonFlg = false;

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
    if(buttonFlg === false && j === lineNum - 4) {

      $(".js-lyric-scrolltop").css({
        background: 'hsl(' + h +',' + s + '%,' + l + '%)'
      })
      buttonFlg = true;
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
  });

  $.map($(".js-lyric-scrollin"), function(item) {
    scrollIn(item);
  });

  scrollToTop();
})

let scroll;
const winHeight = $(window).height();

$(window).on("scroll", function(){
  scroll = $(this).scrollTop();
})

function scrollIn(target) {
  const $target = $(target)
  const targetTop = $target.offset().top;
  $(window).on('scroll', function() {
    if(scroll > targetTop - winHeight) {
      TweenMax.to($target, .4, {
        transform: 'translateY(0)',
        opacity: 1,
        delay: .2
      })
    }
  });
}

function scrollToTop() {

  $(".js-lyric-scrolltop").on('click', function() {
    $("html, body").animate({scrollTop:0});
  })

  $(window).on('scroll', function() {
    if(scroll > 600) {
      TweenMax.to(".js-lyric-scrolltop", .4, {
        y: 0
      })
    } else {
      TweenMax.to(".js-lyric-scrolltop", .4, {
        y: 100
      })
    }
  })
}