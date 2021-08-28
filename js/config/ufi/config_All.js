define(function() {
    var config = {
        PRODUCT_TYPE: 'UFI',
        LOGIN_SECURITY_SUPPORT: true,
        PASSWORD_ENCODE: true,
        HAS_MULTI_SSID: false,
        IPV6_SUPPORT: true,
        WIFI_BANDWIDTH_SUPPORT: true,
        WIFI_BAND_SUPPORT: true,
        MAX_STATION_NUMBER: 8,
        WEBUI_TITLE: '4G Mobile Hotspot',
        HAS_USSD:false,// 是否支持USSD功能,
        WIFI_HAS_5G:false,
        FAST_BOOT_SUPPORT: true, //是否支持快速开机
        TURN_OFF_SUPPORT: true, //是否支持关机
        WIFI_SWITCH_SUPPORT: true,//是否支持wifi开关	
		SMS_MATCH_LENGTH: 11,//短信联系人号码匹配位数，11国内项目，8国际项目
		WIFI_WEP_SUPPORT:true,//是否支持wifi WEP加密
		HAS_BLACK_AND_WHITE_FILTER: true, //是否支持黑白名单
		STATION_BLOCK_SUPPORT: true, // 已连接设备是否支持Block功能
		DDNS_SUPPORT: true,//DDNS
		TR069_SUPPORT: false,//TR069
        AUTO_MODES: [ {
            name: 'Automatic',
            value: 'NETWORK_auto'
        }, {
            name: '4G Only',
            value: 'Only_LTE'
        }, {
            name: '3G Only',
            value: 'TD_W'
        }, {
            name: '2G Only',
            value: 'Only_GSM'
        }],
        BAND_FREQ: [
    {
        name: '1',
        value: '13'
    },
    {
        name: '2',
        value: '12'
    },
    {
        name: '4',
        value: '11'
    },
    {
        name: '5',
        value: '10'
    },
    {
        name: '12',
        value: '9'
    },
    {
        name: '13',
        value: '8'
    },
     {
         name: '17',
         value: '7'
     },
     {
         name: '25',
         value: '6'
     },
     {
         name: '26',
         value: '5'
     },
     {
         name: '41',
         value: '4'
     },
     {
         name: '2/4',
         value: '3'
     },
    {
        name: '12/17',
        value: '2'
    },
    {
        name: '1/2/4/5/12/13/17/25/26/41',
        value: '1'
}]
    };

    return config;
});
