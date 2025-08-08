// Preloader functionality
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.classList.add('hidden');
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const MIN_DISPLAY_MS = 900; // snappier but visible
    const MAX_WAIT_MS = 4000;   // hard fallback
    const startTime = Date.now();

    const onLoaded = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
        setTimeout(hidePreloader, remaining);
        window.removeEventListener('load', onLoaded);
    };

    window.addEventListener('load', onLoaded);
    setTimeout(hidePreloader, MAX_WAIT_MS);

    // Initialize all charts and visualizations with improved styles
    initExperienceTimelineChart();
    initEducationTimelineChart();
    initSkillsCharts();

    // Setup view switching for sections with multiple views
    setupViewSwitchers();

    // Setup contact form handling
    setupContactForm();

    // Add scroll animations
    setupScrollAnimations();

    // Setup resume preview hover functionality
    setupResumePreview();

    // Setup mobile navigation
    setupMobileNav();
});

function initExperienceTimelineChart() {
    const ctx = document.getElementById('experienceChart');
    if (!ctx) return;

    const today = new Date().toISOString().split('T')[0]; // Gets today's date in 'YYYY-MM-DD'

    const experiences = [

        {
            company: 'Kovalty Technologies',
            role: 'Associate Product Owner',
            logo:'https://blogger.googleusercontent.com/img/a/AVvXsEjCzD74LmdC2EvvN93wElF4BNzANEWi8wp94TU33iTvxr78XtrDan2WQs5WEwNL6sQHFSK2bI9ltOf7qULVjs3Ev4qQhqepWEc9y1aIu0Jb-Ec_w5qXh4zuMT3nT3IpZ_YSX3ZskVwpPdY8qCuYC01cgYTtol--GMgdSaCVZC2Q67OSVancYvqDqELR3QfR',
            start: '2024-09-01',
            end: '2025-08-01'
        },
        {
            company: 'FinanceOps.AI',
            role: 'Business Analyst (Intern → Full-time)',
            logo: 'https://blogger.googleusercontent.com/img/a/AVvXsEgkl3EYLSN2NWzOEi5_CLVhnjUQUBnfbvqnpKB3ZyeO66KyTFQqE5i-of8CtwAypLhrw_k9BFiE0n-Ipdv9T-H8zJ60vgWTB1d8LF5fii3KuMYMY5RGH_ibNR28K-qVhXnXYOVJVXV4P2MEDmF1FoBtpfkDYVL6incQYpmcXPmDFGy9VFFHwEcAUgMiT_Bg',
            start: '2024-01-01',
            end: '2024-08-30'
        },
        {
            company: 'HighRadius',
            role: 'Product Intern',
            logo: 'https://blogger.googleusercontent.com/img/a/AVvXsEhzCaiOsOfjj1OlYlm4FzQSdrKmJMk6dqVyskaVCUYbpoqJSU_wgA0dKxpBbZB25PRHNo_SIFzrVXjpORrsbcweEoKSSh0uII-CmJa53HNft13ZLyPoby9kg9hL7CIlM_G90gU-CiZjMOealS2Yp9a5Fno29teGP3m91piF-VUVawpsDXO46MY3esv8vvl4',
            start: '2023-05-01',
            end: '2023-12-31'
        },
        {
            company: 'Metaverse Simplified',
            role: 'Design & Creative Intern',
            logo: 'https://blogger.googleusercontent.com/img/a/AVvXsEhLjHTvicUuo7lRXbuWYa4S8Ha8fK7qdEwLPs3xQc3ynRk9dKwRHWVXbKEZEir7v6HMnoZqF9ZPH-uGLrj0mN2RO3ETb-dlFEKOsKsrpV-XlHwjWavpuFmlQzY6zqyvs7G1DT5M1Q3DdpSNmitEn65mx-ptNX7H7CtfgBvjQHAzFfYIytgWMrvzylOBJwb7',
            start: '2022-04-01',
            end: '2023-04-30'
        }
    ];

    const colors = ['#2a9d8f', '#264653', '#e76f51', '#f4a261', '#a8dadc'];

    const data = {
        labels: experiences.map(e => e.company),
        datasets: [{
            label: 'Experience',
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 1,
            data: experiences.map(e => ({ x: [e.start, e.end], y: e.company })),
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const { x: [start, end], y } = context.raw;
                            const experience = experiences.find(e => e.company === y);
                            const options = { year: 'numeric', month: 'short' };
                            const startDate = new Date(start).toLocaleDateString(undefined, options);
                            const endDate = end === today ? 'Present' : new Date(end).toLocaleDateString(undefined, options);
                            return `${experience.role}\n${startDate} – ${endDate}`;
                        },
                        afterLabel: function(context) {
                            const experience = experiences.find(e => e.company === context.raw.y);
                            return `🔗 ${experience.company}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    min: '2022-02-01',
                    max: '2025-08-31',
                    time: {
                        unit: 'year',
                        tooltipFormat: 'MMM yyyy'
                    },
                    title: {
                        display: true,
                        text: 'Timeline',
                        color: '#264653',
                        font: { weight: 'bold' }
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.05)' }
                },
                y: {
                    ticks: {
                        font: { size: 12, weight: 'bold' }
                    },
                    grid: { display: false }
                }
            }
        }
    });
}


// Education Timeline Chart - Using a combination of horizontal bars and date annotations
function initEducationTimelineChart() {
    const ctx = document.getElementById('educationChart');
    if (!ctx) return;

    // Education data with institution details
    const educationData = [
        {
            institution: 'KKR Gowtham',
            start: new Date('2015-06-01').getTime(), // Keep this date as reference point
            end: new Date('2018-03-31').getTime(),
            y: 1,
            color: '#f4a261', // Keep original color
            description: 'Schooling',
            hideStartPoint: true // Flag to hide start point
        },
        {
            institution: 'SASI Institute',
            start: new Date('2018-04-01').getTime(),
            end: new Date('2020-05-31').getTime(),
            y: 2,
            color: '#e63946', // Changed to red
            description: 'High School | Grade: 9.86'
        },
        {
            institution: 'KIIT University',
            start: new Date('2020-07-01').getTime(),
            end: new Date('2024-05-31').getTime(),
            y: 3,
            color: '#2a9d8f', // Changed to green
            description: 'BTech in Computer Science | CGPA: 8.57'
        },
        {
            institution: 'UT Dallas',
            start: new Date('2025-08-01').getTime(),
            end: new Date('2027-05-31').getTime(),
            y: 4,
            color: '#e76f51', // Keep original color
            description: 'MS AI & Business Analytics',
            hideEndPoint: true // Flag to hide end point
        }
    ];

    // Create line segments for each education period
    const datasets = educationData.map(item => {
        return {
            label: item.institution,
            data: [
                { x: item.start, y: item.y },
                { x: item.end, y: item.y }
            ],
            backgroundColor: item.color,
            borderColor: item.color,
            pointBackgroundColor: item.color,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: function(context) {
                const index = context.dataIndex;
                if ((index === 0 && item.hideStartPoint) || 
                    (index === 1 && item.hideEndPoint)) {
                    return 0; // Hide specific points
                }
                return 6; // Default point radius
            },
            pointHoverRadius: function(context) {
                const index = context.dataIndex;
                if ((index === 0 && item.hideStartPoint) || 
                    (index === 1 && item.hideEndPoint)) {
                    return 0; // Hide specific points on hover too
                }
                return 9; // Default hover radius
            },
            borderWidth: 4,
            fill: false
        };
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'year',
                        displayFormats: {
                            year: 'yyyy'
                        }
                    },
                    min: '2015-01-01',
                    max: '2028-01-01',
                    title: {
                        display: true,
                        text: 'Timeline',
                        color: '#264653',
                        font: { weight: 'bold', size: 14 }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    min: 0,
                    max: 5,
                    ticks: {
                        callback: function(value) {
                            for (let i = 0; i < educationData.length; i++) {
                                if (educationData[i].y === value) return educationData[i].institution;
                            }
                            return '';
                        },
                        font: { weight: 'bold', size: 12 }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(tooltipItems) {
                            const datasetIndex = tooltipItems[0].datasetIndex;
                            return educationData[datasetIndex].institution;
                        },
                        label: function(context) {
                            const datasetIndex = context.datasetIndex;
                            const edu = educationData[datasetIndex];

                            // Special handling for KKR Gowtham with indefinite start
                            if (edu.institution === 'KKR Gowtham') {
                                const endDate = new Date(edu.end).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short'
                                });
                                return [
                                    `Until ${endDate}`,
                                    edu.description
                                ];
                            }

                            const startDate = new Date(edu.start).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short'
                            });

                            const endDate = new Date(edu.end).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short'
                            });

                            return [
                                `${startDate} - ${endDate}`,
                                edu.description
                            ];
                        }
                    }
                }
            },
            animation: {
                duration: 1500
            }
        },
        plugins: [{
            id: 'customLabels',
            afterDraw: (chart) => {
                const ctx = chart.ctx;

                // Draw custom labels for each education period
                chart.data.datasets.forEach((dataset, datasetIndex) => {
                    const meta = chart.getDatasetMeta(datasetIndex);
                    if (meta.hidden) return;

                    const edu = educationData[datasetIndex];

                    // Calculate midpoint of the line
                    const startPoint = meta.data[0];
                    const endPoint = meta.data[1];

                    if (!startPoint || !endPoint) return;

                    const startPos = startPoint.getCenterPoint();
                    const endPos = endPoint.getCenterPoint();

                    const midX = (startPos.x + endPos.x) / 2;
                    const y = startPos.y;

                    // Draw description below the line
                    ctx.font = '11px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = '#555';
                    ctx.fillText(edu.description, midX, y + 15);
                }); 
            }
        }]
    });
}

// Skills Charts - Using different chart types for each skill category
function initSkillsCharts() {
    // Define a consistent blue color scheme with varying shades
    const blueShades = [
        'rgba(19, 71, 204, 0.8)',    // Primary blue
        'rgba(65, 105, 225, 0.8)',   // Royal blue
        'rgba(0, 191, 255, 0.8)',    // Deep sky blue
        'rgba(30, 144, 255, 0.8)',   // Dodger blue
        'rgba(100, 149, 237, 0.8)',   // Cornflower blue
        'rgba(180, 149, 237, 0.8)'   // Cornflower blue
    ];

    // CHART 1: Programming Languages
    createPieChart('programming-chart', 
        [90, 85, 75, 100], 
        ['Python', 'MySQL', 'JavaScript', 'English*'],
        blueShades
    );

    // CHART 2: Tools & Technologies
    createPieChart('tools-chart',
        [90, 85, 80, 75, 70, 80],
        ['Tableau', 'Excel/Sheets', 'PowerBI', 'Cognos', 'Jira/Agile', 'Figma'],
        blueShades
    );

    // CHART 3: Core Skills
    createPieChart('core-chart',
        [95, 90, 85, 80, 75, 85, 90],
        ['Data Analysis', 'Requirements', 'SDLC', 'UAT', 'Automation', 'Stakeholder Comm.', 'Prompt Engineering'],
        blueShades
    );

    // CHART 4: Business Intelligence Skills
    createPieChart('bi-chart',
        [95, 90, 85, 80],
        ['Stakeholder Comm.', 'Prompt Engineering', 'Predictive Modeling', 'Figma/Canva'],
        blueShades
    );

    // Initialize Radar Chart for the alternative view
    initRadarChart();

    // Add tooltip for the "English" programming language with a joke
    const programmingChart = document.getElementById('programming-chart');
    if (programmingChart) {
        const footnote = document.createElement('div');
        footnote.style.fontSize = '11px';
        footnote.style.fontStyle = 'italic';
        footnote.style.marginTop = '5px';
        footnote.style.textAlign = 'center';
        footnote.innerHTML = '* English is the new programming language ';
        programmingChart.parentNode.appendChild(footnote);
    }
}

// Create consistent Pie charts with blue theme for all skill categories
function createPieChart(elementId, data, labels, customColors) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Clear existing content
    element.innerHTML = '';

    const ctx = document.createElement('canvas');
    element.appendChild(ctx);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: customColors,
                borderColor: 'white',
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            // Animation for better visual appeal
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

// Initialize Radar Chart for Skills alternative view
function initRadarChart() {
    const ctx = document.getElementById('radar-skills-chart');
    if (!ctx) return;

    const radarData = {
        labels: [
            'Programming',
            'Data Analysis',
            'Data Visualization',
            'BI Tools',
            'Agile Methodologies',
            'Requirements Analysis',
            'Stakeholder Communication',
            'Prompt Engineering'
        ],
        datasets: [{
            label: 'Skills',
            data: [85, 95, 88, 85, 80, 90, 95, 90],
            backgroundColor: 'rgba(19, 71, 204, 0.4)',
            borderColor: 'rgba(19, 71, 204, 1)',
            pointBackgroundColor: 'rgba(19, 71, 204, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(19, 71, 204, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    new Chart(ctx, {
        type: 'radar',
        data: radarData,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#1347cc'
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}%`;
                        }
                    }
                }
            }
        }
    });
}

// Toggle between chart view and radar view
document.addEventListener('DOMContentLoaded', function() {
    initSkillsCharts();

    // Set up view toggle functionality
    const viewButtons = document.querySelectorAll('.view-btn');
    const skillsGrid = document.querySelector('.skills-grid');
    const radarContainer = document.querySelector('.radar-chart-container');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            if (this.textContent === 'Radar') {
                skillsGrid.style.display = 'none';
                radarContainer.style.display = 'block';
            } else {
                skillsGrid.style.display = 'grid';
                radarContainer.style.display = 'none';
            }
        });
    });
});
// Setup View Switchers for different sections
function setupViewSwitchers() {
    // Experience section
    setupViewSwitcher('experience', [
        {btn: 0, show: '.chart-container', hide: '.experience-details'},
        {btn: 1, show: '.experience-details', hide: '.chart-container'}
    ]);

    // Skills section
    setupViewSwitcher('skills', [
        {btn: 0, show: '.skills-grid', hide: '.radar-chart-container'},
        {btn: 1, show: '.radar-chart-container', hide: '.skills-grid'}
    ]);
}

// Generic view switcher function
function setupViewSwitcher(sectionId, views) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const viewBtns = section.querySelectorAll('.view-btn');
    if (viewBtns.length === 0) return;

    viewBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Show/hide relevant content
            if (views[index]) {
                const showElement = section.querySelector(views[index].show);
                const hideElement = section.querySelector(views[index].hide);

                if (showElement) showElement.style.display = 'block';
                if (hideElement) hideElement.style.display = 'none';
            }
        });
    });
}

// Project filtering functionality
// Project filtering and show more functionality
document.addEventListener('DOMContentLoaded', function() {
    setupProjectFilters();
    setupShowMoreButton();
    setupProjectLinks();
});

function setupProjectFilters() {
    const projectBtns = document.querySelectorAll('#projects .view-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const showMoreBtn = document.getElementById('show-more-btn');

    if (projectBtns.length === 0 || projectCards.length === 0) return;

    // Initialize - show first 6 projects, hide the rest
    let visibleCount = 0;
    projectCards.forEach(card => {
        if (visibleCount < 6) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.add('hidden');
        }
    });

    // Show/hide more button based on project count
    if (projectCards.length > 6) {
        showMoreBtn.classList.remove('hide');
    } else {
        showMoreBtn.classList.add('hide');
    }

    projectBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            projectBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const category = this.textContent.trim();
            let visibleCount = 0;
            let totalInCategory = 0;

            // First count how many projects match this category
            if (category !== 'All') {
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        totalInCategory++;
                    }
                });
            } else {
                totalInCategory = projectCards.length;
            }

            // Now show/hide based on category and count
            projectCards.forEach(card => {
                // Remove any previous hidden class
                card.classList.remove('hidden');

                if (category === 'All') {
                    visibleCount++;
                    if (visibleCount <= 6) {
                        card.style.display = 'block';
                        animateCardIn(card);
                    } else {
                        card.style.display = 'none';
                        card.classList.add('hidden');
                    }
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === category) {
                        card.style.display = 'block';
                        animateCardIn(card);
                    } else {
                        card.style.display = 'none';
                    }
                }
            });

            // Show or hide the Show More button based on category and count
            if (category === 'All' && projectCards.length > 6) {
                showMoreBtn.classList.remove('hide');
            } else if (category !== 'All' && totalInCategory > 6) {
                showMoreBtn.classList.remove('hide');
            } else {
                showMoreBtn.classList.add('hide');
            }
        });
    });
}

function animateCardIn(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 10);
}

function setupShowMoreButton() {
    const showMoreBtn = document.getElementById('show-more-btn');

    if (!showMoreBtn) return;

    showMoreBtn.addEventListener('click', function() {
        const hiddenProjects = document.querySelectorAll('.project-card.hidden');
        let delay = 0;

        hiddenProjects.forEach(project => {
            setTimeout(() => {
                project.style.display = 'block';
                project.classList.remove('hidden');
                animateCardIn(project);
            }, delay);
            delay += 100; // Stagger the animations
        });

        // Hide the button after showing all projects
        this.classList.add('hide');
    });
}

function setupProjectLinks() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the view button (to avoid double navigation)
            if (!e.target.classList.contains('project-view-btn')) {
                const link = this.querySelector('.project-view-btn');
                if (link && link.href) {
                    window.location.href = link.href;
                }
            }
        });
    });
}

// Contact form handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Change button text and disable
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate server delay
        setTimeout(() => {
            alert(`Thank you ${name}! Your message has been received. I'll get back to you soon.`);

            // Reset form and button
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);

        // In a real application, you would send this data to your server
        console.log({
            name,
            email,
            message
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const sections = document.querySelectorAll('.dashboard-section');

    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // For better performance, unobserve after animation
                setTimeout(() => {
                    observer.unobserve(entry.target);
                }, 1000);

                // Trigger chart animations if they exist in this section
                const sectionId = entry.target.id;
                if (sectionId === 'skills') {
                    // Reinitialize skills charts for animation
                    setTimeout(() => {
                        initSkillsCharts();
                    }, 300);
                }
            }
        });
    }, { threshold: 0.2 });

    // Add CSS classes and observe sections
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}


// Setup mobile navigation functionality
function setupMobileNav() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');

    if (!nav || !navLinks) return;

    // Create mobile menu button if it doesn't exist
    if (!document.querySelector('.mobile-menu-btn')) {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';

        // Insert before the work button
        const workBtn = nav.querySelector('.work-btn');
        if (workBtn) {
            nav.insertBefore(mobileBtn, workBtn);
        } else {
            nav.appendChild(mobileBtn);
        }

        // Toggle menu on click
        mobileBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');

            // Change icon based on state
            if (navLinks.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                this.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Responsive chart resizing
window.addEventListener('resize', function() {
    // Throttle resize events for better performance
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
        // Reinitialize charts on window resize for proper responsiveness
        const charts = Chart.instances || [];
        if (charts.length > 0) {
            charts.forEach(chart => {
                if (chart) chart.resize();
            });
        } else {
            // If Chart.instances is not available, reinitialize all charts
            initExperienceTimelineChart();
            initEducationTimelineChart();
            initSkillsCharts();
        }
    }, 250);
});


function toggleResumePopup() {
    const popup = document.getElementById("resume-popup");
    popup.classList.toggle("hidden");
}

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.certificates-slider');
    const cards = document.querySelectorAll('.certificate-card');
    const leftBtn = document.querySelector('.scroll-left');
    const rightBtn = document.querySelector('.scroll-right');
    const pageIndicator = document.querySelector('.page-indicator');

    let currentPosition = 0;
    const cardWidth = 300; // Width of card + gap
    const totalItems = cards.length;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

    updatePageIndicator();

    // Initially hide left button if at start
    if (currentPosition === 0) {
        leftBtn.style.opacity = '0.5';
        leftBtn.style.pointerEvents = 'none';
    }

    leftBtn.addEventListener('click', function() {
        const cardWidth = cards[0].offsetWidth + 20; // Card width + gap
        const visibleCards = Math.floor(slider.clientWidth / cardWidth);
        currentPosition = Math.max(currentPosition - visibleCards, 0);
        slider.scrollTo({
            left: currentPosition * cardWidth,
            behavior: 'smooth'
        });
        updateScrollButtons();
        updatePageIndicator();
    });

    rightBtn.addEventListener('click', function() {
        const cardWidth = cards[0].offsetWidth + 20; // Card width + gap
        const visibleCards = Math.floor(slider.clientWidth / cardWidth);
        currentPosition = Math.min(currentPosition + visibleCards, totalItems - visibleCards);
        slider.scrollTo({
            left: currentPosition * cardWidth,
            behavior: 'smooth'
        });
        updateScrollButtons();
        updatePageIndicator();
    });

    // Update buttons on scroll
    slider.addEventListener('scroll', function() {
        const cardWidth = cards[0].offsetWidth + 20;
        currentPosition = Math.round(slider.scrollLeft / cardWidth);
        updateScrollButtons();
        updatePageIndicator();
    });

    function updateScrollButtons() {
        // Hide/show left button based on position
        if (slider.scrollLeft <= 10) {
            leftBtn.style.opacity = '0.5';
            leftBtn.style.pointerEvents = 'none';
        } else {
            leftBtn.style.opacity = '1';
            leftBtn.style.pointerEvents = 'auto';
        }

        // Hide/show right button based on position
        if (slider.scrollLeft >= maxScrollLeft - 10) {
            rightBtn.style.opacity = '0.5';
            rightBtn.style.pointerEvents = 'none';
        } else {
            rightBtn.style.opacity = '1';
            rightBtn.style.pointerEvents = 'auto';
        }
    }

    function updatePageIndicator() {
        const cardWidth = cards[0].offsetWidth + 20;
        const visibleCards = Math.floor(slider.clientWidth / cardWidth);
        const totalPages = Math.ceil(totalItems / visibleCards);
        const currentPage = Math.min(Math.ceil((currentPosition + 1) / visibleCards), totalPages);

        pageIndicator.textContent = `${currentPage}/${totalPages}`;
    }

    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
        updateScrollButtons();
        updatePageIndicator();
    });

    // Fix image loading errors
    const images = document.querySelectorAll('.certificate-logo img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '/api/placeholder/60/60';
        });
    });
});


// Make toggleJarvis function global so it can be called from HTML
window.toggleJarvis = function() {
    const jarvisContainer = document.querySelector('.jarvis-container');
    const jarvisToggle = document.getElementById('jarvis-toggle');

    jarvisContainer.style.display = 'flex';
    jarvisToggle.style.display = 'none';

    // Focus the input
    document.getElementById('jarvis-input').focus();
};



// Business Card Auto-Flip Functionality
let isFlipped = false;
let autoFlipInterval;

function flipCard() {
    const businessCard = document.getElementById('businessCard');
    if (businessCard) {
        isFlipped = !isFlipped;
        if (isFlipped) {
            businessCard.classList.add('flipped');
        } else {
            businessCard.classList.remove('flipped');
        }
    }
}

function startAutoFlip() {
    // Clear any existing interval
    if (autoFlipInterval) {
        clearInterval(autoFlipInterval);
    }

    // Start auto-flip every 10 seconds
    autoFlipInterval = setInterval(flipCard, 3000);
}

function stopAutoFlip() {
    if (autoFlipInterval) {
        clearInterval(autoFlipInterval);
        autoFlipInterval = null;
    }
}

// Initialize auto-flip when page loads
document.addEventListener('DOMContentLoaded', function() {
    startAutoFlip();

    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        // Pause auto-flip on hover
        cardContainer.addEventListener('mouseenter', stopAutoFlip);

        // Resume auto-flip when hover ends
        cardContainer.addEventListener('mouseleave', startAutoFlip);
    }
});

// Optional: Manual click to flip
document.addEventListener('DOMContentLoaded', function() {
    const businessCard = document.getElementById('businessCard');
    if (businessCard) {
        businessCard.addEventListener('click', function() {
            flipCard();
            // Restart the auto-flip timer after manual flip
            stopAutoFlip();
            setTimeout(startAutoFlip, 1000);
        });
    }
});