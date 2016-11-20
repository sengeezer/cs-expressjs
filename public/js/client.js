function appendToList(blocks){
  var list = [], i;
  for(i in blocks){
    list.push($('<li>', {text: blocks[i]}));
  }
  $('.block-list').append(list);
};

function init(){
  $.get('/blocks', appendToList);
}

init();
