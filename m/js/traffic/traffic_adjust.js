define(['service', 'jquery', 'status_check'], function(service, $, status) {
    var $adjustByTime;
    var $adjustByData;
    var $frmAdjust;
    var packageType;
    var $timeAdjust;
    var $dataAdjust;
    var $dataUnit;
	var $timeUnit;
	var packageData

    function initData() {
        var info = service.getTrafficAlertInfo();
        packageType = info.dataLimitTypeChecked;
		var dataMonth = info.limitDataMonth.split("_");
		packageData = {data : dataMonth[0] || 0, unit : dataMonth[1] || 1};
		
        if(packageType == "1") {
            var usedData = transUnit(parseInt(info.monthlySent, 10) + parseInt(info.monthlyReceived, 10), false);
            var dataInfo = getDataInfo(usedData);
            $dataAdjust.val(roundToTwoDecimalNumber(dataInfo.data));
            $dataUnit.val(getUnitValue(dataInfo.unit));
            $adjustByData.show();
        } else {
			var timeData = transTimeUnit(info.monthlyConnectedTime/3600);//s->m or h
            $timeAdjust.val(timeData.data);
			$timeUnit.val(timeData.unit);
            $adjustByTime.show();
        }
    }

    function getUnitValue(unit) {
        unit = unit.toUpperCase();
        if (unit == 'GB') {
            return '1024';
        } else if (unit == 'TB') {
            return '1048576';
        } else {
            return '1';
        }
    }

    function init() {
        $adjustByTime = $('#adjustByTime');
        $adjustByData = $('#adjustByData');
        $frmAdjust = $('#frmAdjust');
        $timeAdjust = $('#timeAdjust');
        $dataAdjust = $('#dataAdjust');
        $dataUnit = $('#dataUnit');
		$timeUnit = $('#timeUnit');

        initData();

        $('#adjustSave').off('click').on('click', function() {
            $frmAdjust.submit();
        });

        $frmAdjust.validate({
            submitHandler : function() {
                adjustSave();
            },
            rules : {
                timeAdjust : {
                    decimalRange : true,
					range : [ 0, 9999 ]
                },
                dataAdjust : {
                    decimalRange : true,
					range : [ 0, 9999 ]
                }
            }
        });
    }

    function adjustSave() {
        if (packageType == "1" && $dataUnit.val() == '1048576' && !(parseInt($dataAdjust.val(), 10) < parseInt('4096', 10)) && packageData.unit == '1') {
            showAlert("traffic_over_note1",function(){
                $("#dataAdjust").focus();
            });
        } else{
            showLoading();
            service.trafficCalibration({
                way: packageType,
                timeAdjust: $timeUnit.val() == '60' ? $timeAdjust.val()/60 : $timeAdjust.val(),//save by hours
                dataAdjust: $dataAdjust.val() * $dataUnit.val()
            }, function(data){
                if(data.result == 'success'){
                    status.setTrafficAlertPopuped(false);
                    successOverlay();
                } else {
                    errorOverlay();
                }
            }, function(data){
                errorOverlay();
            })
        }
    }
	
    return {
        init: init
    }
});
