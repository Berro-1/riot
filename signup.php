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

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->password) && isset($data->confirmPassword)) {
  $email = $data->email;
  $password = $data->password;
  $confirmPassword = $data->confirmPassword;

  if ($password !== $confirmPassword) {
    echo json_encode(["success" => false, "message" => "Passwords do not match"]);
    exit();
  }

  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  $sql = "INSERT INTO users (email, password,role) VALUES ('$email', '$hashedPassword',1)";

  if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "User registered successfully"]);
  } else {
    echo json_encode(["success" => false, "message" => "Error: " . $sql . "<br>" . $conn->error]);
  }

  $conn->close();
} else {
  echo json_encode(["success" => false, "message" => "Invalid input"]);
}

?>
