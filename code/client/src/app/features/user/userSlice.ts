import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
}

const initialState: UserState = {
  id: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userInfo: (state, action: PayloadAction<number>) => {
      state.id = action.payload; // this is an example of how to use redux
    },
  },
});

export const { userInfo } = userSlice.actions;
export default userSlice.reducer;
