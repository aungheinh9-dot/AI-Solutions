// AI Chatbot functionality
class AIChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.responsesEnglish = [
            "That's a great question! Our AI solutions can help automate your business processes.",
            "We specialize in machine learning, natural language processing, and computer vision.",
            "Our team has completed 50+ projects with 100+ happy clients worldwide.",
            "Would you like to know more about our specific AI services?",
            "I can help you understand how AI can benefit your business. What industry are you in?",
            "Our AI chatbots can provide 24/7 customer support for your business.",
            "We offer custom AI solutions tailored to your specific business needs.",
            "Our predictive analytics can help you make data-driven decisions.",
            "Would you like to schedule a consultation with our AI experts?",
            "You can contact us directly through the contact form on this page."
        ];
        
        this.responsesMyanmar = [
            "ထိုမေးခွန်းသည် ကောင်းသောမေးခွန်းဖြစ်သည်! ကျွန်ုပ်တို့၏ AI ဖြေရှင်းချက်များသည် သင့်လုပ်ငန်း လုပ်ငန်းစဉ်များကို အလိုအလျောက်လုပ်ဆောင်စေနိုင်ပါတယ်။",
            "ကျွန်ုပ်တို့သည် စက်သင်ယူမှု၊ သဘာဝဘာသာစကား လုပ်ဆောင်ခြင်း၊ နှင့် ကွန်ပျူတာ အမြင်အာရုံတွင် အထူးပြုပါတယ်။",
            "ကျွန်ုပ်တို့၏ အဖွဲ့သည် တစ်ကမ္ဘာလုံးရှိ 100+ ကျေနပ်သော ဖောက်သည်များနှင့်အတူ 50+ ပရောဂျက်များကို ပြီးမြောက်ခဲ့ပါတယ်။",
            "ကျွန်ုပ်တို့၏ သီးခြား AI ဝန်ဆောင်မှုများ အကြောင်း ပိုမိုသိချင်လား?",
            "AI က သင့်လုပ်ငန်းကို မည်သို့ အကျိုးပြုမည်ကို နားလည်စေရန် ကျွန်ုပ် ကူညီနိုင်ပါတယ်။ သင်သည် မည်သို့သော စက်မှုလုပ်ငန်းတွင် လုပ်နေလဲ?",
            "ကျွန်ုပ်တို့၏ AI စကားပြောရောဘော့များသည် သင့်လုပ်ငန်းအတွက် 24/7 ဖောက်သည်ဝန်ဆောင်မှု ပေးနိုင်ပါတယ်။",
            "ကျွန်ုပ်တို့သည် သင့်သီးခြား လုပ်ငန်းလိုအပ်ချက်များအတွက် စိတ်ကြိုက် AI ဖြေရှင်းချက်များကို ဆောင်ရွက်ပါတယ်။",
            "ကျွန်ုပ်တို့၏ ကြိုတင်ခန့်မှန်းခြင်း ခွဲခြမ်းစိတ်ဖြာမှုသည် ဒေတာအပေါ်အခြေခံသော ဆုံးဖြတ်ချက်များ ချမှတ်ရန် ကူညီပေးနိုင်ပါတယ်။",
            "ကျွန်ုပ်တို့၏ AI ပညာရှင်များနှင့် အကြံဉာဏ်ရယူရန် အချိန်ဇယားဆွဲသလား?",
            "ဤစာမျက်နှာရှိ contact form မှတစ်ဆင့် တိုက်ရိုက် ဆက်သွယ်နိုင်ပါတယ်။"
        ];
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupElements());
        } else {
            this.setupElements();
        }
    }
    
    isMobileDevice() {
        return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    setupElements() {
        this.toggleButton = document.getElementById('chatbot-toggle');
        this.chatWindow = document.getElementById('chatbot-window');
        this.closeButton = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.inputField = document.getElementById('chatbot-input');
        this.sendButton = document.getElementById('chatbot-send');
        
        // Check if all elements exist
        if (this.toggleButton && this.chatWindow && this.closeButton && 
            this.messagesContainer && this.inputField && this.sendButton) {
            // Clear any existing messages first
            this.messagesContainer.innerHTML = '';
            this.messages = [];
            this.bindEvents();
            
            // Only add welcome message if not on mobile or if window is already open
            // Don't auto-open on mobile devices
            if (!this.isMobileDevice()) {
                // On desktop, don't auto-open but prepare welcome message
                // Welcome message will be shown when user opens chat
            }
        } else {
            console.warn('Chatbot elements not found');
        }
    }
    
    bindEvents() {
        // Toggle button event
        this.toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        // Close button event with proper event handling
        this.closeButton.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.close();
        });
        
        // Also handle touch events for mobile
        this.closeButton.addEventListener('touchend', (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.close();
        });
        
        // Send button event
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Input field events
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Close on outside click (desktop only)
        if (!this.isMobileDevice()) {
            document.addEventListener('click', (e) => {
                if (this.isOpen && 
                    !this.chatWindow.contains(e.target) && 
                    !this.toggleButton.contains(e.target)) {
                    this.close();
                }
            });
        }
        
        // Prevent window from being dragged or causing issues on mobile
        if (this.isMobileDevice()) {
            this.chatWindow.addEventListener('touchmove', (e) => {
                // Allow scrolling within messages container
                if (e.target === this.messagesContainer || this.messagesContainer.contains(e.target)) {
                    return;
                }
                // Prevent default for other areas to avoid page scrolling
                if (e.target === this.chatWindow || e.target.closest('.bg-gradient-to-r')) {
                    e.stopPropagation();
                }
            }, { passive: false });
        }
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.chatWindow.classList.remove('hidden');
        this.chatWindow.classList.add('show');
        this.isOpen = true;
        
        // Add welcome message if messages container is empty
        if (this.messagesContainer && this.messagesContainer.children.length === 0) {
            this.addWelcomeMessage();
        }
        
        // Focus input field (with delay for mobile to ensure proper rendering)
        setTimeout(() => {
            if (this.inputField) {
                this.inputField.focus();
            }
        }, 100);
        
        // Prevent body scroll on mobile when chat is open
        if (this.isMobileDevice()) {
            document.body.style.overflow = 'hidden';
        }
    }
    
    close() {
        this.chatWindow.classList.add('hidden');
        this.chatWindow.classList.remove('show');
        this.isOpen = false;
        
        // Restore body scroll on mobile
        if (this.isMobileDevice()) {
            document.body.style.overflow = '';
        }
    }
    
    addWelcomeMessage() {
        // Only add welcome message if messages container is empty
        if (this.messagesContainer && this.messagesContainer.children.length === 0) {
            this.addMessage("Hello! I'm your AI assistant. How can I help you today?", 'bot');
        }
    }
    
    sendMessage() {
        const message = this.inputField.value.trim();
        if (message) {
            this.addMessage(message, 'user');
            this.inputField.value = '';
            
            // Simulate AI response
            setTimeout(() => {
                this.generateResponse(message);
            }, 1000);
        }
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-4 flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = `inline-block p-3 sm:p-4 rounded-2xl max-w-[85%] sm:max-w-[80%] ${
            sender === 'user' 
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-tr-none' 
                : 'bg-gradient-to-r from-emerald-100 to-cyan-100 text-gray-800 rounded-tl-none'
        }`;
        messageContent.textContent = content;
        messageContent.classList.add('text-sm', 'sm:text-base');
        messageContent.style.wordWrap = 'break-word';
        messageContent.style.overflowWrap = 'break-word';
        messageContent.style.whiteSpace = 'pre-wrap';
        
        messageDiv.appendChild(messageContent);
        this.messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        
        // Store message
        this.messages.push({ content, sender, timestamp: new Date() });
    }
    
    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response;
        
        // Detect language - Check if message contains Myanmar characters
        const isMyanmar = /[\u1000-\u109F]/.test(userMessage);
        
        // Extended comprehensive responses with Myanmar language support
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || 
            lowerMessage.includes('မင်္ဂလာပါ') || lowerMessage.includes('ဟယ်လို') || lowerMessage.includes('ဟေးလို')) {
            response = isMyanmar ? 
                "မင်္ဂလာပါ! AI Solutions မှကြိုဆိုပါတယ်။ ကျွန်ုပ်တို့ ဘယ်လို ကူညီပေးနိုင်မလဲ?" :
                "Hello! Welcome to AI Solutions. How can I assist you today?";
        } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer') ||
                   lowerMessage.includes('ဝန်ဆောင်မှု') || lowerMessage.includes('ဘာလုပ်ပေးလဲ') || lowerMessage.includes('ဆောင်ရွက်ပေးတယ်')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့သည် Machine Learning, Natural Language Processing, Computer Vision, Predictive Analytics, Process Automation, နှင့် AI Chatbots အပါအဝင် ကျယ်ပြန့်သော AI ဆော့ဖ်ဝဲများ ပံ့ပိုးပေးပါတယ်။ ဘယ်နယ်ပယ်ကို စိတ်ဝင်စားလဲ?" :
                "We provide comprehensive AI solutions including Machine Learning, Natural Language Processing, Computer Vision, Predictive Analytics, Process Automation, and AI Chatbots. Which area interests you most?";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') ||
                   lowerMessage.includes('စျေးနှုန်း') || lowerMessage.includes('ဘယ်လောက်') || lowerMessage.includes('ကုန်ကျ')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ စျေးနှုန်းသည် ပရောဂျက်ရှုပ်ထွေးမှု နှင့် လိုအပ်ချက်များပေါ်တွင် မူတည်ပါတယ်။ ရိုးရှင်းသော ပရောဂျက်များသည် $5,000 မှစတင်ပြီး၊ enterprise အရာများသည် $50,000 မှ $500,000+ ထိ ဖြစ်နိုင်ပါတယ်။ စိတ်ကြိုက် အကြံဉာဏ်ရရှိရန် ကျွန်ုပ်တို့၏ အရောင်းအဖွဲ့ကို ဆက်သွယ်လိုက်ပါ။" :
                "Our pricing varies based on project complexity and requirements. Simple projects start at $5,000, enterprise solutions can range from $50,000 to $500,000+. I'd recommend contacting our sales team for a customized quote. Would you like me to help you get in touch?";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('get in touch') || lowerMessage.includes('phone') || lowerMessage.includes('email') ||
                   lowerMessage.includes('ဆက်သွယ်ရန်') || lowerMessage.includes('ဖုန်း') || lowerMessage.includes('အီးမေးလ်') || lowerMessage.includes('email') ||
                   lowerMessage.includes('how to contact') || lowerMessage.includes('reach') || lowerMessage.includes('call') ||
                   lowerMessage.includes('ဘယ်လို ဆက်သွယ်') || lowerMessage.includes('ဆက်သွယ်') || lowerMessage.includes('ချုပ်')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့ကို ဆက်သွယ်နည်းများ:\n\n📧 Email: aungheinh9@gmail.com\n📱 Phone: +1 (555) 123-4567\n📍 Address: 123 AI Street, Tech City\n\nထို့အပြင် ဤစာမျက်နှာရှိ contact form ကို ဖြည့်စွက်ပြီး အသေးစိတ် မေးမြန်းနိုင်ပါတယ်။ ကျွန်ုပ်တို့သည် 24/7 ဖွင့်လှစ်ပြီး အလျင်အမြန် တုံ့ပြန်မှု ပေးပါတယ်။ မည်သည့်အချိန်တွင်မဆို ကျွန်ုပ်တို့ကို ဆက်သွယ်နိုင်ပါတယ်!" :
                "Ways to contact us:\n\n📧 Email: aungheinh9@gmail.com\n📱 Phone: +1 (555) 123-4567\n📍 Address: 123 AI Street, Tech City\n\nYou can also fill out the contact form on this page for detailed inquiries. We're available 24/7 and provide quick responses. Feel free to reach out anytime!";
        } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('done') ||
                   lowerMessage.includes('ပရောဂျက်') || lowerMessage.includes('လုပ်ပြီး') || lowerMessage.includes('လက်ရာ')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့သည် ကျန်းမာရေး analytics platforms, e-commerce AI assistants, smart manufacturing systems, နှင့် ငွေကြေး AI ဆော့ဖ်ဝဲများ အပါအဝင် 50+ အောင်မြင်သော AI ပရောဂျက်များ ပြီးမြောက်ခဲ့ပါတယ်။ ဘယ် ပရောဂျက် အကြောင်း ပိုမို သိချင်လဲ?" :
                "We've completed 50+ successful AI projects including healthcare analytics platforms, e-commerce AI assistants, smart manufacturing systems, and financial AI solutions. Would you like to know more about any specific project?";
        } else if (lowerMessage.includes('team') || lowerMessage.includes('expert') || lowerMessage.includes('people') ||
                   lowerMessage.includes('အဖွဲ့') || lowerMessage.includes('ကျွမ်းကျင်ပညာရှင်') || lowerMessage.includes('လူ')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ အဖွဲ့တွင် 25+ အတွေ့အကြုံရှိ AI researchers, machine learning engineers, နှင့် software developers များ ပါဝင်ပြီး အမျိုးမျိုးသော AI အကြံများနှင့် စက်မှုလုပ်ငန်းများတွင် ကျွမ်းကျင်ပြီးဖြစ်ပါတယ်။" :
                "Our team consists of 25+ experienced AI researchers, machine learning engineers, and software developers with expertise spanning various AI technologies and industries.";
        } else if (lowerMessage.includes('time') || lowerMessage.includes('duration') || lowerMessage.includes('how long') || lowerMessage.includes('delivery') ||
                   lowerMessage.includes('အချိန်ဘယ်လောက်') || lowerMessage.includes('ကြာမယ်') || lowerMessage.includes('ပေးအပ်')) {
            response = isMyanmar ?
                "ပရောဂျက်အချိန်များသည် ကွဲပြားပါတယ်: ရိုးရှင်းသော AI ဆော့ဖ်ဝဲများ (2-4 ပတ်), အလယ်အလတ် ပရောဂျက်များ (1-3 လ), ရှုပ်ထွေးသော enterprise systems (3-6 လ)။ ကျွန်ုပ်တို့သည် အကြံဉာဏ်ရယူစဉ်တွင် အသေးစိတ် အချိန်များ ပေးပါတယ်။" :
                "Project timelines vary: Simple AI solutions (2-4 weeks), Medium projects (1-3 months), Complex enterprise systems (3-6 months). We provide detailed timelines during the consultation phase.";
        } else if (lowerMessage.includes('support') || lowerMessage.includes('maintenance') || lowerMessage.includes('help') ||
                   lowerMessage.includes('ပံ့ပိုး') || lowerMessage.includes('ထိန်းသိမ်း') || lowerMessage.includes('အကူအညီ')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့သည် ကျွန်ုပ်တို့၏ AI ဆော့ဖ်ဝဲအားလုံးအတွက် 24/7 ပံ့ပိုးခြင်း နှင့် ထိန်းသိမ်းမှု ပံ့ပိုးပေးပါတယ်။ ဤတွင် troubleshooting, updates, စွမ်းဆောင်မှု စောင့်ကြည့်ခြင်း၊ နှင့် ဆက်တိုက် ပိုမိုကောင်းမွန်ရေး ပါဝင်ပါတယ်။ ကျွန်ုပ်တို့၏ တုံ့ပြန်ချိန်သည် အရေးကြီးသော ပြဿနာများအတွက် 4 နာရီ အတွင်းဖြစ်ပါတယ်။" :
                "We provide 24/7 support and maintenance for all our AI solutions. This includes troubleshooting, updates, performance monitoring, and continuous improvement. Our response time is under 4 hours for critical issues.";
        } else if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ Machine Learning ဝန်ဆောင်မှုများတွင် ကြိုတင်ခန့်မှန်းခြင်း မော်ဒယ်များ၊ အမျိုးအစား စနစ်များ၊ အကြံပြုချက် အင်ဂျင်၊ နှင့် အလိုအလျောက် ဆုံးဖြတ်ချက်ချမှတ်သော စနစ်များ ပါဝင်ပါတယ်။ ကျွန်ုပ်တို့သည် TensorFlow, PyTorch, နှင့် Scikit-learn တို့ကို အသုံးပြုပါတယ်။" :
                "Our Machine Learning services include predictive models, classification systems, recommendation engines, and automated decision-making systems. We use TensorFlow, PyTorch, and Scikit-learn.";
        } else if (lowerMessage.includes('natural language') || lowerMessage.includes('nlp')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ NLP ဖြေရှင်းချက်များတွင် ခံစားချက် ခွဲခြမ်းစိတ်ဖြာမှု၊ စကားပြောရောဘော့များ၊ စာသား အမျိုးအစား ခွဲခြားခြင်း၊ အမည်ထည့်သွင်း လက္ခဏာဖော်ထုတ်ခြင်း၊ နှင့် ဘာသာစကား ဘာသာပြန်ခြင်း ပါဝင်ပါတယ်။ ကျွန်ုပ်တို့သည် စာသား လုပ်ငန်းစဉ်များကို အလိုအလျောက်လုပ်ဆောင်ရန် ကူညီပေးပါတယ်။" :
                "Our NLP solutions include sentiment analysis, chatbots, text classification, named entity recognition, and language translation. We help automate text processing workflows.";
        } else if (lowerMessage.includes('computer vision') || lowerMessage.includes('image') || lowerMessage.includes('video')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ Computer Vision ဝန်ဆောင်မှုများတွင် အရာ ခွဲခြမ်းစိတ်ဖြာခြင်း နှင့် အသိအမှတ်ပြုခြင်း၊ မျက်နှာ အသိအမှတ်ပြုခြင်း၊ အရည်အသွေး ထိန်းချုပ်မှု စနစ်များ၊ ဆေးပညာ ပုံ ခွဲခြမ်းစိတ်ဖြာမှု၊ နှင့် အချိန်အပြည့် ဗီဒီယို လုပ်ဆောင်မှု ပါဝင်ပါတယ်။" :
                "Our Computer Vision services include object detection, facial recognition, quality control systems, medical image analysis, and real-time video processing.";
        } else if (lowerMessage.includes('chatbot') || lowerMessage.includes('bot')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့သည် NLP နှင့် ML အသုံးပြု၍ ဉာဏ်ရည်တု စကားပြောရောဘော့များ ဖွံ့ဖြိုးတည်ဆောက်ပြီး 24/7 ဖောက်သည်ဝန်ဆောင်မှု၊ အငြင်းအခုံ ကိုင်တွယ်ခြင်း၊ လုပ်ငန်းစဉ်များ အလိုအလျောက်လုပ်ဆောင်ခြင်း၊ နှင့် CRM စနစ်များနှင့် ပေါင်းစပ်ခြင်း ပြုလုပ်ပါတယ်။ ဘာသာစကားများစွာတွင် ရရှိနိုင်ပါတယ်။" :
                "We develop intelligent chatbots using NLP and ML that provide 24/7 customer support, handle inquiries, automate workflows, and integrate with CRM systems. Available in multiple languages.";
        } else if (lowerMessage.includes('automation') || lowerMessage.includes('rpa') || lowerMessage.includes('automate')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ အလိုအလျောက်လုပ်ဆောင်မှု ဖြေရှင်းချက်များသည် AI အသုံးပြု၍ ထပ်နေသော အလုပ်များ အလိုအလျောက်လုပ်ဆောင်ခြင်း၊ စာရွက်စာတမ်းများ လုပ်ဆောင်ခြင်း၊ လုပ်ငန်းစဉ်များ စီမံခန့်ခွဲခြင်း၊ နှင့် စနစ်များ ပေါင်းစပ်ခြင်း ပြုလုပ်ပါတယ်။ ကျွန်ုပ်တို့သည် လက်ဖြင့်လုပ်ဆောင်ရသော အလုပ်များကို 80% အထိ လျှော့ချရန် ကူညီပေးပါတယ်။" :
                "Our automation solutions use AI to automate repetitive tasks, process documents, manage workflows, and integrate systems. We help reduce manual work by up to 80%.";
        } else if (lowerMessage.includes('analytics') || lowerMessage.includes('predict') || lowerMessage.includes('forecast')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ ကြိုတင်ခန့်မှန်းခြင်း ခွဲခြမ်းစိတ်ဖြာမှု ဖြေရှင်းချက်များသည် ML မော်ဒယ်များကို အသုံးပြု၍ အလားအလာများ ခန့်မှန်းခြင်း၊ ဖောက်သည် အပြုအမူ ခန့်မှန်းခြင်း၊ ကုန်ပစ္စည်း အကွက် ချဲ့ထွင်းခြင်း၊ စွန့်ခွာမှု တားဆီးခြင်း၊ နှင့် ဒေတာအပေါ်အခြေခံသော ဆုံးဖြတ်ချက်များ ချမှတ်ခြင်း ကူညီပေးပါတယ်။" :
                "Our Predictive Analytics solutions use ML models to forecast trends, predict customer behavior, optimize inventory, prevent churn, and make data-driven decisions.";
        } else if (lowerMessage.includes('industry') || lowerMessage.includes('sector') || lowerMessage.includes('business')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့သည် ကျန်းမာရေး၊ ငွေကြေး၊ ရောင်းဝယ်ရေး၊ ထုတ်လုပ်မှု၊ ရေကြောင်း၊ နှင့် နည်းပညာ စက်မှုလုပ်ငန်းများတွင် ဝန်ဆောင်မှု ပေးပါတယ်။ ကျွန်ုပ်တို့၏ AI ဖြေရှင်းချက်များသည် တစ်ခုချင်းစီ၏ ထူးခြားသော လိုအပ်ချက်များအတွက် စိတ်ကြိုက်ဖြစ်ပါတယ်။" :
                "We serve healthcare, finance, retail, manufacturing, logistics, and technology industries. Our AI solutions are customized for each sector's unique needs.";
        } else if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('tools')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့သည် ခေတ်မီနည်းပညာများ အသုံးပြုပါတယ်: Python, TensorFlow, PyTorch, OpenAI GPT, LangChain, AWS, Azure, Docker, Kubernetes, နှင့် cloud ML ဝန်ဆောင်မှုများစွာ။" :
                "We use cutting-edge technologies: Python, TensorFlow, PyTorch, OpenAI GPT, LangChain, AWS, Azure, Docker, Kubernetes, and various cloud ML services.";
        } else if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('since')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့သည် 2020 ခုနှစ်မှစ၍ AI တွင် 5+ နှစ်အတွေ့အကြုံရှိပြီး၊ 50+ ပရောဂျက်များကို ပြီးမြောက်ပြီး၊ တစ်ကမ္ဘာလုံးရှိ 100+ ဖောက်သည်များကို ဝန်ဆောင်မှု ပေးပြီး၊ AI ဆန်းသစ်တီထွင်မှု ဆုများစွာကို ရရှိခဲ့ပါတယ်။" :
                "We've been in AI since 2020 with 5+ years of experience, completed 50+ projects, served 100+ clients globally, and won multiple AI innovation awards.";
        } else if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who') || lowerMessage.includes('what') ||
                   lowerMessage.includes('အကြောင်း') || lowerMessage.includes('ကုမ္ပဏီ') || lowerMessage.includes('မည်သူ') || lowerMessage.includes('ဘာ')) {
            response = isMyanmar ?
                "AI Solutions သည် ဉာဏ်ရည်တု ဆော့ဖ်ဝဲနှင့် အလိုအလျောက်လုပ်ဆောင်မှု ကိရိယာများ ဖွံ့ဖြိုးတည်ဆောက်ရာတွင် အထူးပြုသော ထိပ်တန်း AI ကုမ္ပဏီဖြစ်ပါသည်။ ကျွန်ုပ်တို့သည် လုပ်ငန်းများကို AI ၏ စွမ်းအားကို အသုံးချ၍ ဆန်းသစ်တီထွင်မှု၊ ထိရောက်မှုနှင့် ကြီးထွားမှုကို မောင်းနှင်ရန် ကူညီပေးပါတယ်။" :
                "AI Solutions is a leading AI company specializing in developing intelligent software and automation tools. We help businesses harness AI to drive innovation, efficiency, and growth.";
        } else if (lowerMessage.includes('success') || lowerMessage.includes('example') || lowerMessage.includes('case study') || lowerMessage.includes('story') ||
                   lowerMessage.includes('အောင်မြင်') || lowerMessage.includes('ဥပမာ') || lowerMessage.includes('ပြီးစီး')) {
            response = isMyanmar ?
                "အောင်မြင်သော ဥပမာများ: E-commerce ကုမ္ပဏီတစ်ခုသည် AI ကုန်ပစ္စည်း အကြံပြုချက်စနစ်ကို အသုံးပြု၍ ရောင်းအား 35% တိုးတက်ခဲ့ပါတယ်။ ကျန်းမာရေး ပံ့ပိုးသူတစ်ဦးသည် diagnostic အမှားအယွင်းများကို 45% လျှော့ချခဲ့ပါတယ်။ ဘယ်အကြောင်းအရာ အသေးစိတ် သိချင်လဲ?" :
                "Success stories: An e-commerce company increased sales by 35% using AI product recommendations. A healthcare provider reduced diagnostic errors by 45%. Would you like more details?";
        } else if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage') || lowerMessage.includes('why')) {
            response = isMyanmar ?
                "ကျွန်ုပ်တို့၏ AI ဖြေရှင်းချက်များသည် ပေးပါတယ်: ကုန်ကျစရိတ် လျှော့ချမှု (30-50%), အချိန်ချွေတာမှု (70-80%), တိုးတက်သော တိကျမှု (95%+), ပိုမိုကောင်းမွန်သော ဆုံးဖြတ်ချက်ချမှတ်ခြင်း၊ 24/7 အလိုအလျောက်လုပ်ဆောင်မှု၊ နှင့် ကြီးထွားမှုအတွက် အချိုးအစား။" :
                "Our AI solutions provide: Cost reduction (30-50%), Time savings (70-80%), Improved accuracy (95%+), Better decision-making, 24/7 automation, and Scalability for growth.";
        } else if (isMyanmar) { // Fallback for Myanmar if no specific keyword match
            response = "ကျေးဇူးပြု၍ ပိုမိုသိရှိရန် ပြဋ္ဌာန်းချက်များကို မေးခဲ့ပါ။ ကျွန်ုပ်တို့သည် AI solutions, ဝန်ဆောင်မှုများ၊ စျေးနှုန်းများ၊ ပရောဂျက်များ၊ အဖွဲ့၊ ပံ့ပိုးမှု၊ နှင့် အခြားများစွာတို့ အကြောင်း ပြောပြနိုင်ပါတယ်။";
        } else { // Fallback for English
            response = this.responsesEnglish[Math.floor(Math.random() * this.responsesEnglish.length)];
        }
        
        this.addMessage(response, 'bot');
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new AIChatbot();
});
