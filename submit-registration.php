<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $domain = $_POST['domain'] ?? '';
    $plan = $_POST['plan'] ?? '';
    $status = $_POST['status'] ?? '';
    $reason = $_POST['reason'] ?? '';
    
    // Email configuration for GoDaddy
    $to = 'contact@nextgeninnohub.in';
    $subject = 'New Internship Registration - NextGen InnoHub';
    
    // Email body
    $message = "New Internship Registration\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Domain: $domain\n";
    $message .= "Plan: $plan\n";
    $message .= "Status: $status\n";
    $message .= "Reason: $reason\n";
    
    // Email headers
    $headers = "From: noreply@nextgeninnohub.in\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Registration submitted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
