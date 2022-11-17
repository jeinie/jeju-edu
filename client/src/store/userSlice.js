import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name : 'user',
    initialState: {id:'', name:'', good_cnt:0, bad_cnt:0},
    reducers : {
        increaseGoodCnt(state){
            state.good_cnt += 1;
        },
        increaseBadCnt(state) {
            state.bad_cnt += 1;
        }
    }
});

export const { increaseGoodCnt, increaseBadCnt } = user.actions;

export default user;