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

$title = $_POST['title'];
$description = $_POST['description'];
$lastPlayed = $_POST['lastPlayed'];
$image = $_FILES['image'];

if ($title && $description && $lastPlayed && $image) {
    $sql = "INSERT INTO games (title, description, date) VALUES ('$title', '$description', '$lastPlayed')";
    if ($conn->query($sql) === TRUE) {
        $gameId = $conn->insert_id;
        $imageExtension = pathinfo($image['name'], PATHINFO_EXTENSION);
        $imagePath = 'upload/' . $gameId . '.' . $imageExtension;
        
        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            $conn->query("UPDATE games SET image='$imagePath' WHERE id=$gameId");
            echo json_encode(["success" => true, "message" => "Game added successfully", "image" => "$gameId.$imageExtension"]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to upload image"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Failed to add game"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}

$conn->close();
?>
