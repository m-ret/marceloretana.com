import alhena from "./alhena";
import casaParaiso from "./casa-paraiso";
import goeasyChat from "./goeasy-chat";
import mavDigital from "./mav-digital";
import picomar from "./picomar";
import repuestosAlto from "./repuestos-alto";
import type { BuildStorySource } from "./types";
import uvitaBodyShop from "./uvita-body-shop";

/** Display order. To publish an unlisted folder, import it, list it here and in EXPECTED_SLUGS. */
export const buildStorySources: BuildStorySource[] = [
  picomar,
  mavDigital,
  repuestosAlto,
  uvitaBodyShop,
  casaParaiso,
  goeasyChat,
  alhena,
];
