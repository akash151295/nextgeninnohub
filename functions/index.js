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
    // Check if caller is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    // Get or create caller's user document
    let callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    
    // If caller doesn't exist in Firestore, create as admin (first user)
    if (!callerDoc.exists) {
        await admin.firestore().collection('users').doc(context.auth.uid).set({
            email: context.auth.token.email,
            name: context.auth.token.name || 'Admin',
            role: 'admin',
            domain: null,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    }

    // Verify caller is admin
    if (callerDoc.data().role !== 'admin') {
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

        // Create user in Authentication using Admin SDK (won't sign them in)
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: name,
            emailVerified: false
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
    // Check if caller is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    // Get or create caller's user document
    let callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    
    // If caller doesn't exist in Firestore, create as admin (first user)
    if (!callerDoc.exists) {
        await admin.firestore().collection('users').doc(context.auth.uid).set({
            email: context.auth.token.email,
            name: context.auth.token.name || 'Admin',
            role: 'admin',
            domain: null,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    }

    // Verify caller is admin
    if (callerDoc.data().role !== 'admin') {
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

// Delete all users except admin
exports.deleteAllUsers = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    let callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    
    if (!callerDoc.exists) {
        await admin.firestore().collection('users').doc(context.auth.uid).set({
            email: context.auth.token.email,
            name: context.auth.token.name || 'Admin',
            role: 'admin',
            domain: null,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    }

    if (callerDoc.data().role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'Only admins can delete all users');
    }

    try {
        const usersSnapshot = await admin.firestore().collection('users').get();
        let deletedCount = 0;
        const adminEmail = context.auth.token.email;

        for (const doc of usersSnapshot.docs) {
            const user = doc.data();
            if (user.email === adminEmail) continue;

            await admin.firestore().collection('users').doc(doc.id).delete();
            try {
                await admin.auth().deleteUser(doc.id);
            } catch (e) {
                console.log('Auth delete error:', e.message);
            }
            deletedCount++;
        }

        return { success: true, message: `Deleted ${deletedCount} users`, deletedCount };
    } catch (error) {
        console.error('Error deleting users:', error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});

// Delete user
exports.deleteUser = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
    }

    // Get or create caller's user document
    let callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    
    // If caller doesn't exist in Firestore, create as admin (first user)
    if (!callerDoc.exists) {
        await admin.firestore().collection('users').doc(context.auth.uid).set({
            email: context.auth.token.email,
            name: context.auth.token.name || 'Admin',
            role: 'admin',
            domain: null,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        callerDoc = await admin.firestore().collection('users').doc(context.auth.uid).get();
    }

    // Verify caller is admin
    if (callerDoc.data().role !== 'admin') {
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
