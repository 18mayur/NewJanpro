"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTest() {
  const section2Ref = useRef(null);
  const section4Ref = useRef(null);

  const rightImgRef = useRef(null);
  const rightImgRef4 = useRef(null);

  const indiaStoryInnerRef = useRef(null);
  const indiaStoryInnerRef4 = useRef(null);

  const textsRef = useRef([]);
  const textsRef4 = useRef([]);

  // === SECTION 2 ===
  useEffect(() => {
    if (!section2Ref.current || !indiaStoryInnerRef.current) return;

    const ctx = gsap.context(() => {
      // --- VIDEO FADE-IN ---
      gsap.fromTo(
        indiaStoryInnerRef.current,
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

      // --- MASTER TIMELINE ---
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

      // Text animations (3)
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

      // --- VIDEO FADE-OUT ---
      gsap.fromTo(
        indiaStoryInnerRef.current,
        { x: 0, autoAlpha: 1 },
        {
          x: 100,
          autoAlpha: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "bottom 80%",
            end: "bottom 30%",
            scrub: 0.6,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section2Ref);

    return () => ctx.revert();
  }, []);

  // === SECTION 4 ===
  useEffect(() => {
    if (!section4Ref.current || !indiaStoryInnerRef4.current) return;

    const ctx4 = gsap.context(() => {
      // --- VIDEO FADE-IN ---
      gsap.fromTo(
        indiaStoryInnerRef4.current,
        { x: 80, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section4Ref.current,
            start: "top 70%",
            end: "top top",
            scrub: true,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        }
      );

      // --- MASTER TIMELINE (only 2 texts) ---
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: section4Ref.current,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      tl4.fromTo(
        textsRef4.current[0],
        { opacity: 1, y: 0 },
        { opacity: 0, y: -220, duration: 1.2 },
        0.15
      );
      tl4.fromTo(
        textsRef4.current[1],
        { opacity: 0, y: 220 },
        { opacity: 1, y: 0, duration: 1.2 },
        ">0.25"
      );

      // --- VIDEO FADE-OUT ---
      gsap.fromTo(
        indiaStoryInnerRef4.current,
        { x: 0, autoAlpha: 1 },
        {
          x: 100,
          autoAlpha: 0,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section4Ref.current,
            start: "bottom 80%",
            end: "bottom 30%",
            scrub: 0.6,
            immediateRender: false,
            invalidateOnRefresh: true,
          },
        }
      );
    }, section4Ref);

    return () => ctx4.revert();
  }, []);

  return (
    <div className="w-full text-white">
      {/* --- Section 1 --- */}
      <section className="h-screen flex items-center justify-center bg-black text-5xl">
        Section 1
      </section>

      {/* --- Section 2 --- */}
      <section
        ref={section2Ref}
        className="h-screen flex bg-neutral-900 overflow-hidden"
      >
        {/* Left Texts */}
        <div className="w-1/2 flex items-center justify-center relative">
          <div className="absolute text-6xl font-bold">
            <div ref={(el) => (textsRef.current[0] = el)}>
              <div className="flex flex-col justify-center">
                <h4 className="text-[#78bf21] font-bold mb-3">INDIA STORY</h4>
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
                <h4 className="text-[#78bf21] font-bold mb-3">INDIA STORY</h4>
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
              ref={(el) => (textsRef.current[2] = el)}
              className="absolute top-0 left-0"
            >
              <div className="flex flex-col justify-center">
                <h4 className="text-[#78bf21] font-bold mb-3">INDIA STORY</h4>
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
          </div>
        </div>

        {/* Right Video */}
        <div
          ref={rightImgRef}
          className="w-1/2 h-full flex items-center justify-center bg-gray-800"
        >
          <div
            className="video-inner relative flex justify-end"
            ref={indiaStoryInnerRef}
          >
            <video
              autoPlay
              muted
              playsInline
              loop
              className="w-[90%] h-[100vh] tinted-video object-cover"
            >
              <source src="/images/video3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* --- Section 3 --- */}
      <section className="h-screen flex items-center justify-center bg-black text-5xl">
        Section 3
      </section>

      {/* --- Section 4 --- */}
      <section
        ref={section4Ref}
        className="h-screen flex bg-neutral-900 overflow-hidden"
      >
        {/* Left Texts (only 2) */}
        <div className="w-1/2 flex items-center justify-center relative">
          <div className="absolute text-6xl font-bold">
            <div ref={(el) => (textsRef4.current[0] = el)}>
              <div className="flex flex-col justify-center">
                <h4 className="text-[#78bf21] font-bold mb-3">GLOBAL STORY</h4>
                <h2 className="text-[1.75rem] font-bold leading-[2.25rem] mb-[1rem]">
                  Taking our operations worldwide,
                  <br /> reaching across continents
                </h2>
                <h1 className="text-[10rem] font-extrabold leading-[11rem]">
                  10+
                </h1>
                <span className="text-[#dbdbdbd8] text-[4.35rem] font-bold">
                  Countries
                </span>
              </div>
            </div>

            <div
              ref={(el) => (textsRef4.current[1] = el)}
              className="absolute top-0 left-0"
            >
              <div className="flex flex-col justify-center">
                <h4 className="text-[#78bf21] font-bold mb-3">GLOBAL STORY</h4>
                <h2 className="text-[1.75rem] font-bold leading-[2.25rem] mb-[1rem]">
                  Creating a unified network
                  <br /> that connects global cities
                </h2>
                <h1 className="text-[10rem] font-extrabold leading-[11rem]">
                  120+
                </h1>
                <span className="text-[#dbdbdbd8] text-[4.35rem] font-bold">
                  Locations
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Video */}
        <div
          ref={rightImgRef4}
          className="w-1/2 h-full flex items-center justify-center bg-gray-800"
        >
          <div
            className="video-inner relative flex justify-end"
            ref={indiaStoryInnerRef4}
          >
            <video
              autoPlay
              muted
              playsInline
              loop
              className="w-[90%] h-[100vh] tinted-video object-cover"
            >
              <source src="/images/video3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* section 5 */}

      <section className="h-[100vh]"></section>
    </div>
  );
}
