// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      surface: string;
      text: string;
      border: string;
      success: string;
      error: string;
      muted: string;
      explanationBg: string;
      cardBg: string;
      explanationText: string;
      highlightOption: string;
      textSecondary: string;
      textInverted: string;
      divider: string;
      warning: string;
      info: string;
      primaryHover: string;
      secondaryHover: string;
    };
    mode: string;
  }
}
