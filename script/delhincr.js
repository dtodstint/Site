
// DOM Elements with error checking
const getElement = (selector) => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element not found: ${selector}`);
    return element;
};

const cartBtn = getElement(".cart-btn");
const closeCartBtn = getElement(".close-cart");
const clearCartBtn = getElement(".clear-cart");
const cartDOM = getElement(".cart");
const cartOverlay = getElement(".cart-overlay");
const cartItems = getElement(".cart-items");
const cartTotal = getElement(".cart-total");
const cartContent = getElement(".cart-content");
const servicesContainer = getElement(".services-container");

class Cart {
    constructor() {
        this.items = this.validateCartItems(Storage.getCart());
        this.buttonsDOM = [];
    }

    validateCartItems(items) {
        if (!Array.isArray(items)) return [];
        return items.filter(item => (
            item && 
            typeof item === 'object' &&
            typeof item.id === 'string' &&
            typeof item.title === 'string' &&
            typeof item.price === 'number' &&
            !isNaN(item.price) &&
            typeof item.amount === 'number' &&
            !isNaN(item.amount) &&
            item.image
        ));
    }

    addItem(service) {
        const id = service.dataset.id;
        const inCart = this.items.find(item => item.id === id);
        if (!inCart) {
            const item = {
                id,
                title: service.querySelector('h3').textContent,
                price: parseFloat(service.querySelector('.price-button').textContent.match(/\d+/)[0]),
                image: service.querySelector('img').src,
                amount: 1
            };
            this.items.push(item);
            this.updateButtonState(id, true);
            this.save();
        }
    }

    updateButtonState(id, inCart) {
        const button = document.querySelector(`.bag-btn[data-id="${id}"]`);
        if (button) {
            button.innerHTML = inCart ? "In Cart" : '<i class="fas fa-shopping-cart"></i>add to cart';
            button.disabled = inCart;
        }
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.updateButtonState(id, false);
        this.save();
    }

    updateAmount(id, amount) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.amount = Math.max(0, amount);
            if (item.amount === 0) this.removeItem(id);
            else this.save();
        }
    }

    clear() {
        this.items.forEach(item => this.updateButtonState(item.id, false));
        this.items = [];
        this.save();
    }

    save() {
        Storage.saveCart(this.items);
    }

    getTotal() {
        return {
            price: this.items.reduce((total, item) => total + item.price * item.amount, 0),
            items: this.items.reduce((total, item) => total + item.amount, 0)
        };
    }
}

class Storage {
    static saveCart(cart) {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart:', error);
        }
    }

    static getCart() {
        try {
            return JSON.parse(localStorage.getItem('cart')) || [];
        } catch (error) {
            console.error('Failed to get cart:', error);
            return [];
        }
    }
}

class UI {
    constructor() {
        this.cart = new Cart();
        this.setupEventListeners();
        this.setupAddToCartButtons();
        this.updateCartUI();
    }

    setupEventListeners() {
        cartBtn.addEventListener('click', () => this.showCart());
        closeCartBtn.addEventListener('click', () => this.hideCart());
        cartOverlay.addEventListener('click', e => {
            if (e.target === cartOverlay) this.hideCart();
        });
        clearCartBtn.addEventListener('click', () => this.clearCart());
        cartContent.addEventListener('click', e => this.handleCartActions(e));

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.hideCart();
        });
    }

    setupAddToCartButtons() {
        const buttons = [...document.querySelectorAll(".bag-btn")];
        buttons.forEach(button => {
            const id = button.dataset.id;
            const inCart = this.cart.items.some(item => item.id === id);
            
            if (inCart) {
                button.innerText = "In Cart";
                button.disabled = true;
            }

            button.addEventListener('click', () => {
                const service = button.closest('.service');
                if (service) {
                    this.cart.addItem(service);
                    this.updateCartUI();
                    this.showCart();
                }
            });
        });
    }

    updateCartUI() {
        const { price, items } = this.cart.getTotal();
        cartTotal.innerText = price.toFixed(2);
        cartItems.innerText = items;
        this.displayCartItems();
    }

    displayCartItems() {
        cartContent.innerHTML = this.cart.items.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h4>${item.title}</h4>
                    <h5>₹${item.price}</h5>
                    <span class="remove-item" data-id="${item.id}">remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id="${item.id}"></i>
                </div>
            </div>
        `).join('');
    }

    handleCartActions(event) {
        const target = event.target;
        const id = target.dataset.id;
        if (!id) return;

        if (target.classList.contains('remove-item')) {
            this.cart.removeItem(id);
        } else if (target.classList.contains('fa-chevron-up')) {
            const item = this.cart.items.find(item => item.id === id);
            if (item) this.cart.updateAmount(id, item.amount + 1);
        } else if (target.classList.contains('fa-chevron-down')) {
            const item = this.cart.items.find(item => item.id === id);
            if (item) this.cart.updateAmount(id, item.amount - 1);
        }
        this.updateCartUI();
    }

    clearCart() {
        this.cart.clear();
        this.updateCartUI();
        this.hideCart();
    }

    showCart() {
        cartOverlay.classList.add('show-cart');
        cartDOM.classList.add('showCart');
    }

    hideCart() {
        cartOverlay.classList.remove('show-cart');
        cartDOM.classList.remove('showCart');
    }
}

document.addEventListener('DOMContentLoaded', () => new UI());