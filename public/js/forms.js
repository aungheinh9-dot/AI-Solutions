// Form handling and validation
class FormHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Prevent duplicate initialization
        if (this.initialized) {
            console.log('FormHandler already initialized');
            return;
        }
        
        this.setupContactForm();
        this.setupFormValidation();
        this.initialized = true;
    }
    
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }
    }
    
    setupFormValidation() {
        // Real-time validation
        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }
    
    handleContactSubmit(e) {
        e.preventDefault();
        
        // Prevent duplicate submissions
        if (this.isSubmitting) {
            console.log('Form is already being submitted');
            return;
        }
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Combine country code with phone number
        const countryCode = document.getElementById('country-code')?.value || '+959';
        data.phone = data.phone ? `${countryCode} ${data.phone}` : '';
        
        // Validate form
        if (this.validateContactForm(data)) {
            this.submitContactForm(data);
        }
    }
    
    validateContactForm(data) {
        let isValid = true;
        
        // Required fields
        const requiredFields = ['name', 'email', 'jobDetails'];
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (if provided)
        if (data.phone && !this.isValidPhone(data.phone)) {
            this.showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Clear previous errors
        this.clearFieldError(field);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(fieldName, 'This field is required');
            return false;
        }
        
        // Email validation
        if (fieldName === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(fieldName, 'Please enter a valid email address');
            return false;
        }
        
        // Phone validation
        if (fieldName === 'phone' && value && !this.isValidPhone(value)) {
            this.showFieldError(fieldName, 'Please enter a valid phone number');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        if (field) {
            this.clearFieldError(field);
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'text-red-500 text-sm mt-1 field-error';
            errorDiv.textContent = message;
            
            field.classList.add('border-red-500');
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    clearFieldError(field) {
        if (field) {
            field.classList.remove('border-red-500');
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
    }
    
    async submitContactForm(data) {
        // Prevent duplicate submissions
        if (this.isSubmitting) {
            console.log('Form is already being submitted');
            return;
        }
        
        this.isSubmitting = true;
        const submitButton = document.querySelector('#contact-form button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission for static site
            await this.simulateSubmission(data);
            
            this.showSuccessMessage('Message sent successfully! We\'ll get back to you soon.');
            document.getElementById('contact-form').reset();
            
        } catch (error) {
            console.error('Error:', error);
            this.showErrorMessage('Failed to send message. Please try again or contact us directly.');
        } finally {
            // Reset button and submission state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.isSubmitting = false;
        }
    }
    
    async simulateSubmission(data) {
        // Check if required fields are filled
        if (!data.name || !data.email || !data.jobDetails) {
            throw new Error('Required fields missing');
        }
        
        try {
            // Try Firebase first
            if (window.firebase && window.firebase.db) {
                await this.submitToFirebase(data);
                console.log('Form submitted to Firebase successfully');
            } else {
                // Fallback to localStorage
                this.storeInquiry(data);
                console.log('Form submitted to localStorage (Firebase not available)');
            }
        } catch (error) {
            console.error('Firebase submission failed, using localStorage:', error);
            // Fallback to localStorage
            this.storeInquiry(data);
        }
    }
    
    async submitToFirebase(data) {
        const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const { createUserWithEmailAndPassword, sendPasswordResetEmail } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js');
        
        // Create user account in Firebase Authentication
        try {
            // Generate a random password for the user
            const randomPassword = this.generateRandomPassword();
            
            // Create user account with email and random password
            const userCredential = await createUserWithEmailAndPassword(
                window.firebase.auth, 
                data.email, 
                randomPassword
            );
            
            console.log('User account created:', userCredential.user.uid);
            
            // Send password reset email so user can set their own password
            try {
                await sendPasswordResetEmail(window.firebase.auth, data.email);
                console.log('Password reset email sent');
            } catch (resetError) {
                console.log('Password reset email not sent (user may need to use forgot password):', resetError);
            }
            
        } catch (authError) {
            // If user already exists, that's okay - just log it
            if (authError.code === 'auth/email-already-in-use') {
                console.log('User account already exists for this email');
            } else {
                console.error('Error creating user account:', authError);
                // Continue with inquiry submission even if auth fails
            }
        }
        
        // Store inquiry in Firestore
        const inquiryData = {
            name: data.name,
            email: data.email,
            company: data.company || '',
            phone: data.phone || '',
            country: data.country || '',
            jobTitle: data.jobTitle || '',
            jobDetails: data.jobDetails,
            status: 'new',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };
        
        // Add to Firebase Firestore
        const docRef = await addDoc(collection(window.firebase.db, 'inquiries'), inquiryData);
        console.log('Document written with ID: ', docRef.id);
        
        return docRef;
    }
    
    generateRandomPassword() {
        // Generate a secure random password
        const length = 16;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    }
    
    storeInquiry(data) {
        // Get existing inquiries
        let inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        
        // Check for duplicate submissions (same email and job details within last 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const isDuplicate = inquiries.some(inquiry => 
            inquiry.email === data.email && 
            inquiry.jobDetails === data.jobDetails &&
            inquiry.createdAt > fiveMinutesAgo
        );
        
        if (isDuplicate) {
            console.log('Duplicate submission prevented');
            return;
        }
        
        // Create new inquiry object
        const newInquiry = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            company: data.company || '',
            phone: data.phone || '',
            country: data.country || '',
            jobTitle: data.jobTitle || '',
            jobDetails: data.jobDetails,
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Add to inquiries array
        inquiries.unshift(newInquiry);
        
        // Store back to localStorage
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        
        console.log('Inquiry stored:', newInquiry);
    }
    
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }
    
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }
    
    showNotification(message, type = 'info') {
        // Prevent duplicate notifications
        if (this.showingNotification) {
            console.log('Notification already showing');
            return;
        }
        
        this.showingNotification = true;
        
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white max-w-sm`;
        
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
            this.showingNotification = false;
        }, 5000);
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new FormHandler();
});
