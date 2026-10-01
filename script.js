gsap.registerPlugin(ScrollTrigger);
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
function intro(){if(reduce){gsap.set(".loader",{display:"none"});return}const t=gsap.timeline();t.set(".intro-cup img",{scale:1.16}).from(".intro-word",{opacity:0,y:45,filter:"blur(14px)",duration:1,ease:"power3.out"}).from(".intro-visual",{opacity:0,scale:.72,rotation:-7,filter:"blur(10px)",duration:1.15,ease:"power4.out"},"<.15").from(".intro-orbit",{scale:.7,opacity:0,duration:1},"<.2").from(".intro-meta span",{opacity:0,y:10,stagger:.12,duration:.5},"<.35").to(".intro-cup img",{scale:1,duration:1.4,ease:"power2.out"},"<-.3").to(".loader-line",{width:"100%",duration:.8,ease:"power2.inOut"},"<").to(".intro-visual",{scale:1.08,y:-18,duration:.75,ease:"power3.inOut"}).to(".loader",{clipPath:"inset(0 0 100% 0)",duration:1.05,ease:"power4.inOut"},"<.1").set(".loader",{display:"none",clipPath:"none"}).from(".hero-copy>*",{y:28,opacity:0,filter:"blur(8px)",stagger:.09,duration:.75,ease:"power3.out"},"-=.45").set(".hero-copy>*",{filter:"blur(0px)"})}
function lenis(){if(reduce)return null;const l=new Lenis({duration:1.1,smoothWheel:true});l.on("scroll",ScrollTrigger.update);gsap.ticker.add(t=>l.raf(t*1000));gsap.ticker.lagSmoothing(0);return l}
function motion(){if(reduce)return;gsap.to(".hero-media",{yPercent:18,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});gsap.to(".hero-copy",{yPercent:28,opacity:.15,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
const mm=gsap.matchMedia();
mm.add("(min-width: 801px)",()=>{
  const stage=document.querySelector(".scale-stage");
  const frame=document.querySelector(".scale-frame");
  const track=document.querySelector(".h-track");

  const getFullscreenScale=()=>Math.max(
    window.innerWidth/frame.offsetWidth,
    window.innerHeight/frame.offsetHeight
  );

  const scaleTl=gsap.timeline({
    scrollTrigger:{
      trigger:stage,
      start:"top top",
      end:"+=170%",
      pin:stage,
      pinSpacing:true,
      scrub:1,
      anticipatePin:1,
      invalidateOnRefresh:true
    }
  });
  scaleTl.fromTo(frame,
    {scale:1},
    {scale:()=>getFullscreenScale(),ease:"none"}
  );

  const getDistance=()=>Math.max(0,track.scrollWidth-window.innerWidth);
  const horizontalTween=gsap.to(track,{
    x:()=>-getDistance(),
    ease:"none",
    scrollTrigger:{
      trigger:".horizontal",
      start:"top top",
      end:()=>"+="+Math.max(getDistance(),1),
      pin:true,
      pinSpacing:true,
      scrub:1,
      anticipatePin:1,
      invalidateOnRefresh:true
    }
  });

  return()=>{
    scaleTl.scrollTrigger?.kill();
    scaleTl.kill();
    horizontalTween.scrollTrigger?.kill();
    horizontalTween.kill();
  };
});
gsap.from(".statement h2",{y:70,opacity:0,scrollTrigger:{trigger:".statement",start:"top 70%",end:"top 30%",scrub:1}});gsap.to(".art-break img",{scale:1.12,yPercent:5,ease:"none",scrollTrigger:{trigger:".art-break",start:"top bottom",end:"bottom top",scrub:true}})}
function menu(){const b=document.querySelector(".menu-btn"),n=document.querySelector(".mobile-nav"),c=document.querySelector(".nav-close");b.onclick=()=>n.classList.add("open");c.onclick=()=>n.classList.remove("open");n.querySelectorAll("a").forEach(a=>a.onclick=()=>n.classList.remove("open"))}
function introDepth(){if(reduce||!matchMedia("(hover:hover) and (pointer:fine)").matches)return;const stage=document.querySelector(".loader");stage.addEventListener("pointermove",e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;gsap.to(".intro-visual",{rotationY:x*5,rotationX:-y*4,x:x*8,y:y*6-0,duration:1,ease:"power3.out",overwrite:"auto"});gsap.to(".intro-word",{x:x*-7,y:y*-4,duration:1.2,ease:"power3.out",overwrite:"auto"})})}
function pointer(){if(reduce||!matchMedia("(hover:hover) and (pointer:fine)").matches)return;const hero=document.querySelector(".hero");hero.addEventListener("pointermove",e=>{const x=(e.clientX/innerWidth-.5)*10,y=(e.clientY/innerHeight-.5)*8;gsap.to(".hero-media",{x,y,duration:1.2,ease:"power3.out",overwrite:"auto"})});hero.addEventListener("pointerleave",()=>gsap.to(".hero-media",{x:0,y:0,duration:1}))}
introDepth();intro();lenis();motion();menu();pointer();window.addEventListener("load",()=>ScrollTrigger.refresh());