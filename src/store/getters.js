//rides
export const getRides = state => state.rides;
export const getUserRides = state => state.userRides;
export const getDetailsRide = state => state.detailsRide;
export const getEditingRide = state => state.editingRide;
export const isEditMode = state => state.editMode;
export const getUserData = state => state.userData;
export const getPhoto = state => state.photo;

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
