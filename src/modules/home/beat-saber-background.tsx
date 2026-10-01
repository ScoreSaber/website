import type { CSSProperties } from 'react';

import { BeatSaberParticles } from './beat-saber-particles';

const MENU_BACKGROUND_STYLE: CSSProperties = {
   background: [
      'radial-gradient(ellipse at 50% 44%, rgba(92, 205, 238, 0.34) 0%, rgba(31, 134, 199, 0.29) 29%, rgba(7, 66, 108, 0.18) 52%, rgba(2, 10, 24, 0) 78%)',
      'radial-gradient(ellipse 88% 58% at 50% -8%, rgba(255, 224, 82, 0.34) 0%, rgba(255, 199, 28, 0.13) 34%, rgba(255, 199, 28, 0) 70%)',
      'radial-gradient(ellipse at 15% 68%, rgba(0, 210, 255, 0.2) 0%, rgba(0, 210, 255, 0) 46%)',
      'radial-gradient(ellipse at 85% 66%, rgba(39, 136, 255, 0.17) 0%, rgba(39, 136, 255, 0) 48%)',
      'linear-gradient(180deg, #00020b 0%, #020716 24%, #061d30 54%, #064162 100%)'
   ].join(', ')
};

const FLOOR_HAZE_STYLE: CSSProperties = {
   background: 'linear-gradient(180deg, rgba(73, 220, 255, 0) 0%, rgba(73, 220, 255, 0.24) 38%, rgba(5, 64, 96, 0.54) 100%)'
};

const PAGE_DARKENING_STYLE: CSSProperties = {
   background: [
      'radial-gradient(ellipse 155% 76% at 50% 0%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 0.24) 68%, rgba(0, 0, 0, 0.64) 100%)',
      'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.18) 34%, rgba(0, 0, 0, 0.78) 100%)'
   ].join(', ')
};

export function BeatSaberPageBackground() {
   return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
         <div className="absolute inset-0 overflow-hidden" style={MENU_BACKGROUND_STYLE}>
            <BeatSaberParticles />
            <div className="absolute inset-x-[-20%] bottom-[-18%] h-[58%]" style={FLOOR_HAZE_STYLE} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_45%,rgba(0,0,0,0.62)_100%)]" />
         </div>
         <div className="absolute inset-x-0 top-[10rem] bottom-0" style={PAGE_DARKENING_STYLE} />
      </div>
   );
}
