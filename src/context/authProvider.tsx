import { Provider } from 'react-redux';
import { store } from '../hooks/useRedux';
import { BrowserRouter } from 'react-router-dom';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
}