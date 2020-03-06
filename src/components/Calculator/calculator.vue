<template>
  <div class="calculator-wrapper">
    <div class="output">{{result || '0'}}</div>
    <div @click="clear" class="btn">AC</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="percent" class="btn">%</div>
    <div @click="division" class="btn operate">÷</div>
    <div @click="count('7')" class="btn">7</div>
    <div @click="count('8')" class="btn">8</div>
    <div @click="count('9')" class="btn">9</div>
    <div @click="multiplication" class="btn operate">x</div>
    <div @click="count('4')" class="btn">4</div>
    <div @click="count('5')" class="btn">5</div>
    <div @click="count('6')" class="btn">6</div>
    <div @click="subtraction" class="btn operate">-</div>
    <div @click="count('1')" class="btn">1</div>
    <div @click="count('2')" class="btn">2</div>
    <div @click="count('3')" class="btn">3</div>
    <div @click="addition" class="btn operate">+</div>
    <div @click="count('0')" class="btn zero">0</div>
    <div @click="dot" class="btn">.</div>
    <div @click="equals" class="btn operate">=</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      previous:null,
      result:'',
      operate:null,
      operateClicked:false,
    }
  },
  methods:{
    clear(){
      this.result = '';
    },
    sign(){
      if(this.result === 0){
        this.result = '0'
      }else{
        this.result = this.result.charAt(0) === '-' ?
        this.result.slice(1) : `-${this.result}`;
      }
    },
    percent(){
      this.result = `${parseFloat(this.result) / 100}`;
    },
    count(number){
      if(this.operateClicked){
        this.result = '';
        this.operateClicked = false;
      }
      this.result = `${this.result}${number}`
    },
    dot(){
      if(this.result.indexOf('.') === -1){
        this.count('.');
      }
    },
    setPrevious(){
      this.previous = this.result;
      this.operateClicked = true;
    },
    division(){
      this.operate = (a,b) => a / b;
      this.setPrevious();
    },
    multiplication(){
      this.operate = (a,b) => a * b;
      this.setPrevious();
    },
    subtraction(){
      this.operate = (a,b) => a - b;
      this.setPrevious();
    },
    addition(){
      this.operate = (a,b) => a + b;
      this.setPrevious();
    },
    equals(){
      this.result = `${this.operate(parseFloat(this.previous),parseFloat(this.result))}`;
      this.previous = null;
    }

  }
}
</script>
<style>
.calculator-wrapper{
  display: grid;
  grid-auto-rows: min-content(3.125rem,auto);
  grid-template-columns: repeat(4,1fr);
  font-size: 2.5rem;
  text-align: center;
  padding-top: .625rem;
}
.calculator-wrapper > .output{
  grid-column: 1 / 5;
  background: #333;
  color: white;
}
.calculator-wrapper > .zero{
  grid-column: 1 / 3;

}
.calculator-wrapper > .btn{
  background: #f2f2f2;
  border: .0625rem solid #999;
  cursor: pointer;
  transform: scale(0.95);
}
.calculator-wrapper > .operate{
  background: orange;
  color: white;
}
</style>

