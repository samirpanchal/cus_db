import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLOBAL_HUBS } from '../data/anchorstoneData';
import { RotateCw, Sparkles } from 'lucide-react';

interface Globe3DProps {
  onSelectHub?: (hubId: string) => void;
  scrollY?: number;
  containerized?: boolean;
}

// Convert Lat/Lng to 3D Cartesian Coordinate on a Sphere of radius R
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const Globe3D: React.FC<Globe3DProps> = ({ onSelectHub, containerized = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // Store references for runtime updates
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const pivotGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.1, y: 0 });
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const velocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverVelocityRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isIntroZoomingRef = useRef<boolean>(false);
  const hasCompletedIntroRef = useRef<boolean>(false);
  const targetPosXRef = useRef<number>(0);
  const targetZoomRef = useRef<number>(6.2);
  const autoRotateRef = useRef<boolean>(true);

  useEffect(() => {
    autoRotateRef.current = isRotating;
  }, [isRotating]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 1. Scene & Camera Setup
    const width = containerized ? container.clientWidth : window.innerWidth;
    const height = containerized ? container.clientHeight : window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = containerized ? 5 : (window.innerWidth < 768 ? 3.5 : 2.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const pivotGroup = new THREE.Group();
    pivotGroup.position.x = 0; // Force center initially for intro sequence
    scene.add(pivotGroup);
    pivotGroupRef.current = pivotGroup;

    const mainGroup = new THREE.Group();
    pivotGroup.add(mainGroup);
    globeGroupRef.current = mainGroup;
    
    // Initial Focus on India (Mumbai)
    const mumbaiLat = 18.948;
    const mumbaiLng = 72.951;
    const phi = (90 - mumbaiLat) * (Math.PI / 180);
    const theta = (mumbaiLng + 180) * (Math.PI / 180);
    mainGroup.rotation.x = 0;
    mainGroup.rotation.y = -theta + Math.PI / 2;

    // Loading Manager for Textures
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      setLoadProgress((itemsLoaded / itemsTotal) * 100);
    };
    manager.onLoad = () => {
      setIsLoading(false);
      // Wait for loading screen to fade, then trigger zoom out and pan right
      setTimeout(() => {
        isIntroZoomingRef.current = true;
      }, 600);
    };

    const textureLoader = new THREE.TextureLoader(manager);

    // High Res Earth Textures
    const earthMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const bumpMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');
    const waterMap = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-water.png');
    const cloudsMap = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png');

    // 2. Base Sphere Mesh (Realistic Earth)
    const sphereRadius = 2.0;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      map: earthMap,
      bumpMap: bumpMap,
      bumpScale: 0.015,
      specularMap: waterMap,
      specular: new THREE.Color('grey'),
    });
    const globe = new THREE.Mesh(sphereGeo, globeMat);
    mainGroup.add(globe);

    // 3. Clouds Layer
    const cloudGeo = new THREE.SphereGeometry(sphereRadius * 1.006, 64, 64);
    const cloudMat = new THREE.MeshPhongMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    mainGroup.add(clouds);
    cloudsRef.current = clouds;

    // 4. Atmosphere Rim Glow
    const rimGeo = new THREE.SphereGeometry(2.1, 64, 64);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(rimGeo, rimMat);
    mainGroup.add(atmosphere);

    // 5. Port Node Markers & Pulsing Beacons
    const hubMarkersGroup = new THREE.Group();
    mainGroup.add(hubMarkersGroup);

    const markerGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0x34d399 }); // Emerald 400

    GLOBAL_HUBS.forEach((hub) => {
      const pos = latLngToVector3(hub.lat, hub.lng, sphereRadius * 1.015);
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(pos);
      marker.userData = { hubId: hub.id, name: hub.name };
      hubMarkersGroup.add(marker);

      // Glowing outer ring for hub
      const ringGeo = new THREE.RingGeometry(0.05, 0.075, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x10b981,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      hubMarkersGroup.add(ring);
    });

    // 6. Arc Trade Routes with Moving Energy Packets
    const routesGroup = new THREE.Group();
    mainGroup.add(routesGroup);

    const routeArcs: { curve: THREE.CubicBezierCurve3; packet: THREE.Mesh; progress: number; speed: number }[] = [];

    // Define major trade connections
    const connections: [number, number][] = [
      [0, 1], // Mumbai -> Singapore
      [0, 2], // Mumbai -> Rotterdam
      [0, 3], // Mumbai -> Dubai
      [2, 6], // Rotterdam -> Antwerp
      [1, 5], // Singapore -> Shanghai
      [4, 3], // Houston -> Dubai
      [4, 0], // Houston -> Mumbai
      [5, 2], // Shanghai -> Rotterdam
      [7, 0], // Santos -> Mumbai
    ];

    connections.forEach(([fromIdx, toIdx], i) => {
      const hubA = GLOBAL_HUBS[fromIdx];
      const hubB = GLOBAL_HUBS[toIdx];
      if (!hubA || !hubB) return;

      const pA = latLngToVector3(hubA.lat, hubA.lng, sphereRadius * 1.01);
      const pB = latLngToVector3(hubB.lat, hubB.lng, sphereRadius * 1.01);

      // Interpolate middle control points to arc above sphere
      const dist = pA.distanceTo(pB);
      const mid = pA.clone().add(pB).multiplyScalar(0.5);
      const midLength = mid.length();
      mid.normalize().multiplyScalar(midLength + Math.min(dist * 0.4, 0.8));

      const curve = new THREE.CubicBezierCurve3(
        pA,
        pA.clone().lerp(mid, 0.5),
        pB.clone().lerp(mid, 0.5),
        pB
      );

      const points = curve.getPoints(40);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x14b8a6,
        transparent: true,
        opacity: 0.6,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      routesGroup.add(line);

      // Packet moving along route
      const packetGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0x6ee7b7,
        transparent: true,
        opacity: 1.0,
      });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      routesGroup.add(packet);

      routeArcs.push({
        curve,
        packet,
        progress: (i * 0.2) % 1.0,
        speed: 0.003 + Math.random() * 0.003,
      });
    });

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Base illumination
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0); // Sun
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // 8. Interaction Handlers (Mouse & Touch)
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (isDraggingRef.current) {
        const deltaX = clientX - previousMousePositionRef.current.x;
        const deltaY = clientY - previousMousePositionRef.current.y;
        mainGroup.rotation.y += deltaX * 0.004;
        mainGroup.rotation.x += deltaY * 0.004;
        velocityRef.current.y = deltaX * 0.002;
        velocityRef.current.x = deltaY * 0.002;
        previousMousePositionRef.current = { x: clientX, y: clientY };
      } else {
        mouseX = (clientX - windowHalfX) * 0.0008;
        mouseY = (clientY - windowHalfY) * 0.0008;
        // Massive increase in hover sensitivity for both X and Y
        targetRotationRef.current.x = mouseY * 2.5;
        targetRotationRef.current.y = mouseX * 2.5;
      }
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 9. Scroll Responsive Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Independent clouds rotation
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0003;
      }

      if (!isDraggingRef.current) {
        // 1. Inertia / Acceleration Physics for dragging
        velocityRef.current.x *= 0.85; // Much stronger friction decay
        velocityRef.current.y *= 0.85; // Much stronger friction decay
        
        // Apply inertia + auto-rotation to main group
        const baseSpeed = autoRotateRef.current ? 0.0015 : 0;
        mainGroup.rotation.x += velocityRef.current.x;
        mainGroup.rotation.y += velocityRef.current.y + baseSpeed;

        // 2. Parallax Spring Physics on Pivot Group (Acceleration & Momentum for Hover)
        if (pivotGroupRef.current) {
          const stiffness = 0.015; // Pull strength towards cursor
          const damping = 0.88; // Friction/bounciness
          
          hoverVelocityRef.current.x += (targetRotationRef.current.x - pivotGroupRef.current.rotation.x) * stiffness;
          hoverVelocityRef.current.y += (targetRotationRef.current.y - pivotGroupRef.current.rotation.y) * stiffness;
          
          hoverVelocityRef.current.x *= damping;
          hoverVelocityRef.current.y *= damping;
          
          pivotGroupRef.current.rotation.x += hoverVelocityRef.current.x;
          pivotGroupRef.current.rotation.y += hoverVelocityRef.current.y;
        }
      }

      // 3. Intro Zoom Out & Pan Animation
      if (isIntroZoomingRef.current) {
        camera.position.z += (targetZoomRef.current - camera.position.z) * 0.025; // Smooth exponential ease out
        if (pivotGroupRef.current) {
          pivotGroupRef.current.position.x += (targetPosXRef.current - pivotGroupRef.current.position.x) * 0.025;
        }
        if (Math.abs(targetZoomRef.current - camera.position.z) < 0.01) {
          camera.position.z = targetZoomRef.current;
          if (pivotGroupRef.current) pivotGroupRef.current.position.x = targetPosXRef.current;
          isIntroZoomingRef.current = false;
          hasCompletedIntroRef.current = true;
        }
      } else if (hasCompletedIntroRef.current) {
        // Smoothly adjust camera zoom on window resize
        camera.position.z += (targetZoomRef.current - camera.position.z) * 0.1;
      }

      // Animate trade route energy pulses
      routeArcs.forEach((item) => {
        item.progress += item.speed;
        if (item.progress > 1) item.progress = 0;
        const point = item.curve.getPoint(item.progress);
        item.packet.position.copy(point);
      });

      if (!containerized) {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight * 1.3;
        const scrollFactor = Math.min(Math.max(scrollY / heroHeight, 0), 1);

        const scale = 1 + scrollFactor * 0.8;
        const opacity = Math.max(0.08, 1 - scrollFactor * 0.9);

        if (containerRef.current) {
          containerRef.current.style.transform = `scale(${scale})`;
          containerRef.current.style.opacity = `${opacity}`;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize handler & Position
    const handleResize = () => {
      const width = containerized && containerRef.current ? containerRef.current.clientWidth : window.innerWidth;
      const height = containerized && containerRef.current ? containerRef.current.clientHeight : window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      
      if (containerized) {
        targetPosXRef.current = 0;
        targetZoomRef.current = 5.2;
      } else if (window.innerWidth > 1024) {
        targetPosXRef.current = 1.8;
        targetZoomRef.current = 6.2;
      } else if (window.innerWidth > 768) {
        targetPosXRef.current = 1.2;
        targetZoomRef.current = 6.6;
      } else {
        targetPosXRef.current = 0;
        targetZoomRef.current = 8.2;
      }
      
      // Only snap immediately if we have completed the intro animation
      if (hasCompletedIntroRef.current && pivotGroupRef.current) {
        pivotGroupRef.current.position.x = targetPosXRef.current;
      }
    };
    
    // Call once initially to set correct position
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleFocusHub = (hubId: string) => {
    setSelectedHub(hubId);
    if (onSelectHub) onSelectHub(hubId);
    const hub = GLOBAL_HUBS.find((h) => h.id === hubId);
    if (hub && globeGroupRef.current) {
      // Rotate globe towards this hub's coordinates, compensating for current mouse hover parallax
      const phi = (90 - hub.lat) * (Math.PI / 180);
      const theta = (hub.lng + 180) * (Math.PI / 180);
      
      const parallaxOffsetX = pivotGroupRef.current?.rotation.x || 0;
      const parallaxOffsetY = pivotGroupRef.current?.rotation.y || 0;
      
      // Keep the North/South axis completely straight by resetting X rotation to 0
      globeGroupRef.current.rotation.x = 0 - parallaxOffsetX;
      globeGroupRef.current.rotation.y = -theta + Math.PI / 2 - parallaxOffsetY;
      
      // Clear velocity to stop spinning when focused
      velocityRef.current.x = 0;
      velocityRef.current.y = 0;
    }
  };

  return (
    <>
      {isLoading && !containerized && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fcf8fa]">
          <img src="/logo.png" alt="Loading Logo" className="h-20 w-auto mb-8 animate-pulse" />
          <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300 ease-out" 
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-slate-500 text-xs font-semibold mt-4 tracking-widest uppercase">
            Initializing Global Network... {Math.round(loadProgress)}%
          </p>
        </div>
      )}

      <div
        id="canvas-container"
        ref={containerRef}
        className="fixed inset-0 w-full h-full bg-transparent pointer-events-none transition-transform duration-75 ease-out z-0"
        style={{ transformOrigin: 'center center', opacity: isLoading ? 0 : 1, transition: 'opacity 1s ease-in-out' }}
      />

      {/* Floating 3D Interaction Control Dock */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2">
        {showControls && !isLoading && (
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80 mb-2 w-72 transition-all">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">3D Globe Controls</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Sim
              </span>
            </div>

            <div className="flex items-center justify-between mb-3 text-xs text-slate-700">
              <span className="font-medium">Planetary Spin</span>
              <button
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isRotating ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                {isRotating ? 'Rotating' : 'Paused'}
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 block">Quick Hub Navigation</label>
              <div className="grid grid-cols-2 gap-1.5">
                {GLOBAL_HUBS.slice(0, 6).map((hub) => (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => handleFocusHub(hub.id)}
                    className={`text-left px-2 py-1 rounded text-[11px] truncate transition-colors ${
                      selectedHub === hub.id
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800'
                    }`}
                  >
                    {hub.name.replace('Port of ', '').replace(' Port', '').split(' (')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-3 italic text-center">
              Click & drag anywhere to manually orient the 3D globe.
            </p>
          </div>
        )}

        {!isLoading && (
          <button
            type="button"
            onClick={() => setShowControls(!showControls)}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold shadow-lg hover:shadow-emerald-900/30 backdrop-blur-md transition-all duration-200 hover:scale-105 border border-slate-700/50"
            title="Toggle 3D Globe Telemetry & Camera Controls"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span>{showControls ? 'Hide 3D Dock' : '3D Orbit View'}</span>
          </button>
        )}
      </div>
    </>
  );
};
