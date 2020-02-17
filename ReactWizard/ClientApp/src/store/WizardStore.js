const getCurrentUserType = 'GET_CURRENT_USER';
const setCurrentUserType = 'SET_CURRENT_USER';
const getCurrentUserAddressType = 'GET_CURRENT_USERADDRESS';
const setCurrentUserAddressType = 'SET_CURRENT_USERADDRESS';
const setUpdateUserAddressType = 'SET_UPDATE_USERADDRESS';
const initialState = { current_user: -1, current_useraddress: -1, updateAddresses: false };

export const actionCreators = {
    setUser: userId => (dispatch, getState) => {
        dispatch({ type: setCurrentUserType, userId });
    },
    getUser: () => (dispatch, getState) => {
        dispatch({ type: getCurrentUserType });
    },
    setUserAddress: userAddressId => (dispatch, getState) => {
        dispatch({ type: setCurrentUserAddressType, userAddressId });
    },
    getUserAddress: () => (dispatch, getState) => {
        dispatch({ type: getCurrentUserAddressType });
    },
    setUpdateAddresses: updateAddresses => (dispatch, getState) => {
        dispatch({ type: setUpdateUserAddressType, updateAddresses });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === setCurrentUserType) {
        return {
            ...state,
            current_user: action.userId
        };
    }

    if (action.type === setCurrentUserAddressType) {
        return {
            ...state,
            current_useraddress: action.userAddressId
        };
    }

    if (action.type === setUpdateUserAddressType) {
        return {
            ...state,
            updateAddresses: action.updateAddresses
        };
    }
    
    return state;
};
