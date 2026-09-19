export function getDifficultyLabel(difficulty: number) {
   switch (difficulty) {
      case 1:
         return 'Easy';
      case 3:
         return 'Normal';
      case 5:
         return 'Hard';
      case 7:
         return 'Expert';
      case 9:
         return 'Expert+';
   }
   return 'Unknown';
}

export function getDifficultyShortLabel(difficulty: number) {
   switch (difficulty) {
      case 1:
         return 'Easy';
      case 3:
         return 'N';
      case 5:
         return 'H';
      case 7:
         return 'E';
      case 9:
         return 'E+';
   }
   return getDifficultyLabel(difficulty);
}

const GAME_MODE_LABELS: Record<string, string> = {
   SoloStandard: 'Standard',
   SoloNoArrows: 'No Arrows',
   Solo90Degree: '90°',
   Solo360Degree: '360°',
   SoloLightshow: 'Lightshow',
   SoloLawless: 'Lawless',
   SoloGenerated90Degree: 'Generated 90°',
   SoloGenerated360Degree: 'Generated 360°',
   SoloStandardOldDots: 'Standard (Old Dots)',
   SoloHorizontalStandard: 'Horizontal Standard'
};

export const DEFAULT_GAME_MODE = 'SoloStandard';

// game mode from raw difficulty, e.g. "_Easy_SoloStandard" -> "SoloStandard"
export function getGameModeFromRawDifficulty(rawDifficulty: string) {
   const parts = rawDifficulty.split('_');
   return parts.slice(2).join('_');
}

export function getGameModeLabel(gameMode: string) {
   if (gameMode in GAME_MODE_LABELS) {
      return GAME_MODE_LABELS[gameMode];
   }
   // unknown mode, strip "Solo" and space out capitals
   const stripped = gameMode.startsWith('Solo') ? gameMode.slice(4) : gameMode;
   return stripped.replace(/([A-Z])/g, ' $1').trim();
}

export function getNoSoloGameModeLabel(gameMode: string) {
   return gameMode.startsWith('Solo') ? gameMode.slice(4) : gameMode;
}

export function formatEnumLabel(value: string) {
   return value
      .toLowerCase()
      .split('_')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
}
