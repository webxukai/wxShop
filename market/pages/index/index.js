//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    code :'',
    loading: false,
    color: '#000',
    background: '#fff',
    show: true,
    animated: false,
    navbarData: {
      title:"大闸蟹兑换",
      bg: '2'
    },
    height: app.globalData.height * 2 + 20, 
  },
  attached: function () {
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  toShopInfo: function () {
    if (this.data.code == '') {
      wx.showToast({
        title: '兑换码不能为空',
        icon:'none',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '../shopInfo/shopInfo?code=' + this.data.code
      })
    }

  },
  bindCode(e) {
    this.setData({
      code: e.detail.value
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
