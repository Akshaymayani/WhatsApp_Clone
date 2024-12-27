import {configureStore} from '@reduxjs/toolkit';
import headersliceReducer from './Features/HeaderSelection';
import refreshChatReducer from './Features/RefreshChat';

const store = configureStore({
  reducer: {
    header: headersliceReducer,
    refreshChat: refreshChatReducer,
  },
});
// console.log(store.getState());
export default store;
export type RootState = ReturnType<typeof store.getState>;
