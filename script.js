
// locomotive init code
// this code works well for locomotive scroll using
// locomotive.js library
// but it fails when we use the locomotive scroll with
// gsap scrolltrigger

// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

// the followwing code works well for both locomotive
// as well as gsap scrolltrigger

function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

locomotiveAnimation()

function navbarAnimation() {
    
    // try using this much code block alone
// gsap.to("#nav-part1 svg", {
//     transform: "translateY(-100%)",
// })

gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
        trigger: "#page1", 
        scroller: "#main",
        // markers: true,
        start: "top 0",
        end: "top -5%",
        scrub: true  // try setting this value to 2 or 3

    }
})

gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
        trigger: "#page1", 
        scroller: "#main",
        // markers: true,
        start: "top 0",
        end: "top -5%",
        scrub: true  // try setting this value to 2 or 3

    }
})
}

navbarAnimation()


// our functions 

function videoconAnimation(){
    var videocon = document.querySelector("#video-container")
var playbtn = document.querySelector("#play")
videocon.addEventListener("mouseenter", function(){
    // playbtn.style.opacity = 1
    // playbtn.style.scale = 1
    // the above step can be done using GSAP

    gsap.to(playbtn, {
        opacity: 1, scale: 1
    })
})

videocon.addEventListener("mouseleave", function(){
    gsap.to(playbtn, {
        opacity: 0, 
        scale: 0
    })
})

videocon.addEventListener("mousemove", function(dets){
    gsap.to(playbtn, {
        x: dets.clientX - videocon.getBoundingClientRect().left - playbtn.offsetWidth / 2 - 50,
        y: dets.clientY - videocon.getBoundingClientRect().top - playbtn.offsetHeight / 2 - 500
    })
})
}

videoconAnimation()

function loadingAnimation(){

    gsap.from("#nav", {
        y: -100,
        opacity: 0,
        delay: 0.2,
        duration: 0.9, 
        stagger: 0.2
    })

    gsap.from("#page1 h1", {
        y: 100,
        opacity: 0,
        delay: 1,
        duration: 0.9, 
        stagger: 0.2
    })

    gsap.from("#page1 #video-container", {
        scale: 0.9,
        opacity: 0,
        delay: 1.7,
        duration: 0.5, 
    })
}

loadingAnimation()

document.addEventListener("mousemove",  function(dets){
    gsap.to("#cursor", {
        top: dets.y,
        left:dets.x
    })
})



function cursorAnimation() {

    // code for one element
    // document.querySelector("#child1").addEventListener("mouseenter", function(){
//     gsap.to("#cursor", {
//         transform: 'translate(-50%, -50%) scale(1)'
//     }) 
// })

//     document.querySelector("#child1").addEventListener("mouseleave", function(){
//         gsap.to("#cursor", {
//             transform: 'translate(-50%, -50%) scale(0)'
//         })
//     })

// code for multiple elements
    document.querySelectorAll(".child").forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        gsap.to("#cursor", {
            transform: 'translate(-50%, -50%) scale(1)'
        }) 
    })


    elem.addEventListener("mouseleave", function(){
        gsap.to("#cursor", {
            transform: 'translate(-50%, -50%) scale(0)'
        })
    })

})
}

cursorAnimation()
