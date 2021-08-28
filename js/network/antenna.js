/**
 * 天线模块
 * @module AntennaSelect
 * @class AntennaSelect
 */
define(['jquery', 'knockout', 'config/config', 'service', 'underscore'],

function($, ko, config, service, _) {



    var selectAnteanna = _.map(config.ANTENNA_MODES, function(item) {
        return new Option(item.name, item.value);
    });

    /**
    * 选网功能view model
    * @class NetSelectVM
    */
    function AntennaSelectVM() {
        var self = this;

        self.typesAntenna = ko.observableArray(selectAnteanna);   
        self.selectedAntenna = ko.observable();
        var antennainfo = service.getAntennaMode();
        self.selectedAntenna(antennainfo.ant_mode);

       
        self.save = function() {
            showLoading();        
            var params = {};     
            params.ant_mode = self.selectedAntenna();
            service.setAntennaMode(params, function(result) {
                if (result.result == "success") {
                    successOverlay();
                } else {
                    errorOverlay();
                }

            });
        };

     };

   
    /**
    * 初始化选网功能view model
    * @method init
    */
    function init() {
        var container = $('#container');
        ko.cleanNode(container[0]);
        var vm = new AntennaSelectVM();
        ko.applyBindings(vm, container[0]);

    }

    return {
        init: init
    };
});

