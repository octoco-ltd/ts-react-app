export enum themeNames {
  dark = 'NebulaFighterTheme',
  light = 'PureLightTheme',
}

export interface IThemeState {
  theme: themeNames | string;
}
