import { configureStore } from '@reduxjs/toolkit';

import currentUserReducer from './userSlice';
import cartReducer from './cartSlice';
import msgReducer from './msgSlice';

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    cart: cartReducer,
    msg: msgReducer,
  },
});
