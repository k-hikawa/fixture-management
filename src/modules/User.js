import axios from 'axios';

// action type
const GET_USER_LIST = 'get_user_list';

// initial state
const initialState = {
	list: [],
}

// reducer
export default function reducer(state = initialState, action){
	switch(action.type){
		case GET_USER_LIST:
			return {
				...state,
				list: action.payload.data,
			};
		default :
			return state;
	}
}

// action-creator
export function getUserList() {
	const userList = reqUserList();
    return {
      type: GET_USER_LIST,
      payload: userList,
  }
}

// api requests
// ユーザリスト
export async function reqUserList() {
  const reqUrl = 'https://hikawa.nkmr.io/fixture/get_userlist.php';
  return axios.get(reqUrl);
}
