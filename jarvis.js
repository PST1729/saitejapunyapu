// Add this JavaScript code to a new file called jarvis.js and include it in your HTML

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const jarvisToggle = document.getElementById('jarvis-toggle');
    const jarvisContainer = document.querySelector('.jarvis-container');
    const jarvisClose = document.getElementById('jarvis-close');
    const jarvisInput = document.getElementById('jarvis-input');
    const jarvisSend = document.getElementById('jarvis-send');
    const jarvisMessages = document.getElementById('jarvis-messages');

    // Knowledge base about Sai Teja
    const knowledgeBase = {
        name: "Sai Teja Punyapu",
        title: "Business Analyst and Product Owner",
        expertise: ["Data Analytics", "Product Management", "Business Analysis", "AI"],
        experience: {
            years: "2+",
            projects: "10+",
            certifications: "4+",
            technologies: "3+"
        },
        contact: {
            email: "punyapusaiteja@gmail.com",
            phone: "+91 8555012058",
            linkedin: "Sai Teja Punyapu"
        },
        education: [
            { institution: "UT Dallas", degree: "MS AI & Business Analytics", period: "Fall 2025 – Spring 2027" },
            { institution: "KIIT University", degree: "BTech in Computer Science", period: "2020 – 2024", gpa: "8.57" },
            { institution: "SASI Institute", degree: "High School", period: "2018 – 2020", grade: "9.86" },
            { institution: "KKR Gowtham", degree: "Schooling", period: "– 2018" }
        ],
        currentPositions: [

            { role: "Associate Product Owner", company: "Kovalty Technologies", period: "Sep 2024 - Present", 
              description: ["Managing product requirements and feature prioritization", 
                           "Conducting stakeholder analysis and requirements gathering", 
                           "Implementing agile methodologies for efficient product delivery"] }
        ],
        previousPositions: [
            { role: "Business Analyst", company: "FinanceOps.AI", period: "Dec 2023 - Sep 2024", 
              description: ["Built an AI bot managing thousands of delinquent accounts with no manual intervention", 
                           "Improved forecasting and operational efficiency through KPI dashboards", 
                           "Supported both strategic initiatives and automation efforts"] },
            { role: "Product Intern", company: "HighRadius", period: "May 2023 - Dec 2023", 
              description: ["Built ML model for Order Amount Forecasting in the H2H Program", 
                           "Conducted UAT and automated test cases for better QA efficiency", 
                           "Used Python, Jira, and dashboards for reporting and validation"] },
            { role: "Design & Creative Intern", company: "Metaverse Simplified", period: "Apr 2022 - Apr 2023", 
              description: ["Created 200+ designs reaching 1M+ views", 
                           "Built a reusable template library", 
                           "Collaborated closely on brand-building and visual direction"] }
        ],
        skills: {
            programming: "English is the new programming language*",
            tools: ["Python", "SQL", "Tableau", "PowerBI", "Excel", "Jira", "Figma", "Azure"],
            core: ["Data Analysis", "Product Management", "Business Requirements", "User Stories", 
                   "Agile", "ML", "AI", "UX Design", "UI Design"]
        },
        resume: "https://drive.google.com/file/d/1qgavdAyTF4uGqzS9E0RJAUqFobJIXYAh/preview",
        projects: [
            { name: "Voyage", tags: ["Vibe Coding", "Travel"], description: "Travel together, Stress never" },
            { name: "Netflix Analysis", tags: ["Dashboards", "Tableau", "Data Viz"], 
              description: "Dynamic Tableau dashboard analyzing Netflix's content library through 2020" },
            { name: "KOT - KIIT Chat Bot", tags: ["AI/ML", "Figma", "Chatbot"], 
              description: "Interactive chatbot prototype designed for KIIT University" },
            { name: "Compass", tags: ["Vibe Coding", "SAAS", "Travel"], 
              description: "CRM Software for travel first businesses" },
            { name: "Design For Metaverse Simplified", tags: ["UI/UX", "Social Media"], 
              description: "Visual designs for LinkedIn, Instagram, and YouTube campaigns" },
            { name: "Bassu Plantations", tags: ["UI/UX", "App Design", "Prototyping"], 
              description: "UI design for an indoor plants delivery application" }
        ]
    };

    // Mobile detection
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }

    // Toggle Jarvis visibility
    jarvisToggle.addEventListener('click', function() {
        jarvisContainer.style.display = 'flex';
        jarvisToggle.style.display = 'none';
        
        // Prevent body scroll on mobile when Jarvis is open
        if (isMobileDevice()) {
            document.body.classList.add('jarvis-open');
        }
        
        // Only auto-focus on desktop to prevent mobile keyboard from opening
        if (!isMobileDevice()) {
            jarvisInput.focus();
        }
    });

    // Close Jarvis
    jarvisClose.addEventListener('click', function() {
        jarvisContainer.style.display = 'none';
        jarvisToggle.style.display = 'flex';
        
        // Restore body scroll on mobile when Jarvis is closed
        if (isMobileDevice()) {
            document.body.classList.remove('jarvis-open');
        }
    });

    // Send message function
    function sendMessage() {
        const userMessage = jarvisInput.value.trim();
        if (userMessage === '') return;

        // Add user message to chat
        addMessage(userMessage, 'user');

        // Clear input
        jarvisInput.value = '';

        // Show loading indicator
        showLoadingIndicator();

        // Process user query
        processUserQuery(userMessage);
    }

    // Send button click
    jarvisSend.addEventListener('click', sendMessage);

    // Enter key press
    jarvisInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add mobile-friendly input focus behavior
    jarvisInput.addEventListener('touchstart', function() {
        // Only focus on mobile when user explicitly taps the input
        if (isMobileDevice()) {
            this.focus();
        }
    });

    // Add message to chat
    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.className = `jarvis-message ${sender}`;

        const avatarElement = document.createElement('div');
        avatarElement.className = 'jarvis-avatar';

        if (sender === 'assistant') {
            const avatarImg = document.createElement('img');
            avatarImg.src = 'https://i.gifer.com/origin/34/3459e0e117b5d35a51aef0cf1e443831_w200.webp';
            avatarImg.alt = 'Jarvis';
            avatarElement.appendChild(avatarImg);
        } else {
            avatarElement.textContent = 'U';
        }

        const contentElement = document.createElement('div');
        contentElement.className = 'jarvis-message-content';

        const paragraph = document.createElement('p');
        paragraph.innerHTML = message;
        contentElement.appendChild(paragraph);

        messageElement.appendChild(avatarElement);
        messageElement.appendChild(contentElement);

        jarvisMessages.appendChild(messageElement);

        // Scroll to the bottom
        jarvisMessages.scrollTop = jarvisMessages.scrollHeight;
    }

    // Show loading indicator
    function showLoadingIndicator() {
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'jarvis-message assistant';
        loadingMessage.id = 'loading-message';

        const avatarElement = document.createElement('div');
        avatarElement.className = 'jarvis-avatar';

        const avatarImg = document.createElement('img');
        avatarImg.src = 'https://i.gifer.com/origin/34/3459e0e117b5d35a51aef0cf1e443831_w200.webp';
        avatarImg.alt = 'Jarvis';
        avatarElement.appendChild(avatarImg);

        const contentElement = document.createElement('div');
        contentElement.className = 'jarvis-message-content';

        const loadingDots = document.createElement('div');
        loadingDots.className = 'loading-dots';
        loadingDots.innerHTML = '<span></span><span></span><span></span>';

        contentElement.appendChild(loadingDots);
        loadingMessage.appendChild(avatarElement);
        loadingMessage.appendChild(contentElement);

        jarvisMessages.appendChild(loadingMessage);
        jarvisMessages.scrollTop = jarvisMessages.scrollHeight;
    }

    // Remove loading indicator
    function removeLoadingIndicator() {
        const loadingMessage = document.getElementById('loading-message');
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    // Handle simple queries locally without API
    function handleSimpleQuery(query) {
        const lowerQuery = query.toLowerCase();

        // Contact information queries
        if (lowerQuery.includes('email') || lowerQuery.includes('mail')) {
            return `Sai Teja's email is <a href="mailto:${knowledgeBase.contact.email}">${knowledgeBase.contact.email}</a>`;
        }



        if (lowerQuery.includes('phone') || lowerQuery.includes('call') || lowerQuery.includes('contact number')) {
            return `Sai Teja's phone number is <a href="tel:${knowledgeBase.contact.phone}">${knowledgeBase.contact.phone}</a>`;
        }

        if (lowerQuery.includes('linkedin') || lowerQuery.includes('social media')) {
            return `You can find Sai Teja on LinkedIn as <a href="https://www.linkedin.com/in/connect-saiteja/" target="_blank">${knowledgeBase.contact.linkedin}</a>`;
        }

        // Resume queries
        if (lowerQuery.includes('resume') || lowerQuery.includes('cv')) {
            return `You can view Sai Teja's resume <a href="${knowledgeBase.resume}" target="_blank">here</a>.`;
        }

        // Education queries
        if (lowerQuery.includes('education') || lowerQuery.includes('study') || 
            lowerQuery.includes('university') || lowerQuery.includes('college') || 
            lowerQuery.includes('degree')) {
            let response = "Sai Teja's educational background includes:<br>";
            knowledgeBase.education.forEach(edu => {
                response += `• <span class="highlight">${edu.institution}</span>: ${edu.degree} ${edu.period}`;
                if (edu.gpa) response += ` | CGPA: ${edu.gpa}`;
                if (edu.grade) response += ` | Grade: ${edu.grade}`;
                response += "<br>";
            });
            return response;
        }

        // Experience-related queries
        if (lowerQuery.includes('experience') || lowerQuery.includes('work') || 
            lowerQuery.includes('job') || lowerQuery.includes('position') || 
            lowerQuery.includes('employment')) {

            let response = "Sai Teja is currently working as:<br>";
            knowledgeBase.currentPositions.forEach(pos => {
                response += `• <span class="highlight">${pos.role}</span> at ${pos.company} (${pos.period})<br>`;
            });

            response += "<br>Previous positions include:<br>";
            knowledgeBase.previousPositions.forEach(pos => {
                response += `• <span class="highlight">${pos.role}</span> at ${pos.company} (${pos.period})<br>`;
            });

            return response;
        }

        // Skills queries
        if (lowerQuery.includes('skill') || lowerQuery.includes('expertise') || 
            lowerQuery.includes('proficient') || lowerQuery.includes('know')) {

            let response = "Sai Teja's skills include:<br><br>";

            response += "<span class='highlight'>Tools & Technologies:</span><br>";
            response += knowledgeBase.skills.tools.join(", ") + "<br><br>";

            response += "<span class='highlight'>Core Skills:</span><br>";
            response += knowledgeBase.skills.core.join(", ");

            return response;
        }

        // Projects queries
        if (lowerQuery.includes('project') || 
            (lowerQuery.includes('work') && !lowerQuery.includes('experience') && !lowerQuery.includes('job')) || 
            lowerQuery.includes('portfolio')) {

            // Explicitly trace what we're returning for debugging
            console.log("Handling as a PROJECT query");

            let response = "Some of Sai Teja's notable projects include:<br>";
            knowledgeBase.projects.forEach(project => {
                response += `• <span class="highlight">${project.name}</span>: ${project.description}<br>`;
            });

            return response;
        }

        // General info/introduction
        if (lowerQuery.includes('who is') || lowerQuery.includes('about') || 
            lowerQuery.includes('tell me about') || lowerQuery.includes('info') || 
            lowerQuery.includes('introduce') || lowerQuery.includes('bio')) {

            return `${knowledgeBase.name} is a ${knowledgeBase.title} with expertise in ${knowledgeBase.expertise.join(", ")}. He has ${knowledgeBase.experience.years} years of experience and has completed ${knowledgeBase.experience.projects} projects. Currently, he's working as a ${knowledgeBase.currentPositions[0].role} at ${knowledgeBase.currentPositions[0].company} and as a ${knowledgeBase.currentPositions[1].role} at ${knowledgeBase.currentPositions[1].company}.`;
        }

        // Contact/hire services
        if (lowerQuery.includes('hire') || lowerQuery.includes('recruit') || 
            lowerQuery.includes('employment') || lowerQuery.includes('services') || 
            lowerQuery.includes('work with')) {

            return `If you're interested in hiring Sai Teja or discussing potential opportunities, please reach out via email at <a href="mailto:${knowledgeBase.contact.email}">${knowledgeBase.contact.email}</a> or phone at <a href="tel:${knowledgeBase.contact.phone}">${knowledgeBase.contact.phone}</a>. You can also view his complete resume <a href="${knowledgeBase.resume}" target="_blank">here</a>.`;
        }

        return null; // No local answer found
    }

    // Process user query
    async function processUserQuery(query) {
        // First try to handle simple queries locally
        const localResponse = handleSimpleQuery(query);

        if (localResponse) {
            // Use local knowledge base response
            setTimeout(() => {
                removeLoadingIndicator();
                addMessage(localResponse, 'assistant');
            }, 500); // Small delay to make it feel natural
            return;
        }

        // For more complex queries, use the AI API
        try {
            const payload = {
                messages: [
                    {
                        role: "system",
                        content: `You are Jarvis, the personal AI assistant of Sai Teja Punyapu, a Business Analyst and Product Owner with expertise in data analytics and product management. You help answer questions about Sai Teja, his experience, skills, projects, and anything related to his professional life. Be concise, helpful, and personable. Always respond in 1-3 paragraphs maximum. Here is information about Sai Teja:

Name: Sai Teja Punyapu
Title: Business Analyst and Product Owner
Expertise: Data Analytics, Product Management, Business Analysis, AI
Experience: 2+ years experience, 10+ projects completed, 4+ certifications, 3+ technologies
Education: 
- UT Dallas: MS AI & Business Analytics (Fall 2025 – Spring 2027)
- KIIT University: BTech in Computer Science (2020-2024, CGPA: 8.57)
- SASI Institute: High School (2018-2020, Grade: 9.86)
- KKR Gowtham: Schooling (till 2018)

Current Positions:
- Associate Product Owner at Kovalty Technologies - Sep 2024 - Aug 2025
• Delivered AI/ML-powered features end-to-end, boosting client engagement by 28% via intelligent personaliza-
tion and automated business insights.
• Prioritized and managed a backlog of 50+ data science initiatives, reducing time-to-market for ML solutions by
35% while aligning with key business OKRs.
• Drove development of analytics dashboards that enhanced stakeholder KPI visibility and cut manual reporting
time by 70%, enabling real-time, data-driven decisions.
• Led Agile ceremonies across 8 teams, reducing rework and improving on-time delivery across sprints.

Previous Positions:
- Business Analyst at FinanceOps.AI (Jan 2023 - Aug 2024)
• Increased $500K in AR recovery by identifying delinquency patterns and streamlining dunning workflows
through data-driven analysis.
• Built financial dashboards that boosted cash flow forecast accuracy by 50%.
• Spearheaded UAT for multiple enterprise clients and introduced automation, cutting testing time by 90%
- Product Intern at HighRadius (May 2023 - Dec 2023)
• Developed and executed 100+ automated tests using Selenium and Postman to streamline regression testing.
• Maintained test cases for a web application, ensuring 95% coverage across critical modules.
- Design & Creative Intern at Metaverse Simplified (Apr 2022 - Apr 2023)
  * Created 200+ designs reaching 1M+ views
  * Built a reusable template library
  * Collaborated closely on brand-building and visual direction

Skills:
- Tools & Technologies: Python, SQL, Tableau, PowerBI, Excel, Jira, Figma, Azure
- Core Skills: Data Analysis, Product Management, Business Requirements, User Stories, Agile, ML, AI, UX Design, UI Design

Projects:
- Voyage: Travel together, Stress never
- Netflix Analysis: Dynamic Tableau dashboard analyzing Netflix's content library through 2020
- KOT - KIIT Chat Bot: Interactive chatbot prototype designed for KIIT University
- Compass: CRM Software for travel first businesses
- Design For Metaverse Simplified: Visual designs for LinkedIn, Instagram, and YouTube campaigns
- Bassu Plantations: UI design for an indoor plants delivery application

Contact:
- Email: punyapusaiteja@gmail.com
- Phone: +91 8555012058
- LinkedIn: Sai Teja Punyapu

Resume: https://drive.google.com/file/d/1qgavdAyTF4uGqzS9E0RJAUqFobJIXYAh/preview`
                    },
                    {
                        role: "user",
                        content: query
                    }
                ],
                max_tokens: 500,
                temperature: 0.7,
                top_p: 0.95,
                frequency_penalty: 0,
                presence_penalty: 0
            };

const response = await fetch("/.netlify/functions/jarvis", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
});


            if (!response.ok) {
                            throw new Error(`API request failed with status ${response.status}`);
                        }

                        const result = await response.json();
                        const aiResponse = result.choices && result.choices[0] && result.choices[0].message ? 
                                           result.choices[0].message.content : 
                                           "I'm having trouble processing that request right now.";

                        // Remove loading indicator and add AI response
                        removeLoadingIndicator();
                        addMessage(aiResponse, 'assistant');

                    } catch (error) {
                        console.error('Error calling AI API:', error);

                        // Fallback response in case of API failure
                        removeLoadingIndicator();
                        addMessage("I'm sorry, I'm having trouble connecting to my knowledge center right now. Can you try asking something simple like contact information or about Sai's experience?", 'assistant');
                    }
                }

                // Initialize with a welcome message (already in HTML)
                // Add auto-suggestions for common questions
                const suggestions = [
                    "What's Sai's experience?",
                    "Tell me about Sai's skills",
                    "How can I contact Sai?",
                    "Can you share the Portfolio of Sai?",
                    "What's Sai's educational background?"
                ];

                // Add suggestion chips after a short delay
                setTimeout(() => {
                    const suggestionMessage = document.createElement('div');
                    suggestionMessage.className = 'jarvis-message assistant';

                    const avatarElement = document.createElement('div');
                    avatarElement.className = 'jarvis-avatar';

                    const avatarImg = document.createElement('img');
                    avatarImg.src = 'https://i.gifer.com/origin/34/3459e0e117b5d35a51aef0cf1e443831_w200.webp';
                    avatarImg.alt = 'Jarvis';
                    avatarElement.appendChild(avatarImg);

                    const contentElement = document.createElement('div');
                    contentElement.className = 'jarvis-message-content';

                    const paragraph = document.createElement('p');
                    paragraph.textContent = "You can ask me things like:";
                    contentElement.appendChild(paragraph);

                    const chipContainer = document.createElement('div');
                    chipContainer.style.display = 'flex';
                    chipContainer.style.flexWrap = 'wrap';
                    chipContainer.style.gap = '5px';
                    chipContainer.style.marginTop = '8px';

                    suggestions.forEach(suggestion => {
                        const chip = document.createElement('span');
                        chip.textContent = suggestion;
                        chip.style.backgroundColor = 'rgba(19, 71, 204, 0.1)';
                        chip.style.padding = '6px 12px';
                        chip.style.borderRadius = '15px';
                        chip.style.fontSize = '12px';
                        chip.style.cursor = 'pointer';
                        chip.style.marginBottom = '5px';
                        chip.style.transition = 'background-color 0.2s';

                        chip.addEventListener('mouseover', () => {
                            chip.style.backgroundColor = 'rgba(19, 71, 204, 0.2)';
                        });

                        chip.addEventListener('mouseout', () => {
                            chip.style.backgroundColor = 'rgba(19, 71, 204, 0.1)';
                        });

                        chip.addEventListener('click', () => {
                            jarvisInput.value = suggestion;
                            jarvisInput.focus();
                        });

                        chipContainer.appendChild(chip);
                    });

                    contentElement.appendChild(chipContainer);
                    suggestionMessage.appendChild(avatarElement);
                    suggestionMessage.appendChild(contentElement);

                    jarvisMessages.appendChild(suggestionMessage);
                }, 1000);
            });

// Auto-open Jarvis after 10-15 seconds (as requested)
setTimeout(function() {
    // Check if this is the user's first visit (using localStorage)
    const hasVisitedBefore = localStorage.getItem('jarvisShown');
    
    // Mobile detection
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 768;
    }

    if (!hasVisitedBefore) {
        // Open Jarvis
        toggleJarvis();

        // Set flag that Jarvis has been shown
        localStorage.setItem('jarvisShown', 'true');
    }
}, Math.random() * 5000 + 10000); // Random delay between 10-15 seconds