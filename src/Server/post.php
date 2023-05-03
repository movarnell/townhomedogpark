<?php
// Database connection variables
$servername = "localhost";
$username = "u504367542_dogpark";
$password = "jdgfdCiNx9uRZmW";
$dbname = "u504367542_dogpark";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the POST data
$name = $_POST['name'];
$dogName = $_POST['dogname'];
$date = $_POST['date'];
$friendly = $_POST['friendly'];

// Prepare and bind the SQL statement
$stmt = $conn->prepare("INSERT INTO dogparkusers (name, dogName, date, friendly) VALUES (?, ?, ?, ?)");
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