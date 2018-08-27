import Types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: true,
  data: {
    username: 'Anonymous',
    type: 'ADMIN'
  }
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case Types.USER_LOG_OUT:


      return Object.assign({},
        state,
        { isFetching: true }
      );
    case Types.USER_LOG_IN:


      return Object.assign({},
        state,
        {
          data: action.payload.books,
          isFetching: false,
        }
      );
    case Types.FETCH_USERS:


      return Object.assign({},
        state,
        { isFetching: false }
      );
    default:
      return state;
  }
}