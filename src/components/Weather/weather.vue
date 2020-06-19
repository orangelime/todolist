<template>
  <div class="weather-wrapper">
    <!--搜尋城市-->
    <div class="search-wrapper" >
      <span class="icon-paragraph-left" @click="selectLocations" v-clickoutside="closeLocations"></span>
      <form class="city-search-wrapper" >
        <span class="icon-search"></span>
        <input type="text" class="city-search"  autofocus placeholder="臺南市" v-model.trim="city">
      </form>
    </div>
    <!--地址選擇-->
    <transition name="slide-to-left">
      <div class="select-location" v-if="locationShow">
        <div class="select-item">
          <div class="item" v-for="(item,index) in weatherFields" :key="index">
              <a @click="onLocationClick(index)">{{item.locationName}}</a>
          </div>
        </div>
      </div>
    </transition>
    <!--現在天氣-->
    <div class="weather-view">
      <div class="weather-content">
        <p class="temperature">{{temperature}}°C</p>
        <p class="apparent-temperature">{{lowTempFields[0]['elementValue'][0]['value']}}°C / {{highTempFields[0]['elementValue'][0]['value']}}°C</p>
        <p class="weather-phenomenon">{{descriptionFields[0]['elementValue'][0]['value']}}</p>
      </div>
      <div class="weather-content">
        <p class="weather-icon">
          <img :src="'static/weatherIcons/' + `${descriptionFields[0]['elementValue'][1]['value']}` + `${forecastData[0]['icons']}`+ '.svg'" alt=""/>
        </p>
        <p class="rain">降雨：{{rainFields[0]['elementValue'][0]['value']}}%</p>
        <p class="ultraviolet-index">紫外線指數:{{uviFields[0]['elementValue'][0]['value']}}</p>
      </div>
    </div>
    <!--今明預報-->
    <div class="forecast">
      <div class="weather-dec">
        <marquee direction="right" height="30" scrollamount="5" behavior="alternate">{{weatherDesFidelds[0]['elementValue'][0]['value']}}</marquee>
      </div>
      <table class="forecast-table">
        <thead>
          <tr>
            <th>今明預報</th>
            <th>溫度</th>
            <th>天氣狀況</th>
            <th>紫外線<br/>指數</th>
            <th>降雨機率</th>
          </tr>
        </thead>
        <tbody>
              <tr v-for="(item,i) in forecastData" :key="item.elementValue">
                <td class="detail">{{item.list}}<br/>
                  <span class="time">{{item.time}}</span>
                </td>
                <td class="detail">
                  {{lowTempFields[i]['elementValue'][0]['value']}}°C-{{highTempFields[i]['elementValue'][0]['value']}}°C
                </td>
                <td>
                  <img class="icon" :src="'static/weatherIcons/' + `${descriptionFields[i]['elementValue'][1]['value']}` + item.icons + '.svg'" alt=""/>
                  <br/><span class="time">{{descriptionFields[i]['elementValue'][0]['value']}}</span>
                </td>
                <td class="detail">
                  {{uviFields[i]['elementValue'][0]['value']}}<br/>
                  {{uviFields[i]['elementValue'][1]['value']}}
                </td>
                <td class="detail">
                  {{rainFields[i]['elementValue'][0]['value']}}%
                </td>
              </tr>
        </tbody>
      </table>
    </div>
    <!--一周預報-->
    <div class="forcast-week">
      <table class="week-table">
        <thead>
          <tr>
            <th>一周<br/>預報</th>
            <th v-for="(item,index) in dateFields" :key="index" >{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>白天</td>
            <td class="temp" v-for="(item,i) in filterDayIconsFields" :key="'C'+ i">
              <span>
                <img class="icons" :src="'static/weatherIcons/' + item.elementValue[1].value + '.svg'" alt=""/>
              </span><br/>
              {{filterDayLowTempFields[i]['elementValue'][0]['value']}}-{{filterDayHighTempFields[i]['elementValue'][0]['value']}}
            </td>
          </tr>
          <tr>
            <td>晚上</td>
            <td class="temp" v-for="(item,i) in filterNightIconsFields" :key="'A'+ i">
              <span>
                <img class="icons" :src="'static/weatherIcons/' + item.elementValue[1].value + 'night' +'.svg'" alt=""/>
              </span><br/>
              {{filterNightLowTempFields[i]['elementValue'][0]['value']}}-{{filterNightHighTempFields[i]['elementValue'][0]['value']}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
const hour = new Date().getHours();
const min = new Date().getMinutes();
const sec = new Date().getSeconds();

export default {
  name:'MyWeather',
  data(){
    return{
      weatherFields:[],
      locationShow:false,
      temperature:'',
      city:'',
      rainFields:[],
      descriptionFields:[],
      lowTempFields:[],
      weatherDesFidelds:[],
      uviFields:[],
      highTempFields:[],
      dateFields:[],
      now:new Date(),
      forecast: [
      { list: '昨晚今晨',time:'00:00-06:00',icons:'night'},
      { list: '今日白天',time:'06:00-18:00',icons:''},
      { list: '今晚明晨',time:'18:00-06:00',icons:'night'},
      { list: '明日白天',time:'06:00-18:00',icons:''},
      { list: '明日晚上',time:'18:00-06:00',icons:'night'},
      ],
    }
  },
  /*點選地址選擇框其他部分關閉地址選擇*/
  directives:{
    clickoutside:{
      bind(el,binding,vnode){
        function documentHandler(e){
          if(el.contains(e.target)){
              return false;
          }
          if(binding.expression){
              binding.value(e)
          }
        }
        el._vueClickOutside_ = documentHandler;
        document.addEventListener('click',documentHandler);
      },
      unbind(el,binding){
        document.removeEventListener('click',el._vueClickOutside_);
        delete el._vueClickOutside_;
      }
    }
  },
  methods:{
    currentWeather(index){
      let that = this;
      //const city = '臺北市,高雄市,新北市,臺中市,臺南市,桃園市,基隆市,桃園市,新竹市,新竹縣,苗栗縣,彰化縣,南投縣,雲林縣,嘉義市,嘉義縣,屏東縣,宜蘭縣,花蓮縣,臺東縣,連江縣,金門縣,澎湖縣'
      this.$ajax(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=CWB-B9A4A687-6DDE-4B59-8D4E-48A3CDE6792C&format=JSON&locationName=%E8%87%BA%E5%8C%97%E5%B8%82,%E9%AB%98%E9%9B%84%E5%B8%82,%E6%96%B0%E5%8C%97%E5%B8%82,%E8%87%BA%E4%B8%AD%E5%B8%82,%E8%87%BA%E5%8D%97%E5%B8%82,%E6%A1%83%E5%9C%92%E5%B8%82,%E5%9F%BA%E9%9A%86%E5%B8%82,%E6%A1%83%E5%9C%92%E5%B8%82,%E6%96%B0%E7%AB%B9%E5%B8%82,%E6%96%B0%E7%AB%B9%E7%B8%A3,%E8%8B%97%E6%A0%97%E7%B8%A3,%E5%BD%B0%E5%8C%96%E7%B8%A3,%E5%8D%97%E6%8A%95%E7%B8%A3,%E9%9B%B2%E6%9E%97%E7%B8%A3,%E5%98%89%E7%BE%A9%E5%B8%82,%E5%98%89%E7%BE%A9%E7%B8%A3,%E5%B1%8F%E6%9D%B1%E7%B8%A3,%E5%AE%9C%E8%98%AD%E7%B8%A3,%E8%8A%B1%E8%93%AE%E7%B8%A3,%E8%87%BA%E6%9D%B1%E7%B8%A3,%E9%80%A3%E6%B1%9F%E7%B8%A3,%E9%87%91%E9%96%80%E7%B8%A3,%E6%BE%8E%E6%B9%96%E7%B8%A3`)
      .then(function(response){
        //console.log(response.data)
        let cities = response.data.records.locations[0].location
        //console.log(cities)
        cities = cities.sort(function(a,b){
          return a.geocode < b.geocode? 1 : -1;
        })
        that.weatherFields =  cities
        //console.log(that.weatherFields)
        that.city = that.weatherFields[index].locationName
        //console.log(this.city)
        that.temperature = that.weatherFields[index].weatherElement[1].time[0].elementValue[0].value
        //預報 降雨機率
        that.rainFields = that.weatherFields[index].weatherElement[0].time
        //天氣狀況
        that.descriptionFields = that.weatherFields[index].weatherElement[6].time
        //最低溫
        that.lowTempFields = that.weatherFields[index].weatherElement[8].time
        //天氣狀況描述
        that.weatherDesFidelds = that.weatherFields[index].weatherElement[10].time
        //最高溫
        that.highTempFields = that.weatherFields[index].weatherElement[12].time
        //紫外線指數
        that.uviFields = that.weatherFields[index].weatherElement[9].time
      })
      .catch(function(err){
        console.log(err)
      })
    },
    closeLocations(){
      this.locationShow = false
    },
    selectLocations(){
      this.locationShow = true
    },
    onLocationClick(index){
      this.currentWeather(index)
    },
    //獲取當前日期
    nowDay(date){
      let now = new Date();
      let interval = now.getTime() + 1000*60*60*24*date
      now.setTime(interval);
      Date.prototype.addDays = function(days) {
          this.setDate(this.getDate() + days);
          return this.getDate();
      }
      let month = now.getMonth() + 1 < 10 ? '0' +  (now.getMonth() + 1) : now.getMonth() + 1;
      if((hour >= 0 && min >= 0) && (hour <=17 && min >= 0)){
        let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
        let week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][now.getDay()];
        return `${month}/${day}\n${week}`;
      }else{
        let day = (now.addDays(1) < 10 ? '0'  : '') + now.addDays(0);
        let week = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][now.getDay()];
        /*return month + '/' + day +' \n '+ week;*/
        return `${month}/${day}\n${week}`;
      }

    },
  },
  computed:{
    forecastData(){
      let arr = [];
      if((hour >= 0 && min >= 0) && (hour <=5 && min >= 0)){ //0-6之凌晨預報
        return this.forecast.slice(0,3)
      }else if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){ //6-18之白天預報
        return this.forecast.slice(1,4)
      }else { //18-6之晚上預報
        return this.forecast.slice(2,5)
      }
    },
    filterDayLowTempFields(){
      if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){ //6-18之白天低溫 正確
        return this.lowTempFields.slice(0,14).filter((item,index,array) => {
          return index % 2 == 0;
        })
      }else {
        return this.lowTempFields.filter((item,index,array) => { //18-6之白天低溫
          return index % 2 !== 0;
        })
      }
    },
    filterNightLowTempFields(){
      if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){
        return this.lowTempFields.filter((item,index,array) => { //6-18之晚上低溫 正確
          return index % 2 !== 0;
        })
      }else {
        return this.lowTempFields.slice(2).filter((item,index,array) => { //18-6之晚上低溫
          return index % 2 == 0;
        })
      }
    },
    filterDayHighTempFields(){
      if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){
        return this.highTempFields.slice(0,14).filter((item,index,array) => { //6-18之白天高溫 正確
          return index % 2 == 0;
        })
      }else{
        return this.highTempFields.filter((item,index,array) => { //18-6之白天高溫
          return index % 2 !== 0;
        })
      }
    },
    filterNightHighTempFields(){
      if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){
        return this.highTempFields.filter((item,index,array) => { //6-18之晚上高溫 正確
          return index % 2 !== 0;
        })
      }else{
        return this.highTempFields.slice(2).filter((item,index,array) => { //18-6之晚上高溫
          return index % 2 == 0;
        })
      }
    },
    filterDayIconsFields(){
      if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){
        return this.descriptionFields.slice(0,14).filter((item,index,array) => { //6-18
          return index % 2 == 0;
        })
      }else{
        return this.descriptionFields.filter((item,index,array) => { //18-6
          return index % 2 !== 0;
        })
      }
    },
    filterNightIconsFields(){
      if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){
        return this.descriptionFields.filter((item,index,array) => { //6-18
          return index % 2 !== 0;
        })
      }else{
        return this.descriptionFields.slice(2).filter((item,index,array) => { //18-6
          return index % 2 == 0;
        })
      }
    },
    nightIcon(){
      let ary = ['night'];
      if((hour >= 6 && min >= 0) && (hour <=17 && min >= 0)){
        return false
      }else{
        return ary.toString();
      }
    }
  },
  created(){
    this.currentWeather(1);
    for(let i=0;i<7;i++){
      this.dateFields.push(this.nowDay(i))
    }
  }
}
</script>
<style>
@import url("../../common/styles/iconMoon.css");
@import url("weather.css");
</style>

