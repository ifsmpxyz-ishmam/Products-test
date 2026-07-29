async function fetchProducts() {
    const response = await fetch('/.netlify/functions/getProducts');
    const products = await response.json();
    return products;
}

const productContainer = document.getElementById('product-container');

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <h2>${product.fields.Name}</h2>
        <img src="${product.fields.ImageURL}" alt="${product.fields.Name}">
        <p>Price: $${product.fields.Price}</p>
        <p>${product.fields.Description}</p>
        <p>${product.fields.InStock ? "In Stock" : "Out of Stock"}</p>
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
