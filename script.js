// Get references to elements
const modelViewer = document.getElementById("ar-model-viewer");
const resetButton = document.getElementById("reset-view-button");
const arQrButton = document.getElementById("ar-qr-button"); 
const shareButton = document.getElementById("share-button");

const qrModal = document.getElementById("qr-modal");       
const closeQrModal = document.getElementById("close-qr-modal"); 
const qrCodeLink = document.getElementById("qr-code-link");
const qrCodeImage = document.getElementById("qr-code-image");

// --- Language Toggle Button ---
const langToggleButton = document.getElementById("lang-toggle-button");


// --- Feature: Reset 3D View ---
if (resetButton) {
    resetButton.addEventListener("click", () => {
        modelViewer.cameraOrbit = "0deg 75deg auto"; 
        modelViewer.fieldOfView = "40deg"; // Resets any zoom level
        console.log("3D View Reset.");
    });
}

// --- Feature: QR Code Pop-up ---
function generateQRCode() {
    const pageUrl = window.location.href; // QR code links to the current page

    if (pageUrl && typeof QRious !== 'undefined' && qrCodeImage) {
        try {
            // Clear previous QR code to prevent issues on re-generation
            qrCodeImage.src = ''; 
            new QRious({
                element: qrCodeImage, 
                value: pageUrl,
                size: 100, 
                level: 'H' 
            });
            qrCodeImage.style.display = 'block'; 
            qrCodeLink.href = pageUrl; // Ensure link points to current page
            console.log("QR Code generated for:", pageUrl);
        } catch (error) {
            console.error("Error generating QR code:", error);
            qrCodeImage.style.display = 'none';
        }
    } else {
        qrCodeImage.style.display = 'none';
        console.log("QR code generation skipped: URL or QRious library not ready.");
    }
}

if (arQrButton) {
    arQrButton.addEventListener("click", () => {
        qrModal.style.display = "flex"; // Use flex to center the modal
        generateQRCode(); // Generate QR code when modal opens
        console.log("QR Modal opened.");
    });
}

if (closeQrModal) {
    closeQrModal.addEventListener("click", () => {
        qrModal.style.display = "none";
        console.log("QR Modal closed.");
    });
}

// Close the modal if the user clicks outside of the modal content
if (qrModal) {
    window.addEventListener("click", (event) => {
        if (event.target == qrModal) {
            qrModal.style.display = "none";
            console.log("QR Modal closed by outside click.");
        }
    });
}


// --- Feature: Share Button ---
if (shareButton) {
    shareButton.addEventListener("click", async () => {
        if (navigator.share) { // Check if Web Share API is supported
            try {
                await navigator.share({
                    title: document.title, // Uses the page title
                    url: window.location.href // Uses the current page URL
                });
                console.log('Page shared successfully');
            } catch (error) {
                // User cancelled the share or an error occurred
                console.error('Error sharing the page:', error);
            }
        } else {
            console.warn('Web Share API not supported in this browser/context. Providing fallback.');
            // Fallback for desktop or unsupported browsers: copy link to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert("Share feature not supported. The link has been copied to your clipboard!");
                console.log('Link copied to clipboard as fallback.');
            } catch (err) {
                // If clipboard API fails (e.g., not secure context, permission issues)
                alert("Share feature not supported. You can manually copy the link: " + window.location.href);
                console.error('Failed to copy link to clipboard:', err);
            }
        }
    });
}


// --- Language Management ---
const translations = {
    'main-title': {
        he: 'תבנית פשוטה לצפייה במודל תלת-ממדי AR',
        en: 'Simple 3D AR Model Viewer Template'
    },
    'main-desc': {
        he: 'דף זה מדגים מודל תלת-ממדי משובץ עם מציאות רבודה (AR). הוא מציג כיצד ייראה ויתפקד חלון הצפייה התלת-ממדי הקופץ.',
        en: 'This page demonstrates a single, embeddable 3D AR model viewer. This shows how the pop up 3D view window will look and function.'
    },
    'model-dimensions': {
        he: 'מידות: רוחב 90 ס"מ x גובה 160 ס"מ x עומק 20 ס"מ',
        en: 'Dimensions: W 90cm x H 160cm x D 20cm'
    },
    'reset-view-button': { // Target button itself
        he: 'איפוס תצוגה תלת-ממדית',
        en: 'Reset 3D View'
    },
    'ar-qr-button': { // Target button itself
        he: 'מציאות רבודה (QR)',
        en: 'AR QR'
    },
    'share-button': { // Target button itself
        he: 'שיתוף',
        en: 'Share'
    },
    'qr-instructions': {
        he: 'סרוק קוד זה עם הטלפון שלך כדי לפתוח את דף האינטרנט. לאחר מכן, הקש על כפתור ה-AR במודל התלת-ממדי כדי להפעיל מציאות רבודה.',
        en: 'Scan this QR code with your phone to open the webpage. Then, tap the AR button on the 3D model to activate Augmented Reality.'
    },
    'footer-main-text': { // For the new span around footer text
        he: '© 2025 JZS | הדמיה תלת-ממדית ומציאות רבודה למוצרים',
        en: '© 2025 JZS | 3D & AR Product Visualization'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en'; // Default to English, as HTML is English

function setLanguage(lang) {
    // Translate elements based on their IDs
    Object.keys(translations).forEach(id => {
        const element = document.getElementById(id);
        if (element && translations[id][lang]) {
            element.textContent = translations[id][lang];
        }
    });

    // Update document direction and language attribute
    document.body.dir = (lang === 'he') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang; 

    localStorage.setItem('language', lang);
    currentLanguage = lang;

    // Update language toggle button text
    if (langToggleButton) {
        langToggleButton.textContent = (lang === 'he') ? 'English' : 'עברית';
    }
    
    // Update page title
    document.title = translations['main-title'][currentLanguage];
}

// Initial language setup on page load
document.addEventListener("DOMContentLoaded", () => {
    // Apply saved language preference, or use default HTML lang (English)
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage(document.documentElement.lang); // Use language from <html> tag
    }
});

// Event listener for language toggle button
if (langToggleButton) {
    langToggleButton.addEventListener("click", () => {
        const newLang = (currentLanguage === 'he') ? 'en' : 'he';
        setLanguage(newLang);
        console.log("Language switched to:", newLang);
    });
}