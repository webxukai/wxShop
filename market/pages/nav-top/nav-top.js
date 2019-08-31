// pages/nav-top/nav-top.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navbarData: { //navbarData 由父页面传递的数据
      type: Object,
      value: {}
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    height: '',
  },
  attached: function() {
    console.log(this.navbarData)
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _navback() {
      wx.navigateBack()
    }
  }
})