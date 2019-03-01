<?php
/* 返却処理API 
 *
 * @param
 * rental_id
 *
 * @return
 * status
 *  code 200 or 404
 *  message 'success' or 'error message'
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json; charset=utf-8');

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

if (isset($_POST['rental_id'])) {
	$rental_id = $_POST['rental_id'];
	$sql = "UPDATE `rental_table` SET `is_returned` = 1,`updated_at` = cast(now() as datetime) WHERE `rental_id` = ?";
	$stmt = $pdo -> prepare($sql);
	$stmt->bindParam(1, $rental_id);
	$stmt->execute();
	$count = $stmt->rowCount();
	if ($count == 1) {
		$code = 200;
		$message = "success";
	} else {
		$code = 404;
		$message = "update error";
	}
	
} else {
	$code = 404;
	$message = "`rental_id` does not exist";
}

$result = [
	'status' => [
		'code' => $code,
		'message' => $message
	]
];
echo json_encode($result);