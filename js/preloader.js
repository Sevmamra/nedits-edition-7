// preloader.js - Final Working Version
document.addEventListener('DOMContentLoaded', function() {
    // Create preloader element
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <img src="images/logo.png" alt="NEDITS Logo" class="preloader-logo">
            <div class="loading-container">
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div class="loading-text">Loading...</div>
            </div>
        </div>
    `;
    
    // Add to page and disable scrolling
    document.body.prepend(preloader);
    document.body.style.overflow = 'hidden';
    
    // Hide existing header logo
    const headerLogo = document.querySelector('.header-container .logo');
    if (headerLogo) {
        headerLogo.style.opacity = '0';
    }
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1 + Math.random() * 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            completeLoading();
        }
        updateProgress(progress);
    }, 50);
    
    function updateProgress(p) {
        const progressBar = document.querySelector('.loading-progress');
        const progressText = document.querySelector('.loading-text');
        if (progressBar) progressBar.style.width = `${p}%`;
        if (progressText) progressText.textContent = `Loading ${Math.floor(p)}%`;
    }
    
    function completeLoading() {
        const preloaderLogo = document.querySelector('.preloader-logo');
        const headerContainer = document.querySelector('.header-container');
        
        if (!preloaderLogo || !headerContainer) {
            removePreloader();
            return;
        }
        
        // Animate logo to header position
        preloaderLogo.style.transition = 'all 1s ease-in-out';
        preloaderLogo.style.width = '80px';
        preloaderLogo.style.position = 'fixed';
        preloaderLogo.style.zIndex = '10000';
        
        // Calculate final position
        const headerRect = headerContainer.getBoundingClientRect();
        const logoRect = preloaderLogo.getBoundingClientRect();
        const finalX = headerRect.left + (headerRect.width - logoRect.width) / 2;
        const finalY = headerRect.top + (headerRect.height - logoRect.height) / 2;
        
        // Move logo to header position
        preloaderLogo.style.left = `${finalX}px`;
        preloaderLogo.style.top = `${finalY}px`;
        
        setTimeout(() => {
            // Replace header logo
            const existingLogo = document.querySelector('.header-container .logo');
            if (existingLogo) {
                existingLogo.remove();
            }
            
            // Add preloader logo to header
            preloaderLogo.style.position = '';
            preloaderLogo.style.left = '';
            preloaderLogo.style.top = '';
            preloaderLogo.style.transition = '';
            headerContainer.insertBefore(preloaderLogo, headerContainer.firstChild);
            
            // Remove preloader
            removePreloader();
        }, 1000);
    }
    
    function removePreloader() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
                document.body.style.overflow = 'auto';
            }, 500);
        }
    }
});
