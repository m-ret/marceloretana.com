"use client";

import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { ContactBlob } from "./contact-blob";
import { HeroParticles } from "./hero-particles";

export function ContactScene() {
  return (
    <>
      {/* Cool calm lighting — no warm tones */}
      <ambientLight intensity={0.05} />
      <pointLight position={[0, 6, 4]} intensity={1.2} color="#a8d8ff" />
      <pointLight position={[-6, 0, -2]} intensity={1.0} color="#6699ff" />
      <pointLight position={[4, -4, -3]} intensity={0.8} color="#cc99ff" />

      <ContactBlob />
      <HeroParticles />

      <EffectComposer>
        <Bloom intensity={1.8} luminanceThreshold={0.05} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette offset={0.25} darkness={0.8} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </>
  );
}
