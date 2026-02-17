import { simplexNoise3D } from "./noise";

export const blobVertexShader = /* glsl */ `
${simplexNoise3D}

uniform float uTime;
uniform float uNoiseStrength;
uniform float uNoiseSpeed;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;

  // Multi-octave noise for organic shape
  float noise1 = snoise(position * 0.8 + uTime * uNoiseSpeed) * 0.5;
  float noise2 = snoise(position * 1.6 + uTime * uNoiseSpeed * 0.8) * 0.25;
  float noise3 = snoise(position * 3.2 + uTime * uNoiseSpeed * 0.6) * 0.125;

  float displacement = (noise1 + noise2 + noise3) * uNoiseStrength;
  vDisplacement = displacement;

  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;
