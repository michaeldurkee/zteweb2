define(['service', 'config/config'], function(service, config) {
    var $ssidTypeContainer;
    var $ssidType;
    var $securityMode;
    var $ssid;
    var $pass;
	var $wepPass;
	var $selEncryptType;
	var $selWepKeyType;
    var infoMap = {};

    function initWifiInfo() {
        var info = service.getWifiBasic();
        drawSSIDTypeOption(info);
        initInfoMap('SSID1', info);
        initInfoMap('SSID2', info);
        setFormValues('SSID1');
    }

    function initInfoMap(type, info) {
        var prefix = type == 'SSID1'? '' : 'm_';
		infoMap[type] = {
            "ssid": info[prefix + "SSID"],
            "securityMode": info[prefix + "AuthMode"],
            "password": info[prefix + "passPhrase"],
            "broadcast": info[prefix + "broadcast"] == "1"? "1" : "0",
            "apIsolation": info[prefix + "apIsolation"] == "1"? "1" : "0",
            "selectedStation": info[prefix + "MAX_Access_num"],
				
            "encryptType": info[prefix + "encryptType"],
            "keyID": info[prefix + "keyID"],
            "Key1Str1": info[prefix + "Key1Str1"],
            "Key2Str1": info[prefix + "Key2Str1"],
            "Key3Str1": info[prefix + "Key3Str1"],
            "Key4Str1": info[prefix + "Key4Str1"]
        };
    }

    function drawSSIDTypeOption(info) {
        $ssidType.append('<option value="SSID1" data-trans="multi_ssid_1"></option>');
        if(info.multi_ssid_enable == "1"){
            $ssidType.append('<option value="SSID2" data-trans="multi_ssid_2"></option>')
        }
        $ssidType.translate();
    }

    function saveSSID() {
        var status = service.getWpsInfo();
        if (status.wpsFlag == '1') {
            showAlert('wps_on_info');
            return true;
        }

        showConfirm('wifi_disconnect_confirm', function(){
            if($ssidType.val() == 'SSID1') {
                saveSSID1Action();
            } else {
                saveSSID2Action();
            }
        });
    }

    function saveSSID1Action() {
        showLoading();
        var params = {};
        infoMap.SSID1.ssid = $ssid.val();
        infoMap.SSID1.securityMode = $securityMode.val();
        infoMap.SSID1.password = $pass.val();
        params.AuthMode = infoMap.SSID1.securityMode;
        params.passPhrase = infoMap.SSID1.password;
        params.SSID = infoMap.SSID1.ssid;
        params.broadcast = infoMap.SSID1.broadcast;
        params.station = infoMap.SSID1.selectedStation;
        params.cipher = params.AuthMode == "WPA2PSK" ? 1: 2;
        params.NoForwarding = infoMap.SSID1.apIsolation;
		if(config.WIFI_WEP_SUPPORT){
            if (params.AuthMode == "WPAPSK" || params.AuthMode == "WPA2PSK" || params.AuthMode == "WPAPSKWPA2PSK") {
            //params.encryptType = self.encryptType_WPA();
            } else if (params.AuthMode == "SHARED") {
                params.encryptType = "WEP";
            } else {
                params.encryptType = $selEncryptType.val();
            }
            params.wep_default_key = $selWepKeyType.val();
            params.wep_key_1 = infoMap['SSID1'].Key1Str1;	
            params.wep_key_2 = infoMap['SSID1'].Key2Str1;	
            params.wep_key_3 = infoMap['SSID1'].Key3Str1;
            params.wep_key_4 = infoMap['SSID1'].Key4Str1;
            var WEPSelect = '0';
            if($wepPass.val().length =='5' || $wepPass.val().length =='13'){
                WEPSelect = '1';	
            }else{
                WEPSelect = '0';	
            }
            if(params.wep_default_key =='1'){	
                params.wep_key_2 = $wepPass.val();
                params.WEP2Select = WEPSelect;
            }else if(params.wep_default_key =='2'){					
                params.wep_key_3 = $wepPass.val();
                params.WEP3Select = WEPSelect;
            }else if(params.wep_default_key =='3'){
                params.wep_key_4 = $wepPass.val();
                params.WEP4Select = WEPSelect;
            }else{
                params.wep_key_1 = $wepPass.val();					
                params.WEP1Select = WEPSelect;
            }
        }
        service.setWifiBasic(params, function (result) {
            if (result.result == "success") {
                successOverlay();
            } else {
                errorOverlay();
            }
        });
    }

    function saveSSID2Action() {
        showLoading();
        var params = {};
        infoMap.SSID2.ssid = $ssid.val();
        infoMap.SSID2.securityMode = $securityMode.val();
        infoMap.SSID2.password = $pass.val();
        params.m_AuthMode = infoMap.SSID2.securityMode;
        params.m_passPhrase = infoMap.SSID2.password;
        params.m_SSID = infoMap.SSID2.ssid;
        params.m_broadcast = infoMap.SSID2.broadcast;
        params.m_station = infoMap.SSID2.selectedStation;
        params.m_cipher = params.m_AuthMode == "WPA2PSK" ? 1: 2;
        params.m_NoForwarding = infoMap.SSID2.apIsolation;
		if(config.WIFI_WEP_SUPPORT){
            if (params.m_AuthMode == "WPAPSK" || params.m_AuthMode == "WPA2PSK" || params.m_AuthMode == "WPAPSKWPA2PSK") {
            //params.m_encryptType = self.encryptType_WPA();
            } else if (params.m_AuthMode == "SHARED") {
                params.m_encryptType = "WEP";
            } else {
                params.m_encryptType = $selEncryptType.val();
            }
            params.m_wep_default_key = $selWepKeyType.val();
            params.m_wep_key_1 = infoMap['SSID2'].Key1Str1;	
            params.m_wep_key_2 = infoMap['SSID2'].Key2Str1;	
            params.m_wep_key_3 = infoMap['SSID2'].Key3Str1;
            params.m_wep_key_4 = infoMap['SSID2'].Key4Str1;
            var WEPSelect = '0';
            if($wepPass.val().length =='5' || $wepPass.val().length =='13'){
                WEPSelect = '1';	
            }else{
                WEPSelect = '0';	
            }
            if(params.m_wep_default_key =='1'){	
                params.m_wep_key_2 = $wepPass.val();
                params.m_WEP2Select = WEPSelect;
            }else if(params.m_wep_default_key =='2'){					
                params.m_wep_key_3 = $wepPass.val();
                params.m_WEP3Select = WEPSelect;
            }else if(params.m_wep_default_key =='3'){
                params.m_wep_key_4 = $wepPass.val();
                params.m_WEP4Select = WEPSelect;
            }else{
                params.m_wep_key_1 = $wepPass.val();					
                params.m_WEP1Select = WEPSelect;
            }
        }
        service.setWifiBasic4SSID2(params, function (result) {
            if (result.result == "success") {
                successOverlay();
            } else {
                errorOverlay();
            }
        });
    }

    function setFormValues(type) {
        $ssid.val(infoMap[type].ssid);
		if(config.WIFI_WEP_SUPPORT){
			$selEncryptType.val(infoMap[type].encryptType == 'WEP' ? 'WEP' : 'NONE').trigger('change');
		    $selWepKeyType.val(infoMap[type].keyID).trigger('change');
		}
        $securityMode.val(infoMap[type].securityMode).trigger('change');
        $pass.val(infoMap[type].password);
    }

    function bindingEvent() {
        $ssidType.off('change').on('change', function() {
			$("#frmWifi").find("span[class='error']").hide();
            var val = $(this).val();
            setFormValues(val);
        });

        $securityMode.off('change').on('change', function() {
            var val = $(this).val();
            var $passContainer = $('#passContainer');
            var $openInfo = $('#openInfo');
            if(config.WIFI_WEP_SUPPORT){
			    $("#weppassContainer").find("span[class='error']").hide();
				var $wepkeyContainer = $('#wepkeyContainer');
                var $weppassContainer = $('#weppassContainer');
                var $openTypeContainer = $('#openTypeContainer');
                if(val == 'OPEN') {
                    $passContainer.hide();
                    $openTypeContainer.show();
                    var valType = $selEncryptType.val();
                    if(valType == 'NONE'){
                        $openInfo.show();
                        $wepkeyContainer.hide();
                        $weppassContainer.hide();
                    }else{
                        $openInfo.hide();
                        $wepkeyContainer.show();
                        $weppassContainer.show();
                    }
                } else if(val == 'SHARED'){
                    $passContainer.hide();
                    $openInfo.hide();
                    $openInfo.hide();
                    $wepkeyContainer.show();
                    $weppassContainer.show();
                    $openTypeContainer.hide();
                }else {
                    $passContainer.show();
                    $openInfo.hide();
                    $wepkeyContainer.hide();
                    $openTypeContainer.hide();
                    $weppassContainer.hide();
                }
            }else{
				if(val == 'OPEN'){
					$openInfo.show();
					$passContainer.hide();
                    $pass.val('');
				}else{
					$openInfo.hide();
					$passContainer.show();
				}
			}            
        });
		
		config.WIFI_WEP_SUPPORT && $selEncryptType.off('change').on('change', function() {
			var val = $(this).val();
            var $openInfo = $('#openInfo');
			var $wepkeyContainer = $('#wepkeyContainer');
			var $weppassContainer = $('#weppassContainer');
			var $openTypeContainer = $('#openTypeContainer');
			if(val == 'NONE'){
				$openInfo.show();
				$wepkeyContainer.hide();
				$weppassContainer.hide();
			} else{
				$("#weppassContainer").find("span[class='error']").hide();
				$openInfo.hide();
				$wepkeyContainer.show();
				$weppassContainer.show();
			}
		});
		
		config.WIFI_WEP_SUPPORT && $selWepKeyType.off('change').on('change', function() {
			$("#weppassContainer").find("span[class='error']").hide();
			var val = $(this).val();
			var type = $ssidType.val();
			$wepPass.val(val == '3' ? infoMap[type].Key4Str1 : (val == '2' ? infoMap[type].Key3Str1 : val == '1' ? infoMap[type].Key2Str1 : infoMap[type].Key1Str1));
		});
    }

    function init() {
        $ssidTypeContainer = $('#ssidTypeContainer');
        $ssidType = $('#ssidType');
        $ssid = $('#ssid');
        $pass = $('#pass');
        $selEncryptType = $('#selEncryptType');
        $selWepKeyType = $('#selWepKeyType');
        $wepPass = $("#wepPass");
        //$openTypeContainer = $('#openTypeContainer');
        //$wepkeyContainer = $('#wepkeyContainer');
        //$weppassContainer = $('#weppassContainer');
		
        if(config.HAS_MULTI_SSID) {
            $ssidTypeContainer.show();
        } else {
            $ssidTypeContainer.hide();
        }
		if(!config.WIFI_WEP_SUPPORT){
            $('#openTypeContainer').hide();
            $('#wepkeyContainer').hide();
            $('#weppassContainer').hide();
			$('#securityWEP').hide();
			$securityMode = $('#securityMode');
		}else{
			$('#security').hide();
			$securityMode = $('#securityModeWEP');
		}
        
		bindingEvent();
        initWifiInfo();

        var $form = $('#frmWifi');
        $('#wifiSave').click(function() {
            $form.submit();
        });

        $form.validate({
            submitHandler:function () {
                saveSSID();
            },
            rules:{
                ssid:'ssid',
                wepPass:{wifi_wep_password_check:true,wifi_password_check: true},
                pass:'wifi_password_check'
            }
        });
    }

    return {
        init: init
    }
});
