/* ==================================================
   LOGICA MAESTRA: BARU
   ================================================== */

let currentCategory = 'all';
let currentBrand = 'all';
let itemsToShow = 9;

document.addEventListener("DOMContentLoaded", function() {
    filterCatalog('all');

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    const emailModal = document.getElementById("emailModal");
    const btnOpenEmail = document.getElementById("btn-open-modal");
    const btnCloseEmail = document.querySelector(".close-modal");

    if (btnOpenEmail) btnOpenEmail.addEventListener('click', () => emailModal.style.display = "block");
    if (btnCloseEmail) btnCloseEmail.addEventListener('click', () => emailModal.style.display = "none");
    
    window.addEventListener('click', (event) => {
        if (event.target == emailModal) emailModal.style.display = "none";
    });
});

function filterCatalog(category) {
    currentCategory = category;
    currentBrand = 'all'; 
    itemsToShow = 9;

    document.querySelectorAll('.sidebar-menu > li').forEach(li => {
        li.classList.remove('active');
    });

    let activeBtn = document.getElementById('btn-' + category);
    if(activeBtn) {
        activeBtn.classList.add('active');
    }

    const titles = {
        'all': 'Catalogo Completo',
        'accesorios': 'Accesorios Colgantes',
        'fill-rite': 'Productos Fill Rite',
        'fluid-house': 'Fluid House',
        'gpi': 'Equipos GPI',
        'lamparas': 'Lamparas y Canopy',
        'nupi': 'Tuberia y Conexiones NUPI',
        'red-jacket': 'Bombas Red Jacket',
        'valvulas': 'Valvulas y Contenedores',
        'wayne': 'Dispensadores Wayne',
        'miscelaneos': 'Miscelaneos y Repuestos'
    };
    const titleEl = document.getElementById('catalog-title');
    if(titleEl) titleEl.innerText = titles[category] || 'Catalogo';

    applyFilters();
    if(window.innerWidth < 900) toggleSidebar();
}

function applyFilters() {
    const products = document.querySelectorAll('.product-card');
    let matchedCount = 0;
    let visibleCount = 0;

    products.forEach(prod => {
        const prodCat = prod.getAttribute('data-category');
        const matchCat = (currentCategory === 'all' || prodCat === currentCategory);

        if (matchCat) {
            matchedCount++;
            if (matchedCount <= itemsToShow) {
                prod.classList.add('visible');
                prod.style.display = 'block';
                visibleCount++;
            } else {
                prod.classList.remove('visible');
                prod.style.display = 'none';
            }
        } else {
            prod.classList.remove('visible');
            prod.style.display = 'none';
        }
    });

    const btnMore = document.getElementById('btn-load-more');
    if (visibleCount >= matchedCount) {
        btnMore.style.display = 'none';
    } else {
        btnMore.style.display = 'inline-block';
    }
}

function loadMore() {
    itemsToShow += 9;
    applyFilters();
}

function cotizarWha(productName) {
    const phone = "50239949768"; 
    const text = `Hola, me interesa cotizar: ${productName}.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}

function toggleSidebar() {
    document.getElementById('sidebar-filters').classList.toggle('active');
}

function cotizarEmail(productName) {
    const modal = document.getElementById("emailModal");
    const label = document.getElementById("quoting-product-name");
    const inputProd = document.getElementById("form-product-name");
    const inputSubj = document.getElementById("email-subject");

    if(productName) {
        label.style.display = "block";
        label.innerText = "Cotizando: " + productName;
        inputProd.value = productName;
        inputSubj.value = "Cotizacion de: " + productName;
    } else {
        label.style.display = "none";
        inputProd.value = "Consulta General";
        inputSubj.value = "Nueva Consulta Web";
    }

    modal.style.display = "block";
}

document.getElementById("btn-open-modal").addEventListener('click', () => {
    cotizarEmail(null);
});
