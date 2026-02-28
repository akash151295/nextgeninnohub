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
    $position = $_POST['position'] ?? '';
    $experience = $_POST['experience'] ?? '';
    $linkedin = $_POST['linkedin'] ?? 'Not provided';
    $resume = $_POST['resume'] ?? 'Not provided';
    $reason = $_POST['reason'] ?? '';
    $skills = $_POST['skills'] ?? '';
    
    // Email configuration for GoDaddy
    $to = 'contact@nextgeninnohub.in';
    $subject = 'Job Application - EMPLOYEE INTERESTED - NextGen InnoHub';
    
    // Email body
    $message = "EMPLOYEE INTERESTED TO WORK WITH OUR COMPANY\n\n";
    $message .= "Job Application Details\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Position: $position\n";
    $message .= "Experience: $experience\n";
    $message .= "LinkedIn: $linkedin\n";
    $message .= "Resume: $resume\n";
    $message .= "Why Join: $reason\n";
    $message .= "Skills: $skills\n";
    
    // Email headers
    $headers = "From: noreply@nextgeninnohub.in\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Application submitted successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
