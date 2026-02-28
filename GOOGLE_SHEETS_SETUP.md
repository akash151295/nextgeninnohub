# 📊 Complete Google Sheets LMS Setup Guide

## ⏱️ Total Time: 10 Minutes

---

## STEP 1: Create Master Google Sheet (2 minutes)

1. Go to https://sheets.google.com
2. Click "+ Blank" to create new sheet
3. Name it: "NextGen InnoHub - LMS Database"
4. Create 4 tabs (sheets) at the bottom:
   - Rename "Sheet1" to "Users"
   - Click "+" to add new sheets: "Interns", "Tasks", "Certificates"

### Tab 1: USERS
**Column Headers (Row 1):**
```
Timestamp | Username | Password | Role | Name | Email | Domain | Status
```

### Tab 2: INTERNS
**Column Headers (Row 1):**
```
Timestamp | Intern Name | Email | Phone | Domain | Assigned To | Join Date | Status
```

### Tab 3: TASKS
**Column Headers (Row 1):**
```
Timestamp | Task ID | Intern Name | Task Title | Description | Assigned By | Due Date | Status | Submission Link | Feedback | Rating
```

### Tab 4: CERTIFICATES
**Column Headers (Row 1):**
```
Timestamp | Intern Name | DOB | Place | Domain | Months | Performance | Date Issued
```

---

## STEP 2: Create Google Forms (5 minutes)

### FORM 1: Add User
1. Go to https://forms.google.com
2. Click "+ Blank"
3. Title: "Add New User"
4. Add these questions:
   - Username (Short answer, Required)
   - Password (Short answer, Required)
   - Role (Dropdown: Admin, Employee, Intern, Required)
   - Full Name (Short answer, Required)
   - Email (Short answer, Required)
   - Domain (Dropdown: HR, Marketing, Testing, Python, React, Sales, Finance)
   - Status (Dropdown: Active, Inactive)

5. Click "Responses" tab → Click green Sheets icon → Select "NextGen InnoHub - LMS Database" → Choose "Users" sheet

### FORM 2: Add Intern
Title: "Add New Intern"
Questions:
- Intern Name (Short answer, Required)
- Email (Short answer, Required)
- Phone (Short answer, Required)
- Domain (Dropdown: HR, Marketing, Testing, Python, React, Sales, Finance, Required)
- Assign To (Short answer - Employee/Lead name, Required)
- Join Date (Date, Required)
- Status (Dropdown: Active, Inactive)

Link to "Interns" sheet

### FORM 3: Assign Task
Title: "Assign Task to Intern"
Questions:
- Task ID (Short answer - Auto: TASK001, TASK002, etc., Required)
- Intern Name (Short answer, Required)
- Task Title (Short answer, Required)
- Task Description (Paragraph, Required)
- Assigned By (Short answer - Your name, Required)
- Due Date (Date, Required)
- Status (Dropdown: Pending, In Progress, Submitted, Completed, Rejected)

Link to "Tasks" sheet

### FORM 4: Submit Task (For Interns)
Title: "Submit Your Task"
Questions:
- Task ID (Short answer, Required)
- Intern Name (Short answer, Required)
- Submission Link (Short answer - Google Drive/GitHub/Video link, Required)
- Status (Pre-filled: "Submitted")
- Comments (Paragraph)

Link to "Tasks" sheet

### FORM 5: Review Task (For Employees)
Title: "Review Intern Submission"
Questions:
- Task ID (Short answer, Required)
- Intern Name (Short answer, Required)
- Status (Dropdown: Accepted, Rejected, Needs Revision, Required)
- Feedback (Paragraph, Required)
- Rating (Dropdown: 1, 2, 3, 4, 5, Required)

Link to "Tasks" sheet

### FORM 6: Generate Certificate
Title: "Generate Internship Certificate"
Questions:
- Intern Name (Short answer, Required)
- Date of Birth (Date, Required)
- Place (Short answer, Required)
- Domain (Dropdown: HR, Marketing, Testing, Python, React, Sales, Finance, Required)
- Internship Duration (Dropdown: 1 Month, 2 Months, 3 Months, 6 Months, Required)
- Performance (Dropdown: Excellent, Very Good, Good, Satisfactory, Required)
- Date Issued (Date, Required)

Link to "Certificates" sheet

---

## STEP 3: Get Form Links (1 minute)

For each form:
1. Click "Send" button (top right)
2. Click link icon 🔗
3. Check "Shorten URL"
4. Copy the link
5. Save it in a text file

You'll have 6 links like:
```
Form 1: https://forms.gle/xxxxx (Add User)
Form 2: https://forms.gle/xxxxx (Add Intern)
Form 3: https://forms.gle/xxxxx (Assign Task)
Form 4: https://forms.gle/xxxxx (Submit Task)
Form 5: https://forms.gle/xxxxx (Review Task)
Form 6: https://forms.gle/xxxxx (Generate Certificate)
```

---

## STEP 4: Get Sheet Link (1 minute)

1. Open your "NextGen InnoHub - LMS Database" sheet
2. Click "Share" button (top right)
3. Change to "Anyone with the link can view"
4. Copy the link
5. Save it

---

## STEP 5: Share Links With Me (1 minute)

Send me:
1. All 6 Form links
2. The Sheet link

I will update your dashboard HTML files with these links!

---

## 🎉 DONE!

After this setup:
- ✅ You can see ALL data in your Google Sheet
- ✅ Forms auto-fill the sheet
- ✅ You can edit data directly in sheet
- ✅ Download as Excel anytime
- ✅ Access from phone/computer

---

## 📱 How to Use:

**As Admin:**
- Open admin dashboard → Click buttons → Forms open → Submit → Data saves to sheet

**As Employee:**
- Open employee dashboard → Assign tasks → Review submissions

**As Intern:**
- Open intern dashboard → View tasks → Submit work

**To View Data:**
- Just open your Google Sheet anytime!

---

## 💡 Pro Tips:

1. **Add Sample Data:** Add 1-2 rows manually in each sheet tab to test
2. **Bookmark Sheet:** Save sheet link for quick access
3. **Mobile App:** Install Google Sheets app on phone
4. **Notifications:** Enable email notifications for form submissions
5. **Backup:** Google auto-saves, but you can download as Excel weekly

---

## Need Help?

If you get stuck, share your screen or send screenshots to:
📧 contact@nextgeninnohub.in
📱 WhatsApp: +91 9760327132

---

**Ready to start? Follow Step 1 now! Takes just 2 minutes! 🚀**
