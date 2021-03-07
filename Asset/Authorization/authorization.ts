import Ajax from '../Ajax/ajax';

/**
 * 授权
 */
export default class Authorization {
    private WX = null;
    
    /**
     * 构造函数
     * @constructor Authorization
     */
    constructor() {
        const _this = this;
        
        
    }
}

/**
 * 分享
 */
// (function () {
//     /*global setShareInfo wx*/
//     const share = {
//         title: '盖娅互娱2020年校招开启',
//         description: '解救伙伴，开启校招冒险之旅',
//         img: 'https://image.gaeamobile.net/image/20190904/115559/slogan.png',
//         url: location.href
//     };
//
//     $.getScript('https://qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js', () => {
//         if (typeof setShareInfo === 'undefined') return;
//
//         setShareInfo({
//             title: share.title,
//             summary: share.description,
//             pic: share.img,
//             url: location.href
//         });
//     });
//
//     GaeaAjax.encryptAjax(
//         'https://activity.gaeamobile.net/api/wechat-share',
//         {
//             gameId: '520017',
//             url: location.href
//         },
//         (result) => {
//             if (result.retCode !== 0) {
//                 console.log(result.retMsg);
//                 return;
//             }
//             $.getScript('https://res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
//                 if (typeof wx === 'undefined') return;
//
//                 wx.config({
//                     debug: false,
//                     appId: result.appId,
//                     timestamp: result.timestamp,
//                     nonceStr: result.nonceStr,
//                     signature: result.signature,
//                     jsApiList: ['checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline']
//                 });
//
//                 wx.ready(() => {
//
//                     //分享给好友
//                     wx.onMenuShareAppMessage({
//                         title: share.title,
//                         desc: share.description,
//                         link: share.url,
//                         imgUrl: share.img,
//                         type: 'link',
//                         dataUrl: '',
//                         success: function () {
//                         },
//                         cancel: function () {
//                         }
//                     });
//
//                     //分享至朋友圈
//                     wx.onMenuShareTimeline({
//                         title: share.title,
//                         link: share.url,
//                         imgUrl: share.img,
//                         trigger: function (res) {
//                         },
//                         success: function (res) {
//                         },
//                         cancel: function (res) {
//                         },
//                         fail: function (res) {
//                         }
//                     });
//
//                     //分享至QQ
//                     wx.onMenuShareQQ({
//                         title: share.title,
//                         desc: share.description,
//                         link: share.url,
//                         imgUrl: share.img,
//                         success: function () {
//                         },
//                         cancel: function () {
//                         }
//                     });
//
//                     //分享至QQ空间
//                     wx.onMenuShareQZone({
//                         title: share.title,
//                         desc: share.description,
//                         link: share.url,
//                         imgUrl: share.img,
//                         success: function () {
//                         },
//                         cancel: function () {
//                         }
//                     });
//
//                     //分享至腾讯微博
//                     wx.onMenuShareWeibo({
//                         title: share.title,
//                         desc: share.description,
//                         link: share.url,
//                         imgUrl: share.img,
//                         success: function () {
//                         },
//                         cancel: function () {
//                         }
//                     });
//
//                     //报错
//                     wx.error((res) => {
//                         console.log(res);
//                     });
//                 });
//             });
//         }
//     );
// })();
