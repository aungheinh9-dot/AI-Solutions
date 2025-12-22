const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let db;

try {
    // Check if Firebase is already initialized
    if (admin.apps.length === 0) {
        // Check if we have service account credentials
        if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
            // Initialize with service account key (for production)
            const serviceAccount = {
                type: "service_account",
                project_id: process.env.FIREBASE_PROJECT_ID || 'sakenyitdl',
                private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
                private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                client_email: process.env.FIREBASE_CLIENT_EMAIL,
                client_id: process.env.FIREBASE_CLIENT_ID,
                auth_uri: "https://accounts.google.com/o/oauth2/auth",
                token_uri: "https://oauth2.googleapis.com/token",
                auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
            };

            // Initialize Firebase Admin with service account
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: `https://${process.env.FIREBASE_PROJECT_ID || 'sakenyitdl'}-default-rtdb.firebaseio.com`
            });
            console.log('Firebase Admin initialized with service account');
        } else {
            // Initialize with default credentials (for development)
            admin.initializeApp({
                projectId: process.env.FIREBASE_PROJECT_ID || 'sakenyitdl'
            });
            console.log('Firebase Admin initialized with default credentials');
        }
    }
    
    db = admin.firestore();
    console.log('Firebase Admin initialized successfully');
    
} catch (error) {
    console.error('Error initializing Firebase:', error);
    
    // Fallback: Create mock database for development
    console.log('Using mock database for development');
    db = createMockDatabase();
}

// Mock database for development without Firebase
function createMockDatabase() {
    const inquiries = [];
    let nextId = 1;
    
    return {
        collection: (name) => ({
            add: async (data) => {
                const id = `mock_${nextId++}`;
                inquiries.push({ id, ...data });
                return { id };
            },
            get: async () => ({
                forEach: (callback) => {
                    inquiries.forEach(doc => {
                        callback({
                            id: doc.id,
                            data: () => doc
                        });
                    });
                },
                size: inquiries.length
            }),
            doc: (id) => ({
                get: async () => ({
                    exists: inquiries.some(inquiry => inquiry.id === id),
                    data: () => inquiries.find(inquiry => inquiry.id === id)
                }),
                update: async (data) => {
                    const index = inquiries.findIndex(inquiry => inquiry.id === id);
                    if (index !== -1) {
                        inquiries[index] = { ...inquiries[index], ...data };
                    }
                },
                delete: async () => {
                    const index = inquiries.findIndex(inquiry => inquiry.id === id);
                    if (index !== -1) {
                        inquiries.splice(index, 1);
                    }
                }
            }),
            where: (field, operator, value) => ({
                orderBy: (field, direction) => ({
                    get: async () => ({
                        forEach: (callback) => {
                            inquiries
                                .filter(inquiry => inquiry[field] === value)
                                .sort((a, b) => {
                                    const aVal = a[field];
                                    const bVal = b[field];
                                    return direction === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
                                })
                                .forEach(doc => {
                                    callback({
                                        id: doc.id,
                                        data: () => doc
                                    });
                                });
                        },
                        size: inquiries.filter(inquiry => inquiry[field] === value).length
                    })
                })
            }),
            orderBy: (field, direction) => ({
                get: async () => ({
                    forEach: (callback) => {
                        inquiries
                            .sort((a, b) => {
                                const aVal = a[field];
                                const bVal = b[field];
                                return direction === 'desc' ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
                            })
                            .forEach(doc => {
                                callback({
                                    id: doc.id,
                                    data: () => doc
                                });
                            });
                    },
                    size: inquiries.length
                })
            })
        })
    };
}

module.exports = { db };
