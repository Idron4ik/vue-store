<template>
	<div>
		<h1> <slot>Cart</slot></h1>
		<hr>
		<div
			v-if="emptyCart"
			class="alert alert-warning">
			Your cart is empty
		</div>
		<template v-else>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>Title</th>
						<th>Price </th>
					</tr>
				</thead>	
				<tbody>
					<tr v-for="item in containsCart" :key="item.id_product">
						<td>{{item.title}}</td>
						<td>{{item.price}}</td>
					</tr>
				</tbody>	
			</table>
			<button class="btn btn-success"
				@click="onOrder"	
			>
				Order Now
			</button>
			
		</template>
	</div>
</template>

<script>
	import { mapMutations, mapGetters } from "vuex";

	export default {
		computed:{
			...mapGetters([
				'products',
				'cartProducts',
				'lengthCart'
			]),
			emptyCart(){
				return this.lengthCart == 0;
			},
			containsCart(){
				var productsInCart = [];

				for(let i=0; i<this.cartProducts.length; i++){
					let item = this.cartProducts[i];
					productsInCart.push(this.products[item]);
				}
				return productsInCart;
			}
		},
		methods:{
			onOrder(){
				this.$router.push('/checkout');
			}
		}
	}
</script>