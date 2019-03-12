<template>
	<div>
		<h1>Products</h1>
		<div class="row">
			<div class="col col-sm-4"
				v-for="product in products" :key="product.id_product" 
			    >
				<router-link
					:to="'/products/' + product.id_product "
					tag="h3"
				>
				{{product.title}}
				</router-link> 
				
				<div class="price">{{product.price}}</div>
				<br>
				<btn-group
					:product="product"
				></btn-group>

			</div>
		</div>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from "vuex";
	import BtnGroup from './BtnGroup';

	export default {
		components: {
			BtnGroup
  		},
		computed:{
			...mapGetters([
				'products'
			])
		},
	}
</script>

<style scoped>
</style>