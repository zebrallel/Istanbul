import { handleActions } from 'redux-actions';
import { UPDATE_LOGIN } from './contants';

const initState = {
    loginStatus: false
};

export default handleActions(
    {
        [UPDATE_LOGIN]: (state, action) => {
            const { status } = action.payload;

            return { loginStatus: status };
        }
    },
    initState
);
