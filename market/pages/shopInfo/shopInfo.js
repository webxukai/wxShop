// pages/shopInfo/shopInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    code:'', // 兑换码
    date: '2019-09-01',  // 日期
    name:'',
    address :'', // 地址
    mobile  :'', // 手机号
    index: 0,
    multiIndex: [0, 0, 0],
    time: '12:01',
    customItem: '全部',
    height: app.globalData.height,
    navbarData: {
      title: "预约",
      bg: '1'
    },
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bindName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindAddress (e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
            break;
          case 1:
            data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
            data.multiArray[2] = ['鲫鱼', '带鱼'];
            break;
        }
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                break;
              case 1:
                data.multiArray[2] = ['蛔虫'];
                break;
              case 2:
                data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                break;
              case 3:
                data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                break;
              case 4:
                data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                break;
            }
            break;
          case 1:
            switch (data.multiIndex[1]) {
              case 0:
                data.multiArray[2] = ['鲫鱼', '带鱼'];
                break;
              case 1:
                data.multiArray[2] = ['青蛙', '娃娃鱼'];
                break;
              case 2:
                data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                break;
            }
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  toAppointmentResult: function () {
    let that = this
    if (!(/^1[3456789]\d{9}$/.test(this.data.mobile)) ) {
      wx.showToast({
        title: '手机号有误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.address == '') {
      wx.showToast({
        title: '收货地址有误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.name == '') {
      wx.showToast({
        title: '联系人有误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: 'https://dzx.api.izhuo.tech/user/booking',
      data: {
        mobile  : this.data.mobile,
        code : this.data.code,
        address : this.data.address,
        date : this.data.date,
        name : this.data.name
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1026) {
          wx.navigateTo({
            url: '../appointmentResult/appointmentResult?name=' + that.data.name + '&address=' + that.data.address + "&mobile=" + that.data.mobile
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          console.log(res.data)
        }
        // wx.navigateTo({
        //   url: '../appointmentResult/appointmentResult?name=' + that.data.name + '&address=' + that.data.address + "&mobile=" + that.data.mobile
        // })
      }
    })

  },
  /**toAppointmentResult
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      code: options.code
    })

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