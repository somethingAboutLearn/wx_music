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

//爬取搜索结果数据
const getSearchRes = (keyword, callback) => {
    wx.request({
        url: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp",
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
  getSearchRes: getSearchRes
}
