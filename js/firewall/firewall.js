define([ 'jquery', 'knockout', 'config/config', 'service', 'underscore' ],

function($, ko, config, service, _) {

    function FirewallVM() {
        var self = this;
		self.hasUssd = config.HAS_USSD;
		self.hasUrlFilter = config.HAS_URL;
		self.hasUpdateCheck = config.HAS_UPDATE_CHECK;
		self.hasDdns = config.DDNS_SUPPORT;
    }

	function init() {
        var container = $('#container');
        ko.cleanNode(container[0]);
        var vm = new FirewallVM();
        ko.applyBindings(vm, container[0]);
    }

	return {
		init : init
	};
});