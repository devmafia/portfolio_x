import { createStore } from 'vuex';
import { Product, CartState, Currency } from '../types/types';

const exchangeRates: Record<Currency, number> = {
    USD: 1,
    UAH: 41.18,
    GBP: 0.76,
    JPY: 147.92,
};

const calculateConvertedTotal = (totalPrice: number, currency: Currency): number => {
    return parseFloat((totalPrice * exchangeRates[currency]).toFixed(2));
};

const saveCartToLocalStorage = (state: CartState): void => {
    localStorage.setItem('cart', JSON.stringify(state.items));
    localStorage.setItem('totalPrice', state.totalPrice.toString());
    localStorage.setItem('currency', state.currency);
    localStorage.setItem('convertedTotal', state.convertedTotal.toString());
};

export default createStore({
    state: {
        cart: {
            items: [],
            totalPrice: 0,
            currency: "USD" as Currency,
            convertedTotal: 0
        } as CartState
    },
    mutations: {
        addItem(state, product: Product) {
            const item = state.cart.items.find(item => item.id === product.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cart.items.push({ ...product, quantity: 1 });
            }
            state.cart.totalPrice += product.price;
            state.cart.convertedTotal = calculateConvertedTotal(state.cart.totalPrice, state.cart.currency as Currency);
            saveCartToLocalStorage(state.cart);
        },  
        decrementItem(state, id: number) {
            const item = state.cart.items.find(product => product.id === id);
            if (item) {
                item.quantity -= 1;
                state.cart.totalPrice -= item.price;
                if (item.quantity === 0) {
                    state.cart.items = state.cart.items.filter(product => product.id !== id);
                }
            }
            state.cart.convertedTotal = calculateConvertedTotal(state.cart.totalPrice, state.cart.currency as Currency);
            saveCartToLocalStorage(state.cart);
        },
        changeCurrency(state, currency: Currency) {
            state.cart.currency = currency;
            state.cart.convertedTotal = calculateConvertedTotal(state.cart.totalPrice, state.cart.currency as Currency);
            saveCartToLocalStorage(state.cart);
        },
        loadCartFromStorage(state, payload: CartState) {
            state.cart = {
                items: payload.items || [],
                totalPrice: payload.totalPrice || 0,
                currency: payload.currency || "USD",
                convertedTotal: calculateConvertedTotal(payload.totalPrice, payload.currency as Currency)
            };
        }
    },
    actions: {
        addItem({ commit }, product: Product) {
            commit('addItem', product);
        },
        decrementItem({ commit }, id: number) {
            commit('decrementItem', id);
        },
        changeCurrency({ commit }, currency: Currency) {
            commit('changeCurrency', currency);
        },
        loadCartFromStorage({ commit }) {
            const savedCart = localStorage.getItem('cart');
            const totalPrice = localStorage.getItem("totalPrice");
            const currency = localStorage.getItem('currency');
            const convertedTotal = localStorage.getItem("convertedTotal");
            if (savedCart && totalPrice && currency && convertedTotal) {
                const payload = {
                    items: JSON.parse(savedCart) || [],
                    totalPrice: JSON.parse(totalPrice) || 0,
                    currency: currency as Currency || "USD",
                    convertedTotal: JSON.parse(convertedTotal) || 0,
                };
                commit('loadCartFromStorage', payload);
            }
        }
    },
    getters: {
        cartItems: (state): Product[] => state.cart.items,
        totalPrice: (state): number => state.cart.totalPrice,
        currency: (state): Currency => state.cart.currency as Currency,
        convertedTotal: (state): number => state.cart.convertedTotal
    }
});
