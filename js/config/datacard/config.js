define(function() {
    var config = {
        INCLUDE_MOBILE: false,
        HAS_LOGIN:false,
        HAS_WIFI: false,
        HAS_BATTERY: false,
        GUEST_HASH: [],
        maxApnNumber: 10,
        WEBUI_TITLE: '4G Hostless Modem',
        WIFI_SUPPORT_QR_CODE: false,
        AP_STATION_SUPPORT:false,
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
        BAND_INDICATOR: [{
            name: '2',
            value: '2'
        }, {
            name: '4',
            value: '4'
        }, {
            name: '12',
            value: '12'
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
