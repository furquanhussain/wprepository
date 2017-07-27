/* global job_manager_ajax_file_upload */
jQuery(function($) {
	var upload_field_id;
	$('.wp-job-manager-file-upload').each(function(){
				console.log('IN');
		$(this).fileupload({
			dataType: 'json',
			dropZone: $(this),
			url: job_manager_ajax_file_upload.ajax_url.toString().replace( '%%endpoint%%', 'upload_file' ),
			maxNumberOfFiles: 1,
			formData: {
				script: true
			},
			add: function (e, data) {
				//console.log(data);
				// count upload for project upload files;
				upload_field_id = $( this ).attr('id');
				if($( this ).attr('id')=='project_image'){
					//console.log('ok');
					var upload_count = jQuery('#project_image').parent().find('.job-manager-uploaded-files').find('.job-manager-uploaded-file').length;
				if(upload_count=='4'){
					alert("Soryy! You can not upload more than 4 files.");
					return;
				}
			}
				var $file_field     = $( this );
				var $form           = $file_field.closest( 'form' );
				var $uploaded_files = $file_field.parent().find('.job-manager-uploaded-files');
				var uploadErrors    = [];

				// Validate type
				var allowed_types = $(this).data('file_types');

				if ( allowed_types ) {
					var acceptFileTypes = new RegExp( '(\.|\/)(' + allowed_types + ')$', 'i' );

					if ( data.originalFiles[0].name.length && ! acceptFileTypes.test( data.originalFiles[0].name ) ) {
						uploadErrors.push( job_manager_ajax_file_upload.i18n_invalid_file_type + ' ' + allowed_types );
					}
				}

				if ( uploadErrors.length > 0 ) {
					window.alert( uploadErrors.join( '\n' ) );
					upload_field_id='';
				} else {
					$form.find(':input[type="submit"]').attr( 'disabled', 'disabled' );
					data.context = $('<progress value="" max="100"></progress>').appendTo( $uploaded_files );
					data.submit();
					
				}
			},
			progress: function (e, data) {
				var progress        = parseInt(data.loaded / data.total * 100, 10);
				data.context.val( progress );
			},
			fail: function (e, data) {
				var $file_field     = $( this );
				var $form           = $file_field.closest( 'form' );

				if ( data.errorThrown ) {
					window.alert( data.errorThrown );
				}

				data.context.remove();

				$form.find(':input[type="submit"]').removeAttr( 'disabled' );
			},
			done: function (e, data) {
				console.log(data);  
				var $file_field     = $( this );
				var $form           = $file_field.closest( 'form' );
				var $uploaded_files = $file_field.parent().find('.job-manager-uploaded-files');
				var multiple        = $file_field.attr( 'multiple' ) ? 1 : 0;
				var image_types     = [ 'jpg', 'gif', 'png', 'jpeg', 'jpe' ];

				data.context.remove();
		//console.log(data.result.files); 
				$.each(data.result.files, function(index, file) {
					
					if ( file.error ) {
						window.alert( file.error );
					} else {
						var html;
						if ( $.inArray( file.extension, image_types ) >= 0 ) {
							if(upload_field_id=='project_image'){
							   getImgSize(file.url);
							 }
							html = $.parseHTML( job_manager_ajax_file_upload.js_field_html_img );
							$( html ).find('.job-manager-uploaded-file-preview img').attr( 'src', file.url );
							
						} else {
							html = $.parseHTML( job_manager_ajax_file_upload.js_field_html );
							//console.log(file.type);
							var strs = file.type;
							if(strs.indexOf("video")=='0'){
							var vv ='<iframe src="'+file.url+'" width="560" height="315" frameborder="0" allowfullscreen ></iframe>';
							 $( html ).find('.job-manager-uploaded-file-name code').html(vv);
							}else{
							  $( html ).find('.job-manager-uploaded-file-name code').text( file.name );
							}
						}

						$( html ).find('.input-text').val( file.url );
						$( html ).find('.input-text').attr( 'name', 'current_' + $file_field.attr( 'name' ) );

						if ( multiple ) {
							$uploaded_files.append( html );
						} else {
							$uploaded_files.html( html );
						}
						
						if(upload_field_id=='candidate_photo' || upload_field_id=='candidate_video'){
							$('.upload_btn_'+upload_field_id).hide();
						}
						if(upload_field_id=='project_image'){
							var upload_counts = jQuery('#project_image').parent().find('.job-manager-uploaded-files').find('.job-manager-uploaded-file').length;
							if(upload_counts=='4'){
								$('.upload_btn_'+upload_field_id).hide();
							}
						}
					}
				});

				$form.find(':input[type="submit"]').removeAttr( 'disabled' );
			}
		});
	});
});

function getImgSize(imgSrc){
    var newImg = new Image();
   // console.log(newImg);
    newImg.src = imgSrc;
     newImg.onload = function() {
     	if(this.width != this.height){
			alert ("Please upload a square picture and at least 400px X 400px");
			jQuery("img[src='"+imgSrc+"']").closest('.job-manager-uploaded-file').remove();
			jQuery('.upload_btn_project_image').show();
			}else if(this.width<400){
				alert ("Please upload a square picture and at least 400px X 400px");
			jQuery("img[src='"+imgSrc+"']").closest('.job-manager-uploaded-file').remove();
			jQuery('.upload_btn_project_image').show();
			}
    }
}
