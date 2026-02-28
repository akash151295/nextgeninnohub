// Firebase Configuration
// Replace with your Firebase project credentials from https://console.firebase.google.com

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Helper functions
const DB = {
  // Users
  async addUser(userData) {
    return await db.collection('users').add(userData);
  },
  async getUsers() {
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  // Interns
  async addIntern(internData) {
    return await db.collection('interns').add(internData);
  },
  async getInterns() {
    const snapshot = await db.collection('interns').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async getInternsByEmployee(employeeName) {
    const snapshot = await db.collection('interns').where('assignedTo', '==', employeeName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  // Tasks
  async addTask(taskData) {
    return await db.collection('tasks').add(taskData);
  },
  async getTasks() {
    const snapshot = await db.collection('tasks').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async getTasksByIntern(internName) {
    const snapshot = await db.collection('tasks').where('internName', '==', internName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async updateTask(taskId, updates) {
    return await db.collection('tasks').doc(taskId).update(updates);
  },
  
  // Certificates
  async addCertificate(certData) {
    return await db.collection('certificates').add(certData);
  },
  async getCertificates() {
    const snapshot = await db.collection('certificates').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
