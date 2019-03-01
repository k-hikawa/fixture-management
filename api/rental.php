<?php
/* 貸出処理API 
 *
 * @param
 * user_id
 * fixture_id
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

if (isset($_POST['user_id']) && isset($_POST['fixture_id'])) {
	$user_id = $_POST['user_id'];
	$fixture_id = $_POST['fixture_id'];
	if (isset($_POST['rental_num'])) {
		$rental_num = $_POST['rental_num'];
	} else {
		$rental_num = 1;
	}
	$error = false;
	for ($i = 0; $i < $rental_num; ++$i) {
		$sql = "INSERT INTO `rental_table`(`user_id`, `fixture_id`, `is_returned`, `created_at`, `updated_at`) SELECT ?, ?, 0, cast(now() as datetime), cast(now() as datetime)";
		$stmt = $pdo -> prepare($sql);
		$stmt->bindParam(1, $user_id);
		$stmt->bindParam(2, $fixture_id);
		$stmt->execute();
		$count = $stmt->rowCount();
		if ($count == 0) {
			$error = true;
			$error_num = $i+1;
			break;
		}
	}
	if (!$error) {
		$code = 200;
		$message = "success";
	} else {
		$code = 404;
		$message = "error in the $error_num insert";
	}
	
	
} else {
	$code = 404;
	$message = "`user_id` or `fixture_id` does not exist";
}

$result = [
	'status' => [
		'code' => $code,
		'message' => $message
	]
];
if (isset($rental_id)) {
	$result['rentalId'] = $rental_id;
}
echo json_encode($result);