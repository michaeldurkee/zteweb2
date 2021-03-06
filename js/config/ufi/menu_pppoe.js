define(function() {
    var needLogin = true;
    var menu = [
        // level 1 menu
        {
            hash:'#test',
            path:'adm/test',
            level:'1',
            requireLogin:false,
            checkSIMStatus:false
        } ,
        {
            hash:'#login',
            path:'login',
            level:'1',
            requireLogin:false,
            checkSIMStatus:false
        } ,
        {
            hash:'#home',
            path:'home',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:false
        } ,
        {
            hash:'#status',
            path:'status/device_info',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#sms',
            path:'sms/smslist',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#phonebook',
            path:'phonebook/phonebook',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#setting',
            path:'adm/quick_setting',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:true
        }

        // level 2 menu
        ,
        {
            hash:'#quick_setting',
            path:'adm/quick_setting',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#net_setting',
            path:'network/dial_setting_cpe',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#wifi',
            path:'wifi/wifi_basic',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#device_setting',
            path:'adm/password',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#firewall',
            path:'firewall/firewall',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#router_setting',
            path:'adm/lan',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
		{
            hash:'#ussd',
            path:'ussd/ussd',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#group_all',
            path:'phonebook/phonebook',
            level:'2',
            parent:'#phonebook',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#group_common',
            path:'phonebook/phonebook',
            level:'2',
            parent:'#phonebook',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#group_family',
            path:'phonebook/phonebook',
            level:'2',
            parent:'#phonebook',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#group_friend',
            path:'phonebook/phonebook',
            level:'2',
            parent:'#phonebook',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#group_colleague',
            path:'phonebook/phonebook',
            level:'2',
            parent:'#phonebook',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#traffic_alert',
            path:'status/traffic_alert',
            level:'2',
            parent:'#status',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#smslist',
            path:'sms/smslist',
            level:'2',
            parent:'#sms',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#sim_messages',
            path:'sms/sim_messages',
            level:'2',
            parent:'#sms',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#sms_setting',
            path:'sms/sms_setting',
            level:'2',
            parent:'#sms',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#ap_station',
            path:'wifi/ap_station',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        }
        // level 3 menu
        ,
        {
            hash:'#dial_setting',
            path:'network/dial_setting',
            level:'3',
            parent:'#net_setting',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#net_select',
            path:'network/net_select',
            level:'3',
            parent:'#net_setting',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#antenna',
            path:'network/antenna',
            level:'3',
            parent:'#net_setting',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#apn_setting',
            path:'network/apn_setting',
            level:'3',
            parent:'#net_setting',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash: '#net_info',
            path: 'network/net_info',
            level: '3',
            parent: '#net_setting',
            requireLogin: needLogin,
            checkSIMStatus: false
        },        
        {
            hash: '#net_info',
            path: 'network/net_info',
            level: '3',
            parent: '#net_setting',
            requireLogin: needLogin,
            checkSIMStatus: false
        },        
        {
            hash:'#wifi_main',
            path:'wifi/wifi_main',
            level:'3',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#wifi_guest',
            path:'wifi/wifi_guest',
            level:'3',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#station_info',
            path:'wifi/station_info',
            level:'3',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
	{
            hash:'#wifi_advance',
            path:'wifi/wifi_advance',
            level:'3',
            parent:'#wifi',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#wps',
            path:'wifi/wps',
            level:'3',
            parent:'#wifi',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
		{
            hash:'#mac_filter',
            path:'wifi/mac_filter',
            level:'3',
            parent:'#wifi',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#password_management',
            path:'adm/password',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#pin_management',
            path:'adm/pin',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#sleep_mode',
            path:'wifi/sleep_mode',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#port_filter',
            path:'firewall/port_filter',
            level:'3',
            parent:'#firewall',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
         {
         hash:'#port_forward',
         path:'firewall/port_forward',
         level:'3',
         parent:'#firewall',
         requireLogin:needLogin
         },
        {
            hash:'#port_map',
            path:'firewall/port_map',
            level:'3',
            parent:'#firewall',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#upnp',
            path:'firewall/upnp_setting',
            level:'3',
            parent:'#firewall',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#dmz',
            path:'firewall/dmz_setting',
            level:'3',
            parent:'#firewall',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
		{
		 hash:'#url_filter',
		 path:'firewall/url_filter',
		 level:'3',
		 parent:'#firewall',
		 requireLogin:needLogin
		},
        {
            hash:'#sleep_mode',
            path:'wifi/sleep_mode',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#others',
            path:'adm/others',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#ota_update',
            path:'update/ota_update',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#ddns',
            path:'ddns/ddns',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#parental_control',
            path:'firewall/parental_control',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:false
        }

    ];

    return menu;
});
