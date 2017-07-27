// JavaScript Document
var sbwucv_admin;
;(function($){
	var w = $(window);
	sbwucv_admin = {
		init: function() {
			sbwucv_admin.accordion_init();
			sbwucv_admin.settings_form();
		},
		accordion_init: function() {
			$('body').on('click', '.handlediv, .hndle span, .sb-button-group a.edit', function() {
				sbwucv_admin.accordion($(this));
			});
		},
		accordion: function($this) {
			$this.closest('.postbox').children('.inside').slideToggle('fast', function(){
				$this.closest('.postbox').toggleClass('closed');
			});
		},
		settings_form: function() {
			$('body').on('submit', 'form.woo_update_cart_setting_form', function(e) {
				e.preventDefault();
				
				$this = $(this);
				
				var data = $this.serialize();
				var url = $this.attr('action');
				sbwucv_admin.sb_growl('Saving...');
				$('.btn-save-settings').attr('disabled', true);
				$this.find('.ajax-loader').show();
				$.ajax({
					type 	 :	'POST',
					url	 	 : 	url,
					data 	 : 	data,
					dataType :	'json',
					success	 :	function(response) {
						$('.btn-save-settings').attr('disabled', false);
						$this.find('.ajax-loader').hide();
						sbwucv_admin.sb_growl('Settings Saved.');
						sbwucv_admin.sb_growl_close(1000);
					}
				});
			});
		},
		sb_growl: function($msg) {
			$('.sb-message').fadeIn('fast');
			$('.sb-message').html($msg);
		},
		sb_growl_close: function(time) {
			setTimeout(function() {
				$('.sb-message').fadeOut('fast', function() {
					$('.sb-message').removeClass('fail');
				});
			}, time);
		}
	}
	sbwucv_admin.init();
})(jQuery);