import { configureStore } from "@reduxjs/toolkit"
import TodoSlice from "./TodoSilce";

const store = configureStore({

    reducer: {
        tasks : TodoSlice.reducer,
    }

})

export default store;