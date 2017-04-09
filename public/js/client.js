function appendToList(blocks){
  var list = [], i, content, block;
  for(i in blocks){
    block = blocks[i];
    content = '<a href="/blocks/' + block + '">' + block + '</a>';
    list.push($('<li>', {html: content}));
  }
  $('.block-list').append(list);
};

function formSubmit() {
  $('form').on('submit', function(ev) {
    ev.preventDefault();
    var form = $(this);
    var blockData = form.serialize();

    $.ajax({
      type: 'POST',
      url: '/blocks',
      data: blockData
    }).done(function(blockName){
      appendToList([blockName]);
      form.trigger('reset');
    });
  });
}

function init(){
  $.get('/blocks', appendToList);
  formSubmit();
}

init();
