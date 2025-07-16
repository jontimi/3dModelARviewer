// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function() {
    // Main UI Containers
    var mainViewerContainer = document.getElementById('mainViewerContainer');
    var brandInputContainer = document.getElementById('brandInputContainer');

    // Elements for the main viewer
    var modelViewer = document.getElementById('modelViewer');
    var dimensionsTextElement = document.getElementById('dimensionsText');
    var mainTitleElement = document.querySelector('.main-viewer-container h1');
    var subTextElement = document.querySelector('.main-viewer-container p:nth-of-type(1)');
    var footerTextElement = document.querySelector('.footer-text');

    // Buttons for the main viewer
    const resetButton = document.getElementById("reset-view-button");
    const arQrButton = document.getElementById("ar-qr-button");
    const shareButton = document.getElementById("share-button");
    const hebrewButton = document.getElementById("hebrew-button");

    // QR Modal elements
    const qrModal = document.getElementById("qr-modal");       
    const closeQrModal = document.getElementById("close-qr-modal"); 
    const qrCodeLink = document.getElementById("qr-code-link");
    const qrCodeImage = document.getElementById("qr-code-image");
    const qrModalTitle = document.querySelector('#qr-modal h2');
    const qrModalText = document.querySelector('#qr-modal p');
    const qrModalOpenLink = document.querySelector('#qr-modal a');

    // Elements for the brand input landing page
    const brandInput = document.getElementById('brandInput');
    const submitBrandButton = document.getElementById('submitBrandButton');

    // Get brand from URL
    var brand = getUrlParameter('brand');
    var modelFileName = getUrlParameter('model');

    // Define brand specific settings
    var brandSettings = {
        'neryatech': {
            model: 'neryatech_120mm_table_model.glb',
            dimensionsText: {
                en: 'Dimensions: W 120mm x H 80mm x D 10mm',
                he: 'מידות: רוחב 120 מ"מ X גובה 80 מ"מ X עומק 10 מ"מ'
            },
            viewerBgColor: '#ADD8E6',
            modelViewerAreaBg: '#f5f5f5',
            buttonBgColor: '#007bff',
            buttonHoverColor: '#0056b3'
        },
        'tudo': {
            model: 'HiveShelf90cm.glb',
            dimensionsText: {
                en: 'Dimensions: W 90cm x H 160cm x D 20cm',
                he: 'מידות: רוחב 90 ס"מ X גובה 160 ס"מ X עומק 20 ס"מ'
            },
            viewerBgColor: '#f0f0f0',
            modelViewerAreaBg: '#ffffff',
            buttonBgColor: '#4CAF50',
            buttonHoverColor: '#45a049'
        }
        // Add more brands here in the future if needed
    };

    // Text translations for main viewer and QR modal
    const translations = {
        en: {
            mainTitle: 'Simple 3D AR Model Viewer Template',
            subText: 'This page demonstrates a single, embeddable 3D AR model viewer. This shows how the pop up 3D view window will look and function.',
            resetButton: 'Reset 3D View',
            arQrButton: 'AR QR',
            shareButton: 'Share',
            hebrewButton: 'עברית',
            footerText: 'Made by JZS3D | 3D & AR Product Integration',
            qrModalTitle: 'Scan for AR or Share',
            qrModalText: 'Scan the QR code with your phone to view in AR or share the link.',
            qrModalOpenLink: 'Open Link'
        },
        he: {
            mainTitle: 'תבנית לצפייה במודל תלת-ממד ו-AR',
            subText: 'דף זה מדגים צופה מודל תלת-ממד ו-AR יחיד וניתן להטמעה. הוא מציג כיצד ייראה ויתפקד חלון הצפייה התלת-ממדי הקופץ.',
            resetButton: 'איפוס תצוגת תלת-ממד',
            arQrButton: 'קוד QR ל-AR',
            shareButton: 'שיתוף',
            hebrewButton: 'English',
            footerText: 'נוצר על ידי JZS3D | שילוב מוצרי תלת-ממד ו-AR',
            qrModalTitle: 'סרוק ל-AR או שתף',
            qrModalText: 'סרוק את קוד ה-QR באמצעות הטלפון שלך כדי לצפות ב-AR או לשתף את הקישור.',
            qrModalOpenLink: 'פתח קישור'
        }
    };

    let currentLanguage = 'en'; // Default language

    // Function to apply translations
    function applyTranslations(lang) {
        // Apply text content
        if (mainTitleElement) mainTitleElement.textContent = translations[lang].mainTitle;
        if (subTextElement) subTextElement.textContent = translations[lang].subText;
        if (resetButton) resetButton.textContent = translations[lang].resetButton;
        if (arQrButton) arQrButton.textContent = translations[lang].arQrButton;
        if (shareButton) shareButton.textContent = translations[lang].shareButton;
        if (hebrewButton) hebrewButton.textContent = translations[lang].hebrewButton;
        if (footerTextElement) footerTextElement.textContent = translations[lang].footerText;
        if (qrModalTitle) qrModalTitle.textContent = translations[lang].qrModalTitle;
        if (qrModalText) qrModalText.textContent = translations[lang].qrModalText;
        if (qrModalOpenLink) qrModalOpenLink.textContent = translations[lang].qrModalOpenLink;
        
        if (dimensionsTextElement && currentSettings && currentSettings.dimensionsText) {
            dimensionsTextElement.textContent = currentSettings.dimensionsText[lang];
        }

        // Apply RTL/LTR direction to the main container
        if (mainViewerContainer) {
            mainViewerContainer.style.direction = (lang === 'he') ? 'rtl' : 'ltr';
            
            // Adjust text alignment for text elements within the main container
            if (mainTitleElement) mainTitleElement.style.textAlign = (lang === 'he') ? 'right' : 'center';
            if (subTextElement) subTextElement.style.textAlign = (lang === 'he') ? 'right' : 'center';
            if (dimensionsTextElement) dimensionsTextElement.style.textAlign = (lang === 'he') ? 'right' : 'center';
            if (footerTextElement) footerTextElement.style.textAlign = (lang === 'he') ? 'right' : 'center';
        }

        // Adjust QR modal direction and text alignment
        if (qrModalTitle) qrModalTitle.style.textAlign = (lang === 'he') ? 'right' : 'center';
        if (qrModalText) qrModalText.style.textAlign = (lang === 'he') ? 'right' : 'center';
        if (qrModalOpenLink) qrModalOpenLink.style.textAlign = (lang === 'he') ? 'right' : 'center';
        if (qrModal) qrModal.querySelector('.modal-content').style.direction = (lang === 'he') ? 'rtl' : 'ltr';

        // Crucially, prevent modelViewer and its immediate container from inheriting RTL
        const product3dViewerContainer = document.querySelector('.product-3d-viewer-container');
        if (product3dViewerContainer) {
            product3dViewerContainer.style.direction = 'ltr';
        }
    }

    // --- Initial Page Load Logic ---
    if (brand) {
        // If brand is specified, show the main viewer and hide the input page
        if (mainViewerContainer) mainViewerContainer.style.display = 'flex';
        if (brandInputContainer) brandInputContainer.style.display = 'none';

        // Determine current settings based on 'brand' parameter, or use TUDO as default if unrecognized
        // IMPORTANT: currentSettings is needed for applyTranslations to get dimensionsText
        var currentSettings = brandSettings[brand] || brandSettings['tudo'];
        if (!brandSettings[brand]) {
            console.warn(`Brand "${brand}" not recognized. Defaulting to TUDO settings.`);
        }

        // Apply dynamic styling using CSS variables
        document.body.style.setProperty('--viewer-bg-color', currentSettings.viewerBgColor);
        modelViewer.style.setProperty('--model-viewer-bg', currentSettings.modelViewerAreaBg);
        
        document.querySelectorAll('.action-button').forEach(button => {
            button.style.setProperty('--button-bg-color', currentSettings.buttonBgColor);
            button.style.setProperty('--button-hover-color', currentSettings.buttonHoverColor);
            button.style.backgroundColor = currentSettings.buttonBgColor;
            button.onmouseover = () => button.style.backgroundColor = currentSettings.buttonHoverColor;
            button.onmouseout = () => button.style.backgroundColor = currentSettings.buttonBgColor;
        });

        // Load the model: specific model from URL (if provided) or brand's default
        modelViewer.src = 'models/' + (modelFileName || currentSettings.model); 
        modelViewer.alt = "3D model of " + modelViewer.src.replace('models/', '').replace('.glb', '').replace('.usdz', '');
        console.log('Loading model for ' + (brand || 'default') + ': ' + modelViewer.src);

        // Apply initial English translation (this will also set dimensions and RTL for content)
        applyTranslations('en');

        // --- Button Event Listeners for Main Viewer ---
        if (resetButton) {
            resetButton.addEventListener("click", () => {
                modelViewer.cameraOrbit = "0deg 75deg auto"; 
                modelViewer.fieldOfView = "45deg"; 
                console.log("3D View Reset.");
            });
        }

        function generateQRCode() {
            const pageUrl = window.location.href; 
            if (pageUrl && typeof QRious !== 'undefined' && qrCodeImage) {
                try {
                    new QRious({
                        element: qrCodeImage, 
                        value: pageUrl,
                        size: 150, 
                        level: 'H' 
                    });
                    qrCodeImage.style.display = 'block';
                    qrCodeLink.href = pageUrl;
                    console.log("QR Code generated for:", pageUrl);
                } catch (error) {
                    console.error("Error generating QR code:", error);
                    qrCodeImage.style.display = 'none';
                }
            } else {
                console.warn("QRious library or QR code elements not found, or page URL is missing.");
            }
        }

        if (arQrButton) {
            arQrButton.addEventListener("click", () => {
                generateQRCode(); 
                qrModal.style.display = "flex"; 
                console.log("AR / QR Code button clicked. Modal shown.");
            });
        }

        if (closeQrModal) {
            closeQrModal.addEventListener("click", () => {
                qrModal.style.display = "none";
                console.log("QR Modal closed.");
            });
        }

        window.addEventListener("click", (event) => {
            if (event.target == qrModal) {
                qrModal.style.display = "none";
                console.log("QR Modal closed by outside click.");
            }
        });

        if (shareButton) {
            shareButton.addEventListener("click", async () => {
                if (navigator.share) {
                    try {
                        await navigator.share({
                            title: document.title,
                            url: window.location.href
                        });
                        console.log('Page shared successfully');
                    } catch (error) {
                        console.error('Error sharing the page:', error);
                    }
                } else {
                    console.warn('Web Share API not supported. Providing fallback.');
                    try {
                        await navigator.clipboard.writeText(window.location.href);
                        alert("Share feature not supported. The link has been copied to your clipboard!");
                        console.log('Link copied to clipboard as fallback.');
                    } catch (err) {
                        alert("Share feature not supported. You can manually copy the link: " + window.location.href);
                        console.error('Failed to copy link to clipboard:', err);
                    }
                }
            });
        }

        if (hebrewButton) {
            hebrewButton.addEventListener("click", () => {
                currentLanguage = (currentLanguage === 'en') ? 'he' : 'en';
                applyTranslations(currentLanguage);
                console.log("Language toggled to: " + currentLanguage);
            });
        }

    } else {
        // If no brand is specified, show the brand input page
        if (mainViewerContainer) mainViewerContainer.style.display = 'none';
        if (brandInputContainer) brandInputContainer.style.display = 'flex'; // Use flex for centering content

        if (submitBrandButton && brandInput) {
            submitBrandButton.addEventListener('click', () => {
                const enteredBrand = brandInput.value.trim().toLowerCase();
                if (enteredBrand) {
                    // Redirect to the page with the brand parameter
                    window.location.href = window.location.origin + window.location.pathname + '?brand=' + enteredBrand;
                } else {
                    alert('Please enter a brand name.');
                }
            });

            // Allow pressing Enter key to submit
            brandInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    submitBrandButton.click();
                }
            });
        }
    }
});