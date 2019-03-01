import * as api from '../requests/api';

// action type
const GET_RENTAL_LIST = 'get_rental_list';
const DO_RETURN = 'do_return';

// initial State
const initialState = {
  rentalList: [],
  returnRow: -1,
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RENTAL_LIST:
      return {
        ...state,
        rentalList: action.payload.data
      };
    case DO_RETURN:
      // 配列から削除
      state.rentalList.splice(action.returnRow, 1);
      return {
        ...state,
        rentalList: state.rentalList,
      };
    default:
      return state;
  }
}

// action-creator
export function getRentalList() {
  const rentalList = api.reqRentalList();
  return {
    type: GET_RENTAL_LIST,
    payload: rentalList
  }
}

export function doReturn(rentalId, returnRow) {
  const result = api.reqReturn(rentalId);
  // ほんとはpayload内にreturnRowをいれたいんだが、resultにPromise型ごと入ってまう
  return {
    type: DO_RETURN,
    payload: result,
    returnRow: returnRow,
  };
}
