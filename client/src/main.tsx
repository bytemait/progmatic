import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import StoreProvider from './store/StoreProvider.tsx';
import DebugStore from './store/DebugStore.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
    <App />
    <DebugStore/>
    </StoreProvider>
)
