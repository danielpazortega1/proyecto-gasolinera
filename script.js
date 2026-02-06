/* ==================================================
   LÓGICA MAESTRA: BARÚ
   ================================================== */

let currentCategory = 'all';
let currentBrand = 'all';
let itemsToShow = 9;

document.addEventListener("DOMContentLoaded", function() {
    // 1. INICIALIZAR CATÁLOGO
    filterCatalog('all');

    // 2. MENÚ HAMBURGUESA (NAVBAR)
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

    // 3. MODAL DE EMAIL
    const emailModal = document.getElementById("emailModal");
    const btnOpenEmail = document.getElementById("btn-open-modal");
    const btnCloseEmail = document.querySelector(".close-modal");

    if (btnOpenEmail) btnOpenEmail.addEventListener('click', () => emailModal.style.display = "block");
    if (btnCloseEmail) btnCloseEmail.addEventListener('click', () => emailModal.style.display = "none");
    
    window.addEventListener('click', (event) => {
        if (event.target == emailModal) emailModal.style.display = "none";
    });
});

/* --- FUNCIONES DEL CATÁLOGO --- */

// 1. FILTRADO POR CATEGORÍA
function filterCatalog(category) {
    currentCategory = category;
    currentBrand = 'all'; 
    itemsToShow = 9;

    // Gestión del Sidebar
    document.querySelectorAll('.sidebar-menu > li').forEach(li => {
        li.classList.remove('active');
        const submenu = li.querySelector('.brand-submenu');
        if(submenu) submenu.classList.remove('show');
    });

    let activeBtn = document.getElementById('btn-' + category);
    if(activeBtn) {
        activeBtn.classList.add('active');
        const submenu = activeBtn.querySelector('.brand-submenu');
        if(submenu) submenu.classList.add('show');
    }

    // Actualizar Título
    const titles = {
        'all': 'Catálogo Completo',
        'bombas': 'Bombas y Medidores',
        'dispensadores': 'Dispensadores y Electrónica',
        'accesorios': 'Pistolas y Accesorios',
        'filtracion': 'Filtración y Tanques',
        'tuberia': 'Tubería y Válvulas',
        'insumos': 'Insumos y Seguridad'
    };
    const titleEl = document.getElementById('catalog-title');
    if(titleEl) titleEl.innerText = titles[category] || 'Catálogo';

    applyFilters();
    if(window.innerWidth < 900) toggleSidebar();
}

// 2. FILTRAR POR MARCA
function filterBrand(brand, event) {
    if(event) event.stopPropagation();
    currentBrand = brand;
    itemsToShow = 9;
    applyFilters();
    if(window.innerWidth < 900) toggleSidebar();
}

// 3. APLICAR FILTROS VISUALES
function applyFilters() {
    const products = document.querySelectorAll('.product-card');
    let matchedCount = 0;
    let visibleCount = 0;

    products.forEach(prod => {
        const prodCat = prod.getAttribute('data-category');
        const prodBrand = prod.getAttribute('data-brand');

        const matchCat = (currentCategory === 'all' || prodCat === currentCategory);
        const matchBrand = (currentBrand === 'all' || prodBrand === currentBrand);

        if (matchCat && matchBrand) {
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
// FUNCIÓN PARA COTIZAR POR CORREO (AUTO-RELLENA EL MODAL)
function cotizarEmail(productName) {
    const modal = document.getElementById("emailModal");
    const label = document.getElementById("quoting-product-name");
    const inputProd = document.getElementById("form-product-name");
    const inputSubj = document.getElementById("email-subject");

    // 1. Mostrar qué se está cotizando
    if(productName) {
        label.style.display = "block";
        label.innerText = "📌 Cotizando: " + productName;
        inputProd.value = productName;
        inputSubj.value = "Cotización de: " + productName;
    } else {
        // Si es consulta general
        label.style.display = "none";
        inputProd.value = "Consulta General";
        inputSubj.value = "Nueva Consulta Web";
    }

    // 2. Abrir el modal
    modal.style.display = "block";
}

// Actualizar también el botón de "Cotizar por Correo" del inicio para que limpie el form
document.getElementById("btn-open-modal").addEventListener('click', () => {
    cotizarEmail(null); // Null significa consulta general
});
