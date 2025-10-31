"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import NewMarqueeGlobe2 from "@/components/NewMarqueeglobe2";
import "./style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Scroll from "@/components/Scroll";
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef(null);
  const section2Ref = useRef(null);
  const textsRef = useRef([]);
  const rightImgRef = useRef(null);

  const section3Ref = useRef(null);
  const triggerRef = useRef(null);
  const NewindiaStoryInnerRef = useRef(null);

  const indiaSectionRef = useRef(null);
  const titleRef = useRef(null);
  const titleRef2 = useRef(null);
  const titleRef3 = useRef(null);
  const content1Ref = useRef(null);
  const content2Ref = useRef(null);
  const indiaContent1Ref = useRef(null);
  const indiaContent2Ref = useRef(null);
  const indiaContent3Ref = useRef(null);
  const videoInnerRef = useRef(null);
  const indiaStoryInnerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const indiaStoryRef = useRef(null);
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
    const logo = document.querySelector(".logo img");

    if (logo) {
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top bottom",
        onEnter: () => {
          gsap.to(logo, {
            opacity: 0,
            duration: 0.3,
            // makes dark logo visible if white before
            onComplete: () => {
              logo.src = "/images/janprologo.svg"; // your black logo
              gsap.to(logo, { opacity: 1, duration: 0.3 });
            },
          });
        },
        onLeaveBack: () => {
          gsap.to(logo, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              logo.src = "/images/janprowhite.svg";
              gsap.to(logo, { opacity: 1, duration: 0.3 });
            },
          });
        },
      });
      ScrollTrigger.create({
        trigger: titleRef2.current,
        start: "top bottom",
        onEnter: () => {
          gsap.to(logo, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              logo.src = "/images/janprowhite.svg"; // white logo again
              gsap.to(logo, { opacity: 1, duration: 0.3 });
            },
          });
        },
        onLeaveBack: () => {
          gsap.to(logo, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              logo.src = "/images/janprologo.svg"; // switch back to black if scrolling up
              gsap.to(logo, { opacity: 1, duration: 0.3 });
            },
          });
        },
      });
      // ScrollTrigger.create({
      //   trigger: titleRef3.current,
      //   start: "top bottom",
      //   onEnter: () => {
      //     gsap.to(logo, {
      //       opacity: 0,
      //       duration: 0.3,
      //       onComplete: () => {
      //         logo.src = "/images/janprologo.svg"; // white logo again
      //         gsap.to(logo, { opacity: 1, duration: 0.3 });
      //       },
      //     });
      //   },
      //   onLeaveBack: () => {
      //     gsap.to(logo, {
      //       opacity: 0,
      //       duration: 0.3,
      //       onComplete: () => {
      //         logo.src = "/images/janprowhite.svg"; // switch back to black if scrolling up
      //         gsap.to(logo, { opacity: 1, duration: 0.3 });
      //       },
      //     });
      //   },
      // });
    }
    gsap.set(content1Ref.current, {
      yPercent: 0, // initially vertically centered (element should be positioned at 50% top)
      autoAlpha: 1,
      willChange: "transform, opacity",
    });
    gsap.set(indiaContent1Ref.current, {
      yPercent: 0,
      autoAlpha: 1,
      willChange: "transform, opacity",
    });
    gsap.set(content2Ref.current, {
      yPercent: 30, // start below center
      autoAlpha: 0,
      willChange: "transform, opacity",
      pointerEvents: "none",
    });
    gsap.set(indiaContent2Ref.current, {
      yPercent: 30,
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
    ScrollTrigger.create({
      trigger: indiaSectionRef.current,
      start: "top top",
      end: "+=60%",
      pin: indiaStoryRef.current,
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
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: indiaSectionRef.current,
        start: "top top",
        end: "+=60%",
        scrub: true,
        // markers: true, // uncomment for debugging positions
      },
    });

    // Phase A: keep content1 centered for a short moment (0% -> ~15% progress)
    tl.addLabel("content1-stay", 0);
    tl2.addLabel("indiacontent1-stay", 0);

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
    tl2.to(
      indiaContent1Ref.current,
      {
        yPercent: -120,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.6,
      },
      "indiacontent1-stay+=0.05"
    );

    // At the same time prepare content2 (hide -> come from below)
    tl.addLabel("content2-intro", "-=0.25"); // slightly overlap
    tl2.addLabel("indiacontent3-intro", "-=0.25"); // slightly overlap

    tl2.to(
      indiaContent3Ref.current,
      {
        yPercent: -90,
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.6,
      },
      "indiacontent3-stay+=0.5"
    );

    tl2.addLabel("indiacontent2-intro", "-=0.25"); // slightly overlap?
    tl.set(content2Ref.current, { pointerEvents: "none" }, "content2-intro");
    tl2.set(
      indiaContent2Ref.current,
      { pointerEvents: "none" },
      "indiacontent2-intro"
    );
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

    tl2.to(
      indiaContent2Ref.current,
      {
        yPercent: -20, // final centered position (same centering as content1 initial)
        autoAlpha: 1,
        ease: "power2.out",
        duration: 0.7,
        onStart: () => {
          gsap.set(indiaContent2Ref.current, { pointerEvents: "auto" });
        },
      },
      "indiacontent2-intro+=0.05"
    );

    gsap.fromTo(
      ".white-overlay",
      { opacity: 0, immediateRender: false },
      {
        opacity: 1,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#title-1",
          start: "top bottom",
          end: "top top",
          toggleActions: "play none none reverse",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".white-overlay",
      { opacity: 1, immediateRender: false },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#title-2",
          start: "top bottom",
          end: "top top",
          scrub: true,
          immediateRender: false,
          toggleActions: "play none none reverse",
          // markers:true
        },
      }
    );

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
            // markers: true, // enable for debugging
          },
        });
      }
    }
    if (!section2Ref.current || !NewindiaStoryInnerRef.current) return;

    const ctx = gsap.context(() => {
      // --- VIDEO FADE-IN (from right) ---
      gsap.fromTo(
        NewindiaStoryInnerRef.current,
        { x: 80, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top 70%",
            end: "top top",
            scrub: true,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        }
      );

      // --- MASTER TIMELINE (pin + text animation) ---
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top top",
          end: "+=350%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Text sequence
      tl3.fromTo(
        textsRef.current[0],
        { opacity: 1, y: 0 },
        { opacity: 0, y: -220, duration: 1.2 },
        0.15
      );
      tl3.fromTo(
        textsRef.current[1],
        { opacity: 0, y: 220 },
        { opacity: 1, y: 0, duration: 1.2 },
        ">0.25"
      );
      tl3.to(
        textsRef.current[1],
        { opacity: 0, y: -220, duration: 1.1 },
        ">1.0"
      );
      tl3.fromTo(
        textsRef.current[2],
        { opacity: 0, y: 220 },
        { opacity: 1, y: 0, duration: 1.2 },
        ">0.25"
      );

      // --- VIDEO FADE-OUT (move back right + fade out) ---
      gsap.fromTo(
        NewindiaStoryInnerRef.current,
        { x: 0, autoAlpha: 1 },
        {
          x: 100,
          autoAlpha: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "bottom 80%", // starts fade-out when section is near leaving
            end: "bottom 30%", // completes fade-out a bit before section fully exits
            scrub: true,
            immediateRender: false,
            // markers: true
            // ,
          },
        }
      );
    }, section2Ref);

    if (videoInnerRef.current) {
      gsap.fromTo(
        videoInnerRef.current,
        { x: 80, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%", // when section enters view
            end: "bottom 80%", // 👈 when section end reaches 80% of viewport
            scrub: true, // smooth scroll-based animation
            toggleActions: "play reverse play reverse",
            // markers: true,
            onLeave: () => {
              // when section end reaches 80%, slide it out
              gsap.to(videoInnerRef.current, {
                x: 100,
                autoAlpha: 0,
                duration: 0.9,
                ease: "power2.inOut",
              });
            },
            onEnterBack: () => {
              // when scrolling back, bring it again
              gsap.to(videoInnerRef.current, {
                x: 0,
                autoAlpha: 1,
                duration: 0.9,
                ease: "power2.inOut",
              });
            },
          },
        }
      );
    }
    if (indiaStoryInnerRef.current) {
      gsap.fromTo(
        indiaStoryInnerRef.current,
        { x: 80, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: indiaSectionRef.current,
            start: "top 70%", // when section enters view
            end: "bottom 80%", // when section end reaches 80% of viewport
            scrub: true,
            toggleActions: "play reverse play reverse",
            // markers: true,
            onLeave: () => {
              // when section end reaches 80%, slide it back out
              gsap.to(indiaStoryInnerRef.current, {
                x: 100,
                autoAlpha: 0,
                duration: 1.2,
                ease: "power2.inOut",
              });
            },
            onEnterBack: () => {
              // when scrolling back, bring it again
              gsap.to(indiaStoryInnerRef.current, {
                x: 0,
                autoAlpha: 1,
                duration: 1.2,
                ease: "power2.inOut",
              });
            },
          },
        }
      );
    }

    const section = section3Ref.current;
    const trigger = triggerRef.current;

    if (!section || !trigger) return;

    // Disable horizontal scroll on small screens
    if (window.innerWidth < 768) return;

    const totalWidth = section.scrollWidth - window.innerWidth;

    const tween = gsap.to(section, {
      x: () => -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: () => `+=${section.scrollWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        immediateRender: false,
        // markers: true,
      },
    });
    gsap.fromTo(
      ".white-overlay",
      { opacity: 0 },
      {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#title-3",
          start: "top bottom",
          end: "top top",
          scrub: true,
          // markers: true,
          toggleActions: "play none none reverse",
          immediateRender: false,
        },
      }
    );
    return () => {
      // Revert GSAP context if used
      if (ctx && typeof ctx.revert === "function") ctx.revert();

      // Destroy Lenis instance safely
      if (lenisRef.current && typeof lenisRef.current.destroy === "function") {
        try {
          lenisRef.current.destroy();
        } catch (e) {
          // ignore errors during destroy
        }
      }

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // Kill main timeline if exists
      if (tl && typeof tl.kill === "function") tl.kill();

      // Kill specific tween and its ScrollTrigger
      if (tween) {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        if (typeof tween.kill === "function") tween.kill();
      }
    };
    // return () => {
    //   ctx.revert();

    //   if (tween.scrollTrigger) tween.scrollTrigger.kill();
    //   tween.kill();
    //   // destroy Lenis properly
    //   if (lenisRef.current && typeof lenisRef.current.destroy === "function") {
    //     try {
    //       lenisRef.current.destroy();
    //     } catch (e) {
    //       // ignore
    //     }
    //   }
    //   ScrollTrigger.getAll().forEach((t) => t.kill());
    //   tl.kill();
    // };
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 bg-transparent pt-[1.25rem] w-full">
        <div className="mx-[6rem] flex justify-between items-center w-full">
          <div className="logo">
            <a href="#">
              <img src="/images/janprowhite.svg" alt="logo" width={200} />
            </a>
          </div>
          <div className="hamburger-div absolute top-[1.4rem] right-8 z-20">
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

              <div
                className={`sidebar ${menuOpen ? "active" : ""}`}
                id="sidebar"
              >
                <a href="/">Home</a>
                <a href="/about">About us</a>
                <a href="#">Why us</a>
                <a href="#">Testimonials</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-div">
        {/* overlay div  */}
        <div className="white-overlay"></div>
        {/* 1st section  */}
        <div className="flex bg-1 h-[100vh] w-full relative">
          <div className="absolute z-10">
            <video
              autoPlay
              muted
              playsInline
              loop
              className="w-[100%] h-full object-cover tinted-video3"
            >
              <source src="/images/3d-globe2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="flex !h-[100vh] z-10  flex-col w-[45%] ml-24 h-full justify-center items-start ">
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
        </div>

        {/* title div */}
        <div
          ref={titleRef}
          id="title-1"
          data-aos="fade-up"
          data-aos-duration="3000"
          className="h-[250px] title-div mt-[11.5rem] mb-[3rem] w-full flex justify-center items-center"
        >
          <h1 className="text-white text-center font-bold text-[4rem] leading-[4.5rem]">
            Connecting the World Through Trust,
            <br /> Service, and Shared Progress
          </h1>
        </div>

        {/* Video + Content section */}

        <section
          ref={sectionRef}
          className="flex relative h-[140vh] overflow-hidden"
        >
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
                Strengthening Our Growth Story
                <br /> Through Long-Term Relationships
              </h2>

              <h1 className="text-[10rem] mb-[0.75rem] font-extrabold nine leading-[11rem]">
                96%
              </h1>
              <span className="text-[#dbdbdbd8] text-[4.35rem] leading-[5rem]  font-bold">
                Retention Rate
              </span>
            </div>
          </div>

          <div
            ref={videoWrapperRef}
            className="w-[50%] sticky fade-mask top-0 h-screen flex justify-end items-end z-10"
          >
            <div
              className="video-inner relative flex justify-end"
              ref={videoInnerRef}
            >
              <video
                autoPlay
                muted
                playsInline
                loop
                className="w-[90%] h-full object-cover  object-top  tinted-video"
              >
                <source src="/images/video3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* title div */}
        <div
          ref={titleRef2}
          id="title-2"
          className="h-[250px] title-div mt-[6rem]  mb-[3.5rem] w-full flex justify-center items-center"
        >
          <h1 className="text-white font-bold text-center text-[4rem] leading-[4.5rem]">
            A Journey Rooted in Growth,
            <br /> Driven by Purpose
          </h1>
        </div>

        {/* India story */}
        <section
          ref={section2Ref}
          className="h-screen flex relative z-[20] overflow-hidden"
        >
          {/* Left side text container */}
          <div className="w-1/2 flex items-center justify-center relative">
            <div className="absolute text-6xl font-bold">
              <div ref={(el) => (textsRef.current[0] = el)}>
                <div className="flex flex-col justify-center">
                  <h4 className="text-[1rem] text-[#78bf21] font-bold mb-3">
                    {" "}
                    INDIA STORY
                  </h4>
                  <h2 className="text-[1.75rem] font-bold leading-[2.25rem] mb-[1rem]">
                    Over the years, we’ve built an operational
                    <br /> network that connects cities across India
                  </h2>
                  <h1 className="text-[10rem] font-extrabold  leading-[11rem] ">
                    35+
                  </h1>
                  <span className="text-[#dbdbdbd8] text-[4.35rem] font-bold ">
                    Cities
                  </span>
                </div>
              </div>
              <div
                ref={(el) => (textsRef.current[1] = el)}
                className="absolute top-0 left-0"
              >
                <div className="flex flex-col justify-center">
                  <h4 className="text-[1rem] text-[#78bf21] font-bold mb-3">
                    {" "}
                    INDIA STORY
                  </h4>
                  <h2 className="text-[1.75rem] font-bold leading-[2.25rem] mb-[1rem]">
                    Behind every operation stands a team
                    <br /> driven by purpose and partners
                  </h2>
                  <h1 className="text-[10rem] font-extrabold  leading-[11rem] ">
                    450+
                  </h1>
                  <span className="text-[#dbdbdbd8] text-[4.35rem] font-bold ">
                    Customers
                  </span>
                </div>
              </div>
              <div
                ref={(el) => (textsRef.current[2] = el)}
                className="absolute top-0 left-0"
              >
                <div className="flex flex-col justify-center">
                  <h4 className=" text-[1rem] text-[#78bf21] font-bold mb-3">
                    {" "}
                    INDIA STORY
                  </h4>
                  <h2 className="text-[1.75rem] font-bold leading-[2.25rem] mb-[1rem]">
                    Over the years, we’ve built an operational
                    <br /> network that connects cities across India
                  </h2>
                  <h1 className="text-[10rem] font-extrabold  leading-[11rem] ">
                    6500+
                  </h1>
                  <span className="text-[#dbdbdbd8] text-[4.35rem] font-bold ">
                    Janitors
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side pinned image */}
          <div
            ref={rightImgRef}
            className="w-1/2 h-full flex items-center justify-center "
          >
            <div
              className="video-inner  relative flex justify-end"
              ref={NewindiaStoryInnerRef}
            >
              {/* <div className="overlay-logo2">
                <div className="inner-circle">
                  <span className="text-">
                    <img src="/images/Customer.png" alt="customer" width={94} />
                  </span>
                </div>
              </div> */}
              {/* <img
                src="/images/india-map.jpg"
                alt="india map"
                className="w-[80%] h-full object-contain"
              /> */}

              <video
                autoPlay
                muted
                playsInline
                loop
                className="w-[90%] h-[100vh] tinted-video-mayur  object-cover"
              >
                <source src="/images/india-map.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <div
          ref={titleRef3}
          id="title-3"
          // data-aos="fade-up"
          // data-aos-duration="3000"
          className="h-[250px] title-div  mt-[6rem] w-full flex justify-center items-center"
        >
          <h1 className="text-white text-center font-bold text-[4rem] leading-[4.5rem]">
            End-to-End Services That Keep <br />
            Spaces Clean, Safe, and Efficient
          </h1>
        </div>
        {/* scroll section cards  */}
        <div className="h-[100vh] flex justify-center items-center">
          {/* <h1 className="text-white ">hello</h1> */}
          <section
            ref={triggerRef}
            className="relative h-[100vh] overflow-hidden z-[10] "
          >
            <div
              ref={section3Ref}
              className="flex space-x-10 h-full w-max items-center px-[5rem]"
            >
              {[
                {
                  img: "/images/pestcontrol.webp",
                  title: "Pest ",
                  subtitle: "Control",
                },
                {
                  img: "/images/repair.jpg",
                  title: "Repairs & ",
                  subtitle: "Maintenance",
                },
                {
                  img: "/images/hvac.webp",
                  title: "BMS/HVAC ",
                  subtitle: "Operator",
                },
                {
                  img: "/images/housekeeping.jpg",
                  title: "House-",
                  subtitle: "keeping",
                },
                {
                  img: "/images/office-assitant.jpg",
                  title: "Office ",
                  subtitle: "Assitant",
                },
                {
                  img: "/images/dgstp-operator.jpg",
                  title: "DG/STP ",
                  subtitle: "Operator",
                },
                {
                  img: "/images/pantry.jpg",
                  title: "Pantry/",
                  subtitle: "Office Boys",
                },
                {
                  img: "/images/marblepolishing.jpeg",
                  title: "Polishing & ",
                  subtitle: "Shampooing",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className="w-[20vw] h-[70vh] bg-gray-800 text-white rounded-2xl overflow-hidden relative flex flex-col justify-end p-6 shadow-lg"
                >
                  {/* <div className="service-overlay"></div> */}
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="relative z-10">
                    <h2 className="text-3xl font-semibold">
                      {card.title}
                      <br />
                      {card.subtitle}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className=" test">
          {/* <h1 className="text-white ">hello</h1> */}
          {/* <Scroll /> */}
        </section>
      </div>
    </>
  );
}
