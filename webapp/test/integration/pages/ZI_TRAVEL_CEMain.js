sap.ui.define(['sap/fe/test/TemplatePage'], function(TemplatePage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new TemplatePage(
        'fe.fpm.action::ZI_TRAVEL_CEMain',
        CustomPageDefinitions
    );
});