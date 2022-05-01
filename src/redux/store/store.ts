import {configureStore} from "@reduxjs/toolkit";
import messageReducer from "../features/messageSlice";
import {messageApi} from "../services/message";
import {setupListeners} from "@reduxjs/toolkit/query";
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const store = configureStore({
    reducer: {
        messages: messageReducer,
        [messageApi.reducerPath]: messageApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(messageApi.middleware)
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch);