/**
 * login 模块
 * @module login
 * @class login
 */
define([ 'jquery', 'knockout', 'config/config', 'service', 'underscore', 'config/menu', "logout"],
    function($, ko,config, service, _, menu, logout) {

        var pageState = {LOGIN:0, WAIT_PIN:1, WAIT_PUK:2, PUK_LOCKED:3, LOGGEDIN:4, LOADING:5};
        var timer = startLoginStatusInterval();
        var loginLockTimer = 0;
        /**
         * 定时检查登录状态
         * @class startLoginStatusInterval
         */
        function startLoginStatusInterval() {
            return setInterval(function () {
                var info = service.getStatusInfo();
                if (!info.isLoggedIn) {
                    gotoLogin();
                    return;
                }
                lastLoginStatus = service.getStatusInfo().isLoggedIn ? "1" : "0";
            }, 1000);
        }

        /**
         * loginViewModel
         * @class loginVM
         */
        function loginVM() {
            var self = this;
            var data = service.getLoginData();
            var loginStatus = service.getLoginStatus();
            self.password = ko.observable();
            self.PIN = ko.observable();
            self.PUK = ko.observable();
            self.newPIN = ko.observable();
            self.confirmPIN = ko.observable();
            self.pinNumber = ko.observable(data.pinnumber);
            self.pukNumber = ko.observable(data.puknumber);
            self.loginCount = ko.observable(0);
            self.loginSecuritySupport = ko.observable(config.LOGIN_SECURITY_SUPPORT);
            self.leftSeconds = ko.observable(0);
            self.accountLocked = ko.computed(function () {
                return self.loginCount() == config.MAX_LOGIN_COUNT && self.leftSeconds() != '-1';
            });
            self.uiLoginTimer = ko.observable(300);
            self.leftUnlockTime = ko.computed(function () {
                self.leftSeconds();
                var formatted = transSecond2Time(self.uiLoginTimer());
                return formatted.substring(formatted.indexOf(':') + 1, formatted.length);
            });

            self.showEntrance = ko.observable(false);
            self.sharePathInvalid = ko.observable(false);
            if(config.SD_CARD_SUPPORT){
                service.getSDConfiguration({}, function (data) {
                    self.showEntrance(data.sd_status == "1" && data.share_status == "1" && data.sd_mode == "0");
                    if(self.showEntrance()){
                        service.checkFileExists({
                            path: data.share_file
                        }, function (data1) {
                            if (data1.status == 'exist' || data1.status == 'processing') {
                                self.sharePathInvalid(false);
                            } else {
                                self.sharePathInvalid(true);
                            }
                        });
                    }
                });
            }

            var state = computePageState(loginStatus, data);
            self.pageState = ko.observable(state);
            if (state == pageState.LOADING) {
                addTimeout(refreshPage, 500);
            }
            setFocus();

            /**
             * login 事件处理
             * @event login
             */
            self.login = function () {
                if(config.LOGIN_SECURITY_SUPPORT && self.accountLocked()){
                    showAlert("password_error_account_lock_time", function () {
                        setFocus();
                    });
                    return false;
                }
                self.pageState(pageState.LOADING);
                window.clearInterval(timer);
                service.login({
                    password:self.password()
                }, function (data) {
                    setTimeout(function () {
                        timer = startLoginStatusInterval();
                    }, 1300);
                    if (data.result) {
                        self.pageState(pageState.LOGGEDIN);
                        if(config.LOGIN_SECURITY_SUPPORT){
                            self.loginCount(0);
                            self.uiLoginTimer(300);
                            clearInterval(loginLockTimer);
                        }
                        $("#container").empty();
                        window.location.hash = "#home";
                        logout.init();
                    } else {
                        self.password("");
                        if(config.LOGIN_SECURITY_SUPPORT){
                            self.checkLoginData(function(){
                                if (self.loginCount() == config.MAX_LOGIN_COUNT) {
                                    showAlert("password_error_five_times", function () {
                                        setFocus();
                                    });
                                    self.startLoginLockInterval();
                                } else {
                                    showAlert({msg: 'password_error_left', params: [config.MAX_LOGIN_COUNT - self.loginCount()]}, function () {
                                        setFocus();
                                    });
                                }
                            });
                        }else {
                            showAlert("password_error", function () {
                                setFocus();
                            });
                        }
                        self.pageState(pageState.LOGIN);
                    }
                });
            };

            /**
             * 启动倒计时定时器。
             * @method startLoginLockInterval
             */
            self.startLoginLockInterval = function () {
                loginLockTimer = setInterval(function () {
                    service.getLoginData({}, function (data) {
                        if (data.login_lock_time <= 0 || data.psw_fail_num_str == 5) {
                            self.loginCount(0);
                            clearInterval(loginLockTimer);
                        }
                        if(self.leftSeconds() != data.login_lock_time){
                            self.leftSeconds(data.login_lock_time);
                            self.uiLoginTimer(data.login_lock_time);
                        } else {
                            self.uiLoginTimer(self.uiLoginTimer() > 0 ? self.uiLoginTimer() - 1 : 0);
                        }
                    });
                }, 1000);
            };
            /**
             * 获取登录相关数据
             * @method checkLoginData
             */
            self.checkLoginData = function(cb){
                service.getLoginData({}, function(r){
                    var failTimes = parseInt(r.psw_fail_num_str, 10);
                    self.loginCount(config.MAX_LOGIN_COUNT - failTimes);
                    self.leftSeconds(r.login_lock_time);
                    self.uiLoginTimer(r.login_lock_time);
                    if($.isFunction(cb)){
                        cb();
                    } else if (self.loginCount() == config.MAX_LOGIN_COUNT) {
                        self.startLoginLockInterval();
                    }
                });
            };

            self.checkLoginData();

            /**
             * 验证输入PIN事件处理
             *
             * @event enterPIN
             */
            self.enterPIN = function () {
                self.pageState(pageState.LOADING);
                var pin = self.PIN();
                service.enterPIN({
                    PinNumber:pin
                }, function (data) {
                    if (!data.result) {
                        showAlert("pin_error", function () {
                            refreshPage();
                        });
                        self.PIN('');
                    } else {
                        refreshPage();
                    }
                });
            };

            /**
             * 输入PUK设置新PIN事件处理
             *
             * @event enterPUK
             */
            self.enterPUK = function () {
                self.pageState(pageState.LOADING);
                var newPIN = self.newPIN();
                var confirmPIN = self.confirmPIN();
                var params = {};
                params.PinNumber = newPIN;
                params.PUKNumber = self.PUK();
                service.enterPUK(params, function (data) {
                    if (!data.result) {
                        showAlert("puk_error", function () {
                            refreshPage();
                        });
                        self.PUK('');
                        self.newPIN('');
                        self.confirmPIN('');
                    } else {
                        refreshPage();
                    }
                });
            };
            /**
             * 刷新页面状态
             *
             * @method refreshPage
             */
            function refreshPage() {
                var data = service.getLoginData();
                var loginStatus = service.getLoginStatus();
                var state = computePageState(loginStatus, data);
                if (state == pageState.LOADING) {
                    addTimeout(refreshPage, 500);
                } else {
                    self.pageState(state);
                    self.pinNumber(data.pinnumber);
                    self.pukNumber(data.puknumber);
                }
                setFocus();
            }

            function setFocus(){
                setTimeout(function () {
                    var txtPwd = $('#txtPwd:visible');
                    var txtPIN = $('#txtPIN:visible');
                    var txtPUK = $('#txtPUK:visible');
                    if (txtPwd.length > 0) {
                        txtPwd.focus();
                    } else if (txtPIN.length > 0) {
                        txtPIN.focus();
                    } else if (txtPUK.length > 0) {
                        txtPUK.focus();
                    }
                }, 100);
            }

            /**
             * 根据登录状态和SIM卡状态设置页面状态
             * @method computePageState
             */
            function computePageState(loginStatus, data) {
                //PX-880 先登录再进行PIN验证，由于router设计原因，登录后，PIN验证不在登录页面进行，和数据卡的验证保持一致。
                if (config.LOGIN_THEN_CHECK_PIN) {
                    return checkPinAfterLogin(loginStatus, data);
                } else {
                    return loginAfterCheckPin(loginStatus, data);
                }
            }
            /**
             * 根据登录状态和SIM卡状态返回页面状态
             * @method checkPinAfterLogin
             */
            function checkPinAfterLogin(loginStatus, data) {
                if (loginStatus.status == "loggedIn") {
                    if (state == "modem_waitpin") {
                        return pageState.WAIT_PIN;
                    } else if ((state == "modem_waitpuk" || data.pinnumber == 0) && (data.puknumber != 0)) {
                        return pageState.WAIT_PUK;
                    } else if ((data.puknumber == 0 || state == "modem_sim_destroy")
                        && state != "modem_sim_undetected" && state != "modem_undetected") {
                        return pageState.PUK_LOCKED;
                    } else {
                        return pageState.LOGGEDIN;
                    }
                } else {
                    var state = data.modem_main_state;
                    if ($.inArray(state, config.TEMPORARY_MODEM_MAIN_STATE) != -1) {
                        return pageState.LOADING;
                    } else {
                        return pageState.LOGIN;
                    }
                }
            }
            /**
             * 根据登录状态和SIM卡状态返回页面状态
             * @method loginAfterCheckPin
             */
            function loginAfterCheckPin(loginStatus, data) {
                if (loginStatus.status == "loggedIn") {
                    return pageState.LOGGEDIN;
                } else {
                    var state = data.modem_main_state;
						if ($.inArray(state, config.TEMPORARY_MODEM_MAIN_STATE) != -1) {
							return pageState.LOADING;
						} else if (state == "modem_waitpin") {
							return pageState.WAIT_PIN;
						} else if ((state == "modem_waitpuk" || parseInt(data.pinnumber) === 0) && (parseInt(data.puknumber) != 0)) {
							return pageState.WAIT_PUK;
						} else if ((parseInt(data.puknumber) === 0 || state == "modem_sim_destroy") && state != "modem_sim_undetected" && state != "modem_undetected") {
							return pageState.PUK_LOCKED;
						} else {
							return pageState.LOGIN;
					}                    
                }
            }
        }

        /**
         * 初始化ViewModel
         *
         * @method init
         */
        function init() {
            var info = service.getStatusInfo();
            if (info.isLoggedIn) {
                window.location.hash = '#home';
                return;
            }

            var container = $('#container')[0];
            ko.cleanNode(container);
            var vm = new loginVM();
            ko.applyBindings(vm, container);

            $('#frmLogin').validate({
                submitHandler:function () {
                    vm.login();
                },
                rules: {
                    txtPwd: 'login_password_length_check'
                }
            });
            $('#frmPIN').validate({
                submitHandler:function () {
                    vm.enterPIN();
                },
                rules:{
                    txtPIN:"pin_check"
                }
            });
            $('#frmPUK').validate({
                submitHandler:function () {
                    vm.enterPUK();
                },
                rules:{
                    txtNewPIN:"pin_check",
                    txtConfirmPIN:{equalToPin:"#txtNewPIN"},
                    txtPUK:"puk_check"
                }
            });
        }
        /**
         * 检查当前window.location.hash，异常则跳转到index.html
         *
         * @method gotoLogin
         */
        function gotoLogin() {
            if (window.location.hash != config.defaultRoute && _.indexOf(config.GUEST_HASH, window.location.hash) == -1) {
                if (!manualLogout && lastLoginStatus == "1") {
                    manualLogout = false;
                    lastLoginStatus = 'UNREAL';
                    showAlert('need_login_again', function () {
                        window.location = "index.html";
                    });
                } else if (lastLoginStatus == 'UNREAL') {
                    //do nothing, only popup need_login_again alert one time
                    return;
                } else {
                    window.location = "index.html";
                }
            }
        }

        return {
            init:init,
            gotoLogin:gotoLogin
        };
    });