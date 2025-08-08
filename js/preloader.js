// preloader.js - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
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
    
    document.body.prepend(preloader);
    document.body.style.overflow = 'hidden';
    
    const headerLogo = document.querySelector('.logo');
    if(headerLogo) headerLogo.style.opacity = '0';
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 5;
        if(progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            const preloaderLogo = document.querySelector('.preloader-logo');
            preloaderLogo.style.transition = 'all 1s ease-in-out';
            preloaderLogo.style.width = '80px';
            preloaderLogo.style.position = 'fixed';
            
            setTimeout(() => {
                if(headerLogo) headerLogo.replaceWith(preloaderLogo);
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                    document.body.style.overflow = 'auto';
                }, 1000);
            }, 500);
        }
        document.querySelector('.loading-progress').style.width = `${progress}%`;
        document.querySelector('.loading-text').textContent = `Loading ${Math.floor(progress)}%`;
    }, 50);
});
