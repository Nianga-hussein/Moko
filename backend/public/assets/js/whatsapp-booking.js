document.addEventListener('DOMContentLoaded', function() {
    
    // --- PRE-REMPLISSAGE DU FORMULAIRE DEPUIS L'URL ---
    const urlParams = new URLSearchParams(window.location.search);
    
    // 1. Service & Description
    const serviceParam = urlParams.get('service');
    const detailsParam = urlParams.get('details');
    const categoryParam = urlParams.get('category'); // ID de catégorie
    
    if (serviceParam || detailsParam) {
        let descText = "";
        if (serviceParam) descText += "Service: " + serviceParam;
        if (detailsParam) descText += (descText ? "\n" : "") + "Détails: " + detailsParam;
        
        // Cible: #f_number (Description du besoin)
        const descField = document.getElementById('f_number');
        if (descField) {
            descField.value = descText;
            // Déclencher l'événement pour mettre à jour le résumé si présent
            descField.dispatchEvent(new Event('input'));
        }
    }

    // 2. Lieu / Adresse
    const locationParam = urlParams.get('location');
    if (locationParam) {
        // On met ça dans "Adresse précise" (#post_code) car #nationality est un select fixe
        const addressField = document.getElementById('post_code');
        if (addressField) {
            addressField.value = locationParam;
            addressField.dispatchEvent(new Event('input'));
        }
    }

    // 3. Date
    const dateParam = urlParams.get('date');
    if (dateParam) {
        const dateField = document.getElementById('flightDep');
        if (dateField) {
            // Note: le datepicker peut nécessiter un format spécifique ou une méthode API
            // On essaie d'abord la valeur directe
            dateField.value = dateParam;
            
            // Si c'est un pickadate, on essaie de mettre à jour via l'API si disponible (jQuery souvent)
            if (typeof $ !== 'undefined' && $(dateField).pickadate('picker')) {
                // Essai de parsing simple (suppose format compatible)
                // $(dateField).pickadate('picker').set('select', dateParam);
            }
            
            dateField.dispatchEvent(new Event('input'));
        }
    }

    // --- FIN PRE-REMPLISSAGE ---

    // Fonction principale de gestion du clic
    function handleWhatsappClick(e) {
        // Vérification de la classe du bouton
        if (e.target && (e.target.classList.contains('whatsapp-submit-btn') || e.target.closest('.whatsapp-submit-btn'))) {
            e.preventDefault();
            e.stopPropagation(); // Arrêter la propagation pour éviter les conflits avec d'autres scripts
            sendToWhatsapp();
        }
    }

    // Attacher l'écouteur d'événements au document pour la délégation (plus robuste)
    document.addEventListener('click', handleWhatsappClick, true); // Use capture phase to ensure we catch it first

    function getSelectedText(elementId) {
        const elt = document.getElementById(elementId);
        if (elt && elt.selectedIndex !== -1) {
            return elt.options[elt.selectedIndex].text;
        }
        return 'Non spécifié';
    }

    function getValue(elementId) {
        const elt = document.getElementById(elementId);
        return elt ? elt.value.trim() : 'Non spécifié';
    }

    function sendToWhatsapp() {
        // Récupération des données du formulaire (Step 2 principalement)
        const gender = getSelectedText('gender');
        const firstName = getValue('first-name');
        const lastName = getValue('last-name');
        const email = getValue('email');
        const city = getSelectedText('nationality'); // Utilisé pour Ville/Quartier dans le HTML modifié
        const phone = getValue('phone');
        const date = getValue('flightDep');
        const address = getValue('post_code');
        const description = getValue('f_number');
        const urgency = getSelectedText('format');
        const inspection = getSelectedText('format-2');
        
        // Paiement (Step 3)
        let payment = "Non spécifié";
        const laterRadio = document.getElementById('later');
        const nowRadio = document.getElementById('now');
        if (laterRadio && laterRadio.checked) payment = "Payer plus tard";
        if (nowRadio && nowRadio.checked) payment = "Payer maintenant";

        // Construction du message WhatsApp
        let message = `*🚀 NOUVELLE DEMANDE DE SERVICE - MOKO*\n\n`;
        
        message += `*👤 INFORMATIONS CLIENT*\n`;
        message += `--------------------------------\n`;
        message += `*Nom complet:* ${firstName} ${lastName}\n`;
        message += `*Genre:* ${gender}\n`;
        message += `*Téléphone:* ${phone}\n`;
        message += `*Email:* ${email}\n\n`;
        
        message += `*📍 DÉTAILS DU SERVICE*\n`;
        message += `--------------------------------\n`;
        message += `*Ville/Zone:* ${city}\n`;
        message += `*Adresse:* ${address}\n`;
        message += `*Date souhaitée:* ${date}\n`;
        message += `*Description:* ${description}\n`;
        message += `*Urgence:* ${urgency}\n`;
        message += `*Inspection:* ${inspection}\n\n`;
        
        message += `*💳 PAIEMENT*\n`;
        message += `--------------------------------\n`;
        message += `*Préférence:* ${payment}\n`;

        // Numéro WhatsApp (sans le +)
        const whatsappNumber = "36203630726";
        
        // Encodage du message
        const encodedMessage = encodeURIComponent(message);
        
        // Utilisation de l'URL universelle WhatsApp
        // Sur mobile, cela ouvrira l'app. Sur desktop, cela ouvrira WhatsApp Web ou l'app desktop.
        const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Redirection directe (meilleur pour mobile que window.open)
        window.location.href = url;
    }
});
