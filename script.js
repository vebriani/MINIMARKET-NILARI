const products = [
    { id: 1, name: 'NUFACE', price: 65000, img: 'img/NUFACE.jpg' },
    { id: 2, name: 'HERBORIST', price: 30000, img: 'img/HERBORIST.webp' },
    { id: 3, name: 'FACETOLOGY', price: 55000, img: 'img/FACETOLOGY.jpg' },
    { id: 4, name: 'SCORA', price: 41000, img: 'img/SCORA.jpg' },
    { id: 5, name: 'WARDAH', price: 35000, img: 'img/WARDAH.jpg' },
];

let cart = [];

// Menampilkan produk
function displayProducts() {
    const productsContainer = document.getElementById('products');

    if (!productsContainer) {
        console.error('Elemen dengan id products tidak ditemukan!');
        return;
    }

    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}"
                 onerror="this.alt='Gambar tidak ditemukan';">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString('id-ID')}</p>
            <button onclick="addToCart(${product.id})">
                Tambah ke Keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Menambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Memperbarui keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('total-price');

    if (!cartItemsContainer || !totalPriceElement) return;

    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${
                (item.price * item.quantity).toLocaleString('id-ID')
            }`;

        cartItemsContainer.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent =
        `Rp ${totalPrice.toLocaleString('id-ID')}`;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const payment = Number(
        prompt(`Total belanja Rp ${total.toLocaleString('id-ID')}. Masukkan jumlah pembayaran:`)
    );

    if (!Number.isFinite(payment) || payment < total) {
        alert('Pembayaran tidak valid atau uang Anda tidak mencukupi.');
        return;
    }

    alert(`Pembayaran berhasil! Kembalian Anda: Rp ${(payment - total).toLocaleString('id-ID')}`);

    cart = [];
    updateCart();
}

// Tombol checkout
document.getElementById('checkout-btn')
    ?.addEventListener('click', checkout);

// Tampilkan produk setelah HTML siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayProducts);
} else {
    displayProducts();
}