// pages/listDetail/listDetail.js
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id: 0,        //排行榜id
      rankingListDetail: {},        //详情数据
      iconPause: "../../images/icon-pause.png",      //暂停图标
      playSong: false,      //播放状态
      songUrl: "",      //歌曲url
      songImg: "",
      index: 1,
      songName:"",
      songInfo: "",
  },

  //播放全部按钮
  tapPlayBtn: function(e) {
      var _this = this;
      _this.playFun(e);
  },
  //暂停按钮
  tapPauseBtn: function (e) {
      var _this = this;
      var backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.pause();
      _this.setData({
          playSong: false
      });
  },
  //播放音乐
  playFun: function (e, index) {
      var _this = this;
      var index = index || e.currentTarget.dataset.index || _this.data.index;        //区分播放按钮与列表点击
      var songmid = _this.data.rankingListDetail.songlist[index - 1].data.songmid;
      var albummid = _this.data.rankingListDetail.songlist[index - 1].data.albummid;
      var songName = _this.data.rankingListDetail.songlist[index-1].data.songname;
      var singer = _this.data.rankingListDetail.songlist[index-1].data.singer[0].name;
      // var songUrl = "http://ws.stream.qqmusic.qq.com/C100" + songmid + ".m4a?fromtag=38";
      var songUrl = "https://api.bzqll.com/music/tencent/url?key=579621905&id=" + songmid + "&br=320";   // 热心人提供的自封装接口，非官方
      var songImg = "http://y.gtimg.cn/music/photo_new/T002R150x150M000" + albummid + ".jpg";

      _this.setData({
        songUrl: songUrl,
        songImg: songImg,
        songName: songName,
        songInfo: songName + " - " + singer,
        index: index
      })
      var backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.title = songName;
      backgroundAudioManager.epname = songName;
      backgroundAudioManager.singer = singer;
      backgroundAudioManager.coverImgUrl = songImg;
      backgroundAudioManager.src = songUrl; // 设置了 src 之后会自动播放
      if (backgroundAudioManager.onPause) {
        _this.setData({
          playSong: true
        });
        backgroundAudioManager.play();
      } else {
        _this.setData({
          playSong: false
        });
        backgroundAudioManager.pause();
      }
      backgroundAudioManager.onPlay(() => {
        console.log('开始播放');
        _this.setData({
          playSong: true
        });
      });
      backgroundAudioManager.onPause(() => {
        console.log('停止播放');
        _this.setData({
          playSong: false
        });
      })
      backgroundAudioManager.onStop(() => {
        console.log('停止播放');
        _this.setData({
          playSong: false
        });
      })
      backgroundAudioManager.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
      backgroundAudioManager.onEnded((res) => {
        if (e.currentTarget.dataset.index) {
          _this.playFun(e, index + 1);
        } else {
          _this.playFun(e, 1);
        }
      })
      
     
  },
  //点击列表播放
  playSong: function (e) {
      var _this = this;
      _this.playFun(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      //接收排行榜传来的id
      wx.getStorage({
          key: "someListId",
          success: function (res) {
            console.log(res)
                var id = res.data;
                //获取对应id下的详情数据
                util.getRankingDetail(id, function (data) {
                    _this.setData({
                        id: res.data,
                        rankingListDetail: data
                    })
                })
          }
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