<template>
    <div class="container mt-5">
        <ProductList :products="products" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ProductList from '../components/ProductList.vue';
import { Product } from '../types/types';

export default defineComponent({
    name: 'Home',
    components: {
        ProductList
    },
    setup() {
        const products = ref<Product[]>([]);

        const fetchListOfProducts = async () => {
            const res = await fetch('https://fakestoreapi.com/products');
            const data = await res.json();
            if (data) {
                products.value = data;
            }
        };

        onMounted(() => {
            fetchListOfProducts();
        });

        return {
            products
        };
    }
});
</script>
