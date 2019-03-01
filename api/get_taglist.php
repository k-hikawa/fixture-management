<?php
/*
 * タグ一覧を取得するAPI
 *
 * @return
 * tagId
 * tagName
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

$sql = "SELECT `tag_id`, `tag_name` FROM `tag_table`";
$stmt = $pdo->prepare($sql);
$stmt->execute();
foreach ($stmt as $row) {
	$result[] = [
		'tagId' => $row['tag_id'],
		'tagName' => $row['tag_name']
	];
}

echo json_encode($result);