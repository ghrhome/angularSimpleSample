/**
 * Created by whobird on 17/11/21.
 */

var app=angular.module("app");
app.controller("budgetCtrl",["$rootScope","$scope","$timeout","dataPreloadService","dataSaveService",
    function($rootScope,$scope,$timeout,dataPreloadService,dataSaveService){
        var self=this;

        self.editMod=false;
        self.monthArr=["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];
        self.dropdownMenu={
            "budgetMod":{}
        }

        self.budgetType="";


        //modified data;
        self.sumData=[];
        self.tableData=[];

        self.modifiedData={
            project:"",
            year:"",
            data:[]
        }

        self.setBidMode=function(item){
            console.log(item);
        }

        self.edit=function($event){
            $event.preventDefault();
            console.log("-----------")
            self.editMod=true;
        };

        self.cancel=function($event){
            $event.preventDefault();
            self.editMod=false;
        };
        self.save=function($event){
            $event.preventDefault();
            self.editMod=false;
        };



        function _init(data){
            console.log(data);

            self.dropdownMenu.budgetMod=angular.copy(data.menuData.budgetTypes);
            self.sumData=angular.copy(data.sum);
            self.tableData=angular.copy(data.tableData)

            $rootScope.$broadcast("initSwiper");
        }
        dataPreloadService.getData("",_init);

        /*loading part*/
        self.loadingShow=false;

        $rootScope.loading_show=function(){
            self.loadingShow=true;
        };
        $rootScope.loading_hide=function(){
            self.loadingShow=false;
        };

        $scope.$on("loadingShow",function(){
            $rootScope.loading_show();
        });
        $scope.$on("loadingHide",function(){
            $rootScope.loading_hide();
        });

    }]);