// miniprogram/pages/write/write.js
const app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initTags:[
      {name:'其他',type:1},
      {name:'工作',type:2},
      {name:'生活',type:3},
      {name:'学习',type:4}
    ],
    userTags:[],
    showTagInput:true,
    newTagName:'',
    todo:{
      content:'',
      checked:true,

    }
  },
  clearFrom(){
    this.setData({
      todo: {
        content: '',
        checked: true
      }
    })
  },
  todoSubmit(e){
    console.log('todo data',this.data.todo);
    const vals = e.detail.value;
    const content = vals.content;
    // const tag = vals.tag.name;
    const tagType = vals.tag;
    var utags =this.data.userTags;
    var itags = this.data.initTags;
    var tags = [...utags,...this.data.initTags];
    console.log('tags',tags);
    var tagName = '';
    let len = tags.length;
    for (let i = 0; i < len; i++) {
      if (tags[i]['type'] == tagType){
        tagName = tags[i]['name'];
      }
    }
    const id = this.getLastId() + 1;
    console.log('tag name',tagName);
    var time = '2019-3-2';
    const todo = {
      id:id,content:content,tag:tagName,tagType:tagType,time:time,finished:0
    }
    // app.globalData.newTodo = todo;
    console.log('new todo',todo);
    return;//
    const todoKey = 'todo'+todo.id;
    try{
      wx.setStorageSync(todoKey, todo);
      var s = wx.getStorageSync(todoKey);
      console.log('storage',s);
      this.setLastId(id);
    }catch(e){
      console.log('设置storage失败',e)
    }
    this.clearFrom();
  },
  fromReset(){

  },
  getUserTags(){
    var tags = wx.getStorageSync('tags');
    if(tags.length){
      this.setData({userTags:tags})
    }
  },
  getLastId(){
    var lastId = 0;
    try {
      let id = wx.getStorageSync('lastId');
      if(id)lastId = id;
    } catch (e) {
      console.error('get lastId error');
    }
    return lastId;
  },
  setLastId(id){
    console.log('set id',id)
    try{
      wx.setStorageSync("lastId",id);
    }catch(e){
      console.error('set lastid error')
    }
  },
  bindTagInput(e){
    this.setData({
      newTagName:e.detail.value
    })
  },
  addTag(e){
    console.log('add e',e);
    console.log('tag',this.data.newTag);
    var maxType = wx.getStorageSync('maxTagType');
    console.log('name',this.data.newTagName)
    const newTag = {name:this.data.newTagName,type:maxType +1} ;
    var utags = this.data.userTags;
    utags.push(newTag);
    console.log('utags',utags)
    wx.setStorageSync('tags',utags);
    wx.setStorageSync('maxTagType', maxType+1);
    this.setData({newTagName:''});
    // utags.push()
  },
  tagRadio(e){
    console.log('radio',e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserTags();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})