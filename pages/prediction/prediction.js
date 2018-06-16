let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    userName: '',
    predictionCounts: 0,
    correctScoreCounts: 0,
    correctVictoryCounts: 0,
    beatUsers: '',
    matches: [],
    flags: null,
    folder: '../../images/',
    userPrediction: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(app.globalData.userPrediction)
    const userData = app.globalData.userPrediction
    this.setData({
      userId: userData.userId,
      userName: userData.userName,
      predictionCounts: userData.predictionCounts,
      correctScoreCounts: userData.correctScoreCounts,
      correctVictoryCounts: userData.correctVictoryCounts,
      beatUsers: userData.beatUsers,
      matches: userData.matches,
      flags: app.globalData.flags
    })
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

  prediction: function (event) {
    app.globalData.currentMatch = event.currentTarget.dataset.match
    wx.navigateTo({
      url: '../poster/poster'
    })
  },
})