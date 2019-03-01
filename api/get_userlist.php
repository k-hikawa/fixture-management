<?php
/*
 * ユーザ一覧を取得するAPI
 *
 * @return
 * userId
 * userName
 *  firstName
 *  lastName
 * channelName
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

$sql = "SELECT `user_id`, `first_name`, `last_name`, `channel_name` FROM `user_table` ORDER BY `user_id` ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute();
foreach ($stmt as $row) {
	$result[] = [
		'userId' => $row['user_id'],
		'userName' => [
			'firstName' => $row['first_name'],
			'lastName' => $row['last_name']
		],
		'channelName' => $row['channel_name']
	];
}

echo json_encode($result);