# 🔥 Firebase Authentication Setup Guide

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Project name: **NextGen InnoHub**
4. Disable Google Analytics (optional)
5. Click "Create project"

---

## Step 2: Enable Authentication

1. In Firebase Console, click **"Authentication"**
2. Click **"Get Started"**
3. Click **"Email/Password"** tab
4. Toggle **"Enable"**
5. Click **"Save"**

---

## Step 3: Enable Firestore Database

1. Click **"Firestore Database"** in left menu
2. Click **"Create database"**
3. Select **"Start in test mode"**
4. Choose location (closest to you)
5. Click **"Enable"**

---

## Step 4: Get Firebase Config

1. Click **⚙️ Settings** (gear icon) → **"Project settings"**
2. Scroll down to **"Your apps"**
3. Click **"Web"** icon (</> symbol)
4. App nickname: **NextGen Portal**
5. Click **"Register app"**
6. Copy the `firebaseConfig` object

---

## Step 5: Update Your Code

Open `portal-login-firebase.html` and replace this section:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

With YOUR actual config from Firebase.

---

## Step 6: Create Demo Users

### In Firebase Console:

1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**

**Create these 3 users:**

**Admin User:**
- Email: `admin@nextgen.in`
- Password: `Admin@123`

**Employee User:**
- Email: `employee@nextgen.in`
- Password: `Emp@123`

**Intern User:**
- Email: `intern@nextgen.in`
- Password: `Int@123`

---

## Step 7: Add User Roles in Firestore

1. Go to **Firestore Database**
2. Click **"Start collection"**
3. Collection ID: `users`
4. Click **"Next"**

**For each user, create a document:**

### Admin Document:
- Document ID: (Copy UID from Authentication → Users)
- Fields:
  - `role`: "admin"
  - `name`: "Admin User"
  - `email`: "admin@nextgen.in"

### Employee Document:
- Document ID: (Copy UID from Authentication → Users)
- Fields:
  - `role`: "employee"
  - `name`: "Lead Intern"
  - `email`: "employee@nextgen.in"

### Intern Document:
- Document ID: (Copy UID from Authentication → Users)
- Fields:
  - `role`: "intern"
  - `name`: "Intern User"
  - `email`: "intern@nextgen.in"
  - `domain`: "HR"

---

## Step 8: Update Firestore Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

---

## Step 9: Test Locally

1. Open `portal-login-firebase.html` in browser
2. Try logging in with demo credentials
3. Should redirect to appropriate dashboard

---

## Step 10: Deploy to GitHub

1. Rename `portal-login-firebase.html` to `portal-login.html` (replace old one)
2. Push to GitHub:

```bash
git add portal-login.html
git commit -m "Add Firebase authentication"
git push origin main
```

---

## ✅ Done!

Your portal now has:
- ✅ Secure authentication
- ✅ No passwords in code
- ✅ Works on all browsers/devices
- ✅ Professional login system

---

## 🔒 Security Notes:

- Firebase API keys are safe to expose (they're restricted by domain)
- Passwords are never stored in your code
- All authentication happens on Firebase servers
- Free tier: 10,000 authentications/month

---

## 🆘 Need Help?

If you get stuck, share your Firebase config (it's safe to share) and I'll help debug!
