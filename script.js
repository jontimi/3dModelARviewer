// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search); // This correctly checks query parameters
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
    // Get the brand error message element
    const brandErrorMessage = document.getElementById('brandErrorMessage');

    // Get brand from URL
    var brand = getUrlParameter('brand');
    var modelFileName = getUrlParameter('model');

    // Define brand specific settings
    var brandSettings = {
        'neryatech': {
            model: 'Neryatech.glb',
            dimensionsText: {
                en: 'Dimensions: L 120mm x H 75mm x D 120mm',
                he: 'מידות: אורך 120 מ"מ X גובה 75 מ"מ X עומק 120 מ"מ'
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
        },
        // --- UPDATED: Brand Name Variations ---
        // NeryaTech Variations
        'nerya tech': null,
        'nerya': null,
        'neria tech': null,
        'neryatec': null,
        'nerya-tech': null,
        'neryatech ar': null,
        'neriatech': null,
        'nerytech': null,
        'neryateck': null,
        'neryatach': null,
        'neryateh': null,
        'nery': null,
        'naryatech': null,
        'neriatech ar': null,
        'neryatech ar viewer': null,
        'neryatech viewer': null,
        'nerya tech viewer': null,
        'nerya viewer': null,
        'neryatec ar': null,
        'nerya technologies': null,
        'neria technologies': null,
        'neryatech solutions': null,
        'neryatech studio': null,
        'nerya tech studio': null,
        'nerya solutions': null,
        'nerya technology': null,
        'neria': null, // Added
        'neria ar': null, // Added
        'neria viewer': null, // Added
        'neria 3d': null, // Added
        'neria model': null, // Added
        'neriatech solutions': null, // Added (if distinct from neryatech solutions)
        'neria design': null, // Added
        'neria products': null, // Added

        // Tudo Variations
        'tu doo': null,
        'too doo': null,
        'tudu': null,
        'todo': null,
        'tudodesign': null,
        'tudo design': null,
        'todo dasign': null,
        'tuddo': null,
        'tutto': null,
        'tudos': null,
        'tudu design': null,
        'todo design': null,
        'tudoar': null,
        'tudo ar': null,
        'tudoviewer': null,
        'tudo viewer': null,
        'tudodesigns': null
        // Add more brands here in the future if needed
    };

    // --- UPDATED: Map variations to their actual brand objects ---
    // This must be done AFTER brandSettings is fully defined
    brandSettings['nerya tech'] = brandSettings['neryatech'];
    brandSettings['nerya'] = brandSettings['neryatech'];
    brandSettings['neria tech'] = brandSettings['neryatech'];
    brandSettings['neryatec'] = brandSettings['neryatech'];
    brandSettings['nerya-tech'] = brandSettings['neryatech'];
    brandSettings['neryatech ar'] = brandSettings['neryatech'];
    brandSettings['neriatech'] = brandSettings['neryatech'];
    brandSettings['nerytech'] = brandSettings['neryatech'];
    brandSettings['neryateck'] = brandSettings['neryatech'];
    brandSettings['neryatach'] = brandSettings['neryatech'];
    brandSettings['neryateh'] = brandSettings['neryatech'];
    brandSettings['nery'] = brandSettings['neryatech'];
    brandSettings['naryatech'] = brandSettings['neryatech'];
    brandSettings['neriatech ar'] = brandSettings['neryatech'];
    brandSettings['neryatech ar viewer'] = brandSettings['neryatech'];
    brandSettings['neryatech viewer'] = brandSettings['neryatech'];
    brandSettings['nerya tech viewer'] = brandSettings['neryatech'];
    brandSettings['nerya viewer'] = brandSettings['neryatech'];
    brandSettings['neryatec ar'] = brandSettings['neryatech'];
    brandSettings['nerya technologies'] = brandSettings['neryatech'];
    brandSettings['neria technologies'] = brandSettings['neryatech'];
    brandSettings['neryatech solutions'] = brandSettings['neryatech'];
    brandSettings['neryatech studio'] = brandSettings['neryatech'];
    brandSettings['nerya tech studio'] = brandSettings['neryatech'];
    brandSettings['nerya solutions'] = brandSettings['neryatech'];
    brandSettings['nerya technology'] = brandSettings['neryatech'];
    brandSettings['neria'] = brandSettings['neryatech']; // Added mapping
    brandSettings['neria ar'] = brandSettings['neryatech']; // Added mapping
    brandSettings['neria viewer'] = brandSettings['neryatech']; // Added mapping
    brandSettings['neria 3d'] = brandSettings['neryatech']; // Added mapping
    brandSettings['neria model'] = brandSettings['neryatech']; // Added mapping
    brandSettings['neriatech solutions'] = brandSettings['neryatech']; // Added mapping
    brandSettings['neria design'] = brandSettings['neryatech']; // Added mapping
    brandSettings['neria products'] = brandSettings['neryatech']; // Added mapping


    brandSettings['tu doo'] = brandSettings['tudo'];
    brandSettings['too doo'] = brandSettings['tudo'];
    brandSettings['tudu'] = brandSettings['tudo'];
    brandSettings['todo'] = brandSettings['tudo'];
    brandSettings['tudodesign'] = brandSettings['tudo'];
    brandSettings['tudo design'] = brandSettings['tudo'];
    brandSettings['todo dasign'] = brandSettings['tudo'];
    brandSettings['tuddo'] = brandSettings['tudo'];
    brandSettings['tutto'] = brandSettings['tudo'];
    brandSettings['tudos'] = brandSettings['tudo'];
    brandSettings['tudu design'] = brandSettings['tudo'];
    brandSettings['todo design'] = brandSettings['tudo'];
    brandSettings['tudoar'] = brandSettings['tudo'];
    brandSettings['tudo ar'] = brandSettings['tudo'];
    brandSettings['tudoviewer'] = brandSettings['tudo'];
    brandSettings['tudo viewer'] = brandSettings['tudo'];
    brandSettings['tudodesigns'] = brandSettings['tudo'];


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
            qrModalOpenLink: 'Open Link',
            brandNotFound: 'Brand not found. Please ensure you enter your company\'s full name in English.' 
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
            qrModalOpenLink: 'פתח קישור',
            brandNotFound: 'המותג לא נמצא. אנא ודא שהזנת את שם החברה המלא שלך באנגלית.' 
        }
    };

    let currentLanguage = 'en'; // Default language
    let currentSettings = null; // Initialize currentSettings here

    // Function to apply translations
    function applyTranslations(lang) {
        // Apply text content
        if (mainTitleElement) mainTitleElement.textContent = translations[lang].mainTitle;
        if (subTextElement) subTextElement.textContent = translations[lang].subText;
        if (resetButton) resetButton.textContent = translations[lang].resetButton;
        if (arQrButton) arQrButton.textContent = translations[lang].arQrButton;
        if (shareButton) shareButton.textContent = translations[lang].shareButton;
        if (hebrewButton) hebrewButton.textContent = translations[lang].hebrewButton;
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

        // Determine current settings based on 'brand' parameter
        currentSettings = brandSettings[brand]; 
        
        // If brand from URL is NOT recognized, show brand input page with error
        if (!currentSettings) {
            console.warn(`Brand "${brand}" from URL not recognized. Displaying brand input page.`);
            if (mainViewerContainer) mainViewerContainer.style.display = 'none';
            if (brandInputContainer) brandInputContainer.style.display = 'flex';
            if (brandErrorMessage) {
                brandErrorMessage.textContent = translations[currentLanguage].brandNotFound;
                brandErrorMessage.style.display = 'block';
            }
            return; 
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
            let urlToEncode = window.location.href;
            if (brand && !modelFileName) { 
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.set('brand', brand);
                urlToEncode = currentUrl.toString();
            }

            if (urlToEncode && typeof QRious !== 'undefined' && qrCodeImage) {
                try {
                    new QRious({
                        element: qrCodeImage, 
                        value: urlToEncode,
                        size: 150, 
                        level: 'H' 
                    });
                    qrCodeImage.style.display = 'block';
                    qrCodeLink.href = urlToEncode;
                    console.log("QR Code generated for:", urlToEncode);
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
        // If no brand is specified in URL, show the brand input page
        if (mainViewerContainer) mainViewerContainer.style.display = 'none';
        if (brandInputContainer) brandInputContainer.style.display = 'flex'; 

        // Ensure brandErrorMessage is hidden initially on the landing page
        if (brandErrorMessage) {
            brandErrorMessage.style.display = 'none';
        }

        if (submitBrandButton && brandInput) {
            submitBrandButton.addEventListener('click', () => {
                const enteredBrand = brandInput.value.trim().toLowerCase();
                
                if (enteredBrand) {
                    if (brandSettings[enteredBrand]) {
                        window.location.href = window.location.origin + window.location.pathname + '?brand=' + enteredBrand;
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