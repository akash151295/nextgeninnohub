# 🔥 Firebase Setup Guide for NextGen InnoHub LMS

## Step 1: Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name it: "NextGen-InnoHub"
4. Disable Google Analytics (optional)
5. Click "Create Project"

## Step 2: Enable Firestore Database

1. In Firebase Console, click "Firestore Database"
2. Click "Create Database"
3. Select "Start in test mode" (for now)
4. Choose location: "asia-south1" (India)
5. Click "Enable"

## Step 3: Get Firebase Config

1. Click the gear icon ⚙️ → Project Settings
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register app name: "NextGen-InnoHub-Web"
5. Copy the firebaseConfig object
6. Paste it in `firebase-config.js` file

## Step 4: Update HTML Files

Add these lines in the `<head>` section of all dashboard HTML files:

```html
<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="firebase-config.js"></script>
```

## Step 5: Database Structure

Firebase will auto-create these collections:

### Collections:
1. **users** - All users (admin, employees, interns)
2. **interns** - Intern details and assignments
3. **tasks** - All tasks assigned and submitted
4. **certificates** - Generated certificates

### Sample Data Structure:

**users collection:**
```json
{
  "username": "your_username",
  "password": "your_secure_password",
  "role": "admin",
  "name": "Admin User",
  "email": "admin@nextgeninnohub.in"
}
```

**interns collection:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "domain": "HR",
  "assignedTo": "Lead Intern Name",
  "status": "active",
  "joinDate": "2024-01-15"
}
```

**tasks collection:**
```json
{
  "taskId": "TASK001",
  "internName": "John Doe",
  "title": "Create Job Description",
  "description": "Use ChatGPT to create a job description for HR Manager",
  "assignedBy": "Lead Intern",
  "status": "pending",
  "submissionLink": "",
  "feedback": "",
  "rating": 0,
  "dueDate": "2024-02-01"
}
```

## Step 6: Security Rules (Important!)

In Firebase Console → Firestore Database → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Note:** This allows anyone to read/write. For production, implement proper authentication rules.

## Step 7: Test the System

1. Open `portal-login.html`
2. Login with demo credentials
3. Try adding data from dashboards
4. Check Firebase Console to see data

## 🎉 Done!

Your LMS is now connected to Firebase database!

## Free Tier Limits:
- ✅ 1 GB storage
- ✅ 10 GB/month bandwidth
- ✅ 50K reads/day
- ✅ 20K writes/day

Perfect for up to 100 active users!

## Need Help?
Contact: contact@nextgeninnohub.in
