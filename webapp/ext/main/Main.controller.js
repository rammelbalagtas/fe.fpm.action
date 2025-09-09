sap.ui.define(
    [
        'sap/fe/core/PageController',
        'sap/m/MessageToast',
        'sap/ui/core/Fragment',
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/message/MessageType"
    ],
    function (PageController, MessageToast, Fragment, Controller, JSONModel, MessageType) {
        'use strict';

        return PageController.extend('fe.fpm.action.ext.main.Main', {
            oGlobalBusyDialog: new sap.m.BusyDialog(),
            oModel: JSONModel,
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf fe.fpm.action.ext.main.Main
             */
            //  onInit: function () {
            //      PageController.prototype.onInit.apply(this, arguments); // needs to be called to properly initialize the page controller
            //  },

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf fe.fpm.action.ext.main.Main
             */
            onBeforeRendering: function() {
                debugger;
            },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf fe.fpm.action.ext.main.Main
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf fe.fpm.action.ext.main.Main
             */
            //  onExit: function() {
            //
            //  }
            onPressReset: function () {
                var allFilters = [];
                const filterBar = this.getView()?.byId("FilterBar");
                const filters = filterBar.getFilters().filters[0];
                if (Array.isArray(filters?.getFilters())) {
                    allFilters = filters.getFilters();
                    // If filters[0] is an object, wrap it in an array and return
                } else if (filters) {
                    allFilters = [filters];
                }
                var Travels = [];
                if (allFilters) {
                    allFilters.forEach(filter => {
                        if (filter.getPath() === "Travel_ID") {
                            const travel = { operator: filter.sOperator, travel_id_low: filter.oValue1, travel_id_high: filter.oValue2 };
                            Travels.push(travel);
                        } else {
                        }
                    });
                }

                this.oGlobalBusyDialog.open();
                var oModel = this.getView().getModel();
                var oOperation = oModel.bindContext("/ZI_TRAVEL_CE/com.sap.gateway.srvd.zsd_travel_ce.v0001.resetAll(...)");
                //Success function to display success messages from OData Operation
                var fnSuccess = function (oResponse) {
                    this.oGlobalBusyDialog.close();
                    oModel.refresh();
                    //var oFilterBar = this.byId("FilterBar");
                    //oFilterBar.triggerSearch();
                }.bind(this);
                //Error function to display error messages from OData Operation
                var fnError = function (oError) {
                    this.oGlobalBusyDialog.close();
                }.bind(this);

                oOperation.setParameter("_travel", Travels);
                // Execute OData V4 operation i.e a static action to upload the file
                oOperation.invoke().then(fnSuccess, fnError)
            },
        });
    }
);
