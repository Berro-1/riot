<?php

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
session_start();
if (isset($_SESSION['userId'])) {
    echo json_encode(['userId' => $_SESSION['userId']]);
} else {
    http_response_code(401);
    echo json_encode(['message' => 'Unauthorized']);
}
?>