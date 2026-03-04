# 🔥 Firebase Cloud Functions Setup - Automated User Management

## What This Does:
- Add users from admin dashboard (no Firebase Console needed)
- Auto-generates secure passwords
- Sends welcome email with credentials
- Creates both Authentication + Firestore records automatically

---

## Step 1: Install Firebase CLI

Open terminal and run:

```bash
npm install -g firebase-tools
```

---

## Step 2: Login to Firebase

```bash
firebase login
```

---

## Step 3: Initialize Functions

```bash
cd c:\Users\asus\AI_Projects\Innovations
firebase init functions
```

Select:
- Use existing project: **nextgen-innohub**
- Language: **JavaScript**
- ESLint: **No**
- Install dependencies: **Yes**

---

## Step 4: Install Required Packages

```bash
cd functions
npm install nodemailer
```

---

## Step 5: Copy Function Code

I'll create the function code in the next file.

---

## Step 6: Deploy Functions

```bash
firebase deploy --only functions
```

---

## Step 7: Update Firestore Rules

Go to Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow admins to read all users
    match /users/{userId} {
      allow read: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## Step 8: Test from Admin Dashboard

Use the admin dashboard UI I'll create to add users!

---

## Cost: FREE
- Firebase Functions: 2 million invocations/month FREE
- Your usage: ~100-1000/month = $0

---

Let me create the function code now...
