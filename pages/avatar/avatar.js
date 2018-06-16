//获取应用实例
const app = getApp()
const DATA = require('../../utils/data.js')
var interval
let cards = DATA.cards

Page({
  data: {
    userInfo: null,
    avatarUrl: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    saveImage: null,
    getRequest: 'before',
    currentTag: 'emblem',
    currentImage: null,
    selectedIcons: {},
    animationData: {},
    normalizedValue: null,
    isReady: false,
    cards: null,
    currentCard: 1,
    touchStart: 0,
    status: 'select',
    iconCounts: 0,
    COUNT: 0,

    // olddistance: '',//上一次两个手指的距离
    // newdistance: "",//本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
    // diffdistance: '', //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
    // Scale: 1,//图片放大的比例，
    // baseHeight: '',       //原始高  
    // baseWidth: '',        //原始宽 

    
  },

  //事件处理函数
  onLoad: function () {


    // const { cropperOpt } = this.data

    // // 若同一个页面只有一个裁剪容器，在其它Page方法中可通过this.wecropper访问实例
    // new WeCropper(cropperOpt)
    //   .on('ready', (ctx) => {
    //     console.log(`wecropper is ready for work!`)
    //   })
    //   .on('beforeImageLoad', (ctx) => {
    //     console.log(`before picture loaded, i can do something`)
    //     console.log(`current canvas context: ${ctx}`)
    //     wx.showToast({
    //       title: '上传中',
    //       icon: 'loading',
    //       duration: 20000
    //     })
    //   })
    //   .on('imageLoad', (ctx) => {
    //     console.log(`picture loaded`)
    //     console.log(`current canvas context: ${ctx}`)
    //     wx.hideToast()
    //   })

    // 若同一个页面由多个裁剪容器，需要主动做如下处理

    // this.A = new WeCropper(cropperOptA)
    // this.B = new WeCropper(cropperOptB)



    var context = wx.createCanvasContext('loadCanvas')
    this.drawCircle(0, context)
    var i = 0 //闭包
    var v = 0.2 * Math.PI
    interval = setInterval(() => {
      i++
      this.drawCircle(v * i, context)
    }, 200)

    this.data.cards = cards;

    if (app.globalData.userInfo) {
      setTimeout(() => {
        clearInterval(interval)
        this.setData({
          userInfo: app.globalData.userInfo,
          avatarUrl: app.globalData.avatar || {
            url:app.globalData.userInfo.avatarUrl,
            name: app.globalData.userInfo.avatarUrl},
          hasUserInfo: true
        })
      },500)
      this.downloadAvatar(app.globalData.userInfo.avatarUrl)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        setTimeout(() => {
          clearInterval(interval)
          this.setData({
            userInfo: app.globalData.userInfo,
            avatarUrl: app.globalData.avatar || {
              url: app.globalData.userInfo.avatarUrl,
              name: app.globalData.userInfo.avatarUrl
            },
            hasUserInfo: true
          })
        },500)
        this.downloadAvatar(app.globalData.userInfo.avatarUrl)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          let reg = /\d+$/
          res.userInfo.avatarUrl = res.userInfo.avatarUrl.replace(reg, '0')
          app.globalData.userInfo = res.userInfo
          setTimeout(() => {
            clearInterval(interval)
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
              avatarUrl: app.globalData.avatar || {
                url: res.userInfo.avatarUrl,
                name: res.userInfo.avatarUrl
              }
            })
          }, 500)
          this.downloadAvatar(res.userInfo.avatarUrl)
        }
      })
    }

    if(app.globalData.systemInfo){
      this.setData({
        normalizedValue: app.globalData.systemInfo.screenWidth / 750
      })
    }else{
      app.systemInfoReadyCallback = res => {
        this.setData({
          normalizedValue: res.screenWidth / 750
        })
      }
    }
    this.setData({
      "cards": this.data.cards
    });

  },
  downloadAvatar: function(url) {
    wx.downloadFile({
      url: url,
      success: res => {
        this.data.localAvatar = res.tempFilePath
        if(this.downloadAvatarCallback){
          this.downloadAvatarCallback(res)
        }
      }
    })
  },
  drawCanvas: function (url) {
    let rate = this.data.normalizedValue
    let context = wx.createCanvasContext('userinfo-avatar1')
    console.log(url)
    context.drawImage(url, 0, 0, 500 * rate, 500 * rate)
    for (let key in this.data.selectedIcons) {
      context.translate(this.data.selectedIcons[key].position[0] + this.data.selectedIcons[key].size[0] / 2, this.data.selectedIcons[key].position[1] + this.data.selectedIcons[key].size[1]/2)
      context.rotate(this.data.selectedIcons[key].rotate * Math.PI / 180)
      this.data.selectedIcons[key].path && context.drawImage(this.data.selectedIcons[key].path, -this.data.selectedIcons[key].size[0] / 2, -this.data.selectedIcons[key].size[1] / 2, this.data.selectedIcons[key].size[0], this.data.selectedIcons[key].size[1])
      context.rotate(-this.data.selectedIcons[key].rotate * Math.PI / 180)
      context.translate(-this.data.selectedIcons[key].position[0] - this.data.selectedIcons[key].size[0] / 2, -this.data.selectedIcons[key].position[1] - this.data.selectedIcons[key].size[1] / 2)  
    }
    context.draw()
    let arr = []
    for(let key in this.data.selectedIcons){
      arr.push({
        id: key,
        size: this.data.selectedIcons[key].size,
        position: this.data.selectedIcons[key].position,
        angle: this.data.selectedIcons[key].angle
      })
    }
    wx.request({
      url: 'https://sklang.cloudms.cn',
      method: 'POST',
      data: {
        icons: arr,
        avatar: {
          url: this.data.avatarUrl.name,
          size: ['500rpx','500rpx']
        },
        userId: app.globalData.userId
      }
    })
  },

  saveCanvas: function(e) {
    let rate = this.data.normalizedValue
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 500*rate,
      height: 500*rate,
      destWidth: 500*rate,
      destHeight: 500*rate,
      canvasId: 'userinfo-avatar1',
      success: res => {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        })
        this.data.saveImage = res.tempFilePath
      }
    })
  },
  saveAvatar: function(e){
    if(e.currentTarget.dataset.status == 'edit') return
    if (app.globalData.avatar){
      this.drawCanvas(app.globalData.avatar.url)
      this.saveCanvas(e)
    }else{
      if (this.data.localAvatar) {
        this.drawCanvas(this.data.localAvatar)
        this.saveCanvas(e)
      } else {
        this.downloadAvatarCallback = res => {
          this.drawCanvas(this.data.localAvatar)
          this.saveCanvas(e)
        }
      }
    }
  },
  selectOrNot: function(e) {
    let counts = this.data.iconCounts
    let rate = this.data.normalizedValue
    let path = e.target.dataset.path
    this.currentIcon = this.currentIcon ? this.currentIcon : path
    if(this.data.selectedIcons[path].path){
      this.data.selectedIcons[path].path = undefined
      counts--
    }else{
      this.data.selectedIcons[path].path = path
      counts++
    }
    let tempArr = []
    for(let key in this.data.selectedIcons){
      this.data.selectedIcons[key].path ? tempArr.push(key) : ''
    }
    this.currentIcon = this.data.selectedIcons[path].path ? path : tempArr[tempArr.length-1]
    this.setData({
      selectedIcons: this.data.selectedIcons,
      iconCounts: counts
    })
  },

  getStartPosition: function(e) {
    this.startPositions = this.startPositions ? this.startPositions : {}
    this.startPositions[e.target.dataset.key] = this.startPositions[e.target.dataset.key] ? this.startPositions[e.target.dataset.key] : [e.touches[0].pageX, e.touches[0].pageY]
    this.currentIcon = e.target.dataset.key
  },

  move: function(e) {
    // this.data.counts = this.data.counts%3
    console.log(e)
    console.log(this.data.selectedIcons)
    this.data.COUNT++
    if(this.data.COUNT%3 == 1){
      let rate = this.data.normalizedValue
      let [width, height] = this.data.selectedIcons[e.target.dataset.key].size
      let dX = e.touches[0].pageX - this.startPositions[e.target.dataset.key][0]
      let dY = e.touches[0].pageY - this.startPositions[e.target.dataset.key][1]
      let border = 500 * this.data.normalizedValue;
      this.data.selectedIcons[e.target.dataset.key].position = [dX + 0 > border - width ? border - width : (dX + 0 < 0 ? 0 : dX + 0), dY + 0 > border - height ? border - height : (dY + 0 < 0 ? 0 : dY + 0)];
      this.setData({
        selectedIcons: this.data.selectedIcons,
      })
      this.currentIcon = e.target.dataset.key
    }
  },

  getEndPosition: function(e) {
    this.currentIcon = e.target.dataset.key
    let rate = this.data.normalizedValue
    let [width, height] = this.data.selectedIcons[e.target.dataset.key].size
    let dX = e.changedTouches[0].pageX - this.startPositions[e.target.dataset.key][0]
    let dY = e.changedTouches[0].pageY - this.startPositions[e.target.dataset.key][1]
    let border = 500 * this.data.normalizedValue;
    this.data.selectedIcons[e.target.dataset.key].position = [dX + 0 > border - width ? border - width : (dX + 0 < 0 ? 0 : dX + 0), dY + 0 > border - height ? border - height : (dY + 0 < 0 ? 0 : dY + 0)]

    this.setData({
      selectedIcons: this.data.selectedIcons,
    })
  },

  changeSize: function(e) {
    if(!this.currentIcon) return
    let speed = 10, ratio = this.data.selectedIcons[this.currentIcon].size[1] / this.data.selectedIcons[this.currentIcon].size[0]
    if (e.currentTarget.dataset.direction == '-'){
      this.data.selectedIcons[this.currentIcon].size = this.data.selectedIcons[this.currentIcon].size[0] < 11 ? this.data.selectedIcons[this.currentIcon].size : this.data.selectedIcons[this.currentIcon].size.map((item, index) => {return item - speed*(1-(1-ratio)*index)})
    }else{
      this.data.selectedIcons[this.currentIcon].size = this.data.selectedIcons[this.currentIcon].size[0] > 149 ? this.data.selectedIcons[this.currentIcon].size : this.data.selectedIcons[this.currentIcon].size.map((item, index) => {return item + speed * (1 - (1 - ratio) * index) })
    }
    this.setData({
      selectedIcons: this.data.selectedIcons
    })
  },

  iRotate: function(e) {
    if (!this.currentIcon) return
    let speed = 5
    this.data.selectedIcons[this.currentIcon].rotate += (e.currentTarget.dataset.direction == '+' ? -speed : speed)
    this.setData({
      selectedIcons: this.data.selectedIcons
    })
  },

  imageFromAlbum: function(e) {
    // wx.chooseImage({
    //   count: 1,
    //   success: res => {
    //     this.setData({
    //       avatarUrl: res.tempFilePaths[0]
    //     })
    //     wx.uploadFile({
    //       url: 'https://sklang.cloudms.cn',
    //       filePath: res.tempFilePaths[0],
    //       name: 'imageFromAlbum',
    //     })
    //   }
    // })
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        // wx.getImageInfo({
        //   src: res.tempFilePaths[0],
        //   success: function (res) {
            //console.log(res.width);
            //console.log(res.height);
            // var str = res.width / res.height;
            // if(str > 1){//横版图片
            //   _this.data.height = 400;//图片的显示高度为400
            //   _this.data.width = str * _this.data.height; //图片的宽度 = 宽高比 * 图片的显示高度

            // }else{//竖版图片
            //   _this.data.width = 400;//图片的显示宽度为400
            //   _this.data.height = str * _this.data.width; //图片的高度 = 宽高比 * 图片的显示宽度
            // }
           
        //   }
        // })
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `../cropper/cropper?src=${src}`
        })
      }
    })
  },

  drawCircle(s, context) {
    var deltas = 0.1 * Math.PI
    context.clearRect(0, 0, 320, 160)
    context.setLineWidth(10)
    var style = ''
    for (var i = 0; i < 15; i++) {
      style = 'rgba(255, 255, 255, ' + (i / 15) + ')'
      context.setStrokeStyle(style)
      context.beginPath()
      context.arc(160, 80, 70, s + i * deltas, s + (1 + i) * deltas)
      context.stroke()
    }
    context.draw()

  },
  onReady: function () {
    
  },

  touchStart: function (e) {
    this.setData({ touchStart: e.touches[0].pageX });
  },
  touchEnd: function (e) {
    //小于0向左，大于0向右
    let orientation = e.changedTouches[0].pageX - this.data.touchStart;
    let currentCard = this.data.currentCard;
    this.turnTo(orientation);
  },

  mypre: function (e) {
    this.turnTo(1);
  },
  mynext: function (e) {
    this.turnTo(-1);
  },

  turnTo: function (orientation) {
    let length = this.data.cards.length;
    let currentCard = this.data.currentCard;
    if (orientation < 0 && currentCard < length - 1) {
      if (currentCard - 1 >= 0) {
        this.data.cards[currentCard - 1].className = "card-lefthidden";
      }
      if (currentCard + 2 <= length - 1) {
        this.data.cards[currentCard + 2].className = "card-right";
      }
      this.data.cards[currentCard].className = "card-left";
      this.data.cards[currentCard + 1].className = "card";
      this.data.currentCard += 1;
    } else if (orientation > 0 && currentCard > 0) {
      if (currentCard + 1 <= length - 1) {
        this.data.cards[currentCard + 1].className = "card-righthidden";
      }
      if (currentCard - 2 >= 0) {
        this.data.cards[currentCard - 2].className = "card-left";
      }
      this.data.cards[currentCard].className = "card-right";
      this.data.cards[currentCard - 1].className = "card";
      this.data.currentCard -= 1;
    }
    this.setData({ "cards": this.data.cards });
  },

  editStatus: function(e){
    if (e.currentTarget.dataset.status[0] == 'edit' || e.currentTarget.dataset.status[1] == 0) return
    this.setData({
      status: 'edit'
    })
  },
  selectStatue: function(e){
    this.setData({
      status: 'select'
    })
  },
  getIconSize: function(e){
    let rate = this.data.normalizedValue
    if(!this.data.selectedIcons[e.target.dataset.path]){
      this.data.selectedIcons[e.target.dataset.path] = {
        path: undefined,
        position: [0, 0],
        size: [100 * rate, 100 * rate * e.detail.height / e.detail.width],
        rotate: 0
      }
    }
    this.setData({
      selectedIcons: this.data.selectedIcons
    })
  },


  scroll: function (e) {
    var _this = this;
    //当e.touches.length等于1的时候，表示是单指触摸，我们要的是双指
    if (e.touches.length == 2) {//两个手指滑动的时候
      var xMove = e.touches[1].clientX - e.touches[0].clientX;//手指在x轴移动距离
      var yMove = e.touches[1].clientY - e.touches[0].clientY;//手指在y轴移动距离
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//根据勾股定理算出两手指之间的距离  
      if (_this.data.olddistance == 0) {
        _this.data.olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
        // console.log("第一次");
      } else {
        _this.data.newdistance = distance; //第二次就可以计算它们的差值了  
        _this.data.diffdistance = _this.data.newdistance - _this.data.olddistance;//两次差值
        _this.data.olddistance = _this.data.newdistance; //计算之后更新比例  
        _this.data.Scale = _this.data.oldscaleA + 0.005 * _this.data.diffdistance;//这条公式是我查阅资料后找到的，按照这条公式计算出来的比例来处理图片，能给用户比较好的体验
        if (_this.data.Scale > 2.5) {//放大的最大倍数
          return;
        } else if (_this.data.Scale < 1) {//缩小不能小于当前
          return;
        }
        //刷新.wxml ，每次相乘，都是乘以图片的显示宽高
        _this.setData({
          height: _this.data.baseHeight * _this.data.Scale,
          width: _this.data.baseWidth * _this.data.Scale
        })
        _this.data.oldscaleA = _this.data.Scale;//更新比例 


      }
    }
  },
  //手指离开屏幕
  endTou: function (e) {
    this.data.olddistance = 0;//重置
    this.getRect();
  },

  getRect: function () {
    var _this = this;
    wx.createSelectorQuery().select('.FilePath').boundingClientRect(function (rect) {
      _this.data.x = Math.abs(rect.left);//x坐标
      _this.data.y = Math.abs(rect.top);//y坐标
    }).exec()
  },

  generate: function () {
    var _this = this;
    const ctx_A = wx.createCanvasContext('myCanvas_A');
    var baseWidth = _this.data.baseWidth * _this.data.Scale;//图片放大之后的宽
    var baseHeight = _this.data.baseHeight * _this.data.Scale;//图片放大之后的高
    ctx_A.drawImage(_this.data.src, 0, 0, baseWidth, baseHeight);//我们要在canvas中画一张和放大之后的图片宽高一样的图片
    ctx_A.draw();
    wx.showToast({
      title: '截取中...',
      icon: 'loading',
      duration: 10000
    });//
    setTimeout(function () {//给延时是因为canvas画图需要时间
      wx.canvasToTempFilePath({//调用方法，开始截取
        x: _this.data.x,
        y: _this.data.y,
        width: 400,
        height: 400,
        destWidth: 400,
        destHeight: 400,
        canvasId: 'myCanvas_A',
        success: function (res) {
          console.log(res.tempFilePath);
        }
      })
    }, 2000)

  },

  

})

