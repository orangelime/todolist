<template>
  <div class="air-wrapper">
    <div class="light-wrapper">
      <p>空氣品質指標(AQI)</p>
      <div class="light-content">
          <div class="light green">
            <p>良好</p>
          </div>
          <div class="light yellow">
            <p>普通</p>
          </div>
          <div class="light orange">
            <p>小心</p>
          </div>
          <div class="light red">
            <p>不健康</p>
          </div>
          <div class="light purple">
            <p>非常不健康</p>
          </div>
          <div class="light darkred">
            <p>危害</p>
          </div>
      </div>
    </div>
    <div class="aqi-wrapper">
      <!--縣市選擇-->
      <div class="location-wrapper">
        <div class="location-content">
          <select name="" id="location" v-model="selectLocation">
            <option value="" selected="selected">全台資料</option>
            <option :value="item" v-for="(item,index) in filterCity" :key="index">{{item}}</option>
          </select>
        </div>
        <!--縣市站點-->
        <div class="station-wrapper">
          <ul>
            <li class="station-item" :class="statusColor(item.Status)" v-for="(item,index) in filterStation" :key="index" @click="currentAqi(index)">
              <p class="station">{{item.SiteName}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!--空氣汙染指標內容-->
      <div class="quality-wrapper">
        <div class="quality-item" >
          <ul>
              <li class="location" :style="styleobj">
                <span class="name">{{siteName}}</span>
                <span class="number aqinum">AQI:{{AQI}}</span>
              </li>
              <li class="location">
                <span class="title">臭氧</span>
                <span class="text">O3 (ppb)</span>
                <span class="number">{{O3}}</span>
              </li>
              <li class="location">
                <span class="title">懸浮微粒</span>
                <span class="text">PM10 (μg/m³)</span>
                <span class="number">{{PM10}}</span>
              </li>
              <li class="location">
                <span class="title">細懸浮微粒</span>
                <span class="text">PM2.5 (μg/m³)</span>
                <span class="number">{{PM25}}</span>
              </li>
              <li class="location">
                <span class="title">一氧化碳</span>
                <span class="text">CO (ppm)</span>
                <span class="number">{{CO}}</span>
              </li>
              <li class="location">
                <span class="title">二氧化硫</span>
                <span class="text">SO2 (ppb)</span>
                <span class="number">{{SO2}}</span>
              </li>
              <li>
                <span class="title">二氧化氮</span>
                <span class="text">NO2 (ppb)</span>
                <span class="number">{{NO2}}</span>
              </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'MyAQI',
  data(){
    return{
      stationField:[],
      siteName:'',
      country:'',
      AQI:'',
      O3:'',
      PM10:'',
      PM25:'',
      CO:'',
      SO2:'',
      NO2:'',
      cityShow:false,
      styleobj: {
        backgroundColor: "white"
      },
      selectLocation:''
    }
  },
  methods:{
    currentAqi(index){
      let that = this;
      this.$ajax('https://opendata.epa.gov.tw/api/v1/AQI?%24skip=0&%24top=1000&%24format=json')
      .then(function(response){
        console.log(response.data)
        that.stationField = response.data
        that.stationField = that.stationField.reverse()
        that.siteName = that.filterStation[index].SiteName
        that.country = that.filterStation[index].County
        that.AQI = that.filterStation[index].AQI
        that.O3 = that.filterStation[index].O3
        that.PM10 = that.filterStation[index].PM10
        that.PM25 = that.filterStation[index]['PM2.5']
        that.CO = that.filterStation[index].CO
        that.SO2 = that.filterStation[index].SO2
        that.NO2 = that.filterStation[index].NO2
        that.changeBgColor(that.AQI);
      })
      .catch(function(err){
        console.log(err)
      })
    },
    showCity(){
      this.cityShow = true;
    },
    closeSelectCity(){
      this.cityShow = false;
    },
    changeBgColor(AQI) {
      if(this.AQI >= 301){
        this.styleobj.backgroundColor = "#ad1774";
      }else if(this.AQI >= 201){
        this.styleobj.backgroundColor = "#9777ff";
      }else if(this.AQI >= 151){
        this.styleobj.backgroundColor = "#ff5757";
      }else if(this.AQI >= 101){
        this.styleobj.backgroundColor = "#ffaf6a";
      }else if(this.AQI >= 51){
        this.styleobj.backgroundColor = "#ffe695";
      }else{
        this.styleobj.backgroundColor = "#95f084";
      }
    },
    statusColor(status) {
      let className = '';
      switch (status) {
        case '良好':
          return className = 'green'
          break;
        case '普通':
          return className = 'yellow'
          break;
        case '對敏感族群不健康':
          return className = 'orange'
          break;
        case '對所有族群不健康':
          return className = 'red'
          break;
        case '非常不健康':
          return className = 'purple'
          break;
        case '危害':
          return className = 'darkred'
          break;
        default:
          return className
          break;
      }
    }
  },
  computed:{
    filterCity(){
      let cityArray = [];
      for (let i = 0; i < this.stationField.length; i++) {
        cityArray[i] = this.stationField[i].County;//得到每個站點所有的城市
      }
      return cityArray.filter((element, index, arr) => {
        return arr.indexOf(element) === index;//過濾得到不重複的城市
      });
    },
    filterStation(index){
      if(!this.selectLocation){
        return this.stationField
      }else{
        return this.stationField.filter((item) => {
          return item.County === this.selectLocation
        })
      }
    },
  },
  created(){
    this.currentAqi(45);
  }
}
</script>
<style>
@import url("aqi.css");
</style>

