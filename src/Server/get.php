<?php
$servername = "localhost";
$database = "u504367542_dog2";
$username = "u504367542_dog2";
$password = "Mov@72758";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Perform query
$sql = "SELECT * FROM dog";
$result = mysqli_query($conn, $sql);

// Fetch data and encode as JSON
$data = array();
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}
$json_data = json_encode($data);

// Output JSON data
header('Content-Type: application/json');
echo $json_data;

// Close connection
mysqli_close($conn);
?>