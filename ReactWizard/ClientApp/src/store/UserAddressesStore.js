const requestUserAddressesType = 'REQUEST_USERADDRESSES';
const receiveUserAddressesType = 'RECEIVE_USERADDRESSES';
const saveUserAddressesType = 'SAVE_USERADDRESSES';
const finishedSaveUserAddressesType = 'FINISHED_SAVE_USERADDRESSES';
const deleteUserAddressesType = 'DELETE_USERADDRESSES';
const finishedDeleteUserAddressesType = 'FINISHED_DELETE_USERADDRESSES';
const loadUserAddressType = 'LOAD_USERADDRESS';
const finishedLoadUserAddressType = 'FINISHED_LOAD_USERADDRESS';
const initialState = {
    userAddresses_list: [], userAddress: {}, userId: -1, isLoading: false, message: ''
};

export const actionCreators = {
    requestUserAddresses: (startIndex, forceUpdate, userId) => async (dispatch, getState) => {
        if (userId <= 0 || (userId === getState().userAddresses_list.userId && !forceUpdate && startIndex === getState().userAddresses_list.startIndex)) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestUserAddressesType, startIndex, userId });
        const url = `api/UserAddress/List?startIndex=${startIndex}&userId=${userId}`;
        const response = await fetch(url);
        const userAddresses_list = await response.json();
        dispatch({ type: receiveUserAddressesType, startIndex, userAddresses_list, userId });
    },
    saveUserAddress: userAddress => async (dispatch, getState) => {
        if (userAddress === getState().userAddress) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        
        dispatch({ type: saveUserAddressesType, userAddress });
        const url = `api/UserAddress/Save`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userAddress),
            headers: { "Content-Type": "application/json" }
        });
        const save_useraddress_result = await response.json();
        dispatch({ type: finishedSaveUserAddressesType, save_useraddress_result });
    },
    loadUserAddress: userAddressId => async (dispatch, getState) => {
        dispatch({ type: loadUserAddressType, userAddressId });
    },
    finishedLoadUserAddress: () => async (dispatch, getState) => {
        dispatch({ type: finishedLoadUserAddressType });
    },
    deleteUserAddress: userAddressId => async (dispatch, getState) => {
        dispatch({ type: deleteUserAddressesType, userAddressId });
        const userAddressToDelete = getState().userAddresses_list.userAddresses_list.filter(userAddress => userAddress.id === userAddressId)[0];
        const url = `api/UserAddress/Delete`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userAddressToDelete),
            headers: { "Content-Type": "application/json" }
        });
        const delete_useraddress_result = await response.json();
        dispatch({ type: finishedDeleteUserAddressesType, delete_useraddress_result });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestUserAddressesType) {
        return {
            ...state,
            startIndex: action.startIndex,
            userId: action.userId,
            isLoading: true
        };
    }

    if (action.type === receiveUserAddressesType) {
        return {
            ...state,
            startIndex: action.startIndex,
            userId: action.userId,
            userAddresses_list: action.userAddresses_list,
            isLoading: false
        };
    }

    if (action.type === saveUserAddressesType) {
        return {
            ...state,
            userAddress: action.userAddress,
            isLoading: true
        };
    }

    if (action.type === finishedSaveUserAddressesType) {
        return {
            ...state,
            userAddress: action.save_useraddress_result.object,
            message: action.save_useraddress_result.message,
            isLoading: false
        };
    }

    if (action.type === loadUserAddressType) {
        return {
            ...state,
            userAddress: state.userAddresses_list.filter(userAddress => userAddress.id === action.userAddressId)[0]
        };
    }

    if (action.type === finishedLoadUserAddressType) {

        return {
            ...state,
            userAddress: {},
            message: ''
        };
    }

    if (action.type === deleteUserAddressesType) {
        return {
            ...state,
            userAddress: {},
            isLoading: true
        };
    }

    if (action.type === finishedDeleteUserAddressesType) {
        return {
            ...state,
            userAddress: action.delete_useraddress_result.object,
            message: action.delete_useraddress_result.message,
            isLoading: false
        };
    }

    return state;
};
