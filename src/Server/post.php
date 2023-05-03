<?php
// Database connection variables
$servername = "89.117.139.52";
$username = "dogpark";
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
$dogname = $_POST['dogname'];
$date = $_POST['date'];
$friendly = $_POST['friendly'];

// Prepare and bind the SQL statement
$stmt = $conn->prepare("INSERT INTO dogparkusers (name, dogname, date, friendly) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $name, $dogname, $date, $friendly);

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