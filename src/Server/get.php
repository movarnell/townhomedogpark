<?php
// Database connection variables
$servername = "localhost";
$username = "u504367542_dogpark";
$password = "jdgfdCiNx9uRZmW";
$dbname = "u504367542_dogpark";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// SQL query to retrieve all entries from the table
$sql = "SELECT * FROM dogparkusers";

// Execute the query
$result = mysqli_query($conn, $sql);

// Check if any rows were returned
if (mysqli_num_rows($result) > 0) {
    // Store the result in an array
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    // Convert the array to JSON and return it
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo "0 results";
}

// Close the database connection
mysqli_close($conn);
?>