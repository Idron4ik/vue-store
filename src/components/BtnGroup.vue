<template>
    <div class="btn-group"> 
        <button 
            class="btn btn-primary"
            @click="addToCart(product.id_product)"
            v-if="cartProducts.indexOf(product.id_product) == -1"
        >
            Add to cart
        </button>
        <button v-else
            class="btn btn-warning"
            @click="removeToCart(product.id_product)"
        >
            Remove to cart
        </button>
    </div>
</template>

<script>
	import { mapMutations, mapGetters } from "vuex";

    export default {
        props: [
            'product'
        ],
        computed:{
			...mapGetters([
				'products','cartProducts'
			]),
		},
        methods:{
			...mapMutations([
				'addToCart',
				'removeToCart'
            ]),
            
		}
    }
</script>

<style scoped>

</style>