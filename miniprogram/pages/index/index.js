//index.js
const app = getApp()
var newTodo = app.globalData.newTodo;
Page({
  data: {
    finishedTodoList:[
     {
       id: 1,
       finished: 1,
       time: '2019-3-1',
       content: 'find a job',
       tag:'学习'
     },
     {
       id: 2,
       finished: 1,
       time: '2019-3-1',
       tag: '学习',
       content: 'find a job'
     }
   ],
   unfinishedTodoList:[
     {
       id:3,
       content:'睡觉，吃饭',
       time:'2019-3-16',
       tag: '生活',
       finished:0
     },
     {
       id: 4,
       content: '赚他一个亿',
       time: '2019-3-16',
       finished: 0,
       tag: '工作'
     }
   ]
  },
  checkboxChange:function(e){
    console.log('v', e.detail.value)
  },
  updateNewTodo(ntodo){
    // let todos = this.data.unfinishedTodoList;
    // todos.unshift(ntodo);
    // console.log('nts',todos)
    // this.setData({
    //   unfinishedTodoList:todos
    // })
    // app.globalData.newTodo = {};
    const LID = this.data.lastId;
    const NLID = wx.getStorageSync('lastId');
    if(LID == NLID)return
    console.log('写入了新todo')
    var nTodo = {};
    var uftodos = this.data.unfinishedTodoList;
    var newuftodos = [];
    for(let i=LID+1;i<=NLID;i++){
      console.log(LID,NLID,'更新了todo'+i)
      nTodo = wx.getStorageSync('todo'+i);
      if(!nTodo)continue;
      uftodos.unshift(nTodo);
      this.setData({unfinishedTodoList:uftodos});
    }
    this.setData({
      lastId:NLID
    })
  },
  getAllTodos(){
    var fTodos = [],ufTodos = [];
    try{
      var lastId = wx.getStorageSync('lastId');
      if(lastId){
        this.setData({lastId:lastId})
      }else{
        return
      }
      let todo ={};
      for(let i=1;i<=lastId;i++){
        todo = wx.getStorageSync('todo'+i);
        if(!todo){
          continue;
        }
        if(todo.finished ==1){
          fTodos.unshift(todo);
        }else{
          ufTodos.unshift(todo);
        }
      }
    }catch(e){

    }
    console.log('ftodos',fTodos,'uf',ufTodos);
    this.setData({
      finishedTodoList:fTodos
    });
    this.setData({
      unfinishedTodoList:ufTodos
    })
  },
  checkLastIdStorage(){
    let id = wx.getStorageSync('lastId');
    if(!id){
      wx.setStorageSync('llastId',0)
    }
  },
  checkTagStorage(){
    let tags = wx.getStorageSync('tags');
    if(!tags){
      const initTags = [];
      wx.setStorageSync('tags', initTags);
      console.log('set tags')
    }
    let tagType = wx.getStorageSync('maxTagType');
    if(!tagType){
      //初始tags（initTags）的最大type，如果要改动初始tags，应该单独拿出来维护,位于write.js
      const type = 4;
      wx.setStorageSync('maxTagType',type);
    }
  },
  onLoad: function() {
    this.getAllTodos();
    this.checkLastIdStorage();
    this.checkTagStorage();
  },
  onShow:function(){
    // const newTodo = app.globalData.newTodo;
    // console.log('todo obj',newTodo)
    // if (app.globalData.newTodo.content){
    //   this.updateNewTodo(newTodo);
    // }
    this.updateNewTodo();
  }
})
