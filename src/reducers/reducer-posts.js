import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions/index';

const INITIAL_STATE = {
    all: [],
    post: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POST:
            return {
                ...state, //=> take whatever the state currently is and add the following properties
                post: action.payload.data
            };
        case DELETE_POST:
            return state;
        case FETCH_POSTS:
            return {
                post: null,
                all: action.payload.data
            };
        default:
            return state;
    }
}
