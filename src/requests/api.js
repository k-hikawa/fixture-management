import axios from 'axios';

// 貸出状況取得
export function reqRentalList() {
    const reqUrl = 'https://hikawa.nkmr.io/fixture/get_rentallist.php';
    return axios.get(reqUrl);
}

// 返却処理
export async function reqReturn(rentalId) {
    const reqUrl = 'https://hikawa.nkmr.io/fixture/return.php';
    let params = new URLSearchParams();
    params.append('rental_id', rentalId);
    return await axios.post(reqUrl, params);
}
