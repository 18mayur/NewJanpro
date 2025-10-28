"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import NewMarqueeGlobe2 from "@/components/NewMarqueeglobe2";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const content1Ref = useRef(null);
  const content2Ref = useRef(null);
  const videoInnerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const lenisRef = useRef(null);
  // const title = titleRef.current;

  useEffect(() => {
    // Lenis smooth scroll (keep if needed)
    const lenis = new Lenis();
    lenisRef.current = lenis;
    AOS.init({
      once: false,
    });
    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.set(content1Ref.current, {
      yPercent: 0, // initially vertically centered (element should be positioned at 50% top)
      autoAlpha: 1,
      willChange: "transform, opacity",
    });
    gsap.set(content2Ref.current, {
      yPercent: 30, // start below center
      autoAlpha: 0,
      willChange: "transform, opacity",
      pointerEvents: "none",
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=40%", // adjust how long the section stays pinned
      pin: videoWrapperRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    // Single timeline that runs across the pinned duration
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=40%",
        scrub: true,
        // markers: true, // uncomment for debugging positions
      },
    });

    // Phase A: keep content1 centered for a short moment (0% -> ~15% progress)
    tl.addLabel("content1-stay", 0);

    // Phase B: move content1 up and fade it
    tl.to(
      content1Ref.current,
      {
        yPercent: -120,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.6,
      },
      "content1-stay+=0.05"
    );

    // At the same time prepare content2 (hide -> come from below)
    tl.addLabel("content2-intro", "-=0.25"); // slightly overlap
    tl.set(content2Ref.current, { pointerEvents: "none" }, "content2-intro");
    tl.to(
      content2Ref.current,
      {
        yPercent: -20, // final centered position (same centering as content1 initial)
        autoAlpha: 1,
        ease: "power2.out",
        duration: 0.7,
        onStart: () => {
          gsap.set(content2Ref.current, { pointerEvents: "auto" });
        },
      },
      "content2-intro+=0.05"
    );

    gsap.to(".white-overlay", {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#title-1",
        start: "top bottom",
        end: "top top",
        scrub: true,
        // markers:true
      },
    });

    if (titleRef.current) {
      // target the h1 directly (safer than parent)
      const titleEl = titleRef.current.querySelector("h1") || titleRef.current;

      // safety: only run if we found an element
      if (titleEl) {
        gsap.to(titleEl, {
          color: "#000000", // target black
          ease: "none",
          scrollTrigger: {
            trigger: titleRef.current, // start when title area is scrolled
            start: "top bottom", // tweak these to control timing
            end: "top top",
            scrub: true, // smooth, tied to scroll
            // markers: true,             // enable for debugging
          },
        });
      }
    }

    if (videoInnerRef.current) {
      // ensure it's hidden initially
      gsap.set(videoInnerRef.current, {
        x: 80,
        autoAlpha: 0,
        willChange: "transform, opacity",
      });

      gsap.fromTo(
        videoInnerRef.current,
        { x: 80, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: "power1.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 80%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    // --- slide-in for inner video (animate inner wrapper, not sticky parent) ---

    // Cleanup
    return () => {
      // destroy Lenis properly
      if (lenisRef.current && typeof lenisRef.current.destroy === "function") {
        try {
          lenisRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  //   useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   // Smooth scrolling setup
  //   const lenis = new Lenis();
  //   const raf = (time) => {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   };
  //   requestAnimationFrame(raf);

  //   // --- INITIAL STATES ---
  //   gsap.set(content1Ref.current, {
  //     yPercent: 0,
  //     autoAlpha: 1,
  //     willChange: "transform, opacity",
  //   });
  //   gsap.set(content2Ref.current, {
  //     yPercent: 30,
  //     autoAlpha: 0,
  //     willChange: "transform, opacity",
  //     pointerEvents: "none",
  //   });
  //   gsap.set(videoInnerRef.current, {
  //     x: 100,
  //     autoAlpha: 0,
  //     willChange: "transform, opacity",
  //   });

  //   // --- VIDEO SLIDE-IN + FADE-IN + PIN ---
  //   const videoTL = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 80%", // when section just starts entering
  //       end: "top 60%",
  //       toggleActions: "play none none reverse",
  //       markers: true, // remove after debugging
  //       onEnter: () => {
  //         // Once section fully in view, start pinning video
  //         ScrollTrigger.create({
  //           trigger: sectionRef.current,
  //           start: "top top",
  //           end: "+=40%", // how long to keep pinned
  //           pin: videoWrapperRef.current,
  //           pinSpacing: false,
  //           anticipatePin: 1,
  //         });
  //       },
  //     },
  //   });

  //   videoTL.to(videoInnerRef.current, {
  //     x: 0,
  //     autoAlpha: 1,
  //     duration: 1.2,
  //     ease: "power2.out",
  //   });

  //   // --- TEXT SCROLL TIMELINE ---
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top top",
  //       end: "+=40%",
  //       scrub: true,
  //       markers: true,
  //     },
  //   });

  //   // Phase 1 → content1 fades and moves up
  //   tl.addLabel("content1-stay", 0);
  //   tl.to(
  //     content1Ref.current,
  //     {
  //       yPercent: -120,
  //       autoAlpha: 0,
  //       ease: "power2.out",
  //       duration: 0.6,
  //     },
  //     "content1-stay+=0.05"
  //   );

  //   // Phase 2 → content2 appears from below and stays centered
  //   tl.addLabel("content2-intro", "-=0.25");
  //   tl.set(content2Ref.current, { pointerEvents: "none" }, "content2-intro");
  //   tl.to(
  //     content2Ref.current,
  //     {
  //       yPercent: -20,
  //       autoAlpha: 1,
  //       ease: "power2.out",
  //       duration: 0.7,
  //       onStart: () => {
  //         gsap.set(content2Ref.current, { pointerEvents: "auto" });
  //       },
  //     },
  //     "content2-intro+=0.05"
  //   );

  //   // --- BACKGROUND COLOR TRANSITION ---
  //   gsap.to(".main-div", {
  //     background: "rgba(255,255,255,1)",
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: titleRef.current,
  //       start: "top bottom",
  //       end: "top top",
  //       scrub: true,
  //     },
  //   });

  //   // --- REFRESH SCROLLTRIGGER AFTER SETUP ---
  //   ScrollTrigger.refresh();

  //   // --- CLEANUP ---
  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach((t) => t.kill());
  //     videoTL.kill();
  //     tl.kill();
  //   };
  // }, []);

  return (
    <>
      <header className="relative  items-center justify-between z-[9999] !bg-transparent pointer-events-auto">
        <div className="logo-div top-4 left-[1.6rem] logo  z-[1101]">
          <a href="#">
            <img src="/images/janprowhite.svg" alt="logo" width={200} />
          </a>
        </div>

        <div className="absolute top-[1.6rem] right-8 z-20">
          <div>
            <div
              className={`hamburger ${menuOpen ? "active" : ""}`}
              id="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className={`sidebar ${menuOpen ? "active" : ""}`} id="sidebar">
              <a href="/">Home</a>
              <a href="/about">About us</a>
              <a href="#">Why us</a>
              <a href="#">Testimonials</a>
            </div>
          </div>
        </div>
      </header>
      <div className="main-div">
        <div className="white-overlay"></div>
        {/* 1st section  */}
        <div className="flex bg-1 w-full">
          <div className="flex  flex-col w-[45%] ml-24 h-screen justify-center items-start ">
            <div className="flex flex-col">
              <h4 className="text-[#78bf21] font-bold mb-3">GLOBAL STORY</h4>
              <h2 className="text-[1.75rem] leading-9 font-bold text-[#fff] z-[999] text-left">
                Across Borders, Varying Cultures,
                <br />
                Diverse Shifts — Standardized Workflow.
              </h2>
            </div>
            <div className="flex flex-col">
              <h1 className="text-[6.5rem] text-[#fff] font-bold">
                11+
                <span className="text-[#dbdbdbd1] pl-[0.5rem] !text-[4rem]">
                  Countries
                </span>
              </h1>
              <table className="text-[#e0e3e6]">
                <tbody>
                  <tr>
                    <td>Canada</td>
                    <td>USA</td>
                    <td>Mexico</td>
                    <td>United Kingdom</td>
                  </tr>
                  <tr>
                    <td>Australia</td>
                    <td>Brazil</td>
                    <td>Nigeria</td>
                    <td>Saudi Arabia</td>
                  </tr>
                  <tr>
                    <td>India</td>
                    <td>Puerto Rico</td>
                    <td>New Zealand</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=" z-10 flex w-[60%] justify-center h-[100vh] rotate-21 ml-[5rem] items-end">
            <NewMarqueeGlobe2 />
          </div>
        </div>

        <div
          ref={titleRef} id="title-1" data-aos="fade-up"  data-aos-duration="3000"  
          className="h-[250px] title-div mt-[2.75rem] mb-[3.5rem] w-full flex justify-center items-center"
        >
          <h1 className="text-white text-[4rem] leading-[4.5rem]">
            Lorem ipsum dolor sit amet <br />
            consectetur adipisicing elit.
          </h1>
        </div>
        {/* Video + Content section */}
        <section
          ref={sectionRef}
          className="flex !  relative h-[140vh] overflow-hidden"
        >
          {/* Left (text) */}
          <div className="w-[50%] min-h-screen flex flex-col justify-center px-[3rem] relative text-white">
            <div
              ref={content1Ref}
              className="case-content  case-content-1 text-[#003da6]"
            >
              <h4 className="text-[#78bf21] font-bold mb-3">GLOBAL STORY</h4>
              <h2 className="text-[1.75rem] font-bold leading-[2.25rem] mb-[1rem]">
                Customers Around the World,
                <br /> Linked by Reliable Service
              </h2>
              <h1 className="text-[9rem] font-extrabold  leading-[10rem] ">
                35000+
              </h1>
              <span className="text-[#dbdbdbd8] text-[4.35rem] font-bold ">
                  Customers
                </span>
            </div>

            <div
              ref={content2Ref}
              className="case-content case-content-2 text-[#003da6]"
              style={{
                position: "absolute",
                top: "50%",
                left: "12.65%",
                transform: "translateY(-50%)",
              }}
            >
              <h4 className="text-[#78bf21] font-bold mb-3">GLOBAL STORY</h4>
              <h2 className="text-[1.75rem] leading-[2.25rem] mb-[1rem] font-bold  ">
                Retention built on
                <br /> Linked by Reliable Service
              </h2>
              <h1 className="text-[10rem] mb-[0.75rem] font-extrabold nine leading-[11rem]">
                96%   
              </h1>
              <span className="text-[#dbdbdbd8] text-[4.35rem] leading-[5rem]  font-bold">
                  Retention Rate
                </span>
            </div>
          </div>

          {/* Right (pinned video) */}
          <div
            ref={videoWrapperRef}
            className="w-[50%] sticky fade-mask top-0 h-screen flex justify-end items-end z-10"
          >
            <div
              className="video-inner relative flex justify-end"
              ref={videoInnerRef}
            >
              <div className="overlay-logo">
                <div className="inner-circle">
                  <span className="text-">
                    <img src="/images/Customer.png" alt="customer" width={94}  />
                  </span>
                </div>
              </div>
              <video
                autoPlay
                muted
                playsInline
                loop
                className="w-[80%] h-full object-cover"
              >
                <source src="/images/video3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>
      </div>
      {/* next section */}
      <div className="h-[100vh] flex items-center justify-center bg-[#00374d]">
        <h1 className="text-white text-5xl">Next Section</h1>
      </div>
    </>
  );
}
