import { createSlice } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

const initialState = {
  isLoggedIn: false,
  userData: null,
  userProfileData: null, // New state for storing user profile data
  locationData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userData = action.payload;
      console.log("login data from redux", state.userData);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
      state.userProfileData = null;
      state.locationData = null;
    },
    updateUserProfile(state, action) {
      state.userProfileData = action.payload;
      console.log("user profile data updated in redux", state.userProfileData);
    },
    updateLocationData(state, action) {
      state.locationData = action.payload;
      console.log("location data updated in redux", state.locationData);
    },
    updateUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      if (action.payload && action.payload.user) {
        state.isLoggedIn = action.payload.user.isLoggedIn;
        state.userData = action.payload.user.userData.data;
        state.userProfileData = action.payload.user.userProfileData;
        state.locationData = action.payload.user.locationData;
        console.log("State rehydrated from cookies", state);
      }
    });
  },
});

export const {
  login,
  logout,
  updateUserProfile,
  updateLocationData,
  updateUserLocation,
} = userSlice.actions;
export default userSlice.reducer;
