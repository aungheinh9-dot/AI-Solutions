# Firebase Setup Instructions

## Firebase Firestore Database Setup

### 1. Firebase Console Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `sakenyitdl`
3. Go to **Firestore Database** in the left sidebar
4. Click **Create database**
5. Choose **Start in test mode** (for development)
6. Select a location (choose closest to your users)

### 2. Firestore Security Rules
Go to **Rules** tab and update with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to inquiries collection
    match /inquiries/{document} {
      allow read, write: if true; // For development - make more restrictive in production
    }
  }
}
```

### 3. Collection Structure
The app will automatically create a collection called `inquiries` with this structure:

```javascript
{
  name: "string",
  email: "string", 
  company: "string",
  phone: "string",
  country: "string",
  jobTitle: "string",
  jobDetails: "string",
  status: "string", // "new", "contacted", "in-progress", "completed", "closed"
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

### 4. Production Security Rules (Recommended)
For production, use more restrictive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create inquiries (contact form)
    match /inquiries/{document} {
      allow create: if true;
      allow read, update, delete: if false; // Only admin can manage
    }
  }
}
```

### 5. Admin Authentication (Optional)
For admin access control, you can add authentication:

1. Go to **Authentication** in Firebase Console
2. Enable **Email/Password** sign-in method
3. Add admin users manually
4. Update Firestore rules to require authentication for admin operations

### 6. Testing the Integration
1. Open `index.html` in browser
2. Fill out contact form and submit
3. Check Firebase Console > Firestore Database
4. You should see new documents in `inquiries` collection
5. Open `admin.html` to see real-time updates

### 7. Troubleshooting
- Check browser console for errors
- Verify Firebase config is correct
- Ensure Firestore rules allow read/write
- Check network connectivity

## Features Enabled with Firebase:
- ✅ Real-time form submissions
- ✅ Real-time admin dashboard updates
- ✅ Persistent data storage
- ✅ Cross-device synchronization
- ✅ Backup and recovery
- ✅ Scalable infrastructure
