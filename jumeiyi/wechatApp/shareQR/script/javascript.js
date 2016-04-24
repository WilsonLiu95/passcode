$('.share-btn-1').on('click', function(event) {
  event.preventDefault();
  $('.share-btn-1').css('display','none');
  $('.share-btn-2').css('display','block');
  $('.share-btn-2').addClass('shareBtnAni');
});
$('.share-list-item').eq(2).on('click', function(event) {
  event.preventDefault();
  $('.share-btn-2').css('display','none');
  $('.share-btn-3').css('display','block');
});
