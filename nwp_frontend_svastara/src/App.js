import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/configureStore';
import AppNavigation from './AppNavigation';

const {store, persistor}= configureStore()

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
    </PersistGate>
    </Provider>
  );
};

export default App;