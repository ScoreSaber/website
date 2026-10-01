import { Children, type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

const FLICKER_MIN_DELAY_MS = 50;
const FLICKER_MAX_DELAY_MS = 400;
const FLICKER_ON_DELAY_SCALE = 5;
const FLICKER_OFF_DELAY_SCALE = 0.32;
const SPARK_MIN_COUNT = 1;
const SPARK_MAX_COUNT = 3;
const SPARK_LIFETIME_MS = 340;

type NeonSpark = {
   id: number;
   x: number;
   y: number;
   size: number;
   angle: number;
   distance: number;
   delay: number;
   duration: number;
};

export function ScoreSaberBrand({ children }: { children: ReactNode }) {
   const { letterOn, sparks } = useNeonFlicker();
   const brandText = getSingleTextChild(children);

   return (
      <span className="relative isolate inline-block align-baseline whitespace-nowrap">
         <span className="home-brand-text text-primary font-pixel relative z-10 font-black tracking-widest [-webkit-text-stroke:1px_currentColor]">
            {brandText === null ? children : renderBrandText(brandText, letterOn, sparks)}
         </span>
      </span>
   );
}

function getSingleTextChild(children: ReactNode) {
   const childArray = Children.toArray(children);
   if (childArray.length !== 1) return null;

   const child = childArray[0];
   return typeof child === 'string' ? child : null;
}

function useNeonFlicker() {
   const [letterOn, setLetterOn] = useState(true);
   const [sparks, setSparks] = useState<NeonSpark[]>([]);
   const nextSparkId = useRef(0);

   useEffect(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
         return;
      }

      let timeoutId: number | undefined;
      const sparkCleanupIds: number[] = [];

      const emitSparks = () => {
         const count = getRandomInt(SPARK_MIN_COUNT, SPARK_MAX_COUNT);
         const nextSparks = Array.from({ length: count }, () => ({
            id: nextSparkId.current++,
            x: getRandomBetween(34, 74),
            y: getRandomBetween(22, 78),
            size: getRandomBetween(1.7, 3.2),
            angle: getRandomBetween(-38, 38),
            distance: getRandomBetween(7, 16),
            delay: getRandomBetween(0, 18),
            duration: getRandomBetween(220, 360)
         }));
         const nextSparkIds = new Set(nextSparks.map((spark) => spark.id));

         setSparks((currentSparks) => [...currentSparks.slice(-18), ...nextSparks]);

         const cleanupId = window.setTimeout(() => {
            setSparks((currentSparks) => currentSparks.filter((spark) => !nextSparkIds.has(spark.id)));
         }, SPARK_LIFETIME_MS);
         sparkCleanupIds.push(cleanupId);
      };

      const scheduleToggle = (on: boolean) => {
         const sourceDelayMs = getRandomBetween(FLICKER_MIN_DELAY_MS, FLICKER_MAX_DELAY_MS);
         const delayMs = on ? sourceDelayMs * FLICKER_ON_DELAY_SCALE : sourceDelayMs * FLICKER_OFF_DELAY_SCALE;

         timeoutId = window.setTimeout(() => {
            const nextOn = !on;
            setLetterOn(nextOn);

            if (nextOn) {
               emitSparks();
            }

            scheduleToggle(nextOn);
         }, delayMs);
      };

      scheduleToggle(true);

      return () => {
         if (timeoutId !== undefined) {
            window.clearTimeout(timeoutId);
         }
         sparkCleanupIds.forEach((cleanupId) => window.clearTimeout(cleanupId));
      };
   }, []);

   return { letterOn, sparks };
}

function renderBrandText(text: string, letterOn: boolean, sparks: NeonSpark[]) {
   const lowerText = text.toLowerCase();
   const firstEIndex = lowerText.indexOf('e');
   const flickerIndex = firstEIndex === -1 ? -1 : lowerText.indexOf('e', firstEIndex + 1);

   if (flickerIndex === -1) {
      return text;
   }

   return (
      <>
         {text.slice(0, flickerIndex)}
         <span className="home-brand-flicker-anchor">
            <span className={`home-brand-flicker-letter${letterOn ? '' : ' is-off'}`}>{text.charAt(flickerIndex)}</span>
            <span className="home-brand-sparks" aria-hidden>
               {sparks.map((spark) => {
                  const style: CSSProperties & {
                     '--spark-x': string;
                     '--spark-y': string;
                     '--spark-size': string;
                     '--spark-angle': string;
                     '--spark-distance': string;
                     '--spark-delay': string;
                     '--spark-duration': string;
                  } = {
                     '--spark-x': `${spark.x}%`,
                     '--spark-y': `${spark.y}%`,
                     '--spark-size': `${spark.size}px`,
                     '--spark-angle': `${spark.angle}deg`,
                     '--spark-distance': `${spark.distance}px`,
                     '--spark-delay': `${spark.delay}ms`,
                     '--spark-duration': `${spark.duration}ms`
                  };
                  return <span key={spark.id} className="home-brand-spark" style={style} />;
               })}
            </span>
         </span>
         {text.slice(flickerIndex + 1)}
      </>
   );
}

function getRandomBetween(min: number, max: number) {
   return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
   return Math.floor(getRandomBetween(min, max + 1));
}
