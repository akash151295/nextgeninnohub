// Firebase Cloud Functions - index.js
// Place this in: functions/index.js

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Generate random password
function generatePassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Create new user (callable from frontend)
exports.createUser = functions.https.onCall(async (data, context) => {
    // Check if caller is authenticated and is admin
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    // Verify caller is admin
    const callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    if (!callerDoc.exists || callerDoc.data().role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can create users');
    }

    // Validate input
    const { email, name, role, domain } = data;
    if (!email || !name || !role) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
    }

    try {
        // Generate password
        const password = generatePassword();

        // Create user in Authentication
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: name
        });

        // Create user document in Firestore
        await admin.firestore().collection('users').doc(userRecord.uid).set({
            email: email,
            name: name,
            role: role,
            domain: domain || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            createdBy: context.auth.uid
        });

        // Return success with credentials
        return {
            success: true,
            uid: userRecord.uid,
            email: email,
            password: password,
            message: 'User created successfully'
        };

    } catch (error) {
        console.error('Error creating user:', error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});

// Get all users (for admin dashboard)
exports.getAllUsers = functions.https.onCall(async (data, context) => {
    // Check if caller is authenticated and is admin
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    if (!callerDoc.exists || callerDoc.data().role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can view all users');
    }

    try {
        const usersSnapshot = await admin.firestore().collection('users').get();
        const users = [];
        
        usersSnapshot.forEach(doc => {
            users.push({
                uid: doc.id,
                ...doc.data()
            });
        });

        return { success: true, users: users };
    } catch (error) {
        console.error('Error getting users:', error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});

// Delete user
exports.deleteUser = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    const callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    if (!callerDoc.exists || callerDoc.data().role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can delete users');
    }

    const { uid } = data;
    if (!uid) {
        throw new functions.https.HttpsError('invalid-argument', 'User ID required');
    }

    try {
        // Delete from Authentication
        await admin.auth().deleteUser(uid);
        
        // Delete from Firestore
        await admin.firestore().collection('users').doc(uid).delete();

        return { success: true, message: 'User deleted successfully' };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});
