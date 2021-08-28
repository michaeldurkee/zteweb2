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
        HAS_USSD:false,// �Ƿ�֧��USSD����,
        WIFI_HAS_5G:false,
        FAST_BOOT_SUPPORT: true, //�Ƿ�֧�ֿ��ٿ���
        TURN_OFF_SUPPORT: true, //�Ƿ�֧�ֹػ�
        WIFI_SWITCH_SUPPORT: true,//�Ƿ�֧��wifi����	
		SMS_MATCH_LENGTH: 11,//������ϵ�˺���ƥ��λ����11������Ŀ��8������Ŀ
		WIFI_WEP_SUPPORT:true,//�Ƿ�֧��wifi WEP����
		HAS_BLACK_AND_WHITE_FILTER: true, //�Ƿ�֧�ֺڰ�����
		STATION_BLOCK_SUPPORT: true, // �������豸�Ƿ�֧��Block����
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
