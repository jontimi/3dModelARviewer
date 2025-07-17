// Function to get URL parameters - MODIFIED to primarily check location.hash for 'brand'
function getUrlParameter(name) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    
    // First, try to get from query parameters
    var results = regex.exec(location.search);
    if (results !== null) {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // If not found in query, try to get from hash parameters for 'brand'
    // This is for robustness when loaded in an iframe or with hash-based routing
    if (name === 'brand') { // Only check hash for 'brand' if that's what's requested
        var hashRegex = new RegExp('[#&]' + name + '=([^&]*)');
        var hashResults = hashRegex.exec(location.hash);
        if (hashResults !== null) {
            return decodeURIComponent(hashResults[1].replace(/\+/g, ' '));
        }
    }

    return ''; // Return empty string if parameter not found in either
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
    
    // Brand Input Page elements
    var brandInput = document.getElementById('brandInput');
    var submitBrandButton = document.getElementById('submitBrandButton');
    var brandErrorMessage = document.getElementById('brandErrorMessage');

    // Language buttons for the brand input page
    var englishBrandButton = document.getElementById('englishBrandButton');
    var hebrewBrandButton = document.getElementById('hebrewBrandButton');

    // Translations object (same as your original)
    var translations = {
        en: {
            mainTitle: 'Your 3D Product Viewer',
            subText: 'Experience your products in 3D and Augmented Reality.',
            enterBrand: 'Enter your brand name:',
            goToBrand: 'Go to Brand Page',
            brandNotFound: 'Brand not found. Please try again or check the URL.',
            resetView: 'Reset 3D View',
            arQr: 'AR QR',
            share: 'Share',
            hebrew: 'עברית',
            scanForArShare: 'Scan for AR or Share',
            openLink: 'Open Link',
            footerText: 'Made by JZS3D | 3D & AR Product Integration'
        },
        he: {
            mainTitle: 'מציג המוצרים בתלת מימד שלך',
            subText: 'חווה את המוצרים שלך בתלת מימד ובמציאות רבודה.',
            enterBrand: 'הכנס שם מותג:',
            goToBrand: 'עבור לדף המותג',
            brandNotFound: 'המותג לא נמצא. אנא נסה שוב או בדוק את הכתובת.',
            resetView: 'איפוס תצוגה בתלת מימד',
            arQr: 'QR למציאות רבודה',
            share: 'שתף',
            hebrew: 'English', // Hebrew button toggles to English
            scanForArShare: 'סרוק למציאות רבודה או שתף',
            openLink: 'פתח קישור',
            footerText: 'נוצר על ידי JZS3D | שילוב מוצרי תלת מימד ומציאות רבודה'
        }
    };

    // Current language (default to English)
    var currentLanguage = 'en';

    // Function to apply translations
    function applyTranslations() {
        if (mainTitleElement) mainTitleElement.textContent = translations[currentLanguage].mainTitle;
        if (subTextElement) subTextElement.textContent = translations[currentLanguage].subText;
        if (brandInput) brandInput.placeholder = translations[currentLanguage].enterBrand;
        if (submitBrandButton) submitBrandButton.textContent = translations[currentLanguage].goToBrand;
        if (resetButton) resetButton.textContent = translations[currentLanguage].resetView;
        if (arQrButton) arQrButton.textContent = translations[currentLanguage].arQr;
        if (shareButton) shareButton.textContent = translations[currentLanguage].share;
        if (hebrewButton) hebrewButton.textContent = translations[currentLanguage].hebrew;
        // Update QR modal translations
        const qrModalTitle = qrModal.querySelector('h2');
        if (qrModalTitle) qrModalTitle.textContent = translations[currentLanguage].scanForArShare;
        if (qrCodeLink) qrCodeLink.textContent = translations[currentLanguage].openLink;
        if (footerTextElement) footerTextElement.innerHTML = `Made by <a href="https://jzs3d.framer.ai/" target="_blank" style="color: #777; text-decoration: none;">JZS3D</a> | ${translations[currentLanguage].footerText}`;
    }

    // Language button event listeners
    if (englishBrandButton) {
        englishBrandButton.addEventListener('click', () => {
            currentLanguage = 'en';
            applyTranslations();
            // Store preference in localStorage if desired
            localStorage.setItem('preferredLanguage', 'en');
        });
    }
    if (hebrewBrandButton) {
        hebrewBrandButton.addEventListener('click', () => {
            currentLanguage = 'he';
            applyTranslations();
            // Store preference in localStorage if desired
            localStorage.setItem('preferredLanguage', 'he');
        });
    }

    // Load preferred language from localStorage on startup
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage && translations[storedLanguage]) {
        currentLanguage = storedLanguage;
    }
    applyTranslations(); // Apply initial translations


    // Get brand from URL (now uses modified getUrlParameter)
    var brand = getUrlParameter('brand');
    var modelFileName = getUrlParameter('model'); // Still checks query for 'model'


    // Define brand specific settings
    var brandSettings = {
        'neryatech': {
            model: 'Neryatech.glb',
            dimensionsText: {
                en: 'Dimensions: W 160cm x H 160cm x D 160cm',
                he: 'מידות: רוחב 160 ס"מ X גובה 160 ס"מ X עומק 160 ס"מ'
            },
            viewerBgColor: '#f0f0f0', // Light grey for the viewer background
            modelViewerAreaBg: '#ffffff', // White background inside the model-viewer canvas
            buttonBgColor: '#007bff', // Example blue
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
            buttonBgColor: '#4CAF50', // Green color like site logo
            buttonHoverColor: '#45a049'
        },
        'tudo small': {
            model: 'HiveShelfSmall.glb',
            dimensionsText: {
                en: 'Dimensions: W 50cm x H 80cm x D 15cm',
                he: 'מידות: רוחב 50 ס"מ X גובה 80 ס"מ X עומק 15 ס"מ'
            },
            viewerBgColor: '#f0f0f0',
            modelViewerAreaBg: '#ffffff',
            buttonBgColor: '#4CAF50',
            buttonHoverColor: '#45a049'
        },
        'tudo big': {
            model: 'HiveShelfBig.glb',
            dimensionsText: {
                en: 'Dimensions: W 120cm x H 200cm x D 25cm',
                he: 'מידות: רוחב 120 ס"מ X גובה 200 ס"מ X עומק 25 ס"מ'
            },
            viewerBgColor: '#f0f0f0',
            modelViewerAreaBg: '#ffffff',
            buttonBgColor: '#4CAF50',
            buttonHoverColor: '#45a049'
        },
        // Variations for 'tudo' (case-insensitive and with common misspellings)
        'tu do': { model: 'HiveShelf90cm.glb', dimensionsText: { en: 'Dimensions: W 90cm x H 160cm x D 20cm', he: 'מידות: רוחב 90 ס"מ X גובה 160 ס"מ X עומק 20 ס"מ' } },
        'tudu': { model: 'HiveShelf90cm.glb', dimensionsText: { en: 'Dimensions: W 90cm x H 160cm x D 20cm', he: 'מידות: רוחב 90 ס"מ X גובה 160 ס"מ X עומק 20 ס"מ' } },
        'tu doo': { model: 'HiveShelf90cm.glb', dimensionsText: { en: 'Dimensions: W 90cm x H 160cm x D 20cm', he: 'מידות: רוחב 90 ס"מ X גובה 160 ס"מ X עומק 20 ס"מ' } }
    };

    // --- Initial Page Load Logic ---
    if (brand) { // If brand is specified in the URL (now checking hash too)
        var currentSettings = brandSettings[brand];

        if (!currentSettings) {
            console.warn(`Brand "${brand}" from URL not recognized. Displaying brand input page.`);
            if (mainViewerContainer) mainViewerContainer.style.display = 'none';
            if (brandInputContainer) brandInputContainer.style.display = 'flex';
            if (brandErrorMessage) {
                brandErrorMessage.textContent = translations[currentLanguage].brandNotFound;
                brandErrorMessage.style.display = 'block';
            }
            return; // EXIT HERE IF BRAND NOT RECOGNIZED
        }

        // Apply brand settings
        modelViewer.src = currentSettings.model;
        if (dimensionsTextElement) dimensionsTextElement.textContent = currentSettings.dimensionsText[currentLanguage];
        document.documentElement.style.setProperty('--viewer-bg-color', currentSettings.viewerBgColor);
        modelViewer.style.setProperty('--model-viewer-area-bg', currentSettings.modelViewerAreaBg);

        // Apply button colors
        const actionButtons = document.querySelectorAll('.action-button');
        actionButtons.forEach(button => {
            button.style.backgroundColor = currentSettings.buttonBgColor;
            // Add hover effect dynamically
            button.addEventListener('mouseover', () => {
                button.style.backgroundColor = currentSettings.buttonHoverColor;
            });
            button.addEventListener('mouseout', () => {
                button.style.backgroundColor = currentSettings.buttonBgColor;
            });
        });


        // Hide brand input and show main viewer
        if (brandInputContainer) brandInputContainer.style.display = 'none';
        if (mainViewerContainer) mainViewerContainer.style.display = 'flex';

        console.log(`Loading model: ${currentSettings.model} for brand: ${brand}`);

        // If a specific modelFileName is also provided, override the brand's model
        if (modelFileName) {
            console.log(`Overriding model with: ${modelFileName}`);
            modelViewer.src = modelFileName;
        }

    } else { // If no brand is specified in URL, show the brand input page
        if (mainViewerContainer) mainViewerContainer.style.display = 'none';
        if (brandInputContainer) brandInputContainer.style.display = 'flex'; 
        console.log("No brand parameter found. Displaying brand input.");

        // Attach event listeners for the brand input page
        if (submitBrandButton) {
            submitBrandButton.addEventListener('click', () => {
                const enteredBrand = brandInput.value.toLowerCase().trim();
                if (enteredBrand) {
                    if (brandSettings[enteredBrand]) {
                        // Redirect to the same page with the brand as a query parameter
                        // This might be redundant if the parent iframe already passes via hash
                        // but good for direct navigation to the viewer page itself.
                        window.location.href = window.location.origin + window.location.pathname + '#brand=' + enteredBrand;
                    } else {
                        if (brandErrorMessage) {
                            brandErrorMessage.textContent = translations[currentLanguage].brandNotFound;
                            brandErrorMessage.style.display = 'block';
                        }
                        console.warn(`Entered brand "${enteredBrand}" not found. Displaying error.`);
                    }
                } else {
                    if (brandErrorMessage) {
                        brandErrorMessage.textContent = 'Please enter a brand name.';
                        brandErrorMessage.style.display = 'block';
                    }
                    console.log('Brand input empty.');
                }
            });

            // Allow pressing Enter key to submit
            brandInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    submitBrandButton.click();
                }
            });

            // Clear error message when user starts typing again
            brandInput.addEventListener('input', () => {
                if (brandErrorMessage) {
                    brandErrorMessage.style.display = 'none';
                    brandErrorMessage.textContent = ''; 
                }
            });
        }
    }
});