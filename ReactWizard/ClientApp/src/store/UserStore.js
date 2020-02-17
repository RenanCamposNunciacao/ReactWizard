const requestUsersType = 'REQUEST_USERS';
const receiveUsersType = 'RECEIVE_USERS';
const saveUsersType = 'SAVE_USERS';
const finishedSaveUsersType = 'FINISHED_SAVE_USERS';
const deleteUsersType = 'DELETE_USERS';
const finishedDeleteUsersType = 'FINISHED_DELETE_USERS';
const loadUserType = 'LOAD_USER';
const finishedLoadUserType = 'FINISHED_LOAD_USER';
const initialState = {
    users_list: [], user: {}, isLoading: false, message: '' };

export const actionCreators = {
    requestUsers: (startIndex, forceUpdate) => async (dispatch, getState) => {
        if (!forceUpdate && startIndex === getState().users_list.startIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestUsersType, startIndex });
        const url = `api/User/List?startIndex=${startIndex}`;
        const response = await fetch(url);
        const users_list = await response.json();
        dispatch({ type: receiveUsersType, startIndex, users_list });
    },
    saveUser: user => async (dispatch, getState) => {
        if (user === getState().user) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: saveUsersType, user });
        const url = `api/User/Save`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" }
        });
        const save_user_result = await response.json();
        dispatch({ type: finishedSaveUsersType, save_user_result });
    },
    loadUser: userId => async (dispatch, getState) => {
        dispatch({ type: loadUserType, userId });
    },
    finishedLoadUser: () => async (dispatch, getState) => {
        dispatch({ type: finishedLoadUserType });
    },
    deleteUser: userId => async (dispatch, getState) => {
        dispatch({ type: deleteUsersType, userId });
        const userToDelete = getState().users_list.users_list.filter(user => user.id === userId)[0];
        const url = `api/User/Delete`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userToDelete),
            headers: { "Content-Type": "application/json" }
        });
        const delete_user_result = await response.json();
        dispatch({ type: finishedDeleteUsersType, delete_user_result });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;
    
    if (action.type === requestUsersType) {
        return {
            ...state,
            startIndex: action.startIndex,
            isLoading: true
        };
    }

    if (action.type === receiveUsersType) {
        return {
            ...state,
            startIndex: action.startIndex,
            users_list: action.users_list,
            isLoading: false
        };
    }

    if (action.type === saveUsersType) {
        return {
            ...state,
            user: action.user,
            isLoading: true
        };
    }

    if (action.type === finishedSaveUsersType) {
        return {
            ...state,
            user: action.save_user_result.object,
            message: action.save_user_result.message,
            isLoading: false
        };
    }

    if (action.type === loadUserType) {
        
        return {
            ...state,
            user: state.users_list.filter(user => user.id === action.userId)[0]
        };
    }

    if (action.type === finishedLoadUserType) {

        return {
            ...state,
            user: {}
        };
    }

    if (action.type === deleteUsersType) {
        return {
            ...state,
            user: {},
            isLoading: true
        };
    }

    if (action.type === finishedDeleteUsersType) {
        return {
            ...state,
            user: action.delete_user_result.object,
            message: action.delete_user_result.message,
            isLoading: false
        };
    }

    return state;
};
