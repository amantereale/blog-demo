import {FETCH_POSTS} from '../actions/index';

const INITIAL_STATE = {
    all: [],
    post: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state, //=> take whatever the state currently is and add the following properties
                all: action.payload.data
            };
        default:
            return state;
    }
}
