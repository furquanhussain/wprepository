jQuery(document).ready(function($){
	tinymce.create('tinymce.plugins.obr_uc_plugin', {
		init : function(ed, url){
			// Register command for when button is clicked
			ed.addCommand('obr_check_credits', function(){
				selected = tinyMCE.activeEditor.selection.getContent();
				if (selected){
					content = '[obr_check_credits accesscost='+shortcode_variables.pagecost+' expiryminutes='+shortcode_variables.pageexpiry+']<p>'+selected+'</p>[obr_end_preview]<p>Actual protected content.</p>[/obr_check_credits]';
				} else {
					content = '[obr_check_credits accesscost='+shortcode_variables.pagecost+' expiryminutes='+shortcode_variables.pageexpiry+']<p>Preview of content.</p>[obr_end_preview]<p>Actual protected content.</p>[/obr_check_credits]';
				}
				tinymce.execCommand('mceInsertContent', false, content);
			});
			ed.addCommand('obr_add_credits', function(){
				selected = tinyMCE.activeEditor.selection.getContent();
				if (selected){
					content = '[obr_add_credits]'+selected;
				} else {
					content = '[obr_add_credits]';
				}
				tinymce.execCommand('mceInsertContent', false, content);
			});
			ed.addCommand('obr_display_balance', function(){
				selected = tinyMCE.activeEditor.selection.getContent();
				if (selected){
					content = '[obr_display_balance short=false singular="'+shortcode_variables.cm_db_singular+'" plural="'+shortcode_variables.cm_db_plural+'" showexpiry=false]'+selected;
				} else {
					content = '[obr_display_balance short=false singular="'+shortcode_variables.cm_db_singular+'" plural="'+shortcode_variables.cm_db_plural+'" showexpiry=false]';
				}
				tinymce.execCommand('mceInsertContent', false, content);
			});
			ed.addCommand('obr_page_button', function(){
				selected = tinyMCE.activeEditor.selection.getContent();
				if (selected){
					content = '[obr_page_button pageid=X access="Open Page" noaccess="Page Preview"]'+selected;
				} else {
					content = '[obr_page_button pageid=X access="Open Page" noaccess="Page Preview"]';
				}
				tinymce.execCommand('mceInsertContent', false, content);
			});

			// Register buttons - trigger above command when clicked
			ed.addButton('obr_uc_check_credits_button', {
				title : 'Insert [obr_check_credits] shortcode', 
				cmd : 'obr_check_credits', 
				image: url + '/images/obrcheckcredits.png'
			});
			ed.addButton('obr_uc_add_credits_button', {
				title : 'Insert [obr_add_credits] shortcode', 
				cmd : 'obr_add_credits', 
				image: url + '/images/obraddcredits.png'
			});
			ed.addButton('obr_uc_display_balance_button', {
				title : 'Insert [obr_display_balance] shortcode', 
				cmd : 'obr_display_balance', 
				image: url + '/images/obrdisplaybalance.png'
			});
			ed.addButton('obr_uc_page_button_button', {
				title : 'Insert [obr_page_button] shortcode', 
				cmd : 'obr_page_button', 
				image: url + '/images/obrpagebutton.png'
			});
		},
	});
	// Register our TinyMCE plugin
	tinymce.PluginManager.add('obr_uc_buttons', tinymce.plugins.obr_uc_plugin);
});