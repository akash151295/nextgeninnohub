#!/bin/bash

# 🚨 EMERGENCY STOP - Delete All Cloud Functions
# Run this script if you get unexpected billing alerts
# This will IMMEDIATELY stop all Cloud Functions and billing

echo "🚨 EMERGENCY STOP - Deleting All Cloud Functions"
echo "================================================"
echo ""
echo "⚠️  WARNING: This will delete all functions and stop automation!"
echo "You will need to redeploy functions to use automation again."
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Cancelled. No functions were deleted."
    exit 0
fi

echo ""
echo "🔥 Deleting Cloud Functions..."
echo ""

# Delete all functions
firebase functions:delete createUser --force
firebase functions:delete getAllUsers --force
firebase functions:delete deleteUser --force

echo ""
echo "✅ All Cloud Functions deleted!"
echo "✅ Billing stopped immediately!"
echo ""
echo "📊 Check your Firebase Console to confirm:"
echo "https://console.firebase.google.com/project/nextgen-innohub/functions"
echo ""
echo "💡 To restore automation later, run: firebase deploy --only functions"
