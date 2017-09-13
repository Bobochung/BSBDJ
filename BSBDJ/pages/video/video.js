Page({
  data: {
    dataList: [],
    // text:"这是一个页面"
    windowHeight: 654,
    isHiddenLoading: false,
    isHiddenToast: true,
    isHiddenModal: true,
    maxTime: ""
  },
  onLoad: function (options) {
    this.setData({
      windowHeight: wx.getStorageSync('windowHeight')
    });
    // 页面初始化 options为页面跳转所带来的参数
    this.requestData("newlist");
  },
  requestData: function (a) {
    var that = this;
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php',
      data: {
        a: a,
        c: "data",
        maxTime: that.maxTime,
        type: '41'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 
      success: function (res) {
        console.log(res.data.list);
        that.setData({
          isHiddenLoading: true,
         //that.data.dataList.concat
          dataList: res.data.list,
          isHiddenToast: false
        });
        console.log("请求成功了");
      },
      fail: function () {
        console.log("请求失败了");
      }
    });
  },
  // 下拉刷新
  upper: function (e) {
    console.log("下拉刷新了");
    this.requestData("newlist");
  },
  // 加载 
  lower: function (e) {
    console.log("加载更多了");
    this.requestData("list");
  },
  closeToast: function (e) {
    this.setData({
      isHiddenToast: true
    });
  }
})