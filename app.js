let util = require('./utils/data.js')

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'https://xxxx.xxxxx.cn/login?code='+res.code,
            method: 'GET',
            // data: {
            //   code: res.code
            // },
            success: (res) => {
              console.log(res,res.data)
              this.globalData.userId = res.data
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        let reg = /\d+$/
                        res.userInfo.avatarUrl = res.userInfo.avatarUrl.replace(reg, '0')
                        this.globalData.userInfo = res.userInfo
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res)
                        }
                        wx.request({
                          url: 'https://xxxx.xxxx.cn/insertOneUser',
                          method: 'POST',
                          data: {
                            userId: this.globalData.userId,
                            userInfo: JSON.stringify(res)
                          },
                          header: {
                            // 'content-type': 'application/json'
                            'content-type': 'application/x-www-form-urlencoded'
                          },
                          success: res => {
                            console.log(res)
                          }
                        })
                      }
                    })
                  }
                }
              })
              // 获取设备信息
              wx.getSystemInfo({
                success: res => {
                  this.globalData.systemInfo = res
                  if (this.systemInfoReadyCallback) {
                    this.systemInfoReadyCallback(res)
                  }
                  wx.request({
                    url: 'https://xxxx.xxxx.cn/insertOneUser',
                    method: 'POST',
                    data: {
                      userId: this.globalData.userId,
                      systemInfo: JSON.stringify(res)
                    },
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                      // 'content-type': 'application/json'
                    },
                  })
                }
              })
            }
          })
      }
    })
    // 获取用户信息
    
    
  },
  globalData: {
    userInfo: null,
    systemInfo: null,
    currentMatch: null,
    flags: util.flags,
    userPrediction: util.userPrediction,
    avatar: null,
    userId: null
  }
})