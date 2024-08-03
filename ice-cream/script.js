gsap.registerPlugin(MotionPathPlugin, MorphSVGPlugin);

jQuery(document).ready(function($) {

  //	Set initial transforms

  $('.svg-wrapper g, .svg-wrapper path').each(function(index) {
    //	Do some error-checking, just in case I missed one
    if ($(this).is('[data-origin]')) {
      var tOrig = $(this).attr('data-origin');
      if (tOrig) {
        gsap.set($(this).get(0), { transformOrigin: tOrig });
      } else {
        console.log($(this).attr('class') + ' don`t got no data-origin value');
      }
    } else {
      console.log($(this).attr('class') + ' ain`t got no data-origin AT ALL');
    }
  });

  //	Init all shapes their 'start' positions

  gsap.set('.face .closed', { opacity: 0 });
  gsap.set('.motion-path', { opacity: 0 });
  gsap.set('.droplets .drop', { opacity: 0 });
  gsap.set('.blink', { opacity: 0 });
  gsap.set('.amber-ice-cream', { opacity: 1 });

  //	Get the icing to dance on its own

  gsap.to('.icing', { duration: 3, yoyo: true, repeat: -1, ease: 'elastic.inOut(1, 0.2)', morphSVG: 'M47.25 152.4 Q54.15 131.8 71.1 115.3 99.75 87.5 140.25 87.5 180.75 87.5 209.35 115.3 224.65 130.2 231.8 148.35 210.95 144.75 193.35 157.9 186.05 163.3 174.95 169 157.8 177.25 143.4 170.7 L125.9 160.75 Q107.65 150.4 89.35 163.25 71.55 175.85 53.9 159.35 L47.25 152.4' });

  //	Set up somne independent blinks

  let blinkTL = gsap.timeline({ repeat: -1 });
  blinkTL.to('.blink', { opacity: 1, duration: 0, delay: 3 });
  blinkTL.to('.pupil', { opacity: 0, duration: 0 });
  blinkTL.to('.blink', { opacity: 0, duration: 0, delay: 0.1 });
  blinkTL.to('.pupil', { opacity: 1, duration: 0 });
  blinkTL.to('.blink', { opacity: 1, duration: 0, delay: 0.1 });
  blinkTL.to('.pupil', { opacity: 0, duration: 0 });
  blinkTL.to('.blink', { opacity: 0, duration: 0, delay: 0.1 });
  blinkTL.to('.pupil', { opacity: 1, duration: 0 });

  //	Create master timeline and child timlines

  let masterTL = gsap.timeline({ repeat: -1 });

  let bobTL = gsap.timeline({ yoyo: true, repeat: 9 });
  bobTL.to('.cone', { scaleY: 0.95, duration: 0.5, ease: 'circ.inOut' });
  bobTL.to('.cone.top, .cone.middle', { y: 3, duration: 0.5, delay: -0.5, ease: 'circ.inOut' });
  bobTL.to('.cream, .face, .topping, .sprinkles, .cherry', { y: 5, duration: 0.5, delay: -0.5, ease: 'circ.inOut' });
  bobTL.to('.circle.drop', { yPercent: 15, stagger: { from: 'center', amount: 0.1 }, duration: 0.5, delay: -0.5, ease: 'circ.inOut' });
  bobTL.to('.sprinkle.s1, .sprinkle.s3, .sprinkle.s5, .sprinkle.s7, .sprinkle.s9', { rotation: 45, stagger: { from: 'center', amount: 0.1 }, duration: 0.5, delay: -0.6, ease: 'circ.inOut' });
  bobTL.to('.sprinkle.s2, .sprinkle.s4, .sprinkle.s6, .sprinkle.s8, .sprinkle.s10', { rotation: -45, stagger: { from: 'center', amount: 0.1 }, duration: 0.5, delay: -0.6, ease: 'circ.inOut' });
  bobTL.to('.main-shadow', { scale: 0.98, duration: 0.5, delay: -0.5, ease: 'circ.inOut' });

  //###################################

  let jumpTL = gsap.timeline();

  //	Load the spring...

  jumpTL.set('.face .open', { opacity: 0 });
  jumpTL.set('.face .closed', { opacity: 1 });
  jumpTL.to('.cone', { scaleY: 0.9, duration: 1.5, ease: 'circ.out' });
  jumpTL.to('.cone.top, .cone.middle', { y: 10, duration: 1.5, delay: -1.5, ease: 'circ.out' });
  jumpTL.to('.cream, .face, .topping, .sprinkles, .cherry', { y: 15, duration: 1.5, delay: -1.5, ease: 'circ.out' });
  jumpTL.to('.main-shadow', { scale: 0.9, duration: 1.5, delay: -1.5, ease: 'circ.out' });

  //	SPROING!

  jumpTL.set('.face .open', { opacity: 1 });
  jumpTL.set('.face .closed', { opacity: 0 });
  jumpTL.to('.cone', { scaleY: 1, y: -50, duration: 0.5, ease: 'expo.out' });
  jumpTL.to('.cream, .topping, .sprinkles, .cherry', { y: -50, duration: 0.5, delay: -0.5, ease: 'expo.out' });
  jumpTL.to('.face', { y: -40, duration: 0.5, delay: -0.5, ease: 'expo.out' });
  jumpTL.to('.face .eye .pupil', { scale: 2, duration: 0.5, delay: -0.5, ease: 'expo.out' });
  jumpTL.to('.main-shadow', { scale: 1.4, opacity: 0.5, duration: 0.5, delay: -0.5, ease: 'expo.out' });
  jumpTL.to('.sprinkle', { yPercent: -100, stagger: { from: 'center', amount: 0.1 }, duration: 1, delay: -0.9, ease: 'expo.inOut' });
  jumpTL.to('.cherry-body', { yPercent: -1, duration: 1, delay: -1, ease: 'expo.inOut' });
  jumpTL.to('.cherry .shadow', { scale: 1.1, opacity: 0.9, duration: 1, delay: -1, ease: 'expo.inOut' });

  //	BOOF!

  jumpTL.to('.cone.top, .cone.middle', { y: 10, duration: 0.5, ease: 'expo.in' });
  jumpTL.to('.cone.bottom', { y: 0, duration: 0.5, delay: -0.5, ease: 'expo.in' });
  jumpTL.to('.cream, .topping, .sprinkles, .cherry', { y: 15, duration: 0.5, delay: -0.5, ease: 'expo.in' });
  jumpTL.to('.face', { y: 5, duration: 0.5, delay: -0.5, ease: 'expo.in' });
  jumpTL.to('.sprinkle', { yPercent: -400, duration: 0.5, delay: -0.5, ease: 'expo.in' });
  jumpTL.to('.cherry-body', { yPercent: -100, duration: 0.5, delay: -0.5, ease: 'expo.in' });
  jumpTL.to('.cherry .shadow', { scale: 2, opacity: 0.5, duration: 0.5, delay: -0.5, ease: 'expo.in' });
  jumpTL.set('.face .open .eye', { opacity: 0 });
  jumpTL.set('.face .open .eyes.closed', { opacity: 1 });
  jumpTL.to('.main-shadow', { scale: 0.9, opacity: 1, duration: 0.5, delay: -0.5, ease: 'expo.in' });
  jumpTL.to('.face', { y: 20, duration: 0.5, ease: 'back.out(4)' });
  jumpTL.set('.face .open .eye', { opacity: 1 });
  jumpTL.set('.face .open .eyes.closed', { opacity: 0 });
  jumpTL.to('.face .eye .pupil', { scale: 1, duration: 0.5, delay: -0.5, ease: 'expo.out' });

  jumpTL.to('.sprinkle', { yPercent: 0, stagger: { from: 'center', amount: 0.3 }, duration: 0.5, delay: -0.45, ease: 'bounce.out(4)' });
  jumpTL.to('.cherry-body', { yPercent: 0, duration: 0.5, delay: -0.6, ease: 'bounce.out(4)' });
  jumpTL.to('.cherry .shadow', { scale: 1, opacity: 1, duration: 0.5, delay: -0.6, ease: 'bounce.out(4)' });

  //	*smol sproing*

  jumpTL.to('.cone', { scaleY: 1, duration: 0.5, delay: -0.6, ease: 'circ.out' });
  jumpTL.to('.cone.top, .cone.middle', { y: 0, duration: 0.5, delay: -0.5, ease: 'circ.out' });
  jumpTL.to('.cream, .face, .topping, .sprinkles, .cherry', { y: 0, duration: 0.5, delay: -0.5, ease: 'circ.out' });
  jumpTL.to('.main-shadow', { scale: 1, duration: 0.5, delay: -0.5, ease: 'circ.out' });

  //	Drip!

  jumpTL.to('.circle.drop', { yPercent: 100, duration: 0.75, delay: -0.8, ease: 'back.out(3)' });
  jumpTL.to('.face', { y: 10, duration: 0.3, ease: 'circ.out' });
  jumpTL.to('.face .open .eye', { yPercent: 100, duration: 0.3, delay: -0.3, ease: 'circ.out' });

  jumpTL.to('.circle.drop.d1', { y: 80, duration: 0.3, delay: -0.4, ease: 'circ.in', onComplete: showSplatter, onCompleteParams: ['.d1'] });
  jumpTL.set('.circle.drop.d1', { opacity: 0 });
  jumpTL.to('.stem.s1, .circle.behind.c1', { y: -10, duration: 0.2, delay: -0.4, ease: 'circ.in' });
  jumpTL.to('.stem.s1, .circle.behind.c1', { y: 0, duration: 0.2, delay: -0.2, ease: 'back.out(4)' });

  jumpTL.to('.circle.drop.d3', { y: 70, duration: 0.3, delay: -0.25, ease: 'circ.in', onComplete: showSplatter, onCompleteParams: ['.d3'] });
  jumpTL.set('.circle.drop.d3', { opacity: 0 });
  jumpTL.to('.stem.s3, .circle.behind.c3', { y: -10, duration: 0.2, delay: -0.25, ease: 'circ.in' });
  jumpTL.to('.stem.s3, .circle.behind.c3', { y: 0, duration: 0.2, delay: -0.2, ease: 'back.out(4)' });

  jumpTL.to('.circle.drop.d4', { y: 59, duration: 0.3, delay: -0.2, ease: 'circ.in', onComplete: showSplatter, onCompleteParams: ['.d4'] });
  jumpTL.set('.circle.drop.d4', { opacity: 0 });
  jumpTL.to('.stem.s4, .circle.behind.c4', { y: -10, duration: 0.2, delay: -0.2, ease: 'circ.in' });
  jumpTL.to('.stem.s4, .circle.behind.c4', { y: 0, duration: 0.2, delay: -0.2, ease: 'back.out(4)' });

  jumpTL.to('.circle.drop.d2', { y: 102, duration: 0.3, delay: -0.18, ease: 'circ.in', onComplete: showSplatter, onCompleteParams: ['.d2'] });
  jumpTL.set('.circle.drop.d2', { opacity: 0 });
  jumpTL.to('.stem.s2, .circle.behind.c2', { y: -6, duration: 0.2, delay: -0.18, ease: 'circ.in' });
  jumpTL.to('.stem.s2, .circle.behind.c2', { y: 0, duration: 0.2, delay: -0.18, ease: 'back.out(4)' });

  jumpTL.to('.face', { y: 0, duration: 0.3, delay: 0.5, ease: 'circ.out' });
  jumpTL.to('.face .open .eye', { yPercent: 0, duration: 0.3, delay: -0.3, ease: 'circ.out' });

  masterTL.add(bobTL).add(jumpTL);

  //###################

  //jumpTL.to('.main-shadow', { scale: 0.9, opacity: 1, duration: 0.5, delay: 5, ease: 'expo.in' });

  ///
  //	Reusable function for showing the ice-cream splatters independently
  ///

  function showSplatter(wrapperClass) {
    let tl = gsap.timeline();
    tl.set('.droplets ' + wrapperClass + ' .drop', { opacity: 1 });

    tl.to('.droplets ' + wrapperClass + ' .drop-1', { opacity: 0, motionPath: { path: '.droplets ' + wrapperClass + ' .path-1', align: '.droplets ' + wrapperClass + ' .path-1', alignOrigin: [0.5, 0.5], start: 1, end: 0 }, duration: 2, ease: 'expo.out' });
    tl.to('.droplets ' + wrapperClass + ' .drop-2', { opacity: 0, motionPath: { path: '.droplets ' + wrapperClass + ' .path-2', align: '.droplets ' + wrapperClass + ' .path-2', alignOrigin: [0.5, 0.5] }, duration: 2, delay: -2, ease: 'expo.out' });
    tl.to('.droplets ' + wrapperClass + ' .drop-3', { opacity: 0, motionPath: { path: '.droplets ' + wrapperClass + ' .path-3', align: '.droplets ' + wrapperClass + ' .path-2', alignOrigin: [0.5, 0.5] }, duration: 2, delay: -2, ease: 'expo.out' });

    tl.set('.droplets ' + wrapperClass + ' .drop', { x: 0, y: 0 });
  }
});