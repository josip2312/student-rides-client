//rides
export const getRides = state => state.rides;
export const getReservedRides = state => state.reservedRides;
export const getUserRides = state => state.userRides;
export const getUserData = state => state.userData;
export const getRideDetails = state => state.rideDetails;
export const getSearchedUserData = state => state.searchedUserData;
export const getEditingRide = state => state.editingRide;
export const getEditingUser = state => state.editingUser;
export const getPhoto = state => state.photo;
export const isEditMode = state => state.editRideMode;

//states
export const isLoading = state => state.loading;
export const isError = state => state.isError;
export const isSuccess = state => state.isSuccess;
export const getErrorMessage = state => state.errorMessage;
export const getSuccessMessage = state => state.successMessage;

//auth
export const isLoggedIn = state => state.loggedIn;
export const getJWT = state => state.jwtToken;
export const getLoggedInUser = state => state.loggedInUser;
