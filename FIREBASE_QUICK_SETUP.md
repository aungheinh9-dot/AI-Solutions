# Firebase Quick Setup Guide

## Option 1: Use Mock Database (Development - No Setup Required)

The server will automatically use a mock database if Firebase is not configured. This works for development but data will be lost when the server restarts.

**No action needed** - Just start the server!

## Option 2: Use Real Firebase (Production)

### Step 1: Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `sakenyitdl`
3. Go to **Project Settings** (gear icon)
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. Download the JSON file

### Step 2: Add to .env File

1. Open the downloaded JSON file
2. Copy the values to your `.env` file:

```env
# Firebase Service Account (from downloaded JSON)
FIREBASE_PROJECT_ID=sakenyitdl
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40project.iam.gserviceaccount.com
```

### Step 3: Enable Firestore

1. Go to Firebase Console
2. Go to **Firestore Database**
3. Click **Create Database**
4. Start in **Production mode** or **Test mode** (for development)
5. Choose a location (e.g., `us-central1`)

### Step 4: Set Firestore Rules (for Test Mode)

Go to **Rules** tab and set:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{inquiryId} {
      allow read, write: if true; // For development only
    }
  }
}
```

**⚠️ Warning:** The above rule allows anyone to read/write. For production, use proper authentication rules.

### Step 5: Restart Server

```bash
node server.js
```

You should see:
```
✅ Firebase Admin initialized with service account
✅ Firebase Firestore connected successfully
✅ Firebase is ready to use
```

## Current Status

The server is configured to:
- ✅ Use Firebase if credentials are provided
- ✅ Fall back to mock database if Firebase is not available
- ✅ Work without any Firebase setup (for development)

## Troubleshooting

### Error: "PERMISSION_DENIED"
- Check Firestore rules
- Make sure service account has proper permissions
- Verify the private key is correct in .env

### Error: "Project not found"
- Verify FIREBASE_PROJECT_ID in .env matches your Firebase project
- Check that the project exists in Firebase Console

### Mock Database Being Used
- This is normal if Firebase credentials are not configured
- Data will work but will be lost on server restart
- To use real Firebase, follow Option 2 above

