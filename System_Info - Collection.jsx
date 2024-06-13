#target photoshop

function displaySystemInfo() {
    var info = "Photoshop System Information \n\n"; // Title for the information box

    // Gathering system information
    info += "Photoshop Version: " + app.version + "\n"; // Photoshop version
    var osInfo = $.os; // OS information string
    info += "Operating System: " + osInfo + "\n"; // Operating system version

    // Extract Built-in memory information from the system info
    var systemInfo = app.systemInformation;
    var builtInMemoryInfo = extractBuiltInMemoryInfo(systemInfo);
    if (builtInMemoryInfo) {
        info += "Built-in Memory: " + builtInMemoryInfo + "\n";
    }

    // Extract GPU VRAM information from the system info
    var gpuVramInfo = extractGPUVramInfo(systemInfo);
    if (gpuVramInfo) {
        info += "GPU VRAM Information: " + gpuVramInfo + "\n";
    }

    // Extract NVIDIA card information if available
    var nvidiaInfo = extractNVIDIAInfo(systemInfo);
    if (nvidiaInfo) {
        info += "NVIDIA GPU Information: " + nvidiaInfo + "\n";
    }

    // Extract AMD/RADEON card information if available
    var amdInfo = extractAMDInfo(systemInfo);
    if (amdInfo) {
        info += "AMD/RADEON GPU Information: " + amdInfo + "\n";
    }

    // Extract Intel Iris Graphics information if available
    var irisInfo = extractIrisInfo(systemInfo);
    if (irisInfo) {
        info += "Intel Iris Graphics Information: " + irisInfo + "\n";
    }

    // Extract Apple METAL graphics card information if available
    var metalInfo = extractMetalInfo(systemInfo);
    if (metalInfo) {
        info += "Apple METAL GPU Information: " + metalInfo + "\n";
    }

    // Extract Memory used by Photoshop if available
    var photoshopMemoryInfo = extractPhotoshopMemoryInfo(systemInfo);
    if (photoshopMemoryInfo) {
        info += "Memory Used by Photoshop: " + photoshopMemoryInfo + "\n";
    }

    // Extract Memory available to Photoshop if available
    var memoryAvailableInfo = extractMemoryAvailableInfo(systemInfo);
    if (memoryAvailableInfo) {
        info += "Memory Available to Photoshop: " + memoryAvailableInfo + "\n";
    }

    // Extract License Type if available
    var licenseTypeInfo = extractLicenseTypeInfo(systemInfo);
    if (licenseTypeInfo) {
        info += "License Type: " + licenseTypeInfo + "\n";
    }

    // Extract Open Color IO version if available
    var openColorIOVersion = extractOpenColorIOVersion(systemInfo);
    if (openColorIOVersion) {
        info += "Open Color IO version: " + openColorIOVersion + "\n";
    }

    // Extract D3D12Warp renderer if available
    var d3d12WarpRenderer = extractD3D12WarpRenderer(systemInfo);
    if (d3d12WarpRenderer) {
        info += "D3D12Warp renderer: " + d3d12WarpRenderer + "\n";
    }

    // Extract Image tile size if available
    var imageTileSize = extractImageTileSize(systemInfo);
    if (imageTileSize) {
        info += "Image Tile Size: " + imageTileSize + "\n";
    }

    // Extract Image cache levels if available
    var imageCacheLevels = extractImageCacheLevels(systemInfo);
    if (imageCacheLevels) {
        info += "Image Cache Levels: " + imageCacheLevels + "\n";
    }

    // Extract GPU-related information if available
    var gpuDeny = extractGPUInfo(systemInfo, "GPUDeny:");
    if (gpuDeny) {
        info += "GPUDeny: " + gpuDeny + "\n";
    }

    var gpuForce = extractGPUInfo(systemInfo, "GPUForce:");
    if (gpuForce) {
        info += "GPUForce: " + gpuForce + "\n";
    }

    var useGPU = extractGPUInfo(systemInfo, "useGPU:");
    if (useGPU) {
        info += "useGPU: " + useGPU + "\n";
    }

    var useOpenCL = extractGPUInfo(systemInfo, "useOpenCL:");
    if (useOpenCL) {
        info += "useOpenCL: " + useOpenCL + "\n";
    }

    var isGPUCapable = extractGPUInfo(systemInfo, "isGPUCapable:");
    if (isGPUCapable) {
        info += "isGPUCapable: " + isGPUCapable + "\n";
    }

    var isGPUAllowed = extractGPUInfo(systemInfo, "isGPUAllowed:");
    if (isGPUAllowed) {
        info += "isGPUAllowed: " + isGPUAllowed + "\n";
    }

    // Extract additional GPU-related information if available
    var hasSufficientRAM = extractGPUInfo(systemInfo, "HasSufficientRAM:");
    if (hasSufficientRAM) {
        info += "HasSufficientRAM: " + hasSufficientRAM + "\n";
    }

    var gpuAccessibleRAM = extractGPUInfo(systemInfo, "GPU accessible RAM:");
    if (gpuAccessibleRAM) {
        info += "GPU accessible RAM: " + gpuAccessibleRAM + "\n";
    }

    var requiredGPUAccessibleRAM = extractGPUInfo(systemInfo, "Required GPU accessible RAM:");
    if (requiredGPUAccessibleRAM) {
        info += "Required GPU accessible RAM: " + requiredGPUAccessibleRAM + "\n";
    }

    var useGraphicsProcessorChecked = extractGPUInfo(systemInfo, "UseGraphicsProcessorChecked:");
    if (useGraphicsProcessorChecked) {
        info += "UseGraphicsProcessorChecked: " + useGraphicsProcessorChecked + "\n";
    }

    var useOpenCLChecked = extractGPUInfo(systemInfo, "UseOpenCLChecked:");
    if (useOpenCLChecked) {
        info += "UseOpenCLChecked: " + useOpenCLChecked + "\n";
    }

    var windowsRemoteDesktop = extractGPUInfo(systemInfo, "Windows remote desktop:");
    if (windowsRemoteDesktop) {
        info += "Windows remote desktop: " + windowsRemoteDesktop + "\n";
    }

    var windowsAvailableFeatureLevel = extractGPUInfo(systemInfo, "Windows available feature level:");
    if (windowsAvailableFeatureLevel) {
        info += "Windows available feature level: " + windowsAvailableFeatureLevel + "\n";
    }

    var windowsRequiredFeatureLevel = extractGPUInfo(systemInfo, "Windows required feature level:");
    if (windowsRequiredFeatureLevel) {
        info += "Windows required feature level: " + windowsRequiredFeatureLevel + "\n";
    }

    var windowsHasRequiredFeatureLevel = extractGPUInfo(systemInfo, "Windows has required feature level:");
    if (windowsHasRequiredFeatureLevel) {
        info += "Windows has required feature level: " + windowsHasRequiredFeatureLevel + "\n";
    }

    // Extract composite core and document graph information if available
    var compCoreGPU = extractGPUInfo(systemInfo, "Composite Core GPU \\(comp_core_gpu\\):");
    if (compCoreGPU) {
        info += "Composite Core GPU (comp_core_gpu): " + compCoreGPU + "\n";
    }

    var compCoreThreads = extractGPUInfo(systemInfo, "Composite Core Threads \\(MultithreadedCompositing\\):");
    if (compCoreThreads) {
        info += "Composite Core Threads (MultithreadedCompositing): " + compCoreThreads + "\n";
    }

    var compCoreUI = extractGPUInfo(systemInfo, "Composite Core UI \\(comp_core_ui\\):");
    if (compCoreUI) {
        info += "Composite Core UI (comp_core_ui): " + compCoreUI + "\n";
    }

    var compCoreFeaturePrefs = extractGPUInfo(systemInfo, "Composite Core Feature Prefs \\(CompCoreFeaturePrefs\\):");
    if (compCoreFeaturePrefs) {
        info += "Composite Core Feature Prefs (CompCoreFeaturePrefs): " + compCoreFeaturePrefs + "\n";
    }

    var documentGraph = extractGPUInfo(systemInfo, "Document Graph \\(DocumentGraph\\):");
    if (documentGraph) {
        info += "Document Graph (DocumentGraph): " + documentGraph + "\n";
    }

    // If Apple OS detected, extract GPU accessible RAM information
    if (osInfo.indexOf("Macintosh") !== -1 || osInfo.indexOf("Mac OS") !== -1) {
        var gpuAccessibleRamInfo = extractGPUAccessibleRamInfo(systemInfo);
        if (gpuAccessibleRamInfo) {
            info += "GPU Accessible RAM: " + gpuAccessibleRamInfo + "\n";
        }
    }

    // Displaying the information in a dialog with a Cancel button
    var dialog = new Window("dialog", "System Information");
    var infoText = dialog.add("edittext", undefined, info, {multiline: true, readonly: true});
    infoText.size = [400, 450];
    
    var buttonGroup = dialog.add("group");
    var cancelButton = buttonGroup.add("button", undefined, "OK");

    cancelButton.onClick = function() {
        dialog.close();
    };

    dialog.show();
}

// Function to extract Built-in memory information from system info
function extractBuiltInMemoryInfo(systemInfo) {
    var memoryPattern = /Built-in Memory:\s*([^\r\n]*)/g;
    var memoryMatch = memoryPattern.exec(systemInfo);
    return memoryMatch ? memoryMatch[1] : null;
}

// Function to extract GPU VRAM information from system info
function extractGPUVramInfo(systemInfo) {
    var vramPattern = /VRAM[^\r\n]*/g;
    var vramMatch = vramPattern.exec(systemInfo);
    return vramMatch ? vramMatch[0] : null;
}

// Function to extract NVIDIA card information from system info
function extractNVIDIAInfo(systemInfo) {
    var nvidiaInfoPattern = /NVIDIA[^\r\n]*/g;
    var nvidiaInfoMatch = nvidiaInfoPattern.exec(systemInfo);
    return nvidiaInfoMatch ? nvidiaInfoMatch[0] : null;
}

// Function to extract AMD/RADEON card information from system info
function extractAMDInfo(systemInfo) {
    var amdInfoPattern = /(AMD|RADEON)[^\r\n]*/g;
    var amdInfoMatch = amdInfoPattern.exec(systemInfo);
    return amdInfoMatch ? amdInfoMatch[0] : null;
}

// Function to extract Intel Iris Graphics information from system info
function extractIrisInfo(systemInfo) {
    var irisInfoPattern = /Iris[^\r\n]*/g;
    var irisInfoMatch = irisInfoPattern.exec(systemInfo);
    return irisInfoMatch ? irisInfoMatch[0] : null;
}

// Function to extract Apple METAL graphics card information from system info
function extractMetalInfo(systemInfo) {
    var metalInfoPattern = /Metal[^\r\n]*/g;
    var metalInfoMatch = metalInfoPattern.exec(systemInfo);
    return metalInfoMatch ? metalInfoMatch[0] : null;
}

// Function to extract Memory used by Photoshop from system info
function extractPhotoshopMemoryInfo(systemInfo) {
    var photoshopMemoryPattern = /Memory used by Photoshop:\s*([^\r\n]*)/g;
    var photoshopMemoryMatch = photoshopMemoryPattern.exec(systemInfo);
    return photoshopMemoryMatch ? photoshopMemoryMatch[1] : null;
}

// Function to extract Memory available to Photoshop from system info
function extractMemoryAvailableInfo(systemInfo) {
    var memoryAvailablePattern = /Memory available to Photoshop:\s*([^\r\n]*)/g;
    var memoryAvailableMatch = memoryAvailablePattern.exec(systemInfo);
    return memoryAvailableMatch ? memoryAvailableMatch[1] : null;
}

// Function to extract License Type from system info
function extractLicenseTypeInfo(systemInfo) {
    var licenseTypePattern = /License Type:\s*([^\r\n]*)/g;
    var licenseTypeMatch = licenseTypePattern.exec(systemInfo);
    return licenseTypeMatch ? licenseTypeMatch[1] : null;
}

// Function to extract Open Color IO version from system info
function extractOpenColorIOVersion(systemInfo) {
    var openColorIOPattern = /Open Color IO version:\s*([^\r\n]*)/g;
    var openColorIOMatch = openColorIOPattern.exec(systemInfo);
    return openColorIOMatch ? openColorIOMatch[1] : null;
}

// Function to extract D3D12Warp renderer from system info
function extractD3D12WarpRenderer(systemInfo) {
    var d3d12WarpRendererPattern = /D3D12Warp renderer:\s*([^\r\n]*)/g;
    var d3d12WarpRendererMatch = d3d12WarpRendererPattern.exec(systemInfo);
    return d3d12WarpRendererMatch ? d3d12WarpRendererMatch[1] : null;
}

// Function to extract Image tile size from system info
function extractImageTileSize(systemInfo) {
    var imageTileSizePattern = /Image tile size:\s*([^\r\n]*)/g;
    var imageTileSizeMatch = imageTileSizePattern.exec(systemInfo);
    return imageTileSizeMatch ? imageTileSizeMatch[1] : null;
}

// Function to extract Image cache levels from system info
function extractImageCacheLevels(systemInfo) {
    var imageCacheLevelsPattern = /Image cache levels:\s*([^\r\n]*)/g;
    var imageCacheLevelsMatch = imageCacheLevelsPattern.exec(systemInfo);
    return imageCacheLevelsMatch ? imageCacheLevelsMatch[1] : null;
}

// Function to extract GPU-related information from system info
function extractGPUInfo(systemInfo, key) {
    var pattern = new RegExp(key + "\\s*([^\r\n]*)", "g");
    var match = pattern.exec(systemInfo);
    return match ? match[1] : null;
}

// Function to extract GPU accessible RAM information from system info
function extractGPUAccessibleRamInfo(systemInfo) {
    var gpuAccessibleRamPattern = /GPU accessible RAM:\s*([^\r\n]*)/g;
    var gpuAccessibleRamMatch = gpuAccessibleRamPattern.exec(systemInfo);
    return gpuAccessibleRamMatch ? gpuAccessibleRamMatch[1] : null;
}

// Run the function to display system info
displaySystemInfo();
