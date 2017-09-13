//index.js
//获取应用实例
var app = getApp()
Page( {
  data: {
    windowHeight: 654,
    maxtime: "",
    //控制加载view的显示
    isHiddenLoading: false,
    isHiddenToast: true,
   //datalist是存放item的数组
    dataList: {},
    //banner是存放轮播图的数组
    banner:{}
  },
  //事件处理函数
  onLoad: function() {
    this.setData( {
      //从本地缓存中同步获取指定 key 对应的内容,这里指获取windowHeight的值
      windowHeight: wx.getStorageSync( 'windowHeight' ),
      banner:[
        '../../images/banner1.png',
        '../../images/banner2.png'
        
      ]
    });
    //调用函数请求数据
    this.requestData( "newlist" );

  },
  requestData: function( a ) {
  var that = this;
    //  请求数据
    wx.request( {
      url: "http://api.budejie.com/api/api_open.php",
      //请求的参数
      data: {
        
        a: a,//将newlist作为参数
        c: "data",
        maxtime: that.data.maxtime,
        type: 29
      },
      method: "GET",
      success: function( res ) {
        console.log(res);
        that.setData( {
          //得到数据后。将加载view隐藏
          isHiddenLoading: true,
          //datalist设置为返回数据中的list，这样可以直接对item.profile_image、item.name、item.passtime、item.text等进行赋值
          dataList: res.data.list,
          maxtime: res.data.info.maxtime,
          //显示加载完成view
          isHiddenToast: false
        });
        console.log( "请求成功了" );
      },
      fail: function() {
        console.log( "请求失败了" );
        wx.navigateTo({
         url: '../logs/logs',
        })
      }
    });
  },
  // 下拉刷新,发起新的页面请求
  upper: function( e ) {
    console.log( "下拉刷新了" );
    this.requestData( "newlist" );
  },
  // 加载 
  lower: function( e ) {
    console.log( "加载更多了" );
    this.requestData( "list" );
  },
  closeToast: function( e ) {
    this.setData( {
      isHiddenToast: true
    });
  }
})
