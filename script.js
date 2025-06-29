// Get references to elements
const modelViewer = document.getElementById("ar-model-viewer");
const resetButton = document.getElementById("reset-view-button");
const arQrButton = document.getElementById("ar-qr-button");
const shareButton = document.getElementById("share-button");

const qrModal = document.getElementById("qr-modal");
const closeQrModal = document.getElementById("close-qr-modal");
const qrCodeLink = document.getElementById("qr-code-link");
const qrCodeImage = document.getElementById("qr-code-image");

// --- Language Toggle Button (ensure this element exists in index.html for translation) ---
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
                size: 150, // <-- **QR CODE SIZE**
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


// --- Language Management (ensure elements with data-en/data-he exist) ---
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
    'reset-view-button': {
        he: 'איפוס תצוגה תלת-ממדית',
        en: 'Reset 3D View'
    },
    'ar-qr-button': {
        he: 'מציאות רבודה (QR)',
        en: 'AR QR'
    },
    'share-button': {
        he: 'שיתוף',
        en: 'Share'
    },
    'qr-instructions': {
        he: 'סרוק קוד זה עם הטלפון שלך כדי לפתוח את דף האינטרנט. לאחר מכן, הקש על כפתור ה-AR במודל התלת-ממדי כדי להפעיל מציאות רבודה.',
        en: 'Scan this QR code with your phone to open the webpage. Then, tap the AR button on the 3D model to activate Augmented Reality.'
    },
    'ar-placement-guidance': { // NEW TRANSLATION
        he: 'במצב מציאות רבודה: הזיזו את הטלפון לאט לסריקת הרצפה/משטח, ואז הקישו על המסך למיקום המודל. סובבו עם שתי אצבעות.',
        en: 'Once in AR: Slowly move your phone to scan the floor/surface, then tap the screen to place the model. Rotate it with two fingers.'
    },
    'footer-main-text': {
        he: '© 2025 JZS | הדמיה תלת-ממדית ומציאות רבודה למוצרים',
        en: '© 2025 JZS | 3D & AR Product Visualization'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    Object.keys(translations).forEach(id => {
        const element = document.getElementById(id);
        if (element && translations[id][lang]) {
            element.textContent = translations[id][lang];
        }
    });

    document.body.dir = (lang === 'he') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    localStorage.setItem('language', lang);
    currentLanguage = lang;

    if (langToggleButton) {
        langToggleButton.textContent = (lang === 'he') ? 'English' : 'עברית';
    }

    if (translations['main-title'] && translations['main-title'][currentLanguage]) {
        document.title = translations['main-title'][currentLanguage];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        setLanguage(savedLang);
    } else {
        setLanguage(document.documentElement.lang);
    }
});

if (langToggleButton) {
    langToggleButton.addEventListener("click", () => {
        const newLang = (currentLanguage === 'he') ? 'en' : 'he';
        setLanguage(newLang);
        console.log("Language switched to:", newLang);
    });
}