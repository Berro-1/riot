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
$data = json_decode(file_get_contents("php://input"));

$userId = $data->userId;
$gameId = $data->gameId;

$sql = "INSERT INTO user_games (user_id, game_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $userId, $gameId);

if ($stmt->execute()) {
    echo json_encode(["message" => "Game added successfully"]);
} else {
    echo json_encode(["message" => "Error adding game"]);
}

$stmt->close();
$conn->close();
?>