<?php
$servername = "localhost";
$database = "u504367542_dog2";
$username = "u504367542_dog2";
$password = "Mov@72758";

// Create connection

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the POST data
$name = $_POST['name'];
$dogName = $_POST['dogName'];
$date = $_POST['date'];
$friendly = $_POST['friendly'];

// Prepare and bind the SQL statement
$stmt = $conn->prepare("INSERT INTO dog (name, dogName, date, friendly) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $name, $dogName, $date, $friendly);

// Execute the statement
if ($stmt->execute()) {
    echo "New record created successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and database connection
$stmt->close();
$conn->close();
?>