<template>
    <div class="form-group">
        <label>{{info[index].name}}</label>
        <i class="circle"
           :class="validClass"
        ></i>
        <input type="text" class="form-control"
           @input="onInput"
        >
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['index'],
        data(){
            return{
                focusElem: false,
            }
        },
        computed:{
            ...mapGetters([
                'info'
            ]),
            validClass() {
                if (this.focusElem) {
                    return this.info[this.index].pattern.test(this.info[this.index].value) ? "valid" : 'no-valid';
                }
            },
        },
        methods:{
            onInput(e){
                this.focusElem = true;
                this.$emit('emit-pattern', {
                    value: e.target.value,
                    valid: this.info[this.index].pattern.test(e.target.value)
                });
            }
        }
    }
</script>

<style scoped>
</style>