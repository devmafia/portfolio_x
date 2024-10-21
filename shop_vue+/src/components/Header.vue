<template>
    <header class="navbar navbar-expand-lg navbar-light container-fluid" style="background-color: grey;">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="$route.path === '/'">
                <span style="padding: 10px;" v-if="convertedTotal > 0">({{ convertedTotal.toFixed(2) }})</span>
                <span class="badge text-bg-success">
                    <router-link to="/cart" class="nav-link p-3">Cart</router-link>
                </span>
            </li>
            <li class="nav-item" v-else-if="$route.path === '/cart'">
                <span style="padding: 10px;" v-if="convertedTotal > 0">({{ convertedTotal.toFixed(2) }})</span>
                <span class="badge text-bg-success">
                    <router-link to="/" class="nav-link p-3">Home</router-link>
                </span>
            </li>
        </ul>
    </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'Header',
    setup() {
        const store = useStore();
        const convertedTotal = computed(() => store.getters.convertedTotal);

        return {
            convertedTotal
        };
    }
});
</script>
