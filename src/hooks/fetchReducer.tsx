export const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
};

export const fetchReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_FETCH':
      return {
        ...state,
        [payload.name]: payload.value,
      };

    default:
      return state;
  }
};
