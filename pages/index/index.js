//index.js
var util = require("../../utils/util.js")
//获取应用实例
const app = getApp()

Page({
  data: {
      navData: ["推荐", "排行榜", "搜索"],     //导航
      navCurrent: 0,        //当前导航
      indicatorDots: true,  //swiper 是否显示面板指示点
      indicatorColor: "rgba(144, 144, 144, 0.8)",     //指示点颜色
      indicatorActiveColor: "#fff",       //当前选中的指示点颜色
      autoplay: true,       //swiper 自动切换
      interval: 2000,       //swiper 自动切换时间间隔
      duration: 500,       //swiper 滑动动画时常
      imgUrls: [],          //swiper图片数据
      radioStation: [],     //电台数据
      songList: [],     //热门歌单
      iconPlay: "../../images/icon-play.png",
      iconSearch: "../../images/icon-search.png",
      iconMusic: "../../images/icon-music.png",
      rankingLists: [],     //排行榜页面数据
      lazyLoad: true,       //图片懒加载
      serachValue: "",      //搜索内容
      hotSearchKeyword: {},      //热门搜素
      hotSearchArr: [],     //热门搜索随机打乱数据
      searchLists: {},      //搜索结果

    // motto: 'Hello World',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //播放页面
  goPlayPage: function (e) {
      var _this = this;
      var index = e.currentTarget.dataset.index;
      var songData = _this.data.searchLists.data.song.list[index];
      wx.setStorage({       //页面之间传递数据id
          key: "someSongData",
          data: songData
      })
      wx.navigateTo({
          url: '../play/play',
      })
  },
  //某一排行榜详情
  moveToSomeList: function (e) {
      var id = e.currentTarget.dataset.id;      //排行榜id
      wx.navigateTo({
          url: "../listDetail/listDetail",
          success: function () {
              wx.setStorage({       //页面之间传递数据id
                  key: "someListId",
                  data: id
              })
          }
      })
  },
  //切换导航
  bindNavChange: function (e) {
      var _this = this;
      _this.setData({
          navCurrent: e.currentTarget.dataset.index
      })
      if (_this.data.navCurrent == 0) {
          //获取推荐页面数据
          util.getMusicIndex(function (data) {
              _this.setData({
                  imgUrls: data.data.slider,
                  radioStation: data.data.radioList,
                  songList: data.data.songList
              })
          })
      } else if(_this.data.navCurrent == 1) {
          //获取排行榜页面数据
          util.getRankingList(function (data) {
              _this.setData({
                  rankingLists: data.data.topList
              })
          })
      } else if(_this.data.navCurrent == 2) {
          //获取搜索页面数据
          util.getHotSearchValue(function (data) {
              _this.setData({
                  hotSearchKeyword: data.data,
                  hotSearchArr: _this.shuffle(data.data.hotkey)
              })
          })
      }
  },
  //随机数组
  shuffle : function (arr) {
      for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
      return arr;
  },
  //搜索
  goSearch: function (e) {
      var _this = this;
      _this.setData({
          serachValue: e.detail.value
      })
      _this.getBackSearch();
  },
  //热门tap
  goSearchTap: function (e) {
      var _this = this;
      _this.setData({
          serachValue: e.currentTarget.dataset.keyword
      })
      _this.getBackSearch();
  },
  //爬取搜索数据
  getBackSearch: function () {
      var _this = this;
      var keyword = _this.data.serachValue;
      if (keyword) {
          util.getSearchRes(keyword, function (data) {
              _this.setData({
                  searchLists: data
              })
          })
      }
  },
  //swiper点击链接
//   swiperImageTap: function(e) {
//       var _this = this;
//       var index = e.currentTarget.dataset.index;
//       wx.redirectTo({
//           url: _this.data.imgUrls[index].linkUrl,
//       })
//   },
  onLoad: function () {
      var _this = this;
    //获取推荐数据
    util.getMusicIndex(function (data) {
        _this.setData({
            imgUrls: data.data.slider,
            radioStation: data.data.radioList,
            songList: data.data.songList
        })
    })
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
