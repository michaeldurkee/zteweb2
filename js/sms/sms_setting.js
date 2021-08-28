/**
 * 短信参数设置
 * @module sms_setting
 * @class sms_setting
 */
define([ 'underscore', 'jquery', 'knockout', 'config/config', 'service' ],
    function(_, $, ko, config, service) {

        var validityModes = _.map(config.SMS_VALIDITY, function(item) {
            return new Option(item.name, item.value);
        });

        function SmsSettingVM() {
            var self = this;
            var setting = getSmsSetting();
            self.modes = ko.observableArray(validityModes);
            self.selectedMode = ko.observable(setting.validity);
            self.centerNumber = ko.observable(setting.centerNumber);
            self.deliveryReport = ko.observable(setting.deliveryReport);

            self.clear = function() {
                init();
                clearValidateMsg();
            };
	        /**
	         * 保存设置
	         * @method save
	         */
            self.save = function() {
                showLoading('waiting');
                var params = {};
                params.validity = self.selectedMode();
                params.centerNumber = self.centerNumber();
                params.deliveryReport = self.deliveryReport();
                service.setSmsSetting(params, function(result) {
                    if (result.result == "success") {
                        successOverlay();
                    } else {
                        errorOverlay();
                    }
                });
            };
        }

        /**
         * 获取短信设置参数
         * @method getSmsSetting
         * @return {Object}
         */
        function getSmsSetting() {
            return service.getSmsSetting();
        }
	    /**
	     * 页面初始化
	     * @method init
	     */
        function init() {
            var container = $('#container');
            ko.cleanNode(container[0]);
            var vm = new SmsSettingVM();
            ko.applyBindings(vm, container[0]);
            $('#smsSettingForm').validate({
                submitHandler : function() {
                    vm.save();
                },
                rules: {
                    txtCenterNumber: "sms_service_center_check"
                }
            });
        }

        return {
            init : init
        };
    }
);
