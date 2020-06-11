<template>
<div class="task">
  <Mycalender></Mycalender>
  <!--新增todolist-->
  <form class="task-wrapper">
    <span class="icon-paragraph-left"></span>
    <input type="text" class="addList" autofocus v-model.trim="newList" @keyup.enter="addTodo" placeholder="Add a task..."/>
  </form>
  <!--todolist內容-->
  <ul class="list-wrapper">
    <li v-for="(item,index) in newTodoList" :key="index" :model="item">
      <div class="pushpin-wrapper" v-visible="item.visible">
        <span class="icon-pushpin"></span>
      </div>
      <input type="checkbox" class="checkedList" v-model="item.finished">
      <span class="list-paragraph" :class="{finished: item.finished}">{{item.newList}}</span>
      <!--其他功能-->
      <div class="moreTool">
          <div class="tool-wrapper">
            <a @click="topList(index,item)"><span class="icon-pushpin"></span></a>
            <a @click="editMemo(index,item)"><span class="icon-file-empty"></span></a>
            <a @click="deleteList(index)"><span class="icon-bin"></span></a>
          </div>
      </div><br/>
      <!--memo-->
      <transition name="slide-to-left">
        <div class="memoText" v-if="item.memoShow">
          <input type="text" class="text" autofocus placeholder="Add a memo..."/>
        </div>
      </transition>
      <i class="list-wrapper-line"></i>
    </li>
  </ul>
</div>
</template>
<script>
import Mycalender from '../Calender/calender.vue'
import Vue from 'vue'
import VueVisible from 'vue-visible'
import Store from '../Store/store'

Vue.use(VueVisible);

export default {
  name:'MyTask',
  data(){
    return{
      newList:"",//輸入框的位置，初始值為空
      newTodoList:[],//陣列
      newListLength:0,//list長度,
    }
  },
  components:{
    Mycalender,
  },
  mounted () {
    this.initTodo()
  },
  methods:{
    addTodo(){
      let listObj = {
        newList:this.newList,
        done:false,
        memoShow:false,
      }
      let tempList = Store.getItem('newTodoList')
      if (tempList) {
        tempList.push(listObj)
        Store.setItem('newTodoList', tempList)
      } else {
        let tempData = []
        tempData.push(listObj)
        Store.setItem('newTodoList', tempData)
      }
      this.newTodoList.push(listObj)
      this.newListLength++
      this.newList = ''//輸入後清空
    },
    topList(index,item){
      //在上一項插入該項
      this.newTodoList.splice(index-index,0,(this.newTodoList[index]))
      //刪除後一項
      this.newTodoList.splice(index+1,1)
      item.visible = !item.visible
      Store.setItem('newTodoList', this.newTodoList)
    },
    editMemo(index,item){
      item.memoShow = !item.memoShow
      Store.setItem('newTodoList', this.newTodoList)
    },
    deleteList(index,done){
      if(done){
        this.newListLength--
      }
      this.newTodoList.splice(index,1);
      Store.setItem('newTodoList', this.newTodoList)
    },
    initTodo () {
      let todoArr = Store.getItem('newTodoList')
      if (todoArr) {
        for (let i = 0, len = todoArr.length; i < len; i++) {
          if (todoArr[i].done === false) {
            this.newListLength++
          }
        }
        this.newTodoList = todoArr
      }
    },
  }
}
</script>
<style>
/*新增todolist*/
.task{
  height: 50px;
  position: relative;
}
.task .task-wrapper{
  width: 100%;
  height: 35px;
  padding: 0 25px;
  box-sizing: border-box;
}
.task .task-wrapper .icon-paragraph-left{
  width: 28px;
  height: 31px;
  background-size: 13px 13px;
  position:absolute;
  padding:7px 0 0 10px;
}
.task .task-wrapper .addList{
  width: 100%;
  height: 31px;
  border: 1px solid rgb(60,65,73);
  box-sizing: border-box;
  background: #cdcdcc;
  border-radius: 5px;
  padding:1px 0 0 35px;
  font-size: 16px;
  outline: none;
}
/*todolist*/
.task .list-wrapper{
  width: 100%;
  padding: 0;
  position: relative;
}
.task .list-wrapper li{
  list-style: none;
}
.task .list-wrapper li .pushpin-wrapper{
  /*visibility: hidden;*/
  float: left;
  margin-top: 4px;
  color: rgb(240,98,146);
}
.task .list-wrapper li .checkedList{
  width:14px;
  height:14px;
  float: left;
  margin-top: 8px;
  margin-left: 9px;
  cursor:pointer;
}
.task .list-wrapper li .list-paragraph{
  display: inline-block;
  font-size: 18px;
  line-height: 30px;
  padding-left: 2px;
}
.task .list-wrapper .moreList{
  float: right;
  width: 20px;
  height: 20px;
  margin: 16px 23px 0 18px;
  cursor: pointer;
}
.task .list-wrapper .moreList .moreCircle{
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: 1px solid rgb(60,65,73);
  display: block;
  float: left;
  margin-right: 1px;
}
.task .list-wrapper li .memo-paragraph{
  display: inline-block;
  font-size: 10px;
  line-height: 15px;
  margin-left: 45px;
}
.task .list-wrapper li .list-wrapper-line{
  width: 90%;
  height: 1px;
  display: inline-block;
  background: rgb(60,65,73);
  /*居中*/
  position: relative;
  left: 6%;
  bottom: 0;
}
.task .list-wrapper li .moreTool{
  position: relative;
  cursor: pointer;
}
.task .list-wrapper li .moreTool .tool-wrapper{
  position: absolute;
  right: 5%;
  bottom: 10%;
}
.finished{
  text-decoration: line-through;
}
.memoText{
  margin-left: 45px;
  height: 28px;
}
.memoText .text{
  border: 0;
  border-bottom: 1px solid #cdcdcc;
  outline: none;
}
</style>


