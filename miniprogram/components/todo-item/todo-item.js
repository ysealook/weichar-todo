// pages/components/todo-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    todo:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _tc(){
      return '#19be6b';
    },
    _finished_cls(i) {
      return i == 1 ? 'finished-todo' : 'unfinished-todo';
    },
    editTodo(e){
      const id = e.currentTarget.dataset.id;
      console.log(id)
      console.log(e)
    },
    markTodo(e){
      const id = e.currentTarget.dataset.id;

    },
    deleteTodo(e){
      // const id = 
      console.log('delete',e)
    }
  }
})
