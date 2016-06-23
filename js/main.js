
$(document).ready(function(){

// ===== ADD =====

	$('#index').val('');
	$('#title').val('');
	$('#html').val('');

// add data for existing tabs
	$('[name=One]').data( 'tab-data', { tabContent: 'Whatever you are, be a good one.' } );
	$('[name=Two]').data( 'tab-data', { tabContent: 'Never, never, never give up!' } );
	$('[name=Three]').data( 'tab-data', { tabContent: 'Don’t wait. The time will never be just right.' } );
	$('[name=Four]').data( 'tab-data', { tabContent: ' Do to others as you would have them do to you.' } );

// show data when page loaded
	$('.container').html( $('.tab').data( 'tab-data' ).tabContent );

// show data current tab in .container
	$('.tabs').on('click', '.tab', function(){
		$('.container').html( $(this).data( 'tab-data' ).tabContent );
	});



// add new tabs
$('#addBtn').on('click', function(){
	
	// check on empty fields
	if( $('#index').val() && $('#title').val() && $('#html').val() ){

	// save fields value
		var $index = $('#index').val();
		var $title = $('#title').val();
		var $html = $('#html').val();

	// create new tab
		var $newTab = $(`<li class="tab" name=${$title}>${$title}</li>`);

	// check one string
		$('.tabs').append( $newTab );
		var newTabWidth = $newTab.outerWidth(true);
		$newTab.remove();

		var $menuWidth = $('.tabs').width();
		var tabsWidth = 0;

		$('.tab').each( function(){
			tabsWidth += $(this).outerWidth(true);
		} );

		if( tabsWidth + newTabWidth >=  $menuWidth ){
			alert('No space for more tabs');
			return false;
		}

	// append new tab
		var $insertBeforeThis = $('.tab')[$index];

		if( $index >= $('.tab').length ){
			$('.tabs').append( $newTab );
		}else{
			$newTab.insertBefore( $insertBeforeThis );
		}

	// set data on new tab
		$(`li[name=${$title}]`).data( 'tab-data', { tabContent: $html } );

	// reset fields
		$('#index').val('');
		$('#title').val('');
		$('#html').val('');
	}else{
		alert( 'Complete all fields' );
	}

	return false;
});

// highlight active tab
$('.tabs').on('click', '.tab', function(){
	$('.tab').removeClass('active-tab');
	$(this).addClass('active-tab');
});

// complete inputs by data current tab
$('.tabs').on('click', '.tab', function(){
	$('#index').val( $( this ).index() );
	$('#title').val( $( this ).text() );
	$('#html').val( $( this ).data( 'tab-data' ).tabContent );
});

// hide aside
 $('.collapse').on('click',function(){
    $('aside').fadeToggle('slow');
    $(this).toggleClass('showBtn');

    if( $('.collapse').text() == 'Hide' ){
    	$('.collapse').text('Show');
    }else{
    	$('.collapse').text('Hide');
    }
 });       

// allow type only num in index
$("#index").keypress(function (e) {
     if ( e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) ) {
               return false;
    }
});

// ===== EDIT =====

$('#editBtn').on('click', function(){
	if( $('#index').val() && $('#title').val() && $('#html').val() ){

		// edit tab title and tab content
		$('.active-tab').text( $('#title').val() )
						.data('tab-data', { tabContent: $('#html').val()} );

		// edit tab position
		var $index = $('#index').val();
		var $insertBeforeThis = $('.tab')[$index];

		// if index more then all tabs length append
		if( $index >= $('.tab').length ){
			$('.tabs').append( $('.active-tab') );
		}else{
			$('.active-tab').insertBefore( $insertBeforeThis );
		}

		$('#index').val( $('.active-tab').index() );
		$('.container').html( $('.active-tab').data( 'tab-data' ).tabContent );
	}else{
		alert( 'Complete all fields' );
	}

	return false;
});

// ===== RESET =====

$('#resetBtn').on('click', function(){
	$('#index').val('');
	$('#title').val('');
	$('#html').val('');

	return false;
});

});