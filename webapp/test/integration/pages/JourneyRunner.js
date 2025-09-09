sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"fe/fpm/action/test/integration/pages/ZI_TRAVEL_CEMain"
], function (JourneyRunner, ZI_TRAVEL_CEMain) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('fe/fpm/action') + '/index.html',
        pages: {
			onTheZI_TRAVEL_CEMain: ZI_TRAVEL_CEMain
        },
        async: true
    });

    return runner;
});

