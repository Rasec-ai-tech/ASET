/**
 * SCRIPT PRINCIPAL - ASET Donation Campaign
 * Gestion des interactions, animations et fonctionnalités
 */

// ============================================
// VARIABLES GLOBALES
// ============================================

// Configuration modifiable
const CONFIG = {
    // Numéro WhatsApp de l'association
    WHATSAPP_NUMBER: '22677421771',

    // Numéros marchands / de dépôt
    ORANGE_MERCHANT_NUMBER: '67058105',
    MOOV_MERCHANT_NUMBER: '62575601',

    // Paramètres du moyen de paiement
    paymentMethods: {
        orange: {
            label: 'Orange Money',
            number: '67058105',
            action: 'Transfert d\'argent',
            ussdCode: '*144*2*1*{number}*{amount}#',
            recipientName: 'OUEDRAOGO Souhaïbou',
            title: 'Instructions de paiement Orange Money',
            instructions: [
                '1. Composez le code : *144*2*1*NUMERO_MARCHAND*MONTANT# (ou cliquez sur le bouton ci-dessus sur mobile).',
                '2. Introduisez votre code secret Orange Money pour valider le transfert.',
                '3. Patientez pour recevoir le SMS de confirmation d\'Orange Money.',
                '4. Copiez l\'ID de transaction (ex : CIxxxxxx.xxxx.xxxx) et collez-le ci-dessous.'
            ]
        },
        moov: {
            label: 'Moov Money',
            number: '62575601',
            action: 'Transfert d\'argent',
            ussdCode: '*555*2*1*{number}*{amount}#',
            recipientName: 'DENON Ibrahim',
            title: 'Instructions de paiement Moov Money',
            instructions: [
                '1. Composez le code : *555*2*1*NUMERO_MARCHAND*MONTANT# (ou cliquez sur le bouton ci-dessus sur mobile).',
                '2. Saisissez votre code secret Moov Money pour confirmer.',
                '3. Attendez de recevoir le SMS de notification de Moov Money.',
                '4. Notez la référence de la transaction (ex : Réf: XXXXXXXX) et insérez-la ci-dessous.'
            ]
        },
        wave: {
            label: 'Wave',
            number: '67058105',
            action: 'Transfert d\'argent',
            recipientName: 'OUEDRAOGO Souhaïbou',
            title: 'Instructions de paiement Wave',
            instructions: [
                '1. Ouvrez l\'application Wave sur votre smartphone.',
                '2. Effectuez un transfert direct au numéro <strong>NUMERO_MARCHAND</strong> au nom de <strong>NOM_DESTINATAIRE</strong>.',
                '3. Saisissez le montant de <strong>[MONTANT] F CFA</strong> et validez le transfert.',
                '4. Récupérez la référence de transaction reçue par SMS ou dans l\'application (ex : W-XXXX-XXXX) et renseignez-la ci-dessous.'
            ]
        }
    },

    // URL de la page (pour le partage)
    pageUrl: window.location.href,

    // Texte de partage
    shareText: "Soutenez l'ASET dans sa campagne de solidarité ! Ensemble, offrons un avenir meilleur aux enfants. 📚🚲❤️"
};

// Éléments DOM
let elements = {};

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les références DOM
    initElements();
    
    // Cacher le loader après le chargement
    setTimeout(hideLoader, 1500);
    
    // Initialiser les fonctionnalités
    initNavigation();
    initScrollAnimations();
    initBackToTop();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    
    attachDonationEvents();
});

/**
 * Initialise les références aux éléments DOM
 */
function initElements() {
    elements = {
        loader: document.getElementById('loader'),
        backToTop: document.getElementById('backToTop'),
        themeToggle: document.getElementById('themeToggle'),
        navToggle: document.querySelector('.nav-toggle'),
        navMenu: document.querySelector('.nav-menu'),
        donationForm: document.getElementById('donationForm'),
        donationAmountInput: document.getElementById('donationAmountInput'),
        donorNameInput: document.getElementById('donorNameInput'),
        donorPhoneInput: document.getElementById('donorPhoneInput'),
        donorEmailInput: document.getElementById('donorEmailInput'),
        donationMessageInput: document.getElementById('donationMessageInput'),
        donationMethod: document.getElementById('donationMethod'),
        transactionReferenceInput: document.getElementById('transactionReferenceInput'),
        toast: document.getElementById('toast'),
        animateElements: document.querySelectorAll('[data-animate]')
    };
}

// ============================================
// LOADER
// ============================================

/**
 * Cache l'animation de chargement
 */
function hideLoader() {
    if (elements.loader) {
        elements.loader.classList.add('hidden');
    }
}

// ============================================
// NAVIGATION
// ============================================

/**
 * Initialise la navigation mobile
 */
function initNavigation() {
    // Fermer le menu au clic sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (elements.navMenu && elements.navToggle) {
                elements.navMenu.classList.remove('active');
                elements.navToggle.classList.remove('active');
            }
        });
    });
}

/**
 * Gère le menu mobile
 */
function initMobileMenu() {
    if (elements.navToggle && elements.navMenu) {
        elements.navToggle.addEventListener('click', () => {
            elements.navMenu.classList.toggle('active');
            elements.navToggle.classList.toggle('active');
        });
    }
}

/**
 * Scroll fluide pour les ancres
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Compensation de la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ANIMATIONS AU SCROLL
// ============================================

/**
 * Initialise les animations au scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animation spécifique pour les barres de progression
                if (entry.target.querySelector('.progress-fill')) {
                    animateProgressBars(entry.target);
                }
            }
        });
    }, observerOptions);

    elements.animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Formate un nombre avec des espaces
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// ============================================
// BOUTON RETOUR EN HAUT
// ============================================

/**
 * Initialise le bouton retour en haut
 */
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
    });
    
    elements.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// MODE SOMBRE/CLAIR
// ============================================

/**
 * Initialise le toggle de thème
 */
function initThemeToggle() {
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    elements.themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// ============================================
// FONCTIONS DE DON
// ============================================

let paymentDonationData = null;

function attachDonationEvents() {
    if (elements.donationForm) {
        elements.donationForm.addEventListener('submit', handleDonationSubmit);
    }

    document.querySelectorAll('.quick-amount').forEach(button => {
        button.addEventListener('click', () => {
            const amount = button.getAttribute('data-amount') || '';
            if (elements.donationAmountInput) {
                elements.donationAmountInput.value = amount;
            }
        });
    });

    document.querySelectorAll('input[name="donationMethod"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('input[name="donationMethod"]').forEach(item => {
                const label = item.closest('label.payment-option');
                if (label) {
                    label.classList.toggle('selected', item.checked);
                }
            });

            if (elements.donationMethod) {
                elements.donationMethod.value = radio.value;
            }
        });
    });

    document.querySelectorAll('input[name="donationMethod"]').forEach(item => {
        const label = item.closest('label.payment-option');
        if (label) {
            label.classList.toggle('selected', item.checked);
        }
    });

    const paymentModal = document.getElementById('paymentModal');
    const closePaymentModal = document.getElementById('closePaymentModal');
    const confirmPaymentDone = document.getElementById('confirmPaymentDone');
    const transactionReferenceInput = document.getElementById('transactionReferenceInput');

    if (closePaymentModal && paymentModal) {
        closePaymentModal.addEventListener('click', () => {
            paymentModal.classList.add('hidden');
            resetPaymentModal();
        });
    }

    if (paymentModal) {
        paymentModal.addEventListener('click', (event) => {
            if (event.target === paymentModal) {
                paymentModal.classList.add('hidden');
                resetPaymentModal();
            }
        });
    }

    if (transactionReferenceInput && confirmPaymentDone) {
        transactionReferenceInput.addEventListener('input', () => {
            confirmPaymentDone.disabled = !transactionReferenceInput.value.trim();
        });
    }

    if (confirmPaymentDone) {
        confirmPaymentDone.addEventListener('click', () => {
            confirmPaymentAndWait();
        });
    }
}

function handleDonationSubmit(event) {
    event.preventDefault();

    const amount = Number(elements.donationAmountInput?.value || 0);
    const name = elements.donorNameInput?.value.trim() || '';
    const method = elements.donationMethod?.value || 'orange';
    const email = elements.donorEmailInput?.value.trim() || '';
    const phone = elements.donorPhoneInput?.value.trim() || '';
    const message = elements.donationMessageInput?.value.trim() || '';

    if (!name) {
        showToast('Veuillez entrer votre nom complet');
        elements.donorNameInput?.focus();
        return;
    }

    if (!phone) {
        showToast('Veuillez entrer un numéro de téléphone');
        elements.donorPhoneInput?.focus();
        return;
    }

    if (!amount || amount < 100) {
        showToast('Veuillez entrer un montant valide (minimum 100 FCFA)');
        elements.donationAmountInput?.focus();
        return;
    }

    paymentDonationData = {
        name,
        phone,
        email,
        amount,
        method,
        message,
        id: crypto.randomUUID ? crypto.randomUUID() : `don-${Date.now()}`
    };

    openPaymentModal();
}

function renderPaymentInstructions(method, amount) {
    const methodConfig = CONFIG.paymentMethods[method] || CONFIG.paymentMethods.orange;
    const container = document.getElementById('paymentInstructionsContent');

    if (!container) {
        return;
    }

    const formattedAmount = formatNumber(amount);
    let actionButton = '';

    if (method === 'orange') {
        const encodedUssd = `tel:*144*1*1*${CONFIG.ORANGE_MERCHANT_NUMBER}*${amount}%23`;
        actionButton = `<p><a href="${encodedUssd}" class="btn-ussd">Lancer le paiement (*144#)</a></p>`;
    } else if (method === 'moov') {
        const encodedUssd = `tel:*555*2*1*${CONFIG.MOOV_MERCHANT_NUMBER}*${amount}%23`;
        actionButton = `<p><a href="${encodedUssd}" class="btn-ussd">Lancer le paiement (*555#)</a></p>`;
    }

    const instructions = (methodConfig.instructions || []).map(step => {
        let content = String(step)
            .replace(/\[MONTANT\]/g, formattedAmount)
            .replace(/NUMERO_MARCHAND/g, methodConfig.number)
            .replace(/NOM_DESTINATAIRE/g, methodConfig.recipientName || 'ASET')
            .replace(/MONTANT/g, formattedAmount);

        return `
            <div class="instruction-step">
                <p>${content}</p>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="instructions-container">
            ${actionButton}
            ${instructions}
        </div>
    `;
}

function openPaymentModal() {
    if (!paymentDonationData) {
        return;
    }

    const paymentModal = document.getElementById('paymentModal');
    const method = paymentDonationData.method;
    const amount = paymentDonationData.amount;
    const methodConfig = CONFIG.paymentMethods[method] || CONFIG.paymentMethods.orange;

    const paymentModalTitle = document.getElementById('paymentModalTitle');
    const waitingMessage = document.getElementById('waitingMessage');
    const transactionReferenceInput = document.getElementById('transactionReferenceInput');
    const confirmPaymentDone = document.getElementById('confirmPaymentDone');

    if (paymentModalTitle) {
        paymentModalTitle.textContent = methodConfig.title;
    }

    renderPaymentInstructions(method, amount);

    if (waitingMessage) waitingMessage.textContent = `Votre don de ${formatNumber(amount)} FCFA est maintenant prêt à être confirmé sur WhatsApp.`;
    if (transactionReferenceInput) transactionReferenceInput.value = '';
    if (confirmPaymentDone) confirmPaymentDone.disabled = true;

    const paymentInstructions = document.getElementById('paymentInstructions');
    const paymentWaiting = document.getElementById('paymentWaiting');
    if (paymentInstructions) paymentInstructions.classList.remove('hidden');
    if (paymentWaiting) paymentWaiting.classList.add('hidden');

    if (paymentModal) {
        paymentModal.classList.remove('hidden');
    }
}

function confirmPaymentAndWait() {
    const transactionReferenceInput = document.getElementById('transactionReferenceInput');
    const paymentModal = document.getElementById('paymentModal');

    if (!transactionReferenceInput || !transactionReferenceInput.value.trim()) {
        showToast('Veuillez renseigner la référence / l\'ID de la transaction');
        transactionReferenceInput?.focus();
        return;
    }

    const donorData = {
        ...paymentDonationData,
        transactionReference: transactionReferenceInput.value.trim(),
        createdAt: new Date().toISOString()
    };

    const methodLabel = (CONFIG.paymentMethods[donorData.method] || CONFIG.paymentMethods.orange).label;
    const message = `*NOUVEAU DON - ASET*\n\nBonjour, je viens d'effectuer un paiement mobile pour soutenir la scolarisation des enfants. Voici mes informations :\n\n• *Nom/Prénom :* ${donorData.name}\n• *Téléphone :* ${donorData.phone}\n• *Email :* ${donorData.email || 'Non renseigné'}\n• *Montant :* ${formatNumber(donorData.amount)} F CFA\n• *Moyen de paiement :* ${methodLabel}\n• *Référence de la transaction (SMS) :* ${donorData.transactionReference}\n\n💬 *Message :* ${donorData.message || 'Aucun message'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodedMessage}`;

    if (paymentModal) {
        paymentModal.classList.add('hidden');
    }

    window.location.href = whatsappUrl;
    showToast('Redirection vers WhatsApp en cours...');
    paymentDonationData = null;
    if (elements.donationForm) {
        elements.donationForm.reset();
    }
    resetPaymentModal();
}

function resetPaymentModal() {
    const paymentInstructions = document.getElementById('paymentInstructions');
    const paymentWaiting = document.getElementById('paymentWaiting');
    const confirmBtn = document.getElementById('confirmPaymentDone');
    const transactionReferenceInput = document.getElementById('transactionReferenceInput');

    if (paymentInstructions) paymentInstructions.classList.remove('hidden');
    if (paymentWaiting) paymentWaiting.classList.add('hidden');
    if (confirmBtn) {
        confirmBtn.textContent = 'Confirmer mon don sur WhatsApp';
        confirmBtn.disabled = true;
    }
    if (transactionReferenceInput) {
        transactionReferenceInput.value = '';
    }
}

// ============================================
// PARTAGE RÉSEAUX SOCIAUX
// ============================================

/**
 * Partage sur WhatsApp
 */
function shareOnWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(CONFIG.shareText + ' ' + CONFIG.pageUrl)}`;
    window.open(url, '_blank');
}

/**
 * Partage sur Facebook
 */
function shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(CONFIG.pageUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
}

/**
 * Partage sur Telegram
 */
function shareOnTelegram() {
    const url = `https://t.me/share/url?url=${encodeURIComponent(CONFIG.pageUrl)}&text=${encodeURIComponent(CONFIG.shareText)}`;
    window.open(url, '_blank');
}

// ============================================
// NOTIFICATIONS TOAST
// ============================================

/**
 * Affiche une notification toast
 */
function showToast(message) {
    if (elements.toast) {
        elements.toast.textContent = message;
        elements.toast.classList.add('show');
        
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, 3000);
    }
}

// ============================================
// UTILITAIRES
// ============================================

/**
 * Copie un texte dans le presse-papier
 */
function copyToClipboard(text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(message || 'Copié dans le presse-papier !');
        }).catch(() => {
            fallbackCopy(text, message);
        });
        return;
    }

    fallbackCopy(text, message);
}

function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(message || 'Copié dans le presse-papier !');
}

/**
 * Copie la page courante pour partage
 */
function copyLink() {
    copyToClipboard(CONFIG.pageUrl, 'Lien copié !');
}

/**
 * Ajoute un effet de parallaxe subtil
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-logo');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// ANALYTICS (Optionnel)
// ============================================

/**
 * Track les événements importants
 * À connecter avec Google Analytics ou autre
 */
function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
}

// Track les clics sur les boutons de don
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-confirm')) {
        trackEvent('Donation', 'Click Confirm', 'WhatsApp');
    }
    if (e.target.closest('.btn-share')) {
        const platform = e.target.closest('.btn-share').classList[1];
        trackEvent('Share', 'Click', platform);
    }
});


