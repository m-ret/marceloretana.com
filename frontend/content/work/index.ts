import alhena from "./alhena";
import goeasyChat from "./goeasy-chat";
import mavDigital from "./mav-digital";
import repuestosAlto from "./repuestos-alto";
import type { BuildStorySource } from "./types";
import uvitaBodyShop from "./uvita-body-shop";

/** Display order. To publish an unlisted folder, import it, list it here and in EXPECTED_SLUGS. */
export const buildStorySources: BuildStorySource[] = [
  mavDigital,
  repuestosAlto,
  uvitaBodyShop,
  goeasyChat,
  alhena,
];
