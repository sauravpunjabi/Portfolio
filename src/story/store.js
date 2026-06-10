// Shared mutable state bridging DOM-land (GSAP/Lenis) and the R3F frame loop.
export const sceneState = {
  boot: 0, // 0 = void, 1 = world faded in
  velocity: 0, // scroll velocity → dust drift speed
  agitation: 0, // 0..1 — project hover scatters the dust
  progress: 0, // 0..1 — position in the story
  frame: 0, // current story frame index
  frameCount: 9,
};
