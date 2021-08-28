define(function() {
    var config = {
		HAS_CASCADE_SMS: true,
        IPV6_SUPPORT: true,
		HAS_FOTA: true,
        WIFI_BAND_SUPPORT: true,
        WIFI_BANDWIDTH_SUPPORT: true,
        AP_STATION_SUPPORT: false,
		WDS_SUPPORT: true,
		WIFI_SWITCH_SUPPORT: true,
		WIFI_HAS_5G: false,
        WEBUI_TITLE: '3G CPE',
		NETWORK_MODES : [ {
			name : '802.11 b/g/n',
			value : '4'
		} ],
		NETWORK_MODES_BAND : [ {
			name : '802.11 a/n',
			value : '4'
		} ],
		sysLogModes : [{
			name : 'ALL',
			value : 'all'
		}, {
			name : 'WAN Connect',
			value : 'wan_connect'
		}, {
			name : 'SMS',
			value : 'sms'
		}, {
			name : 'tr069',
			value : 'tr069'
		}, {
			name : 'WLAN',
			value : 'wlan'
		}, {
			name : 'Router',
			value : 'router'
		}],
        AUTO_MODES: [ {
            name: 'Automatic',
            value: 'NETWORK_auto'
        }, {
            name: '3G Only',
            value: 'Only_WCDMA'
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
    }] ,
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
