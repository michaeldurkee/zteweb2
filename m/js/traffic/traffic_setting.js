define(['service', 'jquery', 'config/config', "status_check"], function(service, $, config, status) {
    var $packageByTime;
    var $packageByData;
    var $packageType;
    var $packageTime;
    var $alertTimeReach;
    var $packageData;
    var $dataUnit;
	var $timeUnit;
    var $alertDataReach;
    var $alertTimeInfo;
    var $alertDataInfo;

    function init() {
        $packageByTime = $('#packageByTime');
        $packageByData = $('#packageByData');
        $packageType = $('#packageType');
        $packageTime= $('#packageTime');
        $alertTimeReach= $('#alertTimeReach');
        $packageData= $('#packageData');
        $alertDataReach= $('#alertDataReach');
        $dataUnit = $('#dataUnit');
		$timeUnit = $('#timeUnit');
        $alertTimeInfo = $('#alertTimeInfo');
        $alertDataInfo = $('#alertDataInfo');

        $packageType.off('change').on('change', function() {
            if($(this).val() == "1") {
                $packageByData.show();
                $packageByTime.hide();
            } else {
                $packageByData.hide();
                $packageByTime.show();
            }
        });

        $('#trafficBack').off('click').on('click', function() {
            if(config.isTrafficAlertSet) {
                window.location.hash = '#/traffic/view';
            } else {
                window.location.hash = '#/home';
            }
        });

        
        var info = service.getTrafficAlertInfo();
        initTrafficData(info);
        initEventsForAlertInfo();

        var $form = $('#frmTrafficSetting');
        $('#trafficSettingSave').off('click').on('click', function() {
            $form.submit();
        });

        $form.validate({
            submitHandler : function() {
                trafficSettingSave(info);
            },
            rules : {
                packageData : {
                    decimalRange : true,
					range : [ 1, 9999 ]
                    //digits : true,
                    //min : 1
                },
                packageTime : {
                    decimalRange : true,
					range : [ 1, 9999 ]
                    //digits : true,
                    //min : 1
                },
                alertDataReach : {
                    digits : true,
                    range : [ 1, 100 ]
                },
                alertTimeReach : {
                    digits : true,
                    range : [ 1, 100 ]
                }
            }
        });
    }

    function initEventsForAlertInfo() {
        $packageTime.off('keyup').on('keyup', function() {
            dealAlertTimeInfo();
            return true;
        });

        $alertTimeReach.off('keyup').on('keyup', function() {
            dealAlertTimeInfo();
            return true;
        });
		
		$timeUnit.off('change').on('change', function() {
            dealAlertTimeInfo();
            return true;
        });

        $packageData.off('keyup').on('keyup', function() {
            dealAlertDataInfo();
            return true;
        });

        $alertDataReach.off('keyup').on('keyup', function() {
            dealAlertDataInfo();
            return true;
        });

        $dataUnit.off('change').on('change', function() {
            dealAlertDataInfo();
            return true;
        });
    }

    function dealAlertTimeInfo() {
        var timeInfo = roundToTwoDecimalNumber($packageTime.val() * $alertTimeReach.val() / 100);
        if(isNaN(timeInfo) || timeInfo == 0) {
            $alertTimeInfo.hide();
        } else {
			$alertTimeInfo.text($.i18n.prop('traffic_alert_info', timeInfo + $.i18n.prop(getTimeUnit($timeUnit.val())))).show();          
        }
    }

    function dealAlertDataInfo() {
        var dataInfo = roundToTwoDecimalNumber($packageData.val() * $alertDataReach.val() / 100);
        if(isNaN(dataInfo) || dataInfo == 0) {
            $alertDataInfo.hide();
        } else {
            $alertDataInfo.text($.i18n.prop('traffic_alert_info', dataInfo + getTrafficSettingUnit($dataUnit.val()))).show();
        }
    }

    function trafficSettingSave(info) {
		var usedData = getDataInfo(transUnit(parseInt(info.monthlySent, 10) + parseInt(info.monthlyReceived, 10), false));
        if ($packageType.val() == "1" && $dataUnit.val() == '1' && usedData.unit == 'TB' && !(parseInt(usedData.data, 10) < parseInt('4096', 10))) {
            showAlert("traffic_over_note2",function(){
                $("#packageData").focus();
            });
        } else{
			showLoading();
            service.setTrafficAlertInfo({
                dataLimitChecked: "1",
                dataLimitTypeChecked: $packageType.val(),
                limitDataMonth: $packageData.val() + "_" + $dataUnit.val(),
                alertDataReach: parseInt($alertDataReach.val(), 10),
                limitTimeMonth: $timeUnit.val() == '60' ? $packageTime.val() / 60 : $packageTime.val(),//save by hours
                alertTimeReach: parseInt($alertTimeReach.val(), 10)
            }, function(data){
                if(data.result == 'success'){
                    status.setTrafficAlertPopuped(false);
                    config.isTrafficAlertSet = true;
                    successOverlay();
                } else {
                    errorOverlay();
                }
            }, function(data){
                errorOverlay();
            });
		}
    }

    function initTrafficData(info) {
        $packageType.val(info.dataLimitTypeChecked).trigger('change');
        var dataMonth = info.limitDataMonth.split("_");
        $packageData.val(dataMonth[0] || 0);
        $dataUnit.val(dataMonth[1] || 1);
        $alertDataReach.val(info.alertDataReach || 0);
		var timeMonth = transTimeUnit(info.limitTimeMonth || 0);
		$timeUnit.val(timeMonth.unit);
        $packageTime.val(timeMonth.data);
        $alertTimeReach.val(info.alertTimeReach || 0);

        var timeInfo = roundToTwoDecimalNumber($packageTime.val() * $alertTimeReach.val() / 100);
        if(timeInfo == 0) {
            $alertTimeInfo.hide();
        } else {
            $alertTimeInfo.text($.i18n.prop('traffic_alert_info', timeInfo + $.i18n.prop(getTimeUnit($timeUnit.val()))));
        }

        var dataInfo = roundToTwoDecimalNumber($packageData.val() * $alertDataReach.val() / 100);
        if(dataInfo == 0) {
            $alertDataInfo.hide();
        } else {
            $alertDataInfo.text($.i18n.prop('traffic_alert_info', dataInfo + getTrafficSettingUnit($dataUnit.val())));
        }
    }

    function getTrafficSettingUnit(val) {
        if (val == '1024') {
            return 'GB';
        } else if (val == '1048576') {
            return 'TB';
        } else {
            return 'MB';
        }
    }
	
    return {
        init: init
    }
});
