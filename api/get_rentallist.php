<?php
/* 貸出状況取得API 
 *
 * @return
 * rentalId
 * fixture
 *  id
 * 	name
 *  image
 * user
 *  id
 *  name
 *   firstName
 *   lastName
 * rentalAt
 */

header('Access-Control-Allow-Origin: *');
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

$sql = "SELECT r.`rental_id`, f.`fixture_id`, f.`fixture_name`, f.`img_url`, u.`user_id`, u.`first_name`, u.`last_name`, r.`created_at` FROM (`rental_table` AS r INNER JOIN `fixture_table` AS f ON r.`fixture_id` = f.`fixture_id` AND r.`is_returned` = 0) INNER JOIN `user_table` AS u ON r.`user_id` = u.`user_id`";
$stmt = $pdo -> prepare($sql);
$stmt->execute();
foreach ($stmt as $row) {
	$result[] = [
		'rentalId' => $row['rental_id'],
		'fixture' => [
			'id' => $row['fixture_id'],
			'name' => $row['fixture_name'],
			'image' => $row['img_url']
		],
		'user' => [
			'id' => $row['user_id'],
			'name' => [
				'firstName' => $row['first_name'],
				'lastName' => $row['last_name']
			]
		],
		'rentalAt' => $row['created_at']
	];
}

echo json_encode($result);