/**
 * 选网模块
 * @module net_select
 * @class net_select
 */
define(['jquery', 'knockout', 'config/config', 'service', 'underscore'],

function($, ko, config, service, _) {

    var selectBIndicator = _.map(config.BAND_INDICATOR, function(item) {
        return new Option(item.name, item.value);
    });

    var selectBand = _.map(config.BAND_FREQ, function(item) {
        return new Option(item.name, item.value);
    });

    /**
    * 选网功能view model
    * @class NetSelectVM
    */
    function NetSelectVM() {
        var self = this;

        self.enableFlag = ko.observable(true);
        self.typesBAND = ko.observableArray(selectBand);
        //self.types = ko.observableArray(selectBIndicator);


        self.selectedBand = ko.observable();
        //self.selectMode = ko.observable();
        //self.networkList = ko.observableArray([]);
        //self.selectNetwork = ko.observable('');
        var netinfo = getNetInfo();
        self.CellIDName = ko.observable(netinfo.cell_id);
        //self.selectedIndicator = ko.observable(netStatus.lte_band);
        self.selectedIndicator = ko.observable(netinfo.lte_band);
        var netbandinfo = service.getNetBandInfo();
        var netbandinfo_list = netbandinfo.work_lte_band.split(",");
        var bandSelectdListT = [];
        for (var i = 0; i < 8; i++) {
            var haha1 = netbandinfo_list[i];
            var haha2 = parseInt(netbandinfo_list[i], 10);
            var list8 = parseInt(netbandinfo_list[i], 10).toString(2);
            var list8Length = list8.toString().length;
            for (var j = 0; j < 8; j++) {
                if (j < list8Length) {
                    bandSelectdListT[bandSelectdListT.length] = list8.charAt(list8Length - 1 - j);
                }
                else {
                    bandSelectdListT[bandSelectdListT.length] = "0";
                }

            }
        }
        self.bandSelectdList = bandSelectdListT;


        self.selectedBand(getBandIndex(bandSelectdListT));

        self.ping_google = ko.observable(netinfo.ping_google);
        if (netinfo.ping_google == "no") {
            self.enableFlag(false);
        } else {
            self.enableFlag(true);
        }




        //        self.networkStatus = function(data) {
        //            return $.i18n.prop(getNetworkStatus(data.nState));
        //        };

        //        self.networkStatusId = function(data) {
        //            return getNetworkStatus(data.nState);
        //        };

        //        self.networkText = function(data) {
        //            return data.strNumeric;
        //        };

        //        self.operatorName = function(data) {
        //            return data.strShortName;
        //        };

        //        self.networkType = function(data) {
        //            var result = getNetworkType(data.nRat);
        //            if (result == "auto")
        //                result = $.i18n.prop("auto");
        //            return result;
        //        };

        //        self.subnetworkType = function(data) {
        //            var result = getSubNetworkType(data.SubAct);
        //            return result;
        //        };

        //        self.networkTypeId = function(data) {
        //            return getNetworkType(data.nRat);
        //        };

        //        self.subnetTypeId = function(data) {
        //            return getSubNetworkType(data.SubAct);
        //        };

        //        self.networkValue = function(data) {
        //            var result = [];
        //            //strNumeric
        //            result.push(data.strNumeric);
        //            //nRat
        //            result.push(data.nRat);

        //            result.push(data.SubAct);
        //            return result.join(',');
        //        };

        /**
        * 自动选网时设置网络模式
        * @method save
        */
        self.save = function() {
            showLoading();

            //AutoSelect call SetBearerPreference
            var params = {};
            var haha = getBandListHex(self.selectedBand());
            params.work_lte_band = getBandListHex(self.selectedBand());

            if (self.ping_google() == "yes") {
                params.ping_google = "yes";
            }
            else {
                params.ping_google = "no";
            }


            service.setselectedband(params, function(result) {
                if (result.result == "success") {
                    successOverlay();
                } else {
                    errorOverlay();
                }

            });
        };

        /**
        * 手动搜网
        * @method search
        */
        //        self.search = function() {
        //            showLoading('searching_net');
        //            service.scanForNetwork(function(result, networkList) {
        //                hideLoading();
        //                if (result) {
        //                    self.networkList(networkList);
        //                    for (var i = 0; i < networkList.length; i++) {
        //                        var n = networkList[i];
        //                        if (n.nState == '2') {
        //                            self.selectNetwork(n.strNumeric + ',' + n.nRat + ',' + n.SubAct);
        //                            return;
        //                        }
        //                    }
        //                } else {
        //                    self.networkList([]);
        //                }
        //                self.fetchCurrentNetwork();
        //            });
        //        };

        /**
        * 注册选择的网络
        * @method register
        */
        //        self.register = function() {
        //            showLoading('registering_net');
        //            var networkToSet = self.selectNetwork().split(',');
        //            service.setNetwork(networkToSet[0], parseInt(networkToSet[1]), parseInt(networkToSet[2]), function(result) {
        //                if (result) {
        //                    self.networkList([]);
        //                    var autoType = getNetInfo();
        //                    self.selectedIndicator(autoType.net_band_indicator);
        //                    successOverlay();
        //                } else {
        //                    errorOverlay();
        //                }
        //                self.fetchCurrentNetwork();
        //            });
        //        };

        self.checkEnable = function() {
            var status = service.getStatusInfo();
            if (checkConnectedStatus(status.connectStatus) || status.connectStatus == "ppp_connecting") {
                self.enableFlag(false);
            }
            else {
                self.enableFlag(true);
            }
        };

        //init data
        self.checkEnable();
        var info = getNetInfo();
        //        if ("manual_select" == info.net_select_mode || "manual_select" == info.m_netselect_save) {
        //            self.selectMode("manual_select");
        //        }
        //        else {
        //            self.selectMode("auto_select");
        //        }

        self.selectedIndicator(info.lte_band);
        // self.selectedBand = (info.work_lte_band);


        //        self.fetchCurrentNetwork = function() {

        //        };
        /**
        * 重启
        * @method restart
        */
        self.restart = function() {
            showConfirm("restart_confirm", function() {
                restartDevice(service);
            });
        };

    }


    /**
    * 获取网络选择信息
    * @method getNetSelectInfo
    */
    function getNetInfo() {
        return service.getNetInfo();
    }

    function getBandListHex(selectBand) {
        if (selectBand == 13) {//1
            return "1,0,0,0,0,0,0,0";
        }
        else if (selectBand == 12) {//2
            return "2,0,0,0,0,0,0,0";
        }
        else if (selectBand == 11) {//4
            return "8,0,0,0,0,0,0,0";
        }
        else if (selectBand == 10) {//5
            return "16,0,0,0,0,0,0,0";
        }
        else if (selectBand == 9) {//12
            return "0,8,0,0,0,0,0,0";
        }
        else if (selectBand == 8) {//13
            return "0,16,0,0,0,0,0,0";
        }
        else if (selectBand == 7) {//17
            return "0,0,1,0,0,0,0,0";
        }
        else if (selectBand ==6) {//25
            return "0,0,0,1,0,0,0,0";
        }
        else if (selectBand == 5) {//26
            return "0,0,0,2,0,0,0,0";
        }
        else if (selectBand == 4) {//41/            
         return "0,0,0,0,0,1,0,0";
        }
        else if (selectBand == 3) {//2/4
            return "10,0,0,0,0,0,0,0";
        }
        else if (selectBand == 2) {//12/17
            return "0,8,1,0,0,0,0,0";
        }
        else {
            return "27,24,1,3,0,1,0,0";
        }

    }

    /**
    * 搜网结果中的状态转换为对应的语言项
    * @method getNetworkStatus
    * @param {String} status
    * @return {String}
    */
    //    function getNetworkStatus(status) {
    //        if ("0" == status) {
    //            return "unknown";
    //        } else if ("1" == status) {
    //            return "available";
    //        } else if ("2" == status) {
    //            return "current";
    //        } else if ("3" == status) {
    //            return "forbidden";
    //        }
    //    }

    /**
    * 网络类型转换
    * @method getNetworkType
    * @param {String} type
    * @return {String}
    */
    //    function getNetworkType(type) {
    //        if ("0" == type) {
    //            return "2G";
    //        } else if ("2" == type) {
    //            return "3G";
    //        } else if ("7" == type) {
    //            return "4G";
    //        } else {
    //            return "auto";
    //        }
    //    }

    /**
    * 子网络类型转换
    * @method getSubNetworkType
    * @param {String} type
    * @return {String}
    */
    //    function getSubNetworkType(type) {
    //        if ("0" == type) {
    //            return "TDD";
    //        } else if ("1" == type) {
    //            return "FDD";
    //        } else {
    //            return "";
    //        }
    //    }
    function getBandIndex(bandlist) {
        //        for (var i = 0; i < 64; i++) 
        //        {
        //        }
        if (bandlist[1] == "1" && bandlist[3] == "1" && bandlist[11] == "1" && bandlist[16] == "1" && bandlist[4] == "1" && bandlist[12] == "1"
            && bandlist[0] == "1" && bandlist[24] == "1" && bandlist[25] == "1" && bandlist[40] == "1")
        {
            return 1;
        }
        else if (bandlist[16] == "1" && bandlist[11] == "1" && bandlist[1] == "0" && bandlist[3] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 2;
        }
        else if (bandlist[1] == "1" && bandlist[3] == "1" && bandlist[11] == "0" && bandlist[16] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 3;
        }
        else if (bandlist[16] == "0" && bandlist[3] == "0" && bandlist[11] == "0" && bandlist[1] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                  && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "1") {
            return 4;
        }
        else if (bandlist[16] == "0" && bandlist[3] == "0" && bandlist[11] == "0" && bandlist[1] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                  && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "1" && bandlist[40] == "0") {
            return 5;
        }
        else if (bandlist[16] == "0" && bandlist[3] == "0" && bandlist[11] == "0" && bandlist[1] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
               && bandlist[0] == "0" && bandlist[24] == "1" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 6;
        }
        else if (bandlist[4] == "0" && bandlist[1] == "0" && bandlist[3] == "0" && bandlist[16] == "1" && bandlist[12] == "0" && bandlist[4] == "0"
         && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 7;
        }
        else if (bandlist[11] == "0" && bandlist[1] == "0" && bandlist[3] == "0" && bandlist[16] == "0" && bandlist[12] == "1" && bandlist[4] == "0"
                 && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 8;
        }
        else if (bandlist[11] == "1" && bandlist[1] == "0" && bandlist[3] == "0" && bandlist[16] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                 && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 9;
        }
        else if (bandlist[3] == "0" && bandlist[11] == "0" && bandlist[1] == "0" && bandlist[16] == "0" && bandlist[12] == "0" && bandlist[4] == "1"
                && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 10;
        }
        else if (bandlist[3] == "1" && bandlist[11] == "0" && bandlist[1] == "0" && bandlist[16] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 11;
        }
        else if (bandlist[3] == "0" && bandlist[11] == "0" && bandlist[1] == "1" && bandlist[16] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                && bandlist[0] == "0" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 12;
        }
        else if (bandlist[3] == "0" && bandlist[11] == "0" && bandlist[1] == "0" && bandlist[16] == "0" && bandlist[12] == "0" && bandlist[4] == "0"
                && bandlist[0] == "1" && bandlist[24] == "0" && bandlist[25] == "0" && bandlist[40] == "0") {
            return 13;
        }
        else {
            return 1;
        }
    }


    /**
    * 初始化选网功能view model
    * @method init
    */
    function init() {
        var container = $('#container');
        ko.cleanNode(container[0]);
        var vm = new NetSelectVM();
        ko.applyBindings(vm, container[0]);

        addInterval(vm.checkEnable, 1000);
    }

    return {
        init: init
    };
});
