"use client";
import React, { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

const NewMarqueeGlobe = () => {
  const globeRef = useRef();
  const [size, setSize] = useState({ width: 600, height: 600 });
  const [fontSize, setFontSize] = useState(14); // label font size

  const countries = [
    { name: "Canada", lat: 56.1304, lng: -106.3468 },
    { name: "USA", lat: 37.0902, lng: -95.7129 },
    { name: "Mexico", lat: 23.6345, lng: -102.5528 },
    { name: "United Kingdom", lat: 55.3781, lng: -3.436 },
    { name: "Puerto Rico", lat: 18.2208, lng: -66.5901 },
    { name: "Brazil", lat: -14.235, lng: -51.9253 },
    { name: "Nigeria", lat: 9.082, lng: 8.6753 },
    { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
    { name: "India", lat: 20.5937, lng: 78.9629 },
    { name: "Australia", lat: -25.2744, lng: 133.7751 },
    { name: "New Zealand", lat: -40.9006, lng: 174.886 },
  ];

  useEffect(() => {
    const applyControls = () => {
      if (globeRef.current && typeof globeRef.current.controls === "function") {
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2;
        controls.enableZoom = false;
        controls.enableRotate = false;
        controls.enablePan = false;
      } else {
        requestAnimationFrame(applyControls);
      }
    };
    applyControls();
  }, []);

  useEffect(() => {
    const focusOnNewZealand = () => {
      if (
        globeRef.current &&
        typeof globeRef.current.pointOfView === "function"
      ) {
        globeRef.current.pointOfView(
          { lat: 10.9006, lng: 174.886 }, // New Zealand
          2000 // smooth transition duration in ms
        );
      } else {
        requestAnimationFrame(focusOnNewZealand);
      }
    };
    focusOnNewZealand();
  }, []);

  

  const latLngToVector3 = (lat, lng, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  return (
    <>
        <Globe
      ref={globeRef}
      width={980}  
      height={980}
      globeImageUrl="/images/earth-night3.jpg"
      backgroundColor="rgba(0,0,0,0)"
      showAtmosphere={true}
      atmosphereColor="#fff"
      atmosphereAltitude={0.22}
      labelsData={countries}
      labelLat={(d) => d.lat}
      labelLng={(d) => d.lng}
      labelText={(d) => d.name}
      labelSize={() => 1.2}          // Fixed label size
      labelDotRadius={() => 1}     // Dot radius at the location
      labelColor={() => "orange"}    // Orange labels like world-cities example
      labelResolution={2}
    />
    </>
  );
};

export default NewMarqueeGlobe;
