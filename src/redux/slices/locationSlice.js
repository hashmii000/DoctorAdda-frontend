const initialState = {
  userProfileData: null,
  isLoggedIn: false,
  userLocation: null, // <-- add this
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    // ... other reducers
  },
});

export const { updateUserLocation, login, logout, updateUserProfile } =
  userSlice.actions;
export default userSlice.reducer;
