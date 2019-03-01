## API一覧

### タグ一覧取得

#### URL
- https://hikawa.nkmr.io/fixture/get_taglist.php

#### @type
- GET

#### @param
- NONE

#### @return
- tagId
- tagName

------------------------------------------------------------------------------------------------------------------

### ユーザ一覧取得

#### URL
- https://hikawa.nkmr.io/fixture/get_userlist.php

#### @type
- GET

#### @param
- NONE

#### @return
- userId
- userName
  - firstName
  - lastName
- channelName

------------------------------------------------------------------------------------------------------------------

### 貸出処理

#### URL
- https://hikawa.nkmr.io/fixture/rental.php

#### @type
- POST

#### @param
- user_id
- fixture_id

#### @return
- status
  - code
  - message

------------------------------------------------------------------------------------------------------------------

### 返却処理

#### URL
- https://hikawa.nkmr.io/fixture/return.php

#### @type
- POST

#### @param
- rental_id

#### @return
- status
  - code
  - message

------------------------------------------------------------------------------------------------------------------

### 貸出状況取得

#### URL
- https://hikawa.nkmr.io/fixture/get_rentallist.php

#### @type
- GET

#### @param
- NONE

#### @return
- rentalId
- fixture
  - id
  - name
  - image
- user
  - id
  - name
    - firstName
    - lastName

------------------------------------------------------------------------------------------------------------------

### タグ絞り込み

#### URL
- https://hikawa.nkmr.io/fixture/get_fixturelist.php

#### @type
- GET

#### @param
- NONE 全タグ表示の場合
- tags array tagIdで指定 タグ絞り込みの場合

#### @return
- fixtureId
- fixtureName
- fixtureImage
- retailerUrl
- stock
- rentalList
  - userId
  - userName
    - firstName
    - lastName
  - rentalAt
  
  ------------------------------------------------------------------------------------------------------------------

### 備品情報取得

#### URL
- https://hikawa.nkmr.io/fixture/get_fixtureinfo.php

#### @type
- GET

#### @param
- fixture_id

#### @return
- fixtureId
- fixtureName
- fixtureImage
- retailerUrl
- stock
