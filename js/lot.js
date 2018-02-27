function Lot(boardObj, topFence, bottomFence, leftFence, rightFence) {
	this.boardObj = boardObj;
	this.topFence = topFence;
	this.bottomFence = bottomFence;
	this.leftFence = leftFence;
	this.rightFence = rightFence;
	this.ownedBy = null;
}

Lot.prototype.isLotClosed = function () {
	return this.topFence.isDrawn && this.bottomFence.isDrawn && this.leftFence.isDrawn && this.rightFence.isDrawn;
}

Lot.prototype.updateLotOwner = function (player) {
	if (this.ownedBy === null && this.isLotClosed() === true) {
		this.ownedBy = player;
		player.score
		 += 1;
		return true;
	}
	return false;
}

Lot.prototype.updateVisuals = function (board) {
	var htmlObj = this.boardObj.htmlObj;
	if (this.ownedBy !== null) {
		htmlObj.style.backgroundColor = this.ownedBy.color;
	} else {
		htmlObj.style.backgroundColor = "lightgray";
	}
	var sizeX = board.sizeX;
	var width = board.htmlBoard.offsetWidth;
	var sizeY = board.sizeY;
	var height = board.htmlBoard.offsetHeight;
	var lotWidth = width / sizeX;
	var lotHeight = height / sizeY;
	htmlObj.style.zIndex = 0;
	htmlObj.style.width = lotWidth + "px";
	htmlObj.style.height = lotHeight + "px";
	htmlObj.style.position = "absolute";
	htmlObj.style.left = (lotWidth * this.boardObj.x) + "px";
	htmlObj.style.top = (lotHeight * this.boardObj.y) + "px";
}
