import {createSlice} from "@reduxjs/toolkit";


export interface MessageState {
    messages:any[];
}

const initialState: MessageState = {
    messages: []
};

export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        putMessages: (state, action) => {
            state.messages = action.payload
        },
    }
});





export const {putMessages} = messageSlice.actions;
export  default  messageSlice.reducer;