const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//爬取推荐
const getMusicIndex = callback => {
    wx.request({
        url: "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",
        data: {
            g_tk: 5381,
            uin: 0,
            format: "json",
            inCharset: "utf-8",
            outCharset: "utf-8",
            notice: 0,
            platform: "h5",
            needNewCode: 1,
            _: Date.now()
        },
        header: {"content-Type": "application/json"},
        method: "GET",
        success: function(res) {
            if (res.statusCode == 200) {
                callback(res.data);
            }
        }
    })
}

//爬取排行榜分类数据
const getRankingList = callback => {
    wx.request({
        url: "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",
        data: {
            g_tk: 5381,
            uin: 0,
            format: "json",
            inCharset: "utf-8",
            outCharset: "utf-8",
            notice: 0,
            platform: "h5",
            needNewCode: 1,
            _: Date.now()
        },
        header: {"content-type": "application/json"},
        method: "GET",
        success: function(res) {
            if (res.statusCode == 200) {
                callback(res.data);
            }
        }

    })
}

//爬取某一排行榜详情
const getRankingDetail = (id, callback) => {
    wx.request({
        url: "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",
        data: {
            g_tk: 5381,
            uin: 0,
            format: "json",
            inCharset: "utf-8",
            outCharset: "utf-8",
            notice: 0,
            platform: "h5",
            needNewCode: 1,
            tpl: 3,
            page: "detail",
            type: "top",
            topid: id,
            _: Date.now()
        },
        header: {"content-Type": "application/json"},
        method: "GET",
        success: function(res) {
            if(res.statusCode == 200) {
                callback(res.data);
            }
        }
    })
}

//爬取某一歌曲 vkey
const getSongVkey = (songmid, callback) => {
  wx.request({
    url: "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg",
    data: {
      g_tk: 5381,
      uin: 0,
      format: "json",
      inCharset: "utf-8",
      outCharset: "utf-8",
      notice: 0,
      platform: "yqq",
      needNewCode: 0,
      cid: 205361747,
      songmid: songmid,
      filename: "C400" + songmid + ".m4a",
      _: Date.now(),
      guid: 4406149087
    },
    header: { "content-Type": "application/json" },
    method: "GET",
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}

//爬取热门搜索
const getHotSearchValue = callback => {
    wx.request({
        url: "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg",
        data: {
            g_tk: 5381,
            uin: 0,
            format: "json",
            inCharset: "utf-8",
            outCharset: "utf-8",
            notice: 0,
            platform: "h5",
            needNewCode: 1,
            _: Date.now()
        },
        header: {"content-Type": "application/json"},
        method: "GET",
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data);
            }
        }
    })
}

//爬取某一歌曲链接
const getSongOne = (filename, vkey,guid, callback) => {
  wx.request({
    url: "https://dl.stream.qqmusic.qq.com/" + filename,
    data: {
      vkey: vkey,
      guid: guid
    },
    header: { "content-Type": "application/json", "cookie": "UM_distinctid=167edebbfa6850-09a969a6b1e786-2d604637-4a574-167edebbfa88a0; CNZZDATA1272960370=1095872468-1545884883-%7C1545884883; UM_distinctid=167edec25db10f-0eee83a9d6e181-2d604637-4a574-167edec25dc15a; pgv_info=ssid=s9502574979; pgv_pvid=3641993472; qqmusic_fromtag=10" },
    method: "GET",
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}

//爬取搜索结果数据
const getSearchRes = (keyword, callback) => {
    wx.request({
        // url: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp",
      url: "https://c.y.qq.com/soso/fcgi-bin/client_search_cp",
        data: {
            g_tk: 5381,
            uin: 0,
            format: "json",
            inCharset: "utf-8",
            outCharset: "utf-8",
            notice: 0,
            platform: "h5",
            needNewCode: 1,
            w: keyword,
            zhidaqu: 1,
            catZhida: 1,
            t: 0,
            flag: 1,
            ie: "utf-8",
            sem: 1,
            aggr: 0,
            perpage: 20,
            n: 20,
            p: 1,
            remoteplace: "txt.mqq.all",
            _: Date.now()
        },
        header: {"content-Type": "application/json"},
        origin: "https://y.qq.com",
        referer: "https://y.qq.com/m/index.html",
        method: "GET",
        success: function (res) {
            if (res.statusCode == 200) {
                callback(res.data);
            }
        }
    })
}

module.exports = {
  formatTime: formatTime,
  getMusicIndex: getMusicIndex,
  getRankingList: getRankingList,
  getRankingDetail: getRankingDetail,
  getHotSearchValue: getHotSearchValue,
  getSearchRes: getSearchRes,
  getSongVkey: getSongVkey,
  getSongOne: getSongOne
}
