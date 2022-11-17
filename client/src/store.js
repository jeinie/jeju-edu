import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice.js'

export default configureStore({
    reducer: {
       user : user.reducer
    }
})