<template>
<div class="header">
  <div class="calender-wrapper">
    <!--日期往前-->
    <div class="arrow-wrapper back-wrapper" @click="beforeDate">
      <span class="icon-arrow"></span>
    </div>
    <!--日期-->
    <div class="date-wrapper">
      <div class="weekly-wrapper">
        {{date | formatWeek}}
      </div>
      <div class="daily-wrapper">
        {{date | formatDate}}
      </div>
    </div>
    <!--日期往後-->
    <div class="arrow-wrapper next-wrapper" @click="afterDate">
      <span class="icon-arrow icon-arrow-right"></span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      date:new Date(),
    }
  },
  methods:{
    beforeDate(){
      /*無法改變星期，在formatWeek傳遞value值即可*/
      this.date = new Date(this.date.setDate(this.date.getDate() - 1));
    },
    afterDate(){
      this.date = new Date(this.date.setDate(this.date.getDate() + 1));
    }
  },
  filters:{
    formatDate(value){
      let padDate = function(value){
        return value < 10 ? '0' + value : value;
      }
      let date = new Date(value);
      let year = date.getFullYear();
      let month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Seb','Oct','Nov','Dec'];
      let day = padDate(date.getDate());
      return month[date.getMonth()] + ' ' + day + ',' + year;
    },
    formatWeek(value){
      let date = new Date(value);
      let week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      return week[date.getDay()];
    }
  },
}
</script>
<style>
@import url("../../common/styles/iconMoon.css");
.header{
  height: 100px;
  padding-top: 25px;
}
.header .calender-wrapper{
  position: relative;
}
.header .calender-wrapper .arrow-wrapper{
  width: 50px;
  height: 31px;
  position: absolute;
  top: 20px;
  text-align: center;
  line-height: 40px;
}
.header .calender-wrapper .back-wrapper{
  left:25px;
}
.header .calender-wrapper .next-wrapper{
  right:25px;
}
.header .calender-wrapper .arrow-wrapper .icon-arrow{
  display: inline-block;
  width: 26px;
  height: 26px;
  font-size: 26px;
  position: relative;
  color: rgb(104,110,119);
  background: url(arrow_lift.svg);
}
.header .calender-wrapper .arrow-wrapper .icon-arrow-right{
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.header .calender-wrapper .date-wrapper{
  width: 100%;
  height: 31px;
  text-align: center;
  box-sizing: border-box;
}
.header .calender-wrapper .date-wrapper .weekly-wrapper{
  color: rgb(218,227,235);
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 2.5rem;
}
.header .calender-wrapper .date-wrapper .daily-wrapper{
  color: rgb(104,110,119);
  font-weight: bold;
  line-height: 1.25rem;
}

</style>


