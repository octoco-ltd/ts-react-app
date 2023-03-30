import { Provider } from 'react-redux';
import store from '../src/store/store'
import { HelmetProvider } from 'react-helmet-async';
import { SidebarProvider } from '../src/contexts/SidebarContext';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '../src/theme/ThemeProvider';

export const decorators = [
  (Story) => (

    <Provider store={store}>
      <HelmetProvider>
        <SidebarProvider>
          <BrowserRouter initialEntries={['/']}>
            <ThemeProvider>
              {Story()}
            </ThemeProvider>
          </BrowserRouter>
        </SidebarProvider>
      </HelmetProvider>
    </Provider>

  )
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}