let deferredPrompt;
const installBtnAndroid = document.getElementById('install-android');
const installBtnIOS = document.getElementById('install-ios');
const iosInstallModal = new bootstrap.Modal(document.getElementById('iosInstallModal'));

// 1. Listen for the 'beforeinstallprompt' event (Android/Chrome)
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  console.log('MOKO: PWA Install Prompt captured');
});

// 2. Handle Android/PC Install Click
if(installBtnAndroid) {
    installBtnAndroid.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        } else {
            // If the app is already installed or the prompt isn't available
            alert("L'application semble déjà installée ou votre navigateur ne supporte pas l'installation automatique. Vérifiez vos applications !");
        }
    });
}

// 3. Handle iOS Install Click
if(installBtnIOS) {
    installBtnIOS.addEventListener('click', () => {
        // Check if device is iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
            // Show instructions modal for iOS
            iosInstallModal.show();
        } else {
            // Fallback for non-iOS trying to click iOS button
            alert("Pour installer sur iOS, utilisez le navigateur Safari et l'option 'Sur l'écran d'accueil'.");
        }
    });
}

// 4. Check if app is already installed
window.addEventListener('appinstalled', () => {
  console.log('MOKO: PWA was installed');
  // Optionally hide the buttons
});
