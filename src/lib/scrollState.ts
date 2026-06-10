// Shared scroll state — written by LenisProvider on every frame, read by WebGL RAF loop.
// Module-level object avoids React context overhead in a hot animation path.
export const scrollState = {
  velocity: 0,
  progress: 0,
};
