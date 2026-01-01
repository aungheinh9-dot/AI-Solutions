# AI Solutions Website

A comprehensive AI solutions company website with static HTML pages and interactive features.

## 🚀 Live Demo

The website is deployed on **Railway** and can be accessed directly in your browser:

**👉 [https://ai-solutions-production-5eb6.up.railway.app](https://ai-solutions-production-5eb6.up.railway.app)**

Simply open the link above in your browser to view the complete AI Solutions website with all features working live!

## Features

### 🌐 Static HTML Pages
- **Main Website**: `index.html` - Complete company website
- **Admin Panel**: `admin.html` - Admin dashboard for managing inquiries
- **Service Pages**: Individual pages for each AI service
  - `machine-learning.html` - Machine Learning services
  - `nlp.html` - Natural Language Processing
  - `computer-vision.html` - Computer Vision solutions
  - `process-automation.html` - Process Automation
  - `predictive-analytics.html` - Predictive Analytics
  - `ai-chatbots.html` - AI Chatbots
- **Project Pages**: Detailed project case studies
  - `project-ecommerce.html` - E-commerce AI Assistant
  - `project-healthcare.html` - Healthcare Analytics Platform
  - `project-manufacturing.html` - Smart Manufacturing System
- **Other Pages**:
  - `services.html` - All services overview
  - `about.html` - About us page
  - `projects.html` - All projects overview
  - `articles.html` - Promotional articles
  - `galleries.html` - Events and galleries
  - `contact.html` - Contact page with form

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Dark theme with cyan/emerald color scheme
- Interactive animations and hover effects
- Mobile-friendly navigation
- Font Awesome icons

### 📱 Interactive Features
- **AI Chatbot**: Interactive chatbot in bottom-right corner with keyword-based responses
- **Contact Form**: Form with validation (name, email, phone, company, country, job title, project details)
- **Admin Panel**: Password-protected admin area for viewing and managing customer inquiries
- **Interactive Demos**: Working demos on service pages (NLP, Computer Vision, Predictive Analytics, Process Automation, AI Chatbots)
- **Photo and Video Content**: Images and videos integrated throughout the site
- **Smooth Scrolling Navigation**: Smooth page navigation

### 📧 Contact Integration
- Contact email: `aungheinh9@gmail.com`
- Form validation and submission
- Success/error notifications
- Admin inquiry management dashboard

## How to Run

### Option 1: Live Website (Easiest)
**Simply open the live website in your browser:**
- **Live URL**: [https://ai-solutions-production-5eb6.up.railway.app](https://ai-solutions-production-5eb6.up.railway.app)
- The website is deployed on Railway and accessible 24/7
- No setup required - just click the link and explore!

### Option 2: Direct Browser Access (Local)
1. Navigate to the `public` folder
2. Open `index.html` in your web browser
3. All features work without server setup

### Option 3: Local Server
1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Open browser to `http://localhost:3000`

### Option 4: Python Simple Server
```bash
cd public
python -m http.server 8000
```
Then open `http://localhost:8000`

## File Structure

```
public/
├── index.html              # Main website
├── admin.html              # Admin panel
├── services.html           # Services overview
├── about.html              # About us
├── projects.html           # Projects overview
├── articles.html           # Articles page
├── galleries.html          # Events and galleries
├── contact.html            # Contact page
├── machine-learning.html   # ML service page
├── nlp.html               # NLP service page
├── computer-vision.html    # CV service page
├── process-automation.html # Automation service page
├── predictive-analytics.html # Analytics service page
├── ai-chatbots.html       # Chatbots service page
├── project-ecommerce.html # E-commerce project
├── project-healthcare.html # Healthcare project
├── project-manufacturing.html # Manufacturing project
├── css/
│   ├── modern-theme.css   # Modern theme styles
│   └── style.css          # Custom styles
├── js/
│   ├── main.js           # Main JavaScript
│   ├── chatbot.js        # Chatbot functionality
│   ├── forms.js          # Form handling
│   ├── modern-animations.js # Animations
│   └── firebase-config.js # Firebase configuration
└── admin/
    ├── login.html        # Admin login
    └── dashboard.html    # Admin dashboard
```

## Key Features Explained

### 🎯 Service Pages
Each service has its own dedicated page with:
- Detailed service descriptions
- Key features and benefits
- Interactive demos (working)
- Technology stack information
- Call-to-action sections

### 📊 Project Pages
Detailed project showcases including:
- Project overview and objectives
- Key features and technologies
- Results and impact metrics
- Interactive demos
- Technology stack details

### 🤖 AI Chatbot
- Rule-based response system
- Keyword matching for relevant answers
- Predefined responses for common queries
- Interactive chat interface
- Welcome message and user guidance
- Located in bottom-right corner of pages

### 📝 Contact Form
- Comprehensive form validation
- Required field checking
- Email format validation
- Phone number validation with country code selector
- Success/error notifications
- Form reset after submission
- Stores data in Firebase/localStorage

### 👨‍💼 Admin Panel
- Inquiry management dashboard
- Statistics and metrics
- Status filtering and updates
- Modal-based detail views
- Password-protected access
- Responsive design

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Images**: Unsplash
- **Backend**: Node.js, Express.js (optional)
- **Database**: Firebase Firestore (optional)
- **Deployment**: Railway (live production)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Contact Information

- **Email**: aungheinh9@gmail.com
- **Phone**: +1 (555) 123-4567
- **Address**: 123 AI Street, Tech City, TC 12345

## License

MIT License - Feel free to use and modify as needed.

## Support

For any issues or questions, please contact aungheinh9@gmail.com
