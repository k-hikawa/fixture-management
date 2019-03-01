import axios from 'axios';

// action type
const DO_RENTAL = 'do_rental';
const SELECT_RENTAL_ITEM = 'select_rental_item';
const POST_RENTAL_DATA = 'post_rental_data';

// initial State
const initialState = {
  fixtureId: '',
  fixtureName: '',
  fixtureImage: '',
  retailerUrl: '',
  stock: 0,
  rentalList: [],
  result: [],
}

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_RENTAL_ITEM:
      const item = action.payload.item;
      return {
        ...state,
        fixtureId: item.id,
        fixtureName: item.title,
        fixtureImage: item.img
      }
    case POST_RENTAL_DATA:
      return {
        ...state,
        result: action.payload.result,
      }
    default:
      return state;
  }
}

// action-creator
export function doRental() {
  return {
    type: DO_RENTAL,
    payload: null
  }
}

export function selectRentalItem(item) {
  return {
    type: SELECT_RENTAL_ITEM,
    payload: {
      item: item
    }
  }
}

export async function postRentalData(user_id, fixture_id){
  const reqUrl = 'https://hikawa.nkmr.io/fixture/rental.php';
  let params = new URLSearchParams();
  params.append('user_id', user_id);
  params.append('fixture_id', fixture_id);
  const result = await axios.post(reqUrl,params);
  return {
    type: POST_RENTAL_DATA,
    payload: {
      result: result,
    }
  }
}
