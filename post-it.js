 // var Board = function( selector ) {
//   // Your board related code goes here
  
//   // Use $elem to access the DOM element for this board
//   var $elem = $( selector );
  
//   function initialize() {
//     // What needs to happen when this object is created?
//   };

//   initialize();
// };

// var PostIt = function() {
//   // Your post-it related code goes here
// };

// $(function() {
//   // This code will run when the DOM has finished loading
// });
function BM (){
  this.boardArray = [];
} 

BM.prototype = {
  addToArray: function(board){
    this.boardArray.push(board);
  }
}

var Board = function( selector ) {
  this.postItsGroup = []
  var $elem = $( selector );
};

Board.prototype = {

  renderBoard: function(){
    this.domElement = $("<div class='post_board'></div>");
    $('body').append(this.domElement);
  },

  clearBoard: function(){
    console.log(this)
    $(this).hide()
  },

  addpostIt: function(postIt) {
    this.postItsGroup.push(postIt);
    console.log(this.postItsGroup)
  },

  deletepostIt: function(postIt) {
    var i = this.postItsGroup.indexOf(postIt);
    this.postItsGroup.splice(i,1)
 }
}

var postIt = function() {
  this.content = ""
};

postIt.prototype = {
  renderpostIt: function(location) {
    this.domElement = $("<div class='post-it'></div>");
    var header = "<div class='header'><a href='#'> x </a></div>";
    var content = "<div class='content' contenteditable='true' >" + this.content + "</div>";
    this.domElement.append(header);
    this.domElement.append(content);
    this.domElement.position({
      of: event
    });
    $('.post_board').append(this.domElement);
  },

  renderContent: function(postIt) {
    this.content = postIt.val()
  }
}

$(function() {
  
  mgr = new BM 
  
  $('#new_board').on('click', function(){
    board = new Board('#board');
    mgr.addToArray(board)
    board.clearBoard()
    board.renderBoard();
    console.log(mgr.boardArray)
  })
  
  $(document).on('click', '.content', function(event){
     event.stopPropagation();
  })  

  $(document).on('click', '.post_board', function(e){
    var newone = new postIt()
    board.addpostIt(newone);
    newone.renderpostIt(e);
    $('.post-it').draggable({ handle: ".header"})
  })
  
  $(document).on('click', 'a', function(event){
    event.stopPropagation();
    board.deletepostIt($(this).closest('.post-it'))
    $(this).closest('.post-it').remove();
  });
});
