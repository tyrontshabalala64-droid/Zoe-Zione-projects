 // ===== HAMBURGER TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// ===== ACTIVE NAV LINK =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('#navMenu a');

    navLinksAll.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ===== CONTACT FORM - WHATSAPP & EMAIL =====
const form = document.getElementById('contactForm');
const statusDiv = document.getElementById('formStatus');

if (form && statusDiv) {
    // Get form fields
    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const subjectInput = document.getElementById('formSubject');
    const messageInput = document.getElementById('formMessage');
    const whatsappBtn = document.getElementById('sendWhatsApp');
    const emailBtn = document.getElementById('sendEmail');

    // Helper function to show status
    function showStatus(type, message) {
        statusDiv.className = 'form-status ' + type;
        statusDiv.style.display = 'block';
        statusDiv.textContent = message;
    }

    // Helper function to clear status
    function clearStatus() {
        statusDiv.className = 'form-status';
        statusDiv.style.display = 'none';
        statusDiv.textContent = '';
    }

    // Helper function to validate
    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            showStatus('error', '❌ Please fill in all required fields (Name, Email, Message).');
            return false;
        }
        return { name, email, subject: subjectInput.value.trim(), message };
    }

    // ===== SEND VIA WHATSAPP =====
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearStatus();

            const data = validateForm();
            if (!data) return;

            const { name, email, subject, message } = data;

            const whatsappMessage = 
                `Hello Zoe Zion Projects!%0A%0A📝 *New Enquiry via Website*%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📧 *Email:* ${encodeURIComponent(email)}%0A📌 *Subject:* ${encodeURIComponent(subject || 'General Enquiry')}%0A💬 *Message:* ${encodeURIComponent(message)}%0A%0A---%0APlease get back to me as soon as possible.`;

            const phoneNumber = '27738537751';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

            showStatus('success', '✅ Opening WhatsApp... Please send the message to us.');
            form.reset();

            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 800);
        });
    }

    // ===== SEND VIA EMAIL =====
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearStatus();

            const data = validateForm();
            if (!data) return;

            const { name, email, subject, message } = data;

            const emailSubject = encodeURIComponent(subject || 'Enquiry from Zoe Zion Projects');
            const emailBody = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            const mailtoURL = `mailto:akanijoy@gmail.com?subject=${emailSubject}&body=${emailBody}`;

            showStatus('success', '✅ Opening your email client... Please send the message.');
            form.reset();

            setTimeout(() => {
                window.location.href = mailtoURL;
            }, 600);
        });
    }
}