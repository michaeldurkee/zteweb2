﻿define(function() {
    var needLogin = true;
    var menu = [
        // level 1 menu
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
            checkSIMStatus:true
        } ,
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
            path:'network/dial_setting',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#net_setting',
            path:'network/dial_setting',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:true
        },
        {
            hash:'#device_setting',
            path:'adm/pin',
            level:'2',
            parent:'#setting',
            requireLogin:needLogin,
            checkSIMStatus:true
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
            hash:'#pin_management',
            path:'adm/pin',
            level:'3',
            parent:'#device_setting',
            requireLogin:needLogin,
			checkSIMStatus:true
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
            hash:'#dmz',
            path:'firewall/dmz_setting',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:false
        },
        {
            hash:'#internet_setting',
            path:'network/internet_setting',
            level:'1',
            requireLogin:needLogin,
            checkSIMStatus:false
        }
    ];

    return menu;
});
