define(function() {
    var config = {
        WIFI_BANDWIDTH_SUPPORT: true,
        AP_STATION_SUPPORT: false,
        WIFI_BAND_SUPPORT: true,
        MAX_STATION_NUMBER: 32,
        WEBUI_TITLE: 'LTE CPE',
		HAS_MULTI_SSID: false,//多ssid功能
		HAS_URL:true,// 是否支持URL过滤,
		RJ45_SUPPORT:false,//是否支持rj45
        WIFI_SWITCH_SUPPORT: true,//是否支持wifi开关
		WIFI_SUPPORT_QR_SWITCH: false, //是否支持wifi二维码显示控制。
		WIFI_BANDWIDTH_SUPPORT_40MHZ: true, //频带宽度是否支持40MHZ,reltek芯片支持，博通芯片不支持
        SD_CARD_SUPPORT: false,//是否支持SD卡
		AUTO_MODES: [ {
            name: 'Automatic',
            value: 'NETWORK_auto'
        }, {
            name: '4G Only',
            value: 'Only_LTE'
        }, {
            name: '3G Only',
            value: 'Only_WCDMA'
        }/* , {
            name: '2G Only',
            value: 'Only_GSM'
        }*/],
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
