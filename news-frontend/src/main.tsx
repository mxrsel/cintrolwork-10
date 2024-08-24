import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { store } from './app/store.ts';
import { BrowserRouter } from 'react-router-dom';
import theme from "./theme.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </Provider>,
)
