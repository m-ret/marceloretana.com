export const blobFragmentShader = /* glsl */ `
uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

void main() {
  // View direction for Fresnel
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

  // Iridescent color palette cycling through gold / blue / purple
  float t = uTime * 0.15 + vDisplacement * 2.0;
  vec3 gold   = vec3(1.0, 0.84, 0.0);
  vec3 blue   = vec3(0.2, 0.4, 1.0);
  vec3 purple = vec3(0.6, 0.2, 0.9);

  // Smooth cycling between the three colors
  float phase = fract(t);
  vec3 color;
  if (phase < 0.333) {
    color = mix(gold, blue, phase * 3.0);
  } else if (phase < 0.666) {
    color = mix(blue, purple, (phase - 0.333) * 3.0);
  } else {
    color = mix(purple, gold, (phase - 0.666) * 3.0);
  }

  // Specular highlight
  vec3 lightDir = normalize(vec3(0.5, 1.0, 0.5));
  vec3 halfDir = normalize(lightDir + viewDir);
  float specular = pow(max(dot(vNormal, halfDir), 0.0), 64.0);

  // Rim glow - stronger at edges
  vec3 rimColor = mix(blue, purple, sin(uTime * 0.3) * 0.5 + 0.5);
  vec3 rim = rimColor * fresnel * 1.5;

  // Combine: base iridescence + specular + rim glow
  vec3 baseColor = color * (0.4 + fresnel * 0.6);
  vec3 finalColor = baseColor + specular * vec3(1.0) * 0.5 + rim;

  // Boost overall brightness slightly
  finalColor *= 1.2;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;
