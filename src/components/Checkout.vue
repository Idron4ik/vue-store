<template>
  <div class="checkout" :class="loadingForm">
    <h1>Order now</h1>
    <hr>

    <div class="checkout-step">
      <form v-if="formSubmit" @submit.prevent>
        <div class="progress">
          <div class="progress-bar" :style="widthStatusBar"></div>
        </div>
        <app-field
          v-for="(item,i) in info"
          :key="i"
          :index="i"
          @emit-pattern="onEmitPattern(i, $event)"
        ></app-field>

        <div class="minicart" v-if="btnDisable">
          <h3>Your order:</h3>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in containsCart" :key="item.id_product">
                <td>{{item.title}}</td>
                <td>{{item.price}}</td>
              </tr>
              <tr>
                <td>
                  <b>Total</b>
                </td>
                <td>
                  <b>{{totalOrder}}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="btn btn-primary btn-checkout"
          :disabled="!btnDisable"
          @click="orderNow"
        >Send Data</button>
      </form>
      <div v-else class="thanks">
        <h3>Dear {{info[0].value}}, Thank for Order! :)</h3>
      </div>

      <div id="loader-wrapper">
        <div id="loader"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import AppField from "./AppField";

export default {
  components: {
    AppField
  },
  data() {
    return {
      statusBar: [],
      countStatusBar: 0
    };
  },
  computed: {
    widthStatusBar() {
      return "width:" + this.countStatusBar * (100 / this.info.length) + "%";
    },
    btnDisable() {
      return this.countStatusBar === this.info.length ? true : false;
    },
    ...mapGetters([
      "info",
      "formSubmit",
      "products",
      "cartProducts",
	  "totalOrder",
	  "loadingForm"
    ]),
    containsCart() {
      return this.products.filter(elem => {
        return this.cartProducts.indexOf(elem.id_product) != -1;
      });
    }
  },
  methods: {
    ...mapMutations(["updateValue"]),
    onEmitPattern(i, data) {
      this.$store.commit("updateValue", { i, data });
      this.$set(this.statusBar, i, data.valid);

      this.countStatusBar = 0;

      for (let i = 0; i < this.statusBar.length; i++) {
        if (this.statusBar[i]) {
          this.countStatusBar++;
        }
      }
    },
    orderNow() {
      this.$store.dispatch("sendData");
    }
  },
  created() {
    for (var item in this.info) {
      this.statusBar.push(false);
    }
  }
};
</script>

<style>
.checkout.loading {
  position: relative;
  overflow: hidden;
}

.checkout.loading:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.54);
}
.checkout-step {
  margin: 0 auto;
  padding-right: 40px;
}
.checkout #loader-wrapper{
	display: none;
}
.checkout.loading #loader-wrapper{
	display: block;
}
.btn-checkout {
  float: right;
}
#app {
  max-width: 80%;
  width: 100%;
  margin: 40px auto;
}
.circle {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
}

.circle.valid {
  background-color: green;
}

.circle.no-valid {
  background-color: red;
}

/*----preloader---*/
/* The Loader */
#loader-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  width: 100%;
  height: 100%;
  z-index: 1000;
  overflow: hidden;
}
#loader {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #f26a21;
  -webkit-animation: spin 1.8s linear infinite;
  animation: spin 1.8s linear infinite;
  z-index: 11;
  opacity: 0;
  display: none;
}
#loader:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #80c240;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}
#loader:after {
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #1aa8e2;
  -webkit-animation: spin 2.5s linear infinite;
  animation: spin 2.5s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes spin-reverse {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}
@keyframes spin-reverse {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
#loader-wrapper .loader-section {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 10;
}
.loading #loader {
  opacity: 1;
  display: block;
  transition: all 0.1s ease-in-out;
}
.loaded #loader-wrapper {
  visibility: hidden;
  transition: all 0.2s ease-in-out;
}
/*---end-preloader---*/
</style>
