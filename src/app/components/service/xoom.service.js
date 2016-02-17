// Author - Dinesh Kumar
// Created on -  08-02-2015
// Deals with -  All DB and important information here
(function(){
	"use strict";

	angular.module('xoomwebapp')
	.service('$SpinnerService', [function () {
		var isSpinnerOn;
		this.busyOn = function () {
			if (!isSpinnerOn) {
				var spinnerImage = $('<div></div>').css({
					height: 60,
					width: 60,
					background: 'url(assets/images/busy.GIF)',
					'margin-top': 15,
					'margin-left': 20,
					'background-size': 'cover'
				});

				var spinnerText = $('<div>Loading...</div>').css({
					'margin-left': 72,
					'margin-top': 35
				});

				var spinnerBusy = $('<div></div')
				.attr({
					id: 'busySpinner'
				})
				.css({
					height: 100,
					width: 100,
					'background-color': '#fff',
					position: 'fixed',
					top: (window.innerHeight - 200) / 2,
					left: (window.innerWidth - 100) / 2,
					'z-index': 99999,
					'border-radius': '50%'
				});

				spinnerImage.appendTo(spinnerBusy);
            //spinnerText.appendTo(spinnerBusy);
            spinnerBusy.appendTo(document.body);

            $('<div></div>').attr({
            	id: 'busy',
            	fade_opacity: 500,
            	speed: 0.5
            }).css({
            	background: '#000',
            	height: $(document).height(),
            	left: '0px',
            	position: 'fixed',
            	top: '0px',
            	width: '100%',
            	zIndex: 9999
                //height:'100vh'
            }).appendTo(document.body).fadeTo(500, 0.8);

            $(window).bind('resize', function () {
            	$('#busy').css('height', $(document).height());
            	spinnerBusy.css({
            		top: (window.innerHeight - 200) / 2,
            		left: (window.innerWidth - 200) / 2
            	});
            });
            isSpinnerOn = true;
        }
    },

    this.busyOff = function () {
    	$('#busy').remove();
    	if ($('#busySpinner')) {
    		$.when(
    			$('#busySpinner').remove()
    			).done(function () {
    				isSpinnerOn = false;
    			});
    		}
        //isSpinnerOn = false;
        $('[rel="tooltip"]').tooltip();
    };

}]);
})();