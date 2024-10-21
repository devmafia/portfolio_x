<template>
    <div id="app">
        <Header />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Header from './components/Header.vue';

export default defineComponent({
    name: 'App',
    components: {
        Header
    },
    setup() {
        const store = useStore();
        store.dispatch('loadCartFromStorage');
    }
});
</script>
