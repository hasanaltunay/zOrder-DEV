﻿(function () {
    angular
        .module('app', zk_modules)
        .config(
            function appConfig($urlRouterProvider, $stateProvider) {

            
            $stateProvider
                .state('/', {
                    url: '/',
                    views: {
                        '': {
                            templateUrl: 'GENERAL/Home/home.html',
                            controller: 'HomeController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {

                    }
                });
        })

        //ilk filter
        .filter('yesNo', function () {
            return function (input) {
                return input ? 'Evet' : 'Hayır';
            }
        })
        .filter('jsDate', function () {
            return function (x) {
                var jsonDateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
                var arr = jsonDateRE.exec(x);
                if (arr) {
                    // 0 - complete results; 1 - ticks; 2 - sign; 3 - minutes;
                    return new Date(parseInt(arr[1]));
                }
                return x;
            }
        })
        .filter('formatDate', function () {
            return function (formattedDate) {
                try {
                    formattedDate = new Date(formattedDate);
                    var d = formattedDate.getDate();
                    var m = formattedDate.getMonth();
                    m += 1; // javascript months are 0-11
                    m = ("00" + m).substr(("00" + m).length - 2);
                    d = ("00" + d).substr(("00" + d).length - 2);
                    var y = formattedDate.getFullYear();
                    return (d + "-" + m + "-" + y);
                } catch (e) {
                    return formattedDate;
                }
            }
        })
        .filter('chechSession', function () {
            return function ($state, $filter) {
                try {
                    if (localStorage.getItem('uk') == undefined) {
                        $filter("showInfo")($filter, 'Giriş yapınız', 1000, 'info');
                        $state.go("SignIn");
                    }

                } catch (e) {
                    console.log(e);
                }
            }
        })
        .filter('showInfo', function () {
            return function ($filter, msgtext, delay, msgtype) {
                try {
                    if (delay == undefined) delay = 2000;
                    $.notify({
                        icon: 'fa fa-info',
                        message: msgtext,
                    },
                        {
                            type: msgtype,
                            timer: delay
                        });
                } catch (e) {
                    console.log(e);
                }
            }
        })

    
})();
