// Animation of levitation lady is in styles.css file at the very bottom.
// This file contains animation of the lady's appearance
const image_lady = document.getElementById('image_lady');
const blackEllipce = document.querySelector('.blackEllipse');
const blackEllipceMaxWidth = 193.78;
blackEllipce.style.width = 0;
const easyOut = makeEaseOut(quad);

showLady(image_lady);

function showLady(lady) {
    const currentLadyTop = Number(getComputedStyle(lady).top.slice(0, -2));
    animate({
        duration: 2000,
        timing: leaner,
        draw: (progress) => {
            blackEllipce.style.width =  progress * blackEllipceMaxWidth + 'px'
        }
    })
   setTimeout(()=>{
        animate({
            duration: 2000,
            timing: easyOut,
            draw: (progress) => {
                lady.style.top = currentLadyTop - progress * currentLadyTop + 'px'
            }
        })
   }, 1000) 
}


function animate({timing, draw, duration}) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      let progress = timing(timeFraction);
  
      draw(progress); 
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
}

function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
}
function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

function leaner(timeFraction) { // not quite a linear :)
    return timeFraction += timeFraction - Math.pow(timeFraction, 6);
}