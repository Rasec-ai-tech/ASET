/**
 * SCRIPT PRINCIPAL - ASET Donation Campaign
 * Gestion des interactions, animations et fonctionnalités
 */

// ============================================
// VARIABLES GLOBALES
// ============================================

// Configuration modifiable
const CONFIG = {
    // Objectifs de collecte
    totalGoal: 5000000,
    collectedAmount: 1850000,

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
            recipientName: 'OUEDRAOGO Souhaïbou',
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
    initProgressBars();
    initBackToTop();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    
    // Mettre à jour les montants affichés
    updateDisplayAmounts();
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
        progressBar: document.getElementById('mainProgressBar'),
        totalGoal: document.getElementById('totalGoal'),
        collectedAmount: document.getElementById('collectedAmount'),
        remainingAmount: document.getElementById('remainingAmount'),
        progressPercent: document.getElementById('progressPercent'),
        donationForm: document.getElementById('donationForm'),
        donationAmountInput: document.getElementById('donationAmountInput'),
        donorNameInput: document.getElementById('donorNameInput'),
        donorPhoneInput: document.getElementById('donorPhoneInput'),
        donorEmailInput: document.getElementById('donorEmailInput'),
        donationMessageInput: document.getElementById('donationMessageInput'),
        donationMethod: document.getElementById('donationMethod'),
        transactionReferenceInput: document.getElementById('transactionReferenceInput'),
        toast: document.getElementById('toast'),
        animateElements: document.querySelectorAll('[data-animate]'),
        statTotalAmount: document.getElementById('statTotalAmount'),
        statDonationsCount: document.getElementById('statDonationsCount'),
        statPendingCount: document.getElementById('statPendingCount'),
        statValidatedCount: document.getElementById('statValidatedCount'),
        donationSummary: document.getElementById('donationSummary'),
        donationList: document.getElementById('donationList'),
        exportDonations: document.getElementById('exportDonations')
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
 * Initialise la galerie avec les médias du projet
 */
function initGallery() {
    if (!elements.galleryGrid) {
        return;
    }

    const mediaItems = [
        { type: 'image', src: 'images/IMG-20260704-WA0006.jpg', title: 'Action sur le terrain', caption: 'Photographie capturée lors d’une intervention locale.' },
        { type: 'image', src: 'images/IMG-20260704-WA0007.jpg', title: 'Équipe ASET', caption: 'Rencontre avec les bénéficiaires et partenaires.' },
        { type: 'image', src: 'images/IMG-20260704-WA0008.jpg', title: 'Soutien éducatif', caption: 'Moments de partage et d’échange autour de l’éducation.' },
        { type: 'image', src: 'images/IMG-20260704-WA0009.jpg', title: 'Cohésion communautaire', caption: 'Un moment de solidarité entre les membres.' },
        { type: 'image', src: 'images/IMG-20260704-WA0010.jpg', title: 'Enfants et apprentissage', caption: 'Un cadre propice à l’apprentissage.' },
        { type: 'image', src: 'images/IMG-20260704-WA0011.jpg', title: 'Visite de proximité', caption: 'Suivi de l’action de l’association.' },
        { type: 'image', src: 'images/IMG-20260704-WA0012.jpg', title: 'Énergie positive', caption: 'Des sourires et de la motivation.' },
        { type: 'image', src: 'images/IMG-20260704-WA0013.jpg', title: 'Engagement collectif', caption: 'Les bénévoles au cœur de l’action.' },
        { type: 'image', src: 'images/IMG-20260704-WA0014.jpg', title: 'Moments de partage', caption: 'Des échanges qui renforcent la dynamique.' },
        { type: 'image', src: 'images/IMG-20260704-WA0015.jpg', title: 'Accompagnement', caption: 'Soutien concret auprès des enfants.' },
        { type: 'image', src: 'images/IMG-20260704-WA0016.jpg', title: 'Solidarité', caption: 'Un impact visible au quotidien.' },
        { type: 'image', src: 'images/IMG-20260704-WA0017.jpg', title: 'Projet éducatif', caption: 'Des actions pensées pour l’avenir.' },
        { type: 'image', src: 'images/IMG-20260704-WA0018.jpg', title: 'Équipe mobilisée', caption: 'Mobilisation autour des besoins essentiels.' },
        { type: 'image', src: 'images/Logo.jpeg', title: 'Logo ASET', caption: 'Identité visuelle de l’association.' },
        { type: 'video', src: 'videos/VID-20260704-WA0019.mp4', title: 'Vidéo 1', caption: 'Capture vidéo de l’action menée par ASET.' },
        { type: 'video', src: 'videos/VID-20260704-WA0020.mp4', title: 'Vidéo 2', caption: 'Autre moment de mobilisation et de solidarité.' },
        { type: 'video', src: 'videos/VID-20260704-WA0021.mp4', title: 'Vidéo 3', caption: 'Témoignage visuel de l’engagement collectif.' }
    ];

    elements.galleryGrid.innerHTML = mediaItems.map((item, index) => `
        <article class="gallery-item" data-index="${index}" data-animate tabindex="0" role="button" aria-label="Ouvrir ${item.title}">
            <div class="gallery-media-wrapper">
                ${item.type === 'image' ? `<img src="${item.src}" alt="${item.title}" class="gallery-image" loading="lazy">` : `<div class="gallery-video-placeholder" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #1e3a5f, #f28c28);color:white;"><svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>`}
            </div>
            <div class="gallery-overlay">
                <p>${item.title}</p>
            </div>
        </article>
    `).join('');

    elements.galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => openMediaModal(mediaItems[Number(item.dataset.index)]));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openMediaModal(mediaItems[Number(item.dataset.index)]);
            }
        });
    });

    if (elements.closeMediaModal && elements.mediaModal) {
        elements.closeMediaModal.addEventListener('click', closeMediaModal);
        elements.mediaModal.addEventListener('click', (event) => {
            if (event.target === elements.mediaModal) {
                closeMediaModal();
            }
        });
    }
}

function openMediaModal(mediaItem) {
    if (!elements.mediaModal || !elements.mediaModalBody) {
        return;
    }

    const content = mediaItem.type === 'image'
        ? `<img src="${mediaItem.src}" alt="${mediaItem.title}">`
        : `<video controls autoplay playsinline><source src="${mediaItem.src}" type="video/mp4"></video>`;

    elements.mediaModalBody.innerHTML = `
        <div class="media-preview">
            ${content}
            <div class="media-caption">
                <h3>${mediaItem.title}</h3>
                <p>${mediaItem.caption}</p>
            </div>
        </div>
    `;
    elements.mediaModal.classList.remove('hidden');
}

function closeMediaModal() {
    if (elements.mediaModal) {
        elements.mediaModal.classList.add('hidden');
    }
    if (elements.mediaModalBody) {
        elements.mediaModalBody.innerHTML = '';
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

// ============================================
// BARRES DE PROGRESSION
// ============================================

/**
 * Initialise les barres de progression
 */
function initProgressBars() {
    // Calculer le pourcentage
    const percentage = Math.round((CONFIG.collectedAmount / CONFIG.totalGoal) * 100);
    
    // Animer la barre principale après un délai
    setTimeout(() => {
        if (elements.progressBar) {
            elements.progressBar.style.width = percentage + '%';
        }
    }, 500);
    
    // Animer les barres des objectifs
    animateObjectiveProgress();
}

/**
 * Anime les barres de progression des objectifs
 */
function animateObjectiveProgress() {
    const progressFills = document.querySelectorAll('.objective-card .progress-fill');
    
    progressFills.forEach((fill, index) => {
        setTimeout(() => {
            const target = parseInt(fill.getAttribute('data-target'));
            const current = Math.floor(target * (Math.random() * 0.5 + 0.3)); // Simulation
            fill.style.width = (current / target * 100) + '%';
            fill.setAttribute('data-progress', current);
            
            const textEl = fill.parentElement.nextElementSibling;
            if (textEl) {
                textEl.textContent = `${current}/${target}`;
            }
        }, 800 + (index * 200));
    });
}

/**
 * Anime les barres de progression dans un conteneur
 */
function animateProgressBars(container) {
    const progressFills = container.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const target = parseInt(fill.getAttribute('data-target'));
        const current = parseInt(fill.getAttribute('data-progress')) || 0;
        fill.style.width = (current / target * 100) + '%';
    });
}

/**
 * Met à jour les montants affichés
 */
function updateDisplayAmounts() {
    const collected = Number(CONFIG.collectedAmount) || 0;
    const remaining = Math.max(0, Number(CONFIG.totalGoal) - collected);
    const percentage = Math.min(100, Math.round((collected / CONFIG.totalGoal) * 100));

    if (elements.totalGoal) {
        elements.totalGoal.textContent = formatNumber(CONFIG.totalGoal) + ' FCFA';
    }
    if (elements.collectedAmount) {
        elements.collectedAmount.textContent = formatNumber(collected) + ' FCFA';
    }
    if (elements.remainingAmount) {
        elements.remainingAmount.textContent = formatNumber(remaining) + ' FCFA';
    }
    if (elements.progressPercent) {
        elements.progressPercent.textContent = percentage + '%';
    }
    if (elements.progressBar) {
        elements.progressBar.style.width = percentage + '%';
    }
}

/**
 * Formate un nombre avec des espaces
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Formate un numéro de téléphone par groupes de deux chiffres
 */
function formatPhoneNumber(phoneNumber) {
    return phoneNumber.toString().replace(/(\d{2})(?=\d)/g, '$1 ').trim();
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

/**
 * Définit un montant rapide
 */
function setAmount(amount) {
    if (elements.donationAmountInput) {
        elements.donationAmountInput.value = amount;
        elements.donationAmountInput.focus();
    }
}

/**
 * Copie le numéro Orange Money
 */
function copyOrangeMoneyNumber() {
    copyToClipboard(CONFIG.orangeMoneyNumber, 'Numéro copié !');
}

function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(message || 'Copié dans le presse-papier !');
    }).catch(err => {
        // Fallback pour les anciens navigateurs
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(message || 'Copié dans le presse-papier !');
    });
}

/**
 * Copie le montant du don
 */
function copyDonationAmount() {
    const amount = elements.donationAmount ? elements.donationAmount.value : '';
    if (amount) {
        copyToClipboard(amount, 'Montant copié !');
    } else {
        showToast('Veuillez d\'abord entrer un montant');
    }
}

/**
 * Copie le lien de la page
 */
function copyLink() {
    copyToClipboard(CONFIG.pageUrl, 'Lien copié !');
}

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
    const copyPaymentInfo = document.getElementById('copyPaymentInfo');
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

    if (copyPaymentInfo) {
        copyPaymentInfo.addEventListener('click', () => {
            const amount = paymentDonationData?.amount ? formatNumber(paymentDonationData.amount) : '---';
            const method = paymentDonationData?.method || 'orange';
            const methodConfig = CONFIG.paymentMethods[method] || CONFIG.paymentMethods.orange;
            const text = `ASET - Don ${methodConfig.label}\nMontant : ${amount} FCFA\nNuméro : ${methodConfig.number}\nDestinataire : ${methodConfig.recipientName}\nRéférence : ${paymentDonationData?.id?.slice(0, 8).toUpperCase() || '---'}`;
            copyToClipboard(text, 'Instructions copiées');
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
    const donationRef = paymentDonationData.id.slice(0, 8).toUpperCase();

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
    const copyBtn = document.getElementById('copyPaymentInfo');
    const confirmBtn = document.getElementById('confirmPaymentDone');
    const transactionReferenceInput = document.getElementById('transactionReferenceInput');

    if (paymentInstructions) paymentInstructions.classList.remove('hidden');
    if (paymentWaiting) paymentWaiting.classList.add('hidden');
    if (copyBtn) copyBtn.style.display = '';
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
 * Détecte le système d'exploitation mobile
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
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

/**
 * Prévention du spam de clics
 */
let clickTimeout = null;

function debounce(func, wait) {
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(clickTimeout);
            func(...args);
        };
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(later, wait);
    };
}

// ============================================
// ANALYTICS (Optionnel)
// ============================================

/**
 * Track les événements importants
 * À connecter avec Google Analytics ou autre
 */
function trackEvent(category, action, label) {
    console.log(`Event: ${category} - ${action} - ${label}`);
    // Ici vous pouvez ajouter votre code Google Analytics
    // gtag('event', action, { event_category: category, event_label: label });
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

/**
 * Service Worker pour le mode hors ligne (PWA)
 * Optionnel - à activer si nécessaire
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('SW registered:', registration);
        // }).catch(error => {
        //     console.log('SW registration failed:', error);
        // });
    });
}

console.log('ASET Donation Campaign - Application chargée avec succès ✅');
