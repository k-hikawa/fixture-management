import axios from 'axios';

// action type
const GET_TAG_LIST = 'get_tag_list';

// initial State
const initialState = {
  list: [],
  numOfList: 0,
}

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAG_LIST:
      return {
        list: action.payload.data,
        numOfList: action.payload.data.length
      }
    default:
      return state;
  }
}

// action-creator
export function getTagList() {
  const tagList = reqTagList();
  return {
    type: GET_TAG_LIST,
    payload: tagList
  }
}

// api requests
// タグリスト
export function reqTagList() {
    const reqUrl = 'https://hikawa.nkmr.io/fixture/get_taglist.php';
    return axios.get(reqUrl);
}
