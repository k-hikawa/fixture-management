<?php
/* タグ絞り込みAPI
 *
 * @param
 * tags
 *
 * @return
 * fixtureId
 * fixtureName
 * fixtureImage
 * retailerUrl
 * stock
 * rentalList
 *  userId
 *  userName
 *  rentalAt
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json; charset=utf-8');
$result = [];

$secret = file_get_contents("./secret/.secret");
$params = explode("\n", $secret);
define("DSN", $params[0]);
define("USERNAME", $params[1]);
define("PASSWORD", $params[2]);
define("OPTIONS", [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8']);
try {
	$pdo = new PDO(DSN, USERNAME, PASSWORD, OPTIONS);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	exit($e->getMessage());
}

if (isset($_GET['tags'])) {
	$tags = $_GET['tags'];
	$tags_sql = " AND (";
	for ($i = 0; $i < count($tags); ++$i) {
		if ($i != 0) {
			$tags_sql .= " OR";
		}
		$tags_sql .= " ft.`tag_id` = '" . $tags[$i] . "'";
	}
	$tags_sql .= " )";
} else {
	$tags_sql = "";
}

$sql = "SELECT f.`fixture_id`, f.`fixture_name`, f.`img_url`, f.`retailer_url`, f.`stock` FROM `fixture_tags_table` AS ft INNER JOIN `fixture_table` AS f ON f.`fixture_id` = ft.`fixture_id`$tags_sql GROUP BY f.`fixture_id`";
$stmt = $pdo -> prepare($sql);
$stmt->execute();
foreach ($stmt as $row) {
	$sql = "SELECT u.`user_id`, u.`first_name`, u.`last_name`, r.`created_at` FROM `rental_table` AS r INNER JOIN `user_table` AS u ON r.`fixture_id` = ? AND r.`is_returned` = 0 AND u.`user_id` = r.`user_id`";
	$stmt2 = $pdo -> prepare($sql);
	$stmt2->bindParam(1, $row['fixture_id']);
	$stmt2->execute();
	$temp_list = [];
	$rentalList = [];
	foreach ($stmt2 as $row2) {
		$temp_list['userId'] = $row2['user_id'];
		$temp_list['userName'] = [
			'firstName' => $row2['first_name'],
			'lastName' => $row2['last_name']
		];
		$temp_list['createdAt'] = $row2['created_at'];
		$rentalList[] = $temp_list;
	}
	$result[] = [
		'fixtureId' => $row['fixture_id'],
		'fixtureName' => $row['fixture_name'],
		'img_url' => $row['img_url'],
		'retailer_url' => $row['retailer_url'],
		'stock' => $row['stock'],
		'rentalList' => $rentalList
	];
}

echo json_encode($result);