// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener('DOMContentLoaded', function() {
    var modelViewer = document.getElementById('modelViewer');
    var viewerHeader = document.getElementById('viewerHeader');

    if (modelViewer && viewerHeader) {
        var brand = getUrlParameter('brand');
        var modelFileName = getUrlParameter('model'); // Allows specific model to be passed

        // Brand-specific settings for design (colors, header text, default model)
        var brandSettings = {
            'neryatech': {
                model: 'neryatech_120mm_table_model.glb', // Your Neryatech model
                viewerBgColor: '#ADD8E6', // Light blue for body background (from NeryaTech image)
                modelViewerAreaBg: '#f5f5f5', // Lighter background inside model-viewer area
                headerBgColor: '#cceeff', // Slightly different header background for Neryatech
                headerTextColor: '#000000', // Black header text
                headerText: 'NERYATECH AR Experience' // Neryatech specific header
            },
            'tudo': {
                model: 'HiveShelf90cm.glb', // Your TUDO model
                viewerBgColor: '#F0F0F0', // Light grey for outer body background
                modelViewerAreaBg: '#ffffff', // White background inside model-viewer area (from TUDO image)
                headerBgColor: '#e0e0e0', // Light grey header background (as seen in TUDO image)
                headerTextColor: '#555555', // Dark grey text color for header
                headerText: 'TUDO Design AR Experience' // Specific header text for TUDO
            }
            // Add more brands here in the future if needed
        };

        // Determine current settings based on 'brand' parameter, or use defaults
        var currentSettings = brandSettings[brand] || {
            // Default settings if no 'brand' parameter or it's unrecognized
            model: 'HiveShelf90cm.glb', // Default to HiveShelf
            viewerBgColor: '#f0f0f0', // Default light grey for outer body background
            modelViewerAreaBg: '#ffffff', // Default white for model area
            headerBgColor: '#e0e0e0', // Default header background
            headerTextColor: '#333333', // Default header text color
            headerText: '3D/AR Viewer' // Default generic header
        };

        // Apply dynamic styling using CSS variables (defined in index.html's <style> block)
        document.body.style.setProperty('--viewer-bg-color', currentSettings.viewerBgColor);
        document.body.style.setProperty('--viewer-text-color', currentSettings.headerTextColor); 
        modelViewer.style.setProperty('--model-viewer-bg', currentSettings.modelViewerAreaBg);
        document.documentElement.style.setProperty('--header-bg-color', currentSettings.headerBgColor);
        document.documentElement.style.setProperty('--header-text-color', currentSettings.headerTextColor);

        viewerHeader.textContent = currentSettings.headerText;

        // Load the model: specific model from URL (if provided) or brand's default
        modelViewer.src = 'models/' + (modelFileName || currentSettings.model); 
        modelViewer.alt = "3D model of " + modelViewer.src.replace('models/', '').replace('.glb', '').replace('.usdz', '');
        console.log('Loading model for ' + (brand || 'default') + ': ' + modelViewer.src + ' with header: ' + currentSettings.headerText);

    } else {
        console.error("Model Viewer or Header element not found in 3dModelARviewer/index.html.");
    }
});