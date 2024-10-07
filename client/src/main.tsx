
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import store from './state/store/store.ts'
ReactDOM.createRoot(document.getElementById('root')!).render(
<Provider store={store}>
    <NextUIProvider>
    <App />
    </NextUIProvider>
    </Provider>
)
