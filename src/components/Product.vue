<template>
	<div>
		<hr>
		<div class="alert alert-success"></div>
		<h2>{{products[id].title}}</h2>
		<strong>{{products[id].price}}</strong>
		<br>
		<br>
		<btn-group
			:product="products[id]"
		></btn-group>
	</div>
</template>

<script>
	import {mapMutations, mapGetters } from "vuex";
	import BtnGroup from './BtnGroup';

	export default {
		components: {
			BtnGroup
  		},
		computed:{
			...mapGetters([
				'products',
			]),
			id(){
				return this.$route.params.id;
			},
		},
		methods:{
			...mapMutations([
				'addToCart',
			]),
		}
	}
</script>