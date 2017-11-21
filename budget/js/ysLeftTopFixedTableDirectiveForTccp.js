/**
 * Created by whobird on 17/5/12.
 */
define(["angular","./app.directives","jquery","swiper"],function(angular,directives){

    directives.directive('ysLeftTopFixedTableForTccp', ["$timeout",
        function($timeout) {
            return {
                restrict: 'A',
                scope: {
                    //inputCheck:"&",
                    onSetTranslate: '&'
                },
                //require:"ngModel",
                transclude:true,
                replace:true,
                template: "<div ng-transclude></div>",
                link: function($scope, $element,attrs,ngModelCtrl) {
                    var pin,main_swiper,head_swiper;
                    var $top=$element.find(".ys-table-fixed-top");
                    var container=$element.get(0);
                    var topTable=$element.find(".ys-table-fixed-top .swiper-container").get(0);
                    var mainTable=$element.find(".ys-table-main .swiper-container").get(0);

                    function _initSwiper(){
                        head_swiper = new Swiper(topTable, {
                            //scrollbar: '.swiper-scrollbar',
                            direction: 'horizontal',
                            slidesPerView: 'auto',
                            //mousewheelControl: true,
                            freeMode: true,
                            scrollbarHide:true,
                            preventClicksPropagation:true
                        });
                        main_swiper = new Swiper(mainTable, {
                            scrollbar: '.swiper-scrollbar',
                            direction: 'horizontal',
                            slidesPerView: 'auto',
                            //mousewheelControl: true,
                            freeMode: true,
                            scrollbarHide:false,
                            preventClicksPropagation:true

                        });

                        head_swiper.params.control = main_swiper;
                        main_swiper.params.control = head_swiper;

                        $top.pin({
                            containerSelector: container,
                            padding: {top: 80, bottom: 50}
                        });
                    }

                    $scope.$on("initSwiper",function(){
                        _initSwiper();
                        $top.width($(mainTable.parentNode).width());
                        //页面事件
                        //这里暂时先禁掉 table的 tab键
                        document.onkeydown = function(){
                            console.log(event.keyCode);
                            if(event.keyCode == 13||event.keyCode == 9) {
                                return false;
                            }
                        };
                        $(".table").find("input").attr("tabIndex","-1");
                    });

                    $scope.$on("$destroy", function() {
                        //清除配置
                        if(head_swiper){
                            head_swiper.destroy(true,true);
                        }
                        if(main_swiper){
                            main_swiper.destroy(true,true);
                        }

                    });

                    //update by zhanghongen 17-11-10
                    $(window).resize(function(){
                        $top.width($(mainTable.parentNode).width());
                    })

                }//end link
            };
        }]);
});