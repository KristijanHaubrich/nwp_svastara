import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { clientDataReducer } from "./clientReducer";
  import { loginReducer } from "./loginReducer";
  import { configureStore,combineReducers } from "@reduxjs/toolkit";
  const persistConfig = {
      key: 'root',
      storage: AsyncStorage
    }
  
  const rootReducer = combineReducers({
    client: clientDataReducer,
    login: loginReducer
  });  
    
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    
    export default () => {
      let store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
      })
      let persistor = persistStore(store)
      return { store, persistor }
    }