function Fence(boardObj) {
	var self = this;
	this.boardObj = boardObj;
	this.isDrawn = false;
    this.htmlWrapper = boardObj.htmlObj;
    this.htmlObj = boardObj.htmlObj.firstChild;

	this.draw = function (player) {
		this.isDrawn = true;
		board.updateGameState(player);
	}

	boardObj.htmlObj.onclick = function () {
		if (!self.isDrawn) {
			var player = board.getCurrentPlayer();
			self.draw(player);
		}
	}

	this.updateVisuals = function (board) {
		var htmlWrapper = this.htmlWrapper;
		var htmlObj = this.htmlObj;
		var sizeX = board.sizeX;
		var width = board.htmlBoard.offsetWidth;
		var sizeY = board.sizeY;
		var height = board.htmlBoard.offsetHeight;
		var lotWidth = width / sizeX;
		var lotHeight = height / sizeY;
        var backgroundColor;
        var zIndex;
        var isDrawn = this.isDrawn;
		htmlObj.style.position = "absolute";
		if (isDrawn) {
			backgroundColor = "black";
			zIndex = 42;
		} else {
			backgroundColor = "white";
			zIndex = 41;
		}
		htmlObj.style.backgroundColor = backgroundColor;
		htmlObj.style.zIndex = zIndex;
		htmlObj.style.left = (lotWidth * this.boardObj.x) + "px";
		htmlObj.style.top = (lotHeight * this.boardObj.y) + "px";
        
        htmlWrapper.style.cursor = "pointer";
        
        htmlWrapper.onmouseout = function(){
            htmlObj.style.backgroundColor = backgroundColor;
        }
        
        htmlWrapper.onmouseover = function(){
            if(!isDrawn){
                htmlObj.style.backgroundColor = "yellow";
            }
        }
	}
}