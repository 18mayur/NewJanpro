"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./scroll.css";
gsap.registerPlugin(ScrollTrigger);

export default function Scroll() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
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
        // markers: true,
      },
    });

    // ✅ Proper cleanup
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={triggerRef} className="relative h-[100vh] overflow-hidden  ">
      <div
        ref={sectionRef}
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
  );
}
