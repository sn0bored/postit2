// MODEL
function PostIt(x, y, content) {
	this.x = x;
	this.y = y;
	this.content = content;
}


// VIEW
function Board(name, selector) {
	this.name = name;
	this.$element = $(selector);
}

Board.prototype = {
	addPostIt: function(postIt) {
		var $postIt = this.elementForPostIt(postIt);
		this.$element.append($postIt);
	},

	addToDOM: function() {
		var $button = $("<button id='" + this.name + "'>" + this.name + "</button><br>");
		var $div = $("<div class='post_board' id='" + this.name + "'></div><br>");

		$('#board_list').append($button);
		$('#board_selector').after($div);
	},

	show: function() {
		this.$element.show();
	},

	hide: function() {
		this.$element.hide();
	},

	elementForPostIt: function(postIt) {
    var $postIt = $("<div class='post-it'></div>");
    var header = "<div class='header'><a href='#'> x </a></div>";
    var content = "<div class='content' contenteditable='true'></div>";
    $postIt.append(header);
    $postIt.append(content);
    $postIt.find('.content').text(postIt.content);
    $postIt.css('left', postIt.x);
    $postIt.css('top', postIt.y);
    return $postIt;
  }
}


// CONTROLLER
// listen to events in the browser and take the right action
// work with various boards to render things
function Controller() {
	this.boards = {}; // keyed on board name
	this.initialize();
}

Controller.prototype = {
	initialize: function() {
		// use jQuery .on() function to listen for clicks on the buttons
		var self = this;
		$('#new_board').on('click', function(e) {
			var boardName = "board-"+Object.keys(self.boards).length;
			var board = new Board(boardName, "#"+boardName);
			self.addBoard(board);
		});

		$('#load_samples').on('click', function(e) {
			// iterate through SampleData, create a new board for each
			// and add post its as necessary`
		});

		$('#board_list').on('click', 'button', function(e) {
			self.hideAllBoards();
			self.boards[$(this).text()].show();
		});

		// bind to any click events (delegating) for any board
		// to place a postIt using e.pageX and e.pageY

		// bind to any close anchor tags
	},

	hideAllBoards: function() {
		for (var i in this.boards) {
			this.boards[i].hide();
		}
	},

	addBoard: function(board) {
		this.boards[board.name] = board;
		this.hideAllBoards();
		board.addToDOM();
		board.show();
	},

	getBoard: function(name) {
		return this.boards[name];
	}
}





$(function() {


	var controller = new Controller();
	// var board = new Board("my board", "#my-board");
	// controller.addBoard(board);
	// var postIt = new PostIt(220, 30, "hi, Daniel!");
	// board.addPostIt(postIt);

});
