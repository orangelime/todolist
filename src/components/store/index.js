import Vue from 'vue'
import Vuex from 'vuex'
import Keep from '../Keep/keep'


Vue.use(Vuex)


const types = {
  ADD_TODO: 'ADD_TODO',
  TOP_LIST: 'TOP_LIST',
  EDIT_MEMO:'EDIT_MEMO',
  DELETE_LIST: 'DELETE_LIST',
  INIT_TODO:'INIT_TODO'
}

const state = {
  newList:"",//輸入框的位置，初始值為空
  newTodoList:[],//陣列
  newListLength:0,
};

const getters = {
  getTodos: state => {
    return state.newTodoList;
  },
};

const mutations = {
  [types.ADD_TODO](state,newList){
    let listObj = {
      newList:newList,
      done:false,
      memoShow:false,
    }
    let tempList = Keep.getItem('newTodoList')
    if (tempList) {
      tempList.push(listObj)
      Keep.setItem('newTodoList', tempList)
    } else {
      let tempData = []
      tempData.push(listObj)
      Keep.setItem('newTodoList', tempData)
    }
    state.newTodoList.push(listObj)
    state.newListLength++
  },
  [types.TOP_LIST](state,index){
    state.newTodoList.splice(index-index,0,(state.newTodoList[index]))
      //刪除後一項
    state.newTodoList.splice(index+1,1)
    state.newTodoList[index-index].visible = !state.newTodoList[index-index].visible
    Keep.setItem('newTodoList', state.newTodoList)
  },
  [types.EDIT_MEMO](state,index){
    state.newTodoList[index].memoShow = !state.newTodoList[index].memoShow
    Keep.setItem('newTodoList', state.newTodoList)
  },
  [types.DELETE_LIST](state,index){
    Vue.delete(state.newTodoList, index);
    Keep.setItem('newTodoList', state.newTodoList)
  },
  [types.INIT_TODO](state,todoArr){
    todoArr = Keep.getItem('newTodoList')
      if (todoArr) {
        for (let i = 0, len = todoArr.length; i < len; i++) {
          if (todoArr[i].done === false) {
            state.newListLength++
          }
        }
        state.newTodoList = todoArr
      };
  }
};

const actions = {
  initTodo({commit},todoArr){
    commit(types.INIT_TODO,todoArr)
  },
  addNewTodo({commit},newList){
    commit(types.ADD_TODO,newList);
  },
  topList({commit},index){
    commit(types.TOP_LIST,index);
  },
  editMemo({commit},index){
    commit(types.EDIT_MEMO,index);
  },
  deleteList({commit},index){
    commit(types.DELETE_LIST,index);
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
