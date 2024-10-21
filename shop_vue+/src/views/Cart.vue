<template>
    <div class="container mt-4">
        <div v-if="cartItems.length === 0" class="text-center">
            <p>Your cart is empty</p>
        </div>
        <div v-else class="row">
            <div class="col-md-8">
                <ul class="list-group">
                    <li v-for="item in cartItems" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <img :src="item.image" :alt="item.title" class="img-thumbnail m-3" style="width: 100px;" />
                            <div class="ml-3">
                                <h5>{{ item.title }}</h5>
                                <p>{{ item.description }}</p>
                                <p>${{ item.price }}</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-center justify-content-center">
                            <button style="width: 30px; height: 30px;" class="btn btn-outline-secondary mx-2" @click="handleDecrement(item.id)">-</button>
                            <span>{{ item.quantity }}</span>
                            <button style="width: 30px; height: 30px;" class="btn btn-outline-secondary mx-2" @click="handleIncrement(item)">+</button>
                        </div>
                    </li>
                </ul>
                <div class="mt-3 text-right">
                    <h4>TOTAL: {{ convertedTotal.toFixed(2) }} {{ currency }}</h4>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card p-3">
                    <h5>Order Details</h5>
                    <form class="d-flex flex-column justify-content-center">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" v-model="contact.name" placeholder="Enter your name" />
                        </div>
                        <div class="form-group">
                            <label for="surname">Surname</label>
                            <input type="text" class="form-control" id="surname" v-model="contact.surname" placeholder="Enter your surname" />
                        </div>
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" v-model="contact.address" placeholder="Enter your address" />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="text" class="form-control" id="phone" v-model="contact.phone" placeholder="Enter your phone number" />
                        </div>
                        <div class="form-group">
                            <label for="currency">Currency</label>
                            <select id="currency" class="form-control" v-model="selectedCurrency" @change="handleCurrencyChange">
                                <option value="USD">USD</option>
                                <option value="UAH">UAH</option>
                                <option value="GBP">GBP</option>
                                <option value="JPY">JPY</option>
                            </select>
                        </div>
                        <button type="button" class="btn btn-primary btn-block" @click="handleOrder">Order</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Product, Currency } from '../types/types';

interface Contact {
    name: string;
    surname: string;
    address: string;
    phone: string;
}

export default defineComponent({
    name: 'Cart',
    setup() {
        const store = useStore();
        const contact = ref<Contact>({
            name: "",
            surname: "",
            address: "",
            phone: ""
        });
        
        const selectedCurrency = ref<Currency>(store.getters.currency);
        const cartItems = computed(() => store.getters.cartItems);
        const convertedTotal = computed(() => store.getters.convertedTotal);
        const currency = computed(() => store.getters.currency);

        const handleIncrement = (product: Product) => {
            store.dispatch('addItem', product);
        };

        const handleDecrement = (id: number) => {
            store.dispatch('decrementItem', id);
        };

        const handleCurrencyChange = () => {
            store.dispatch('changeCurrency', selectedCurrency.value);
        };

        const handleOrder = () => {
            const order = {
                items: cartItems.value.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    image: item.image,
                    description: item.description,
                    price: item.price,
                    quantity: item.quantity,
                })),
                total: convertedTotal.value,
                contacts: {
                    name: contact.value.name,
                    surname: contact.value.surname,
                    address: contact.value.address,
                    phone: contact.value.phone,
                },
                currency: currency.value
            };
            console.log('Order Summary:', JSON.stringify(order, null, 2));
        };

        return {
            cartItems,
            convertedTotal,
            currency,
            contact,
            selectedCurrency,
            handleIncrement,
            handleDecrement,
            handleCurrencyChange,
            handleOrder
        };
    }
});
</script>
