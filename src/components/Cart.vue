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
				return this.products.filter(elem =>{
					return this.cartProducts.indexOf(elem.id_product) != -1
				});
			}
		},
		methods:{
			onOrder(){
				this.$router.push('/checkout');
			}
		}

	}
</script>