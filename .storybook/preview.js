import {ThemeProvider, CssBaseline, createTheme} from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import App from '../src/App.css'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [withThemeFromJSXProvider({
    GlobalStyles: CssBaseline,
    Provider: ThemeProvider,
    themes: {
      light: lightTheme
    },
    defaultTheme: 'light',
  })]
};

export default preview;
