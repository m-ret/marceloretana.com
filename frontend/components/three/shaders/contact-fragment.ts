export const contactFragmentShader = /* glsl */ `
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

  // Cool calm palette: ice blue → teal → soft lavender
  float t = uTime * 0.025 + vDisplacement * 0.3;
  vec3 ice      = vec3(0.72, 0.92, 1.0);
  vec3 teal     = vec3(0.18, 0.78, 0.88);
  vec3 lavender = vec3(0.68, 0.60, 1.0);

  float phase = fract(t);
  vec3 color;
  if (phase < 0.333) {
    color = mix(ice, teal, phase * 3.0);
  } else if (phase < 0.666) {
    color = mix(teal, lavender, (phase - 0.333) * 3.0);
  } else {
    color = mix(lavender, ice, (phase - 0.666) * 3.0);
  }

  // Soft specular
  vec3 lightDir = normalize(vec3(0.3, 1.0, 0.6));
  vec3 halfDir  = normalize(lightDir + viewDir);
  float specular = pow(max(dot(vNormal, halfDir), 0.0), 48.0) * 0.35;

  // Rim — cool cyan glow at edges
  vec3 rimColor = mix(teal, lavender, sin(uTime * 0.04) * 0.5 + 0.5);
  vec3 rim = rimColor * fresnel * 1.2;

  vec3 baseColor  = color * (0.3 + fresnel * 0.5);
  vec3 finalColor = baseColor + specular * vec3(0.9, 0.97, 1.0) + rim;

  // Slightly dimmer than hero — calm, not loud
  finalColor *= 0.95;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;
