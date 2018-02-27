function VFence(boardObj) {
	Fence.call(this, boardObj);

	var updateVisualsSuper = this.updateVisuals;
	this.updateVisuals = function (board) {
		updateVisualsSuper.call(this, board);
		var wrapperObj = this.boardObj.htmlObj;
		var htmlObj = wrapperObj.firstChild;
		var sizeX = board.sizeX;
		var width = board.htmlBoard.offsetWidth;
		var sizeY = board.sizeY;
		var height = board.htmlBoard.offsetHeight;
        var lotWidth = width / sizeX;
        var lotHeight = height / sizeY;
        var wrapperWidth = 2 + lotWidth*0.1;
        
		htmlObj.style.width = "2px";
		htmlObj.style.height = lotHeight + "px";
		htmlObj.style.left = (wrapperWidth/2) + "px";
		htmlObj.style.top = 0 + "px";
        
        wrapperObj.style.width = wrapperWidth + "px";
        wrapperObj.style.height = lotHeight + "px";
		wrapperObj.style.left = (lotWidth * this.boardObj.x) - (wrapperWidth/2) + "px";
		wrapperObj.style.top = (lotHeight * this.boardObj.y) + "px";
        
	}
}