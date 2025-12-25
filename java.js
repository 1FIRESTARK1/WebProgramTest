const products = [
    { id: 1, name: "iPhone 15", price: 89000, img: "" },
    { id: 2, name: "Samsung S24", price: 75000, img: "" },
    { id: 3, name: "MacBook Air", price: 120000, img: "" },
    { id: 4, name: "Honor magicbook 15", price: 95000, img: "" },
    { id: 5, name: "Iphone XS", price: 65000, img: "" },
    { id: 6, name: "Honor 50", price: 25000, img: "" },
    { id: 7, name: "Poco x3 pro", price: 220000, img: "" }
];

const list = document.querySelector('.listProduct');
const filterSelect = document.getElementById('category-filter');

function renderProducts(items) {
    list.innerHTML = '';
    items.forEach(p => {
        list.innerHTML += `
      <div class="item">
        <div>${p.img}</div>
        <h3>${p.name}</h3>
        <div>${p.price} ₽</div>
        <button class="AddCart" data-name="${p.name}" data-price="${p.price}">В корзину</button>
      </div>
    `;
    });
}

document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.classList.contains('AddCart')) {
        const name = e.target.dataset.name;
        const price = e.target.dataset.price;
        const li = document.createElement('li');
        li.textContent = `${name} — ${price} ₽`;
        cartList.appendChild(li);
    }
});

renderProducts(products);

filterSelect.addEventListener('change', () => {
    const value = filterSelect.value;
    let sorted = [...products];

    if (value === 'MaxPrice') {
        sorted.sort((a, b) => b.price - a.price);
    } else if (value === 'LowPrice') {
        sorted.sort((a, b) => a.price - b.price);
    }

    renderProducts(sorted);
});

// --- Админка (исправленная) ---
const adminBtn = document.getElementById('adminBtn');
const adminModal = document.getElementById('adminModal');
const adminProductList = document.getElementById('adminProductList');
const closeAdmin = document.getElementById('closeAdmin');

function renderAdminPanel() {
    if (!adminProductList) {
        console.error("Элемент #adminProductList не найден!");
        return;
    }
    adminProductList.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.style.margin = '10px 0';
        div.innerHTML = `
            <strong>ID: ${product.id}</strong><br>
            Название: <input type="text" data-id="${product.id}" value="${product.name}"><br>
            Цена: <input type="number" data-id="${product.id}" value="${product.price}"> ₽<br>
            <button onclick="saveProduct(${product.id})">Сохранить</button>
            <hr>
        `;
        adminProductList.appendChild(div);
    });
}

function saveProduct(id) {
    const inputs = adminProductList.querySelectorAll(`[data-id="${id}"]`);
    const nameInput = inputs[0];
    const priceInput = inputs[1];

    const product = products.find(p => p.id === id);
    if (product) {
        product.name = nameInput.value.trim();
        product.price = Number(priceInput.value) || 0;
        renderProducts(products); // Обновляем отображение
        alert(`Товар ID ${id} обновлён!`);
    }
}

// Кнопку "Админ Панель" мы уже добавили в HTML — просто привязываем событие
if (adminBtn) {
    adminBtn.addEventListener('click', () => {
        renderAdminPanel();
        adminModal.style.display = 'flex';
    });
}

if (closeAdmin) {
    closeAdmin.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });
}

document.getElementById('payBtn').addEventListener('click', () => {
    alert('Оплачено!');
    document.getElementById('cartModal').style.display = 'none';
    // Очистим корзину (опционально)
    document.getElementById('cartList').innerHTML = '';
});


document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'flex';
});
document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartModal').style.display = 'none';
});