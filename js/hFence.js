function HFence(boardObj) {
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
        var wrapperHeight = 2 + lotHeight*0.1;
        
		htmlObj.style.width = lotWidth + "px";
		htmlObj.style.height = "2px";
		htmlObj.style.left = 0 + "px";
		htmlObj.style.top = (wrapperHeight/2) + "px";
        
        wrapperObj.style.height = wrapperHeight + "px";
        wrapperObj.style.width = lotWidth + "px";
		wrapperObj.style.left = (lotWidth * this.boardObj.x) + "px";
		wrapperObj.style.top = (lotHeight * this.boardObj.y) - (wrapperHeight/2) + "px";

	}
}