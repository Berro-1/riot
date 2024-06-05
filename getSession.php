<?php 
session_start();
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Content-Type: application/json');

if (isset($_SESSION['userId'])) {
echo json_encode(["success" => true, "userId" => $_SESSION['userId']]);
} else {
echo json_encode(["success" => false, "message" => "No active session"]);
}
?>