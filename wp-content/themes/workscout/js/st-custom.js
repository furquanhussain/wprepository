jQuery(".portfolio-img-link").magnificPopup({type: "image"});

	/* Show Invite modal */
	jQuery(document).on('click', '.st_job_invite_btn:not(.um-login-to-msg-btn)',function(e){
		if ( jQuery(this).attr('data-trigger_modal') && jQuery('.um-message-conv-view').is(':visible') ) return false;
		e.preventDefault();

		var candidate_id = jQuery(this).attr('data-candidate-id');
		
		jQuery('.um-message-conv-item').removeClass('active');
		jQuery(this).addClass('active');
		
		prepare_Modal();
		
		jQuery.ajax({
			url: um_scripts.ajaxurl,
			type: 'post',
			data: { action: 'st_invite_job_start', candidate_id: candidate_id },
			success: function(data){
				if ( data ) {
					show_Modal( data );
					responsive_Modal();
					autosize( jQuery('.um-message-textarea textarea:visible') );
				} else {
					remove_Modal();
				}
			},
			error: function(e){
				console.log(e);
			}
		});
		
		return false;
	});

	jQuery(document).on('click','.send-job-invitation-candidate', function(e){
		jQuery(this).html('Sending...');
		e.preventDefault();
		if ( jQuery(this).attr('data-trigger_modal') && jQuery('.um-message-conv-view').is(':visible') ) return false;

		var candidate_id = jQuery(this).attr('data-candidate-id');
		var employer_id = jQuery(this).attr('data-employer-id');
		var job_id = jQuery('[name="job_list"]').val();

		jQuery.ajax({
			url: um_scripts.ajaxurl,
			type: 'post',
			data: { action: 'st_send_job_invitation', candidate_id: candidate_id, employer_id: employer_id, job_id: job_id },
			success: function(data){
				
				var modalHtml = '<div class="um-message-modal">';
				modalHtml += '<div class="um-message-header um-popup-header"></div>';
				modalHtml += '<div class="um-message-body um-popup-autogrow2 um-message-autoheight"><div class="um-message-item">Job invitation is sent successfully.</div></div>';
				modalHtml += '<div class="um-message-footer um-popup-footer close-ok-btn"><a href="#" class="button um-message-hide um-tip-e">OK</a></div>';
				modalHtml += '</div>';

				show_Modal( modalHtml );
			},
			error: function(e){
				console.log(e);
			}
		});
		
		return false;
	});

	//jQuery('.chosen-select-job-list').chosen();
