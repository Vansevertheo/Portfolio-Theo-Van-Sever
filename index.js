async function loadTranslations() {
  const enResponse = await fetch('lang/en.json');
  const enData = await enResponse.json();
  const frResponse = await fetch('lang/fr.json');
  const frData = await frResponse.json();

  i18next.init({
    lng: 'en',
    resources: {
      en: { translation: enData },
      fr: { translation: frData }
    }
  });

  // Now add event listeners
  document.getElementById('lang-fr').addEventListener('click', () => {
    i18next.changeLanguage('fr');
  });

  document.getElementById('lang-en').addEventListener('click', () => {
    i18next.changeLanguage('en');
  });

  i18next.on('languageChanged', (lng) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.innerHTML = i18next.t(key);
    });
    document.documentElement.lang = lng;
  });
}

loadTranslations();

const links = document.querySelectorAll('nav li')

icons.addEventListener("click", ()=>{
    nav.classList.toggle("active")
})

links.forEach((link) => {
    link.addEventListener("click", () =>{
        nav.classList.remove("active");
    })
});


const scrollToTopBtn = document.getElementById('scrollToTop');


function scrollToTop() {
    window.scrollTo({
        top: 0,
    });
}


window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

emailjs.init("WziQ4Mu9Xy5Ovq7ZF")

function showModal(type, title, message) {
    const modal = document.getElementById('modal-overlay');
    const icon = document.getElementById('modal-icon');
    const titleEl = document.getElementById('modal-title');
    const messageEl = document.getElementById('modal-message');
    const closeBtn = document.getElementById('modal-close');
    
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        closeBtn.style.display = 'block';
    } else if (type === 'error') {
        icon.className = 'fas fa-times-circle';
        closeBtn.style.display = 'block';
    } else if (type === 'loading') {
        icon.className = 'fas fa-spinner fa-spin';
        closeBtn.style.display = 'none';
    }
    
    titleEl.textContent = title;
    messageEl.textContent = message;
    modal.classList.add('show');
}

function hideModal() {
    const modal = document.getElementById('modal-overlay');
    modal.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('modal-close').addEventListener('click', hideModal);
    document.getElementById('modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            hideModal();
        }
    });
});

function sendEmail(e) {
    e.preventDefault();
    
    showModal('loading', 'Envoi en cours...', 'Votre message est en cours d\'envoi, veuillez patienter.');
    
    emailjs.sendForm('service_oo7oo9y', 'template_zq39uco', e.target)
        .then(() => {
            showModal('success', 'Message envoyé !', 'Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.');
            e.target.reset(); 
        }, (error) => {
            showModal('error', 'Erreur d\'envoi', 'Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
        });
}

document.querySelector('.contact-form').addEventListener('submit', sendEmail);