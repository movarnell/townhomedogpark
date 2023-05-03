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

// Check if the user ID is set
if (isset($_GET['id'])) {
    // Sanitize the ID input to prevent SQL injection
    $id = mysqli_real_escape_string($conn, $_GET['id']);
    // SQL query to delete a user by ID
    $sql = "DELETE FROM users WHERE id = $id";
    // Execute the query
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('User deleted successfully.');</script>";
        // Redirect to the previous page
        header("Location: {$_SERVER['HTTP_REFERER']}");
    } else {
        echo "Error deleting user: " . mysqli_error($conn);
    }
} else {
    echo "Invalid user ID.";
}

// Close the database connection
mysqli_close($conn);
?>