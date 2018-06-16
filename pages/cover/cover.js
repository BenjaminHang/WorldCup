const app = getApp()
let util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftTime: {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    },
    footballClass: 'football-vibrate',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let interval = setInterval(() => {
    //   let leftTime = util.leftTime(new Date(2018, 5, 14, 23, 0, 0) - new Date())
    //   // console.log(leftTime)
    //   this.setData({
    //     leftTime: leftTime
    //   })
    // }, 1000) 
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
    
  },
  //
  getUserInfo: function (e) {
    let reg = /\d+$/
    e.detail.userInfo.avatarUrl = e.detail.userInfo.avatarUrl.replace(reg, '0')
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        footballClass: 'football-shoot'
      })
      wx.request({
        url: 'https://sklang.cloudms.cn/insertOneUser',
        method: 'POST',
        data: {
          userId: app.globalData.userId,
          userInfo: JSON.stringify(app.globalData.userInfo)
        },
        header: {
          // 'content-type': 'application/json'
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          console.log(res)
        }

      })
    } else {
      console.log(e.detail.errMsg)
    }
  },
  //跳转
  navigateToAvatar: function (e) {
    wx.switchTab({
      url: '../avatar/avatar',
      success: () => {
        this.setData({
          footballClass: 'football-vibrate'
        })
      }
    })
  }

})

  

