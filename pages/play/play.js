// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      songData: {},
      songImg: "",
      songUrl: "",
      status: "../../images/icon-pause.png",
      statusPause: "../../images/icon-pause.png",
      statusPlay: "../../images/icon-play.png",
      currentTime: "00:00",
      durationTime: "00:00",
      songname: "",
      singer: "",
      cTime: 0,
      dTime: 1,
  },
  //playstatus
  playstatus: function () {
      var _this = this;
      const backgroundAudioManager = wx.getBackgroundAudioManager();
      if (backgroundAudioManager.paused) {
          _this.setData({
              status: _this.data.statusPlay
          });
          backgroundAudioManager.play();
      } else {
          _this.setData({
              status: _this.data.statusPause
          });
          backgroundAudioManager.pause();
      }
  },
  //play
  playFuc: function (songname, singer, songUrl, songImg) {
      var _this = this;
      const backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.title = songname;
      backgroundAudioManager.epname = songname;
      backgroundAudioManager.singer = singer;
      backgroundAudioManager.coverImgUrl = songImg;
      backgroundAudioManager.src = songUrl;      // 设置了 src 之后会自动播放
      if (backgroundAudioManager.onPause) {
          _this.setData({
              status: _this.data.statusPlay
          });
          backgroundAudioManager.play();
      } else {
          _this.setData({
              status: _this.data.statusPause
          });
          backgroundAudioManager.pause();
      }
      backgroundAudioManager.onPlay(() => {
          console.log('开始播放');
          _this.setData({
              status: _this.data.statusPause
          });
      });
      backgroundAudioManager.onPause(() => {
          console.log('停止播放');
          _this.setData({
              status: _this.data.statusPlay
          });
      });
      backgroundAudioManager.onStop(() => {
          console.log('停止播放');
          _this.setData({
              status: _this.data.statusPlay
          });
          wx.navigateBack({
              
          })
      });
      backgroundAudioManager.onTimeUpdate((res) => {
          var currx = Math.floor(backgroundAudioManager.currentTime / 60) < 10 ? "0" + Math.floor(backgroundAudioManager.currentTime / 60) : Math.floor(backgroundAudioManager.currentTime / 60);
          var curry = Math.floor(backgroundAudioManager.currentTime % 60) < 10 ? "0" + Math.floor(backgroundAudioManager.currentTime % 60) : Math.floor(backgroundAudioManager.currentTime % 60);
          var durax = Math.floor(backgroundAudioManager.duration / 60) < 10 ? "0" + Math.floor(backgroundAudioManager.duration / 60) : Math.floor(backgroundAudioManager.duration / 60);
          var duray = Math.floor(backgroundAudioManager.duration % 60) < 10 ? "0" + Math.floor(backgroundAudioManager.duration % 60) : Math.floor(backgroundAudioManager.duration % 60);
          var currentTime = currx + ":" + curry;
          var durationTime = durax + ":" + duray;
          _this.setData({
              currentTime: currentTime,
              cTime: Math.floor(backgroundAudioManager.currentTime),
              durationTime: durationTime,
              dTime: Math.floor(backgroundAudioManager.duration),
          })
      });
      backgroundAudioManager.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
      });
      backgroundAudioManager.onEnded((res) => {
          wx.navigateBack({

          })
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      wx.getStorage({
          key: 'someSongData',
          success: function(res) {
            console.log(res)
              var str = "";
              var songData = res.data;
              var songImg = "http://y.gtimg.cn/music/photo_new/T002R150x150M000" + res.data.albummid + ".jpg";
              // var songUrl = "http://ws.stream.qqmusic.qq.com/C100" + res.data.songmid + ".m4a?fromtag=38";
              var songUrl = "https://api.bzqll.com/music/tencent/url?key=579621905&id=" + res.data.songmid + "&br=320"
              var songname = res.data.songname;
              res.data.singer.forEach(function (value, index) {
                  str += value.name;
                  str += "\/";
                  str = str.slice(0, str.length - 1);
                  return str;
              })
              var singer = str;
              _this.setData({
                  songData: res.data,
                  songImg: songImg,
                  songUrl: songUrl,
                  songname: songname,
                  singer: singer
              })
              _this.playFuc(songname, singer, songUrl, songImg);
          },
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