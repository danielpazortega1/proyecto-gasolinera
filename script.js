document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MENÚ HAMBURGUESA
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. FORMULARIO DE CORREO
    const emailModal = document.getElementById("emailModal");
    const btnOpenEmail = document.getElementById("btn-open-modal");
    const btnCloseEmail = document.querySelector(".close-modal");

    if (btnOpenEmail) {
        btnOpenEmail.addEventListener('click', () => {
            emailModal.style.display = "block";
        });
    }

    if (btnCloseEmail) {
        btnCloseEmail.addEventListener('click', () => {
            emailModal.style.display = "none";
        });
    }

    // 3. LÓGICA DEL CATÁLOGO (ABRIR CATEGORÍAS)
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-category');
            const modalToOpen = document.getElementById(modalId);
            
            if (modalToOpen) {
                modalToOpen.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });
    });

    // 4. CERRAR MODALES DEL CATÁLOGO
    const closeCatalogButtons = document.querySelectorAll('.close-catalog');
    
    closeCatalogButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.catalog-modal');
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        });
    });

    // 5. CERRAR AL DAR CLIC AFUERA
    window.addEventListener('click', (event) => {
        if (event.target == emailModal) {
            emailModal.style.display = "none";
        }
        if (event.target.classList.contains('catalog-modal')) {
            event.target.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

});