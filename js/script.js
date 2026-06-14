// ================= NAVBAR SCROLL =================
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').toLowerCase();
        const target = document.querySelector(targetId);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================= DATA =================
let cart = [];
let wishlist = [];

// ================= CART =================
document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        const box = this.closest('.box');
        const name = box.querySelector('h3').textContent;
        const price = box.querySelector('.price').textContent.split(' ')[0];

        cart.push({ name, price });

        showPopup(`🛒 ${name} ditambahkan ke keranjang!`);
    });
});

// ================= WISHLIST =================
document.querySelectorAll('.fa-heart').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        const box = this.closest('.box');
        if (!box) return;

        const name = box.querySelector('h3').textContent;
        const price = box.querySelector('.price').textContent.split(' ')[0];

        this.style.color = 'red';

        wishlist.push({ name, price });

        showPopup(`❤️ ${name} masuk wishlist!`);
    });
});

// ================= HEADER ICONS =================
document.querySelector('.fa-shopping-cart').addEventListener('click', function(e) {
    e.preventDefault();

    if (cart.length === 0) {
        showPopup('🛒 Keranjang kosong');
        return;
    }

    let text = '🛒 KERANJANG:\n\n';
    cart.forEach((item, i) => {
        text += `${i+1}. ${item.name} - ${item.price}\n`;
    });

    showPopup(text);
});

document.querySelector('header .fa-heart').addEventListener('click', function(e) {
    e.preventDefault();

    if (wishlist.length === 0) {
        showPopup('❤️ Wishlist kosong');
        return;
    }

    let text = '❤️ WISHLIST:\n\n';
    wishlist.forEach((item, i) => {
        text += `${i+1}. ${item.name} - ${item.price}\n`;
    });

    showPopup(text);
});

// ================= BUTTON =================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const text = this.textContent.toLowerCase();

        if (text.includes('shop now')) {
            e.preventDefault();
            document.querySelector('#products')
                .scrollIntoView({ behavior: 'smooth' });
        }

        if (text.includes('learn more')) {
            e.preventDefault();
            document.querySelector('#about')
                .scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ================= POPUP CUSTOM =================
function showPopup(message) {
    const popup = document.createElement('div');

    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.background = '#333';
    popup.style.color = '#fff';
    popup.style.padding = '15px 20px';
    popup.style.borderRadius = '10px';
    popup.style.zIndex = '9999';
    popup.style.fontSize = '14px';
    popup.style.maxWidth = '300px';

    popup.innerText = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}

function showPopup(message) {
    // overlay (background gelap)
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    // box popup
    const popup = document.createElement('div');
    popup.style.background = '#fff';
    popup.style.padding = '20px 25px';
    popup.style.borderRadius = '12px';
    popup.style.maxWidth = '350px';
    popup.style.width = '90%';
    popup.style.textAlign = 'left';
    popup.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    popup.style.fontFamily = 'sans-serif';

    // isi teks
    const text = document.createElement('div');
    text.style.marginBottom = '15px';
    text.style.color = '#333';
    text.style.fontSize = '14px';
    text.innerText = message;

    // tombol close
    const button = document.createElement('button');
    button.innerText = 'Tutup';
    button.style.background = '#f2073e';
    button.style.color = '#fff';
    button.style.border = 'none';
    button.style.padding = '8px 15px';
    button.style.borderRadius = '6px';
    button.style.cursor = 'pointer';

    button.addEventListener('click', () => {
        overlay.remove();
    });

    // klik luar juga nutup
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    popup.appendChild(text);
    popup.appendChild(button);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
}
// ================= PAYMENT SECTION =================

// Update order summary
function updateOrderSummary() {
    const summaryDiv = document.getElementById('summaryItems');
    
    if (cart.length === 0) {
        summaryDiv.innerHTML = '<p style="text-align: center; color: #999;">Keranjang kosong</p>';
        document.getElementById('subtotal').textContent = '$0.00';
        document.getElementById('total').textContent = '$0.00';
        return;
    }

    let html = '';
    let subtotal = 0;

    cart.forEach((item, index) => {
        const priceStr = item.price.replace(/[^0-9.-]+/g, '');
        const price = parseFloat(priceStr);
        subtotal += price;
        
        html += `
            <div class="summary-item">
                <div class="summary-item-name">
                    <h4>${item.name}</h4>
                    <p class="summary-item-qty">Qty: 1</p>
                </div>
                <span class="summary-item-price">$${price.toFixed(2)}</span>
            </div>
        `;
    });

    summaryDiv.innerHTML = html;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

// Handle payment method selection
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const cardSection = document.getElementById('cardSection');
        
        if (this.value === 'card') {
            cardSection.style.display = 'block';
        } else {
            cardSection.style.display = 'none';
        }
    });
});

// Handle payment form submission
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (cart.length === 0) {
            showPopup('❌ Keranjang kosong! Tambahkan produk terlebih dahulu.');
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const total = document.getElementById('total').textContent;
        let successMessage = `✅ Pembayaran berhasil!\n\nMetode: ${paymentMethod.toUpperCase()}\nTotal: ${total}`;

        showPopup(successMessage);
        
        // Reset form dan cart
        setTimeout(() => {
            paymentForm.reset();
            cart = [];
            updateOrderSummary();
        }, 3000);
    });
}

// Update summary when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateOrderSummary();
    
    // Observe cart changes
    const originalPush = cart.push;
    cart.push = function(...args) {
        originalPush.apply(cart, args);
        updateOrderSummary();
        return cart.length;
    };
});