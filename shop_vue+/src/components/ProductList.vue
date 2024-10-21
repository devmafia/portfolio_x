<template>
    <div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="(product, index) in products.slice(0, 9)" :key="index">
                <div class="card h-100">
                    <img 
                        :src="product.image" 
                        class="card-img-top" 
                        :alt="product.title"
                        style="width: 200px; height: 200px; margin: 0 auto;"
                    />
                    <div class="card-body">
                        <h5 class="card-title">{{ product.title }}</h5>
                        <p class="card-text">{{ product.description }}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary w-100" @click="handleAddToCart(product)">Add to the cart</button>
                        <p>{{ product.price }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { Product } from '../types/types';

export default defineComponent({
    name: 'ProductList',
    props: {
        products: {
            type: Array as PropType<Product[]>,
            required: true
        }
    },
    setup() {
        const store = useStore();

        const handleAddToCart = (product: Product) => {
            store.dispatch('addItem', product);
        };

        return {
            handleAddToCart
        };
    }
});
</script>
