var info_list_items = ["Make all sad classes into happy ones.",
"Make the annoying popup link point instead to http://www.cashcats.biz.",
"Change the positioning of the annoying popup so it is on the right side of the screen (it's okay to use direct CSS here). Make it 30 pixels lower than its current position by utilizing its current top value.",
"Replace the ellipsis ... in one of the suggested topics with content of your choice -- but do so by traversing from a different element.",
"Replace the form input with a \<textarea\> instead of a <input type=\"text\">."]

$(document).ready(function(){
  $('h1').text("Some thing cheeky.");
  $('.info-box').append('<ul id="info-ul">');
  info_list_items.forEach(function(list_item){
    var li = $("<li>").text(list_item);
    $('#info-ul').append(li);
  });
  $('.sad').addClass("happy").removeClass("sad");
  $('#annoying-popup a').attr('href', "http://www.cashcats.biz.");
  $('#annoying-popup').css({
    right: 0,
    top:"+=10"
  });
  $('.suggested-topics')
    .children()
    .filter('ul')
    .children()
    .filter(":contains(...)")
    .text("what the heck!");
  $('.input-form input[type=text]').replaceWith("<textarea>");
})