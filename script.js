// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function() {
    // Main UI Containers
    var mainViewerContainer = document.getElementById('mainViewerContainer');
    var brandInputContainer = document.getElementById('brandInputContainer');
    var brandHeader = document.getElementById('brand-header');
    var brandLogo = document.getElementById('brand-logo');

    // Elements for the main viewer
    var modelViewer = document.getElementById('modelViewer');
    var dimensionsTextElement = document.getElementById('dimensionsText');
    var mainTitleElement = document.getElementById('mainTitle');
    var subTextElement = document.getElementById('subText');
    var footerTextElement = document.getElementById('footer-text');

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
    const qrModalTitle = document.getElementById('qr-modal-title');
    const qrModalText = document.getElementById('qr-modal-text');
    const qrModalOpenLink = document.getElementById('qr-code-link');

    // Elements for the brand input landing page
    const brandInput = document.getElementById('brandInput');
    const submitBrandButton = document.getElementById('submitBrandButton');
    const brandErrorMessage = document.getElementById('brandErrorMessage');

    // Get brand from URL
    var brand = getUrlParameter('brand');
    if (brand) {
        brand = brand.toLowerCase();
    }
    var modelFileName = getUrlParameter('model');

    // Define brand specific settings
    var brandSettings = {
        'neryatech': {
            logo: 'nerya-logo.png',
            website: 'https://neryatech.co.il/product/%d7%a9%d7%95%d7%9c%d7%97%d7%9f-%d7%99%d7%a9%d7%99%d7%91%d7%95%d7%aa-%d7%9e%d7%93%d7%95%d7%a8%d7%94-%d7%a7%d7%95%d7%98%d7%a8-120-%d7%a1%d7%9e/',
            model: 'neryatech_120mm_table_model.glb',
            dimensionsText: {
                en: 'Dimensions: L 120mm x H 75mm x D 120mm',
                he: 'מידות: אורך 120 מ"מ X גובה 75 מ"מ X עומק 120 מ"מ'
            },
            viewerBgColor: '#ffffff',
            headerBgColor: '#ffffff', // Changed to white
            modelViewerAreaBg: '#f5f5f5',
            buttonBgColor: '#1877F2',
            buttonHoverColor: '#1462c4'
        },
        'tudo': {
            logo: 'tudo-logo.png',
            website: 'https://www.tudo.co.il/',
            model: 'HiveShelf90cm.glb',
            dimensionsText: {
                en: 'Dimensions: W 90cm x H 160cm x D 20cm',
                he: 'מידות: רוחב 90 ס"מ X גובה 160 ס"מ X עומק 20 ס"מ'
            },
            viewerBgColor: '#f0f0f0',
            headerBgColor: '#ffffff', // Changed to white
            modelViewerAreaBg: '#ffffff',
            buttonBgColor: '#4CAF50',
            buttonHoverColor: '#45a049'
        },
        'shimrat': {
            logo: 'SHWlogo.webp',
            website: 'https://www.shw.co.il/bookcase-tzof',
            model: 'bookcase-tzof.glb',
            dimensionsText: {
                en: 'Dimensions: H 180cm x W 200cm x D 30cm',
                he: 'מידות: 180 ס״מ (גובה) x 200 ס״מ (רוחב) x 30 ס״מ (עומק)'
            },
            viewerBgColor: '#f0f0f0',
            headerBgColor: '#232020',
            modelViewerAreaBg: '#ffffff',
            buttonBgColor: '#2ab8e7',
            buttonHoverColor: '#2497c1',
            texts: {
                en: {
                    mainTitle: 'Tzof Bookcase - 3D Demonstration',
                    subText: 'Rotate, zoom, or view the model in Augmented Reality (AR) on your mobile device.'
                },
                he: {
                    mainTitle: 'ספריה צוף - הדגמה תלת-ממדית',
                    subText: 'סובבו, התקרבו או צפו במודל במציאות רבודה (AR) דרך המכשיר הנייד שלכם.'
                }
            }
        }
    };

    // --- Map variations to their actual brand objects ---
    brandSettings['nerya tech'] = brandSettings['neryatech'];
    brandSettings['nerya'] = brandSettings['neryatech'];
    brandSettings['neria tech'] = brandSettings['neryatech'];
    brandSettings['tu doo'] = brandSettings['tudo'];
    brandSettings['todo'] = brandSettings['tudo'];
    brandSettings['שמרת הזורע'] = brandSettings['shimrat'];
    brandSettings['shw'] = brandSettings['shimrat'];
    brandSettings['shimrat hazorea'] = brandSettings['shimrat'];
    brandSettings['shimrat ar'] = brandSettings['shimrat'];

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
            brandNotFound: 'Brand not found. Please ensure you enter your company\'s full name.'
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
        // Apply text content from brand-specific settings if available, otherwise use general translations
        if (currentSettings && currentSettings.texts) {
            mainTitleElement.textContent = currentSettings.texts[lang].mainTitle;
            subTextElement.textContent = currentSettings.texts[lang].subText;
        } else {
            mainTitleElement.textContent = translations[lang].mainTitle;
            subTextElement.textContent = translations[lang].subText;
        }

        if (dimensionsTextElement && currentSettings && currentSettings.dimensionsText) {
            dimensionsTextElement.textContent = currentSettings.dimensionsText[lang];
        }

        // Apply other translations
        if (resetButton) resetButton.textContent = translations[lang].resetButton;
        if (arQrButton) arQrButton.textContent = translations[lang].arQrButton;
        if (shareButton) shareButton.textContent = translations[lang].shareButton;
        if (hebrewButton) hebrewButton.textContent = translations[lang].hebrewButton;
        if (qrModalTitle) qrModalTitle.textContent = translations[lang].qrModalTitle;
        if (qrModalText) qrModalText.textContent = translations[lang].qrModalText;
        if (qrModalOpenLink) qrModalOpenLink.textContent = translations[lang].qrModalOpenLink;
        if (footerTextElement) footerTextElement.innerHTML = translations[lang].footerText.replace('JZS3D', '<a href="https://jzs3d.framer.ai/" target="_blank" style="color: #777; text-decoration: none;">JZS3D</a>');

        // Apply RTL/LTR direction to the main container
        document.body.style.direction = (lang === 'he') ? 'rtl' : 'ltr';

        // Adjust text alignment for text elements within the main container
        mainTitleElement.style.textAlign = (lang === 'he') ? 'right' : 'center';
        subTextElement.style.textAlign = (lang === 'he') ? 'right' : 'center';
        dimensionsTextElement.style.textAlign = (lang === 'he') ? 'right' : 'center';

        // Adjust QR modal direction and text alignment
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
            if (mainViewerContainer) mainViewerContainer.style.display = 'none';
            if (brandInputContainer) brandInputContainer.style.display = 'flex';
            if (brandErrorMessage) {
                brandErrorMessage.textContent = translations[currentLanguage].brandNotFound;
                brandErrorMessage.style.display = 'block';
            }
            return;
        }

        // Apply dynamic branding (logo, colors)
        if (currentSettings.logo) {
            brandLogo.src = currentSettings.logo;
            // Check if there's a website and create a link
            if (currentSettings.website) {
                const logoLink = document.createElement('a');
                logoLink.href = currentSettings.website;
                logoLink.target = "_blank"; // Open in new tab
                brandHeader.appendChild(logoLink);
                logoLink.appendChild(brandLogo);
            }
            brandHeader.style.display = 'block';
        } else {
            brandHeader.style.display = 'none';
        }
        document.body.style.setProperty('--viewer-bg-color', currentSettings.viewerBgColor);
        brandHeader.style.setProperty('--header-bg-color', currentSettings.headerBgColor);
        document.body.style.setProperty('--model-viewer-bg', currentSettings.modelViewerAreaBg);
        document.querySelectorAll('.action-button').forEach(button => {
            button.style.backgroundColor = currentSettings.buttonBgColor;
            button.onmouseover = () => button.style.backgroundColor = currentSettings.buttonHoverColor;
            button.onmouseout = () => button.style.backgroundColor = currentSettings.buttonBgColor;
        });

        // Load the model: specific model from URL (if provided) or brand's default
        modelViewer.src = 'models/' + (modelFileName || currentSettings.model);
        modelViewer.alt = "3D model of " + (modelFileName || currentSettings.model).replace('models/', '').replace('.glb', '').replace('.usdz', '');

        // Apply initial English translation (this will also set dimensions and RTL for content)
        applyTranslations('en');

        // --- AR Scaling Fix: Add the event listener here ---
        // This will ensure the ar-scale attribute is set to "fixed" as soon as the model loads.
        modelViewer.addEventListener('load', () => {
            if (modelViewer.ar) {
                modelViewer.setAttribute('ar-scale', 'fixed');
                console.log('AR scaling set to fixed on model load.');
            }
        });

        // --- Button Event Listeners for Main Viewer ---
        if (resetButton) {
            resetButton.addEventListener("click", () => {
                modelViewer.cameraOrbit = "0deg 75deg auto";
                modelViewer.fieldOfView = "45deg";
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
                } catch (error) {
                    qrCodeImage.style.display = 'none';
                }
            }
        }

        if (arQrButton) {
            arQrButton.addEventListener("click", () => {
                generateQRCode();
                qrModal.style.display = "flex";
            });
        }

        if (closeQrModal) {
            closeQrModal.addEventListener("click", () => {
                qrModal.style.display = "none";
            });
        }

        window.addEventListener("click", (event) => {
            if (event.target == qrModal) {
                qrModal.style.display = "none";
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
                    } catch (error) {
                    }
                } else {
                    try {
                        await navigator.clipboard.writeText(window.location.href);
                        alert("Share feature not supported. The link has been copied to your clipboard!");
                    } catch (err) {
                        alert("Share feature not supported. You can manually copy the link: " + window.location.href);
                    }
                }
            });
        }

        if (hebrewButton) {
            hebrewButton.addEventListener("click", () => {
                currentLanguage = (currentLanguage === 'en') ? 'he' : 'en';
                applyTranslations(currentLanguage);
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
                    }
                } else {
                    if (brandErrorMessage) {
                        brandErrorMessage.textContent = 'Please enter a brand name.';
                        brandErrorMessage.style.display = 'block';
                    }
                }
            });
        }
    }
});