document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    // Toggle mobile menu visibility and hamburger animation
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });
    }

    // Close menu when a link is clicked
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navMenu && menuToggle) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
            }
        });
    });

    // --- Dynamic Fallback Logic for Redirect Action Selectors ---
    const whatsappLink = "https://wa.me/919182193399";
    const contactButtons = document.querySelectorAll('.btn-book, .card-redirect, .btn-primary');

    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Safely route elements that might remain uncaught or structured as fallback buttons
            if (button.tagName !== 'A') {
                e.preventDefault();
                window.open(whatsappLink, '_blank', 'noopener,noreferrer');
            }
        });
    });
});

// --- WhatsApp Floating Button Scroll Logic ---
const waButton = document.querySelector('.whatsapp-float');

if (waButton) {
    waButton.style.opacity = '0';
    waButton.style.visibility = 'hidden';
    waButton.style.transition = 'opacity 0.3s, visibility 0.3s, transform 0.3s';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            waButton.style.opacity = '1';
            waButton.style.visibility = 'visible';
        } else {
            waButton.style.opacity = '0';
            waButton.style.visibility = 'hidden';
        }
    });
}
// Toggle Visibility
// Toggle Visibility
function toggleAIChat() {
    const chatWindow = document.getElementById('ai-chat-window');
    chatWindow.classList.toggle('active');
}

function handleChatKey(event) {
    if (event.key === 'Enter') sendAIQuery();
}

async function sendAIQuery() {
    const inputEl = document.getElementById('ai-chat-input');
    const query = inputEl.value.trim().toLowerCase();
    if (!query) return;

    const msgContainer = document.getElementById('ai-chat-messages');

    // 1. Render User Message
    msgContainer.innerHTML += `<div class="user-msg">${inputEl.value}</div>`;
    inputEl.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // 2. Render Loading State
    const loadingId = 'loading-' + Date.now();
    msgContainer.innerHTML += `<div class="bot-msg" id="${loadingId}">Processing...</div>`;
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // 3. Local Offline Knowledge Base
    const responses = {
        location: "SG KIDS School is located at Plot no 40, Visalandra Colony, 2nd Street, Sundaraiah Nagar, Payikapuram, Vijayawada, Andhra Pradesh 520015.",
        address: "SG KIDS School is located at Plot no 40, Visalandra Colony, 2nd Street, Sundaraiah Nagar, Payikapuram, Vijayawada, Andhra Pradesh 520015.",
        timing: "We are open Monday through Sunday, from 8:00 AM to 9:00 PM.",
        hours: "Our operational hours are Monday through Sunday, 8:00 AM to 9:00 PM.",
        contact: "You can reach our administration desk by calling +91 98765 43210.",
        phone: "You can contact us directly at +91 98765 43210.",
        curriculum: "Our school offers academic excellence recognized by the Govt. of AP, focusing on structured syllabus, critical thinking, holistic development, and cultural activities.",
        academics: "We ensure academic excellence balancing conceptual text learning with extracurricular growth.",
        hi: "Hello! I am the SG KIDS AI assistant. How can I help you today?",
        hello: "Hi there! Feel free to ask me about our school timings, location, or curriculum!",
        thanks: "You're welcome! Thank you for asking. Let me know if you have any more questions about SG E.M High School.",
        ok: "Great! Let me know if you need help with anything else."
    };

    // 4. Match Query
    let reply = "I'm sorry, I don't have information on that specific topic. Please ask about our school location, timings, curriculum, or contact details!";

    for (let key in responses) {
        if (query.includes(key)) {
            reply = responses[key];
            break;
        }
    }

    // 5. Deliver response smoothly
    setTimeout(() => {
        document.getElementById(loadingId).innerText = reply;
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 400);
}
document.querySelector('form').addEventListener('submit', function(event) {
    // 1. Prevent the default page reload
    event.preventDefault();

    // 2. Safely capture the correct elements from your SG KIDS form
    const nameInput = document.querySelector('input[type="text"]');
    const phoneInput = document.querySelector('input[type="tel"]') || document.querySelectorAll('input')[1];
    const enquirySelect = document.querySelector('select');
    const visitDate = document.getElementById('appt-date') || document.querySelector('input[type="date"]');
    const visitTime = document.getElementById('appt-time') || document.querySelector('input[type="time"]');

    // 3. Extract values cleanly (fallback to 'Not Provided' if empty)
    const fullName = nameInput ? nameInput.value.trim() : "Not Provided";
    const phoneNumber = phoneInput ? phoneInput.value.trim() : "Not Provided";
    const enquiryType = enquirySelect ? enquirySelect.value : "Admission Enquiry";
    const dateValue = visitDate ? visitDate.value : "Not Selected";
    const timeValue = visitTime ? visitTime.value : "Not Selected";

    // 4. Construct the clean message layout
    const message = `Hello SG KIDS Team, I would like to book a school visit.%0A%0A` +
        `*Name:* ${encodeURIComponent(fullName)}%0A` +
        `*Phone:* ${encodeURIComponent(phoneNumber)}%0A` +
        `*Enquiry Type:* ${encodeURIComponent(enquiryType)}%0A` +
        `*Date:* ${encodeURIComponent(dateValue)}%0A` +
        `*Time:* ${encodeURIComponent(timeValue)}`;

    // 5. Your verified business WhatsApp number
    const businessNumber = "919182193399";

    // 6. Reveal the confirmation element success message block
    const confirmBox = document.getElementById('appt-confirm');
    if (confirmBox) {
        confirmBox.style.display = 'block';
    }

    // 7. Fire up the WhatsApp connection tab cleanly
    window.open(`https://api.whatsapp.com/send?phone=${businessNumber}&text=${message}`, '_blank');
});

function sendToWhatsApp() {
    // 1. Get the values from the form
    const name = document.getElementById("fullName").value;
    const phone = document.getElementById("phoneNumber").value;
    const date = document.getElementById("visitDate").value;
    const time = document.getElementById("visitTime").value;

    // Optional: Add basic validation to ensure fields aren't empty
    if (!name || !phone) {
        alert("Please fill in your name and phone number.");
        return;
    }

    // 2. Format the message
    // %0A represents a line break in URL encoding
    const message = `Hello, I would like to book a visit:%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Date:* ${date}%0A` +
        `*Time:* ${time}`;

    // 3. The WhatsApp number receiving the message (include country code, no + or spaces)
    const targetNumber = "917799132222";

    // 4. Create the final URL
    const whatsappURL = `https://wa.me/${targetNumber}?text=${message}`;

    // 5. Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank");
}