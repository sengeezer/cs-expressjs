function appendToList(blocks){
  var list = [], i, content, block;
  for(i in blocks){
    block = blocks[i];
    content = '<a href="/blocks/' + block + '">' + block + '</a>' + ' ' +
    '<a href="#" data-block="' + block + '">X</a>';
    list.push($('<li>', {html: content}));
  }
  $('.block-list').append(list);
};

function deleteItemListener() {
  $('.block-list').on('click', 'a[data-block]', function(ev) {
    ev.preventDefault();

    if(!confirm('Are you sure')) {
      return false;
    }

    var target = $(ev.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/blocks/' + target.data('block')
    }).done(function() {
      target.parents('li').remove();
    }).fail(function(err) {
      console.log('failed: ', err);
    });
  });
}

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
  deleteItemListener();
  formSubmit();
}

init();
