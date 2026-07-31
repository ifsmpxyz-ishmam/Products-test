const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search-input');
const statusMessage = document.getElementById('status-message');

let allProducts = [];

async function fetchProducts() {
    const response = await fetch('/.netlify/functions/getProducts');
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const image = document.createElement('img');
    image.src = product.fields.ImageURL;
    image.alt = product.fields.Name;

    const body = document.createElement('div');
    body.className = 'product-body';

    const title = document.createElement('h2');
    title.textContent = product.fields.Name;

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = `$${Number(product.fields.Price).toFixed(2)}`;

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = product.fields.Description;

    const stock = document.createElement('span');
    stock.className = `stock-badge ${product.fields.InStock ? 'in-stock' : 'out-of-stock'}`;
    stock.textContent = product.fields.InStock ? 'In Stock' : 'Out of Stock';

    body.append(title, price, description, stock);
    card.append(image, body);
    return card;
}

function renderProducts(products) {
    productContainer.innerHTML = '';

    if (products.length === 0) {
        const empty = document.createElement('p');
        empty.textContent = 'No products found.';
        productContainer.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        fragment.appendChild(createProductCard(product));
    });
    productContainer.appendChild(fragment);
}

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

async function loadProducts() {
    try {
        allProducts = await fetchProducts();
        renderProducts(allProducts);
    } catch (error) {
        console.error('Failed to load products:', error);
        statusMessage.textContent = 'Sorry, products could not be loaded. Please try again later.';
    }
}

searchInput.addEventListener('input', debounce(() => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(product =>
        product.fields.Name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
}, 200));

loadProducts();
