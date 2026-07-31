async function fetchProducts() {
    const response = await fetch('/.netlify/functions/getProducts');
    const products = await response.json();
    return products;
}

const productContainer = document.getElementById('product-container');

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const stockClass = product.fields.InStock ? 'in-stock' : 'out-of-stock';
    const stockText = product.fields.InStock ? 'In Stock' : 'Out of Stock';

    card.innerHTML = `
        <img src="${product.fields.ImageURL}" alt="${product.fields.Name}">
        <div class="product-body">
            <h2>${product.fields.Name}</h2>
            <p class="price">$${product.fields.Price}</p>
            <p class="description">${product.fields.Description}</p>
            <span class="stock-badge ${stockClass}">${stockText}</span>
        </div>
    `;
    return card;
}

fetchProducts().then(products => {
    products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
        if (product.fields.InStock) {
            card.style.borderColor = 'green';
        }
    });
});
const searchInput = document.getElementById('searchInput');
let allProducts = [];

async function loadProducts() {
    const response = await fetch('/.netlify/functions/getProducts');
    const products = await response.json();
    allProducts = products;
    renderProducts(allProducts);
}

function renderProducts(products) {
    productContainer.innerHTML = "";
    products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(product =>
        product.fields.Name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
});

loadProducts();
