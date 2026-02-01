// --- 1. DATABASE ---
const db = [
    { id: 1, name: "Jordan 1 Mocha", brand: "Nike", price: 450, sale: false, img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&fit=crop" },
    { id: 2, name: "Dunk Low Panda", brand: "Nike", price: 180, sale: true, img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600&fit=crop" },
    { id: 3, name: "Yeezy 350 Zebra", brand: "Adidas", price: 320, sale: false, img: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=600&fit=crop" },
    { id: 4, name: "NB 550 Green", brand: "New Balance", price: 140, sale: true, img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&fit=crop" },
    { id: 5, name: "Travis Scott Ph.", brand: "Nike", price: 0, sale: false, isGiveaway: true, img: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=600&fit=crop" },
    { id: 6, name: "Adidas Forum", brand: "Adidas", price: 110, sale: false, img: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=600&auto=format&fit=crop" },
    { id: 7, name: "Air Max 90", brand: "Nike", price: 130, sale: true, img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?q=80&w=600&fit=crop" },
    { id: 8, name: "Off-White Jordan", brand: "Nike", price: 1500, sale: false, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&fit=crop" }
];

// --- 2. STATE ---
let cart = JSON.parse(sessionStorage.getItem('soleCart')) || [];
let currentSelectedSize = null;
let currentProductId = null;

// --- 3. INITIALIZATION ---
window.addEventListener('load', () => {
    
    // Auto-Login Check
    if (!sessionStorage.getItem('hasLoggedIn')) {
        openModal('auth-modal');
    }

    // Render Logic
    const fullGrid = document.getElementById('full-grid');
    const featuredGrid = document.getElementById('featured-grid');

    if (fullGrid) renderGrid(db, fullGrid);
    if (featuredGrid) renderGrid(db.filter(i => i.sale || i.isGiveaway).slice(0, 4), featuredGrid);

    updateCartUI();
    startTimer();
});

// --- 4. RENDER FUNCTION ---
function renderGrid(items, container) {
    if(!container) return;
    container.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.onclick = () => openProduct(item.id);
        
        let badgeHtml = '';
        if(item.isGiveaway) badgeHtml = `<div class="sale-badge" style="background:var(--accent); color:black;">GIVEAWAY</div>`;
        else if(item.sale) badgeHtml = `<div class="sale-badge">SALE</div>`;

        div.innerHTML = `
            ${badgeHtml}
            <div class="price-badge">${item.price === 0 ? 'FREE' : '$'+item.price}</div>
            <img src="${item.img}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.brand}</p>
        `;
        container.appendChild(div);
    });
}

// --- 5. PRODUCT & SIZE LOGIC ---
function openProduct(id) {
    const item = db.find(i => i.id === id);
    if (!item) return;

    currentProductId = id;
    currentSelectedSize = null;

    document.getElementById('detail-title').innerText = item.name;
    document.getElementById('detail-img').src = item.img;
    document.getElementById('detail-brand').innerText = item.brand;
    document.getElementById('detail-price').innerText = item.price === 0 ? "FREE ENTRY" : "$" + item.price;

    const sizeContainer = document.getElementById('size-container');
    sizeContainer.innerHTML = '';
    
    if (item.isGiveaway) {
        sizeContainer.innerHTML = '<p style="color:#666; font-size:0.9rem;">Size selected in entry form.</p>';
    } else {
        [7, 8, 9, 10, 11, 12].forEach(size => {
            const btn = document.createElement('div');
            btn.className = 'size-btn';
            btn.innerText = size;
            btn.onclick = () => selectSize(size, btn);
            sizeContainer.appendChild(btn);
        });
    }

    const btn = document.getElementById('add-btn');
    if (item.isGiveaway) {
        btn.innerText = "ENTER RAFFLE";
        btn.onclick = () => { closeModal('product-modal'); openModal('raffle-modal'); };
    } else {
        btn.innerText = "ADD TO CART";
        btn.onclick = addToCart;
    }

    openModal('product-modal');
}

function selectSize(size, btnElement) {
    currentSelectedSize = size;
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');
}

// --- 6. CART SYSTEM ---
function addToCart() {
    if (!currentSelectedSize) {
        alert("Please select a size first!");
        return;
    }
    const item = db.find(i => i.id === currentProductId);
    if (item) {
        cart.push({ ...item, size: currentSelectedSize });
        sessionStorage.setItem('soleCart', JSON.stringify(cart));
        updateCartUI();
        closeModal('product-modal');
        toggleCart();
    }
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    if (!container) return;

    countEl.innerText = cart.length;
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#666; margin-top:20px;">Cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            container.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}">
                    <div class="cart-info">
                        <h4>${item.name}</h4>
                        <p style="color:#888; font-size:0.8rem;">Size: US ${item.size}</p>
                        <p>$${item.price}</p>
                        <span class="remove-link" onclick="removeFromCart(${index})">REMOVE</span>
                    </div>
                </div>
            `;
        });
    }
    totalEl.innerText = '$' + total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    sessionStorage.setItem('soleCart', JSON.stringify(cart));
    updateCartUI();
}

// --- 7. AUTH & RAFFLE LOGIC ---
function toggleAuth(mode) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const title = document.getElementById('auth-title');

    if (mode === 'signup') {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        title.innerText = "CREATE ACCOUNT";
    } else {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        title.innerText = "MEMBER LOGIN";
    }
}

function handleLogin(e) {
    e.preventDefault();
    sessionStorage.setItem('hasLoggedIn', 'true');
    closeModal('auth-modal');
    showSuccess("WELCOME BACK", "You have successfully logged in.");
}

function handleSignup(e) {
    e.preventDefault();
    const p1 = document.getElementById('sp-pass').value;
    const p2 = document.getElementById('sp-repass').value;
    if (p1 !== p2) {
        alert("Passwords do not match!");
        return;
    }
    sessionStorage.setItem('hasLoggedIn', 'true');
    closeModal('auth-modal');
    showSuccess("ACCOUNT CREATED", "Welcome to the club.");
}

function handleRaffle(e) {
    e.preventDefault();
    closeModal('raffle-modal');
    showSuccess("ENTRY CONFIRMED", "Good luck! You have been entered into the draw.");
}

// --- 8. UTILS ---
function showSuccess(title, message) {
    document.getElementById('success-title').innerText = title;
    document.getElementById('success-msg').innerText = message;
    openModal('success-modal');
}

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    modal.classList.toggle('open');
    if(modal.classList.contains('open')) overlay.classList.add('active');
    else overlay.classList.remove('active');
}

function filterItems() {
    const fullGrid = document.getElementById('full-grid');
    if (!fullGrid) return;

    const priceMax = document.getElementById('price-range').value;
    document.getElementById('price-val').innerText = priceMax;

    const checkboxes = document.querySelectorAll('.check-row input:checked');
    const selectedBrands = Array.from(checkboxes).map(cb => cb.value);

    const filtered = db.filter(item => item.price <= priceMax && selectedBrands.includes(item.brand));
    renderGrid(filtered, fullGrid);
}

function startTimer() {
    const el = document.getElementById('countdown');
    if(!el) return;
    let time = 7200; 
    setInterval(() => {
        let h = Math.floor(time / 3600);
        let m = Math.floor((time % 3600) / 60);
        let s = time % 60;
        el.innerText = `${h<10?'0'+h:h}:${m<10?'0'+m:m}:${s<10?'0'+s:s}`;
        if(time > 0) time--;
    }, 1000);
}