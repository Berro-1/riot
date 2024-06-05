<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Accept, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
include 'db.php';

$userId = $_GET['userId'];

$sql = "SELECT g.id, g.title, g.description, g.image FROM games g
        JOIN user_games ug ON g.id = ug.game_id
        WHERE ug.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$userGames = [];

while($row = $result->fetch_assoc()) {
    $userGames[] = $row;
}

echo json_encode($userGames);

$stmt->close();
$conn->close();
?>
