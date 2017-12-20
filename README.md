# wx_music
微信小程序开发

## 开发准备
* 首先注册小程序账号(mp.weixin.qq.com)
* 下载微信web开发者工具(https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)
* 打开微信web开发者工具，登录并创建新项目，AppID为前面注册的小程序的开发者ID(小程序ID)
* 因为后台数据都是通过 wx.request() 这个方法拿到的数据，所以在  设置->开发设置->服务器域名  中配置  request合法域名	https://c.y.qq.com
* 需要对http请求有所了解，因为本程序是爬取数据，所以涉及的http请求都是 "GET" 。对爬数据不了解的，具体可以打开某一网站打开 开发者工具，切换到 Network 下，执行一次http请求后，在 Network 寻找返回的数据文件。最笨的寻找方法就是看每一个文件的 Response 下是否是 JSON 数据。如果是，就切换到 Headers 下寻找 Query String Parameters 下的请求头数据
* 爬取推荐  https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
* 爬取排行榜单  https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg
* 爬取某一排行榜  https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=5  需要一个查询字段topid
* 爬取热门搜索关键词  https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg
* 爬取搜索结果  https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?w=像风一样  需要一个查询字段w
* 音乐播放推荐使用新版本的 const backgroundAudioManager = wx.getBackgroundAudioManager();  //获取全局唯一的背景音频管理器
* 其他  语法方面参考 Vue.js ，也可以查看微信开发文档(https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
	

	``` javascript
	wx.request({
			url: "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg",    //请求地址，推荐页面数据
			data: {    //Query String Parameters
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
			method: "GET",    //请求方式
			success: function(res) {
				if (res.statusCode == 200) {
					callback(res.data);
				}
			}
		})
	```
## 使用

* 首页 
	* 推荐  功能待完善
	* 排行榜  点击歌曲列表或点击播放按钮播放
	* 搜索  输入关键字或点击热门搜索默认关键字搜索，点击歌曲列表，进入播放页