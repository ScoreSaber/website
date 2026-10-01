const BASE = '/images/devices';

// hmd friendlyName -> image filename
const HMD_MAP = new Map<string, string>(
   Object.entries({
      // oculus/meta
      'Rift CV1': 'headset_oculus_rift_cv1.png',
      'Rift DK1': 'headset_oculus_dk1.png',
      'Rift DK2': 'headset_oculus_dk2.png',
      'Rift S': 'headset_oculus_rift_rifts.png',
      'Quest 1': 'headset_oculus_rift_quest.png',
      'Quest 2': 'headset_oculus_rift_quest.png',
      'Quest 2 (Virtual Desktop)': 'headset_oculus_rift_quest.png',
      'Quest 3': 'headset_oculus_rift_quest.png',
      'Quest 3S': 'headset_oculus_rift_quest.png',
      'Quest Pro': 'headset_oculus_rift_quest.png',
      'Quest (Unknown)': 'headset_oculus_rift_quest.png',
      'Quest (Virtual Desktop)': 'headset_oculus_rift_quest.png',
      // htc vive
      Vive: 'headset_htc_vive.png',
      'Vive Cosmos': 'headset_vive_cosmos.png',
      'Vive Elite': 'headset_htc_vive.png',
      'Vive Focus 3': 'headset_vive_focus_vision.png',
      'Vive Pro': 'headset_htc_vive_pro.png',
      'Vive Pro 2': 'headset_htc_vive_pro.png',
      'Vive XR Elite': 'headset_vive_cosmos.png',
      'Vive Tracker HMD': 'headset_htc_vive.png',
      // valve
      'Valve Index': 'headset_valve_index.png',
      // varjo
      'Varjo Aero': 'headset_varjo_aero.png',
      'Varjo VR-3': 'headset_varjo_vr3.png',
      'Varjo XR-3': 'headset_varjo_xr3.png',
      'Varjo XR-4': 'headset_varjo_xr4.png',
      // pico
      Pico: 'headset_pico_neo_3.png',
      'Pico Neo 2': 'headset_pico_neo_3.png',
      'Pico Neo 3': 'headset_pico_neo_3.png',
      'PICO 4': 'headset_pico_4.png',
      'PICO 4 Ultra': 'headset_pico_4.png',
      'PICO 4S': 'headset_pico_4.png',
      // pimax
      Pimax: 'headset_pimax.png',
      'Pimax 5K': 'headset_pimax.png',
      'Pimax 5K Plus': 'headset_pimax.png',
      'Pimax 5K Super': 'headset_pimax.png',
      'Pimax 5K XR': 'headset_pimax.png',
      'Pimax 8K': 'headset_pimax.png',
      'Pimax Artisan': 'headset_pimax.png',
      'Pimax Crystal': 'headset_pimax.png',
      'Pimax Crystal Light': 'headset_pimax.png',
      'Pimax Crystal Super': 'headset_pimax.png',
      'Pimax Vision 8K': 'headset_pimax.png',
      'Pimax Vision 8K Plus': 'headset_pimax.png',
      'Pimax Vision 8K X': 'headset_pimax.png',
      // dpvr
      'DPVR E3': 'headset_dpvr_e4.png',
      'DPVR E4': 'headset_dpvr_e4.png',
      // playstation
      PSVR2: 'headset_psvr2.png',
      // wmr headsets
      'Windows MR': 'headset_windows_mr.png',
      'Samsung Odyssey': 'headset_windows_mr.png',
      'Samsung Odyssey+': 'headset_windows_mr.png',
      'HP Reverb': 'headset_windows_mr.png',
      'HP Reverb G2': 'headset_windows_mr.png',
      'HP Reverb G2 Omnicept': 'headset_windows_mr.png',
      'HP WMR': 'headset_windows_mr.png',
      'Lenovo Explorer': 'headset_windows_mr.png',
      'Dell Visor': 'headset_windows_mr.png',
      // other
      'Bigscreen Beyond': 'headset_bigscreen_beyond.png',
      Unknown: 'headset_generic.png'
   })
);

// family based hmd fallbacks, checked in order
const HMD_FAMILIES: [(name: string) => boolean, string][] = [
   [(n) => n.startsWith('Quest'), 'headset_oculus_rift_quest.png'],
   [(n) => n.startsWith('Pimax'), 'headset_pimax.png'],
   [(n) => n.startsWith('PICO'), 'headset_pico_4.png'],
   [(n) => n.startsWith('Pico'), 'headset_pico_neo_3.png'],
   [(n) => n.startsWith('Vive'), 'headset_htc_vive.png'],
   [(n) => n.startsWith('Varjo'), 'headset_varjo_aero.png'],
   // wmr oems
   [(n) => n.startsWith('Acer'), 'headset_windows_mr.png'],
   [(n) => n.startsWith('ASUS'), 'headset_windows_mr.png'],
   [(n) => n.startsWith('Dell'), 'headset_windows_mr.png'],
   [(n) => n.startsWith('Fujitsu'), 'headset_windows_mr.png'],
   [(n) => n.startsWith('HP'), 'headset_windows_mr.png'],
   [(n) => n.startsWith('Lenovo'), 'headset_windows_mr.png'],
   [(n) => n.startsWith('Medion'), 'headset_windows_mr.png'],
   [(n) => n.startsWith('Samsung'), 'headset_windows_mr.png'],
   [(n) => n.includes('WMR') || n.includes('Windows MR'), 'headset_windows_mr.png']
];

export function getHmdImage(name: string) {
   const exact = HMD_MAP.get(name);
   if (exact) return `${BASE}/${exact}`;

   for (const [test, file] of HMD_FAMILIES) {
      if (test(name)) return `${BASE}/${file}`;
   }

   // fallback for any unmapped headset
   return `${BASE}/headset_generic.png`;
}

// controller images, left/right pairs or single
type ControllerEntry = { left: string; right: string } | { single: string };
type ControllerPair = { left: string; right: string };

const CONTROLLER_MAP = new Map<string, ControllerEntry>(
   Object.entries({
      // oculus/meta touch controllers
      'Quest 1 Touch': { left: 'controller_oculus_touch_cv1_left.png', right: 'controller_oculus_touch_cv1_right.png' },
      'Quest 2 Touch': { left: 'controller_oculus_touch_2_left.png', right: 'controller_oculus_touch_2_right.png' },
      'Quest 3 Touch': { left: 'controller_oculus_touch_3_left.png', right: 'controller_oculus_touch_3_right.png' },
      'Quest 3S Touch': { left: 'controller_oculus_touch_3_left.png', right: 'controller_oculus_touch_3_right.png' },
      'Quest Pro Touch': { left: 'controller_oculus_touch_3_left.png', right: 'controller_oculus_touch_3_right.png' },
      'Rift CV1': { left: 'controller_oculus_touch_cv1_left.png', right: 'controller_oculus_touch_cv1_right.png' },
      'Rift S': { left: 'controller_oculus_rift_s_left.png', right: 'controller_oculus_rift_s_right.png' },
      'Rift DK2': { left: 'controller_oculus_touch_cv1_left.png', right: 'controller_oculus_touch_cv1_right.png' },
      'Oculus Remote': { single: 'controller_oculus_touch_cv1_left.png' },
      // valve index
      Index: { left: 'controller_valve_index_knuckles_left.png', right: 'controller_valve_index_knuckles_right.png' },
      Knuckles: { left: 'controller_valve_index_knuckles_left.png', right: 'controller_valve_index_knuckles_right.png' },
      'Knuckles Pre-PV': { left: 'controller_valve_index_knuckles_left.png', right: 'controller_valve_index_knuckles_right.png' },
      // htc vive
      Vive: { single: 'controller_htc_vive_wand.png' },
      'Vive Cosmos': { left: 'controller_vive_cosmos_left.png', right: 'controller_vive_cosmos_right.png' },
      'Vive Pro': { single: 'controller_htc_vive_wand.png' },
      'Vive Focus 3': { single: 'controller_htc_vive_wand.png' },
      // vive trackers
      'Vive Tracker': { single: 'tracker_vive_tracker.png' },
      'Vive Tracker 3.0': { single: 'tracker_vive_tracker.png' },
      'Vive 3.0 Tracker': { single: 'tracker_vive_tracker.png' },
      'Vive Tracker Pro': { single: 'tracker_vive_tracker.png' },
      'Tundra Tracker': { single: 'tracker_tundra_tracker.png' },
      // varjo
      Varjo: { left: 'controller_varjo_left.png', right: 'controller_varjo_right.png' },
      // pico
      Pico: { left: 'controller_pico_neo_3_left.png', right: 'controller_pico_neo_3_right.png' },
      'PICO 4': { left: 'controller_pico_neo_3_left.png', right: 'controller_pico_neo_3_right.png' },
      'Pico Neo 2': { left: 'controller_pico_neo_3_left.png', right: 'controller_pico_neo_3_right.png' },
      'Pico Neo 3': { left: 'controller_pico_neo_3_left.png', right: 'controller_pico_neo_3_right.png' },
      'Pico Phoenix': { left: 'controller_pico_neo_3_left.png', right: 'controller_pico_neo_3_right.png' },
      // pimax
      Pimax: { single: 'controller_pimax.png' },
      // dpvr
      'E4 Controller': { left: 'controller_dpvr_e4_left.png', right: 'controller_dpvr_e4_right.png' },
      // playstation
      'PSVR2 Sense': { left: 'controller_psvr2_sense_left.png', right: 'controller_psvr2_sense_right.png' },
      // wmr controllers
      'Windows MR': { left: 'controller_windows_mr_left.png', right: 'controller_windows_mr_right.png' },
      'Acer AH101': { left: 'controller_windows_mr_left.png', right: 'controller_windows_mr_right.png' },
      'HP Reverb': { left: 'controller_windows_mr_left.png', right: 'controller_windows_mr_right.png' },
      Odyssey: { left: 'controller_windows_mr_left.png', right: 'controller_windows_mr_right.png' },
      'Samsung Odyssey': { left: 'controller_windows_mr_left.png', right: 'controller_windows_mr_right.png' },
      Huawei: { left: 'controller_windows_mr_left.png', right: 'controller_windows_mr_right.png' },
      // other
      ContactGlove: { left: 'controller_contactglove_2_left.png', right: 'controller_contactglove_2_right.png' },
      etee: { left: 'controller_etee_left.png', right: 'controller_etee_right.png' },
      NOLO: { single: 'controller_nolo.png' },
      'NOLO Sonic': { single: 'controller_nolo.png' }
   })
);

// family based controller fallbacks
const CONTROLLER_FAMILIES: [(name: string) => boolean, ControllerEntry][] = [
   [(n) => n.includes('Touch'), { left: 'controller_oculus_touch_3_left.png', right: 'controller_oculus_touch_3_right.png' }],
   [(n) => n.startsWith('Knuckles'), { left: 'controller_valve_index_knuckles_left.png', right: 'controller_valve_index_knuckles_right.png' }],
   [(n) => n.startsWith('Pico'), { left: 'controller_pico_neo_3_left.png', right: 'controller_pico_neo_3_right.png' }],
   [(n) => n.includes('Tracker'), { single: 'tracker_vive_tracker.png' }],
   [(n) => n.startsWith('Vive'), { single: 'controller_htc_vive_wand.png' }],
   [(n) => n.includes('WMR') || n.includes('Windows MR'), { left: 'controller_windows_mr_left.png', right: 'controller_windows_mr_right.png' }]
];

// disambiguate "Touch" by hmd
function resolveTouchByHmd(hmd: string): ControllerPair {
   if (hmd === 'Rift CV1' || hmd === 'Rift DK2') {
      return { left: 'controller_oculus_touch_cv1_left.png', right: 'controller_oculus_touch_cv1_right.png' };
   }
   if (hmd === 'Rift S' || hmd === 'Quest 1' || hmd.startsWith('Quest 1')) {
      return { left: 'controller_oculus_rift_s_left.png', right: 'controller_oculus_rift_s_right.png' };
   }
   if (hmd === 'Quest 2' || hmd.startsWith('Quest 2')) {
      return { left: 'controller_oculus_touch_2_left.png', right: 'controller_oculus_touch_2_right.png' };
   }
   return { left: 'controller_oculus_touch_3_left.png', right: 'controller_oculus_touch_3_right.png' };
}

export function getControllerImage(name: string, side: 'left' | 'right', hmd?: string) {
   if (hmd === 'PSVR2') {
      return `${BASE}/controller_psvr2_sense_${side}.png`;
   }

   if (name === 'Touch') {
      const entry = resolveTouchByHmd(hmd ?? '');
      return `${BASE}/${side === 'left' ? entry.left : entry.right}`;
   }

   let entry = CONTROLLER_MAP.get(name);

   if (!entry) {
      for (const [test, e] of CONTROLLER_FAMILIES) {
         if (test(name)) {
            entry = e;
            break;
         }
      }
   }

   if (!entry) return null;

   if ('single' in entry) return `${BASE}/${entry.single}`;
   return `${BASE}/${side === 'left' ? entry.left : entry.right}`;
}

// png filename -> detailed svg filename (in /images/devices/detailed/)
const DETAILED_MAP = new Map<string, string>(
   Object.entries({
      // headsets
      'headset_valve_index.png': 'headset_valve_index.svg',
      'headset_htc_vive.png': 'headset_htc_vive.svg',
      'headset_htc_vive_pro.png': 'headset_htc_vive_pro.svg',
      'headset_oculus_rift_cv1.png': 'headset_oculus_rift.svg',
      'headset_oculus_dk2.png': 'headset_oculus_rift.svg',
      'headset_dpvr_e4.png': 'headset_dpvr_e4.svg',
      'headset_pico_neo_3.png': 'headset_pico_neo_3.svg',
      'headset_psvr2.png': 'headset_psvr2_playstation.svg',
      'headset_windows_mr.png': 'headset_windows_mr.svg',
      // controllers
      'controller_valve_index_knuckles_left.png': 'controller_valve_index_knuckles_left.svg',
      'controller_valve_index_knuckles_right.png': 'controller_valve_index_knuckles_right.svg',
      'controller_htc_vive_wand.png': 'controller_htc_vive_wand.svg',
      'controller_oculus_touch_cv1_left.png': 'controller_oculus_touch_cv1_left.svg',
      'controller_oculus_touch_cv1_right.png': 'controller_oculus_touch_cv1_right.svg',
      'controller_dpvr_e4_left.png': 'controller_dpvr_e4_left.svg',
      'controller_dpvr_e4_right.png': 'controller_dpvr_e4_right.svg',
      'controller_etee_left.png': 'controller_etee_left.svg',
      'controller_etee_right.png': 'controller_etee_right.svg',
      'controller_pico_neo_3_left.png': 'controller_pico_neo_3_left.svg',
      'controller_pico_neo_3_right.png': 'controller_pico_neo_3_right.svg',
      'controller_psvr2_sense_left.png': 'controller_psvr2_sense_playstation_vr2_left.svg',
      'controller_psvr2_sense_right.png': 'controller_psvr2_sense_playstation_vr2_right.svg',
      'controller_varjo_left.png': 'controller_varjo_left.svg',
      'controller_varjo_right.png': 'controller_varjo_right.svg',
      'controller_vive_cosmos_left.png': 'controller_vive_cosmos_left.svg',
      'controller_vive_cosmos_right.png': 'controller_vive_cosmos_right.svg',
      'controller_windows_mr_left.png': 'controller_windows_mr_motion.svg',
      'controller_windows_mr_right.png': 'controller_windows_mr_motion.svg'
   })
);

// pngs that are light (~#D2D2D2) instead of dark (~#4C4B50), need stronger inversion in dark mode
const LIGHT_IMAGES = new Set([
   'controller_ivry_nolo.png',
   'controller_pimax.png',
   'controller_pimax_crystal.png',
   'controller_oculus_touch_3_left.png',
   'controller_oculus_touch_3_right.png',
   'controller_oculus_touch_2_left.png',
   'controller_oculus_touch_2_right.png',
   'controller_pico_neo_3_left.png',
   'controller_pico_neo_3_right.png',
   'controller_vive_cosmos_left.png',
   'controller_vive_cosmos_right.png',
   'headset_pico_neo_3.png',
   'headset_vive_cosmos.png',
   'headset_vive_cosmos_play.png',
   'headset_vive_cosmos_elite_etm.png',
   'headset_generic.png'
]);

export function isLightImage(imagePath: string) {
   const filename = imagePath.split('/').pop();
   return filename ? LIGHT_IMAGES.has(filename) : false;
}

// given a full image path like /images/devices/foo.png, return the detailed svg path or null
export function getDetailedImage(imagePath: string) {
   const filename = imagePath.split('/').pop();
   if (!filename) return null;
   const detailed = DETAILED_MAP.get(filename);
   if (!detailed) return null;
   return `${BASE}/detailed/${detailed}`;
}
