<?php
/* タグ絞り込みAPI
 *
 * @param
 * fixture_id
 *
 * @return
 * fixtureId
 * fixtureName
 * fixtureImage
 * retailerUrl
 * stock
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

if (isset($_GET['fixture_id'])) {
	$fixture_id = $_GET['fixture_id'];
	$sql = "SELECT `fixture_id`, `fixture_name`, `img_url`, `retailer_url`, `stock` FROM fixture_table WHERE fixture_id = ?";
	$stmt = $pdo -> prepare($sql);
	$stmt->bindParam(1, $fixture_id);
	$stmt->execute();
	foreach ($stmt as $row) {
		$result = [
			'fixtureId' => $row['fixture_id'],
			'fixtureName' => $row['fixture_name'],
			'fixtureImage' => $row['img_url'],
			'retailer_url' => $row['retailer_url'],
			'stock' => $row['stock']
		];
	}
	
}

echo json_encode($result);