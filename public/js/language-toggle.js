// Language Toggle Functionality
class LanguageToggle {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.translations = {
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-services': 'Services',
                'nav-about': 'About',
                'nav-projects': 'Projects',
                'nav-contact': 'Contact',
                
                // Hero Section
                'hero-title': 'AI Solutions',
                'hero-subtitle': 'Transforming businesses with cutting-edge AI technology and automation tools',
                'hero-btn1': 'Explore Solutions',
                'hero-btn2': 'Get Started',
                
                // Services Section
                'services-badge': 'AI Services',
                'services-title': 'Our AI Services',
                'services-subtitle': 'Comprehensive AI solutions tailored to your business needs',
                'ml-title': 'Machine Learning',
                'ml-desc': 'Advanced ML algorithms to automate processes and gain insights from your data.',
                'nlp-title': 'Natural Language Processing',
                'nlp-desc': 'Intelligent text analysis and language understanding for better customer interactions.',
                'cv-title': 'Computer Vision',
                'cv-desc': 'Image and video analysis solutions for quality control and automation.',
                'pa-title': 'Predictive Analytics',
                'pa-desc': 'Forecast trends and make data-driven decisions with our predictive models.',
                'proc-title': 'Process Automation',
                'proc-desc': 'Streamline workflows and reduce manual tasks with intelligent automation.',
                'chat-title': 'AI Chatbots',
                'chat-desc': 'Intelligent customer service solutions that provide 24/7 support.',
                'learn-more': 'Learn More →',
                
                // About Section
                'about-title': 'About AI Solutions',
                'about-desc1': 'We are a leading AI Solutions Company specializing in developing intelligent software and automation tools. Our mission is to help businesses harness the power of artificial intelligence to drive innovation, efficiency, and growth.',
                'about-desc2': 'With years of experience in AI research and development, we deliver cutting-edge solutions that transform how businesses operate and compete in the digital age.',
                'projects-completed': 'Projects Completed',
                'happy-clients': 'Happy Clients',
                'why-choose': 'Why Choose Us?',
                'expert-team': 'Expert AI Development Team',
                'custom-solutions': 'Custom Solutions for Every Business',
                'proven-track': 'Proven Track Record',
                'support-maintenance': '24/7 Support & Maintenance',
                'scalable-secure': 'Scalable & Secure Solutions',
                
                // Projects Section
                'projects-title': 'Our Recent Projects',
                'projects-subtitle': 'Showcasing our successful AI implementations',
                'ecommerce-title': 'E-commerce AI Assistant',
                'ecommerce-desc': 'Intelligent product recommendation system that increased sales by 35%.',
                'healthcare-title': 'Healthcare Analytics Platform',
                'healthcare-desc': 'AI-powered diagnostic tool for early disease detection.',
                'manufacturing-title': 'Smart Manufacturing System',
                'manufacturing-desc': 'Automated quality control system reducing defects by 50%.',
                'view-details': 'View Details →',
                
                // Contact Section
                'contact-title': 'Get In Touch',
                'contact-subtitle': 'Ready to transform your business with AI? Contact us today!',
                'contact-info': 'Contact Information',
                'your-name': 'Your Name',
                'your-email': 'Your Email',
                'company-name': 'Company Name',
                'phone-number': 'Phone Number',
                'country': 'Country',
                'job-title': 'Job Title',
                'project-details': 'Project Details',
                'send-message': 'Send Message',
                
                // Footer
                'footer-desc': 'Leading provider of intelligent software and automation tools.',
                'footer-services': 'Services',
                'footer-company': 'Company',
                'footer-connect': 'Connect',
                'footer-copyright': '© 2024 AI Solutions Company. All rights reserved.'
            },
            my: {
                // Navigation
                'nav-home': 'ပင်မ',
                'nav-services': 'ဝန်ဆောင်မှုများ',
                'nav-about': 'အကြောင်း',
                'nav-projects': 'စီမံကိန်းများ',
                'nav-contact': 'ဆက်သွယ်ရန်',
                
                // Hero Section
                'hero-title': 'AI ဖြေရှင်းချက်များ',
                'hero-subtitle': 'ခေတ်မီ AI နည်းပညာနှင့် အလိုအလျောက်စနစ်များဖြင့် လုပ်ငန်းများကို ပြောင်းလဲပေးခြင်း',
                'hero-btn1': 'ဖြေရှင်းချက်များ လေ့လာရန်',
                'hero-btn2': 'စတင်ရန်',
                
                // Services Section
                'services-badge': 'AI ဝန်ဆောင်မှုများ',
                'services-title': 'ကျွန်ုပ်တို့၏ AI ဝန်ဆောင်မှုများ',
                'services-subtitle': 'သင့်လုပ်ငန်းလိုအပ်ချက်များနှင့် ကိုက်ညီသော ပြီးပြည့်စုံသည့် AI ဖြေရှင်းချက်များ',
                'ml-title': 'စက်သင်ယူမှု',
                'ml-desc': 'သင့်ဒေတာမှ လုပ်ငန်းစဉ်များကို အလိုအလျောက်လုပ်ဆောင်ပြီး အမြင်သုံးများ ရယူရန် ခေတ်မီ ML algorithm များ။',
                'nlp-title': 'သဘာဝဘာသာစကား လုပ်ဆောင်ခြင်း',
                'nlp-desc': 'ပိုမိုကောင်းမွန်သော ဖောက်သည်အပြန်အလှန်ဆက်သွယ်မှုများအတွက် ဉာဏ်ရည်တု စာသားခွဲခြမ်းစိတ်ဖြာမှုနှင့် ဘာသာစကားနားလည်မှု။',
                'cv-title': 'ကွန်ပျူတာ အမြင်အာရုံ',
                'cv-desc': 'အရည်အသွေးထိန်းချုပ်မှုနှင့် အလိုအလျောက်လုပ်ဆောင်မှုအတွက် ပုံနှင့် ဗီဒီယို ခွဲခြမ်းစိတ်ဖြာမှု ဖြေရှင်းချက်များ။',
                'pa-title': 'ကြိုတင်ခန့်မှန်းခြင်း ခွဲခြမ်းစိတ်ဖြာမှု',
                'pa-desc': 'ကျွန်ုပ်တို့၏ ကြိုတင်ခန့်မှန်းခြင်း မော်ဒယ်များဖြင့် အလားအလာများကို ခန့်မှန်းပြီး ဒေတာအပေါ်အခြေခံသော ဆုံးဖြတ်ချက်များ ချမှတ်ပါ။',
                'proc-title': 'လုပ်ငန်းစဉ် အလိုအလျောက်လုပ်ဆောင်ခြင်း',
                'proc-desc': 'ဉာဏ်ရည်တု အလိုအလျောက်လုပ်ဆောင်မှုဖြင့် လုပ်ငန်းစဉ်များကို ပိုမိုချောမွေ့စေပြီး လက်ဖြင့်လုပ်ဆောင်ရသော အလုပ်များကို လျှော့ချပါ။',
                'chat-title': 'AI စကားပြောရောဘော့များ',
                'chat-desc': '၂၄/၇ ပံ့ပိုးမှု ပေးသော ဉာဏ်ရည်တု ဖောက်သည်ဝန်ဆောင်မှု ဖြေရှင်းချက်များ။',
                'learn-more': 'ပိုမိုလေ့လာရန် →',
                
                // About Section
                'about-title': 'AI Solutions အကြောင်း',
                'about-desc1': 'ကျွန်ုပ်တို့သည် ဉာဏ်ရည်တု ဆော့ဖ်ဝဲနှင့် အလိုအလျောက်လုပ်ဆောင်မှု ကိရိယာများ ဖွံ့ဖြိုးတည်ဆောက်ရာတွင် အထူးပြုသော ထိပ်တန်း AI Solutions ကုမ္ပဏီဖြစ်ပါသည်။ ကျွန်ုပ်တို့၏ မစ်ရှင်မှာ လုပ်ငန်းများကို ဉာဏ်ရည်တု၏ စွမ်းအားကို အသုံးချ၍ ဆန်းသစ်တီထွင်မှု၊ ထိရောက်မှုနှင့် ကြီးထွားမှုကို မောင်းနှင်ရန်ဖြစ်ပါသည်။',
                'about-desc2': 'AI သုတေသနနှင့် ဖွံ့ဖြိုးတည်ဆောက်မှုတွင် နှစ်ပေါင်းများစွာ အတွေ့အကြုံရှိပြီး လုပ်ငန်းများ လည်ပတ်ပုံနှင့် ဒစ်ဂျစ်တယ်ခေတ်တွင် ယှဉ်ပြိုင်ပုံကို ပြောင်းလဲစေသော ခေတ်မီ ဖြေရှင်းချက်များကို ပေးအပ်ပါသည်။',
                'projects-completed': 'ပြီးစီးသော စီမံကိန်းများ',
                'happy-clients': 'ကျေနပ်သော ဖောက်သည်များ',
                'why-choose': 'ကျွန်ုပ်တို့ကို ဘာကြောင့် ရွေးချယ်ရမလဲ?',
                'expert-team': 'ကျွမ်းကျင်သော AI ဖွံ့ဖြိုးတည်ဆောက်မှု အဖွဲ့',
                'custom-solutions': 'လုပ်ငန်းတိုင်းအတွက် စိတ်ကြိုက် ဖြေရှင်းချက်များ',
                'proven-track': 'သက်သေပြနိုင်သော မှတ်တမ်း',
                'support-maintenance': '၂၄/၇ ပံ့ပိုးမှုနှင့် ထိန်းသိမ်းမှု',
                'scalable-secure': 'ချဲ့ထွင်နိုင်ပြီး လုံခြုံသော ဖြေရှင်းချက်များ',
                
                // Projects Section
                'projects-title': 'ကျွန်ုပ်တို့၏ လတ်တလော စီမံကိန်းများ',
                'projects-subtitle': 'ကျွန်ုပ်တို့၏ အောင်မြင်သော AI အကောင်အထည်ဖော်မှုများကို ပြသခြင်း',
                'ecommerce-title': 'E-commerce AI လက်ထောက်',
                'ecommerce-desc': 'ရောင်းအား ၃၅% တိုးတက်စေသော ဉာဏ်ရည်တု ကုန်ပစ္စည်း အကြံပြုချက် စနစ်။',
                'healthcare-title': 'ကျန်းမာရေး ခွဲခြမ်းစိတ်ဖြာမှု ပလက်ဖောင်း',
                'healthcare-desc': 'အစောပိုင်း ရောဂါရှာဖွေတွေ့ရှိမှုအတွက် AI စွမ်းအားဖြင့် ရောဂါရှာဖွေတွေ့ရှိမှု ကိရိယာ။',
                'manufacturing-title': 'ဉာဏ်ရည်တု ထုတ်လုပ်မှု စနစ်',
                'manufacturing-desc': 'ချွတ်ယွင်းမှုများကို ၅၀% လျှော့ချသော အလိုအလျောက် အရည်အသွေးထိန်းချုပ်မှု စနစ်။',
                'view-details': 'အသေးစိတ် ကြည့်ရန် →',
                
                // Contact Section
                'contact-title': 'ဆက်သွယ်ရန်',
                'contact-subtitle': 'သင့်လုပ်ငန်းကို AI ဖြင့် ပြောင်းလဲရန် အဆင်သင့်ဖြစ်ပါသလား? ယနေ့ပင် ဆက်သွယ်ပါ!',
                'contact-info': 'ဆက်သွယ်ရန် အချက်အလက်များ',
                'your-name': 'သင့်အမည်',
                'your-email': 'သင့်အီးမေးလ်',
                'company-name': 'ကုမ္ပဏီအမည်',
                'phone-number': 'ဖုန်းနံပါတ်',
                'country': 'နိုင်ငံ',
                'job-title': 'အလုပ်ရာထူး',
                'project-details': 'စီမံကိန်း အသေးစိတ်များ',
                'send-message': 'မက်ဆေ့ပို့ရန်',
                
                // Footer
                'footer-desc': 'ဉာဏ်ရည်တု ဆော့ဖ်ဝဲနှင့် အလိုအလျောက်လုပ်ဆောင်မှု ကိရိယာများ၏ ထိပ်တန်း ပေးသူ။',
                'footer-services': 'ဝန်ဆောင်မှုများ',
                'footer-company': 'ကုမ္ပဏီ',
                'footer-connect': 'ဆက်သွယ်ရန်',
                'footer-copyright': '© ၂၀၂၄ AI Solutions Company။ မူပိုင်ခွင့်အားလုံး ရှိပါသည်။'
            }
        };
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupToggle());
        } else {
            this.setupToggle();
        }
    }
    
    setupToggle() {
        this.createToggleButton();
        this.applyLanguage(this.currentLanguage);
        this.bindEvents();
    }
    
    createToggleButton() {
        const toggleButton = document.createElement('div');
        toggleButton.id = 'language-toggle';
        toggleButton.className = 'fixed top-4 right-4 z-50 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white px-5 py-3 rounded-xl shadow-2xl cursor-pointer hover:scale-110 transition-transform flex items-center gap-2 glass-card border border-white/20';
        toggleButton.innerHTML = `
            <i class="fas fa-globe text-lg"></i>
            <span id="current-lang" class="font-bold">${this.currentLanguage === 'en' ? 'EN' : 'MY'}</span>
        `;
        
        document.body.appendChild(toggleButton);
    }
    
    bindEvents() {
        const toggleButton = document.getElementById('language-toggle');
        toggleButton.addEventListener('click', () => {
            this.toggleLanguage();
        });
    }
    
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'my' : 'en';
        localStorage.setItem('language', this.currentLanguage);
        this.applyLanguage(this.currentLanguage);
        
        // Update toggle button text
        const currentLangSpan = document.getElementById('current-lang');
        currentLangSpan.textContent = this.currentLanguage === 'en' ? 'EN' : 'MY';
    }
    
    applyLanguage(language) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[language] && this.translations[language][key]) {
                // Store original text if not already stored
                if (!element.hasAttribute('data-original-text')) {
                    element.setAttribute('data-original-text', element.textContent);
                }
                element.textContent = this.translations[language][key];
            }
        });
    }
}

// Initialize language toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new LanguageToggle();
});
