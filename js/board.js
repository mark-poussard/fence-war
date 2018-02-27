function Board() {
	this.hFences = [];
	this.vFences = [];
	this.lots = [];

	this.sizeX = 0;
	this.sizeY = 0;

	this.players = [];
	this.currentPlyr = 0;
	this.nbPlayers = 0;

}
Board.prototype.initBoard = function (htmlBoard, htmlHeader, sizeX, sizeY, nbPlayers) {
	this.currentPlyr = 0;
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.htmlBoard = htmlBoard;
	this.htmlHeader = htmlHeader;
	this.nbPlayers = nbPlayers;

	this.players = this.generatePlayers(nbPlayers);
	this.hFences = this.createHFences(sizeX, sizeY);
	this.vFences = this.createVFences(sizeX, sizeY);
	this.lots = this.createLots(sizeX, sizeY);

	this.setBorders();
	this.updateGameVisuals();
}

Board.prototype.generatePlayers = function (nbPlayers) {
	var players = [];
	var i;
	for (i = 0; i < nbPlayers; i++) {
		let htmlPlayer = this.generatePlayerHtml();
		players.push(new Player(i, htmlPlayer));
	}
	return players;
}

Board.prototype.generatePlayerHtml = function () {
	var htmlPlayer = document.createElement("span");
	this.htmlHeader.appendChild(htmlPlayer);
	return htmlPlayer;
}

Board.prototype.setBorders = function () {
	var sizeX = this.sizeX;
	var sizeY = this.sizeY;
	var i;
	for (i = 0; i < sizeX; i++) {
		this.hFences[0][i].isDrawn = true;
		this.hFences[sizeY][i].isDrawn = true;
	}
	for (i = 0; i < sizeY; i++) {
		this.vFences[i][0].isDrawn = true;
		this.vFences[i][sizeX].isDrawn = true;
	}
}

Board.prototype.createHFences = function (sizeX, sizeY) {
	var hFences = [];
	var j;
	var i;
	for (j = 0; j < sizeY + 1; j++) {
		hFences[j] = [];
		for (i = 0; i < sizeX; i++) {
			let htmlHFence = this.createHtmlHFence();
			let goHFence = new BoardElement(i, j, htmlHFence);
			hFences[j].push(new HFence(goHFence));
		}
	}
	return hFences;
}

Board.prototype.createHtmlHFence = function () {
	var fenceWrapper = document.createElement("div");
	var hFence = document.createElement("div");
	hFence.classList.add("hFence");
	fenceWrapper.appendChild(hFence);
	this.htmlBoard.appendChild(fenceWrapper);
	return fenceWrapper;
}

Board.prototype.createVFences = function (sizeX, sizeY) {
	var vFences = [];
	var j;
	var i;
	for (j = 0; j < sizeY; j++) {
		vFences[j] = [];
		for (i = 0; i < sizeX + 1; i++) {
			let htmlVFence = this.createHtmlVFence();
			let goVFence = new BoardElement(i, j, htmlVFence);
			vFences[j].push(new VFence(goVFence));
		}
	}
	return vFences;
}

Board.prototype.createHtmlVFence = function () {
	var fenceWrapper = document.createElement("div");
	var vFence = document.createElement("div");
	vFence.classList.add("vFence");
	fenceWrapper.appendChild(vFence);
	this.htmlBoard.appendChild(fenceWrapper);
	return fenceWrapper;
}

Board.prototype.createLots = function (sizeX, sizeY) {
	var lots = [];
	var j;
	for (j = 0; j < sizeY; j++) {
		lots.push(this.createLotLine(sizeX, j));
	}
	return lots;
}

Board.prototype.createLotLine = function (sizeX, j) {
	var topFences = this.hFences[j];
	var bottomFences = this.hFences[j + 1];
	var lineFences = this.vFences[j];
	var lineLots = [];
	var i;
	for (i = 0; i < sizeX; i++) {
		let topFence = topFences[i];
		let bottomFence = bottomFences[i];
		let leftFence = lineFences[i];
		let rightFence = lineFences[i + 1];
		lineLots.push(this.createLot(i, j, topFence, bottomFence, leftFence, rightFence));
	}
	return lineLots;
}

Board.prototype.createLot = function (x, y, topFence, bottomFence, leftFence, rightFence) {
	var htmlLot = this.createHtmlLot();
	let goLot = new BoardElement(x, y, htmlLot);
	return new Lot(goLot, topFence, bottomFence, leftFence, rightFence);
}

Board.prototype.createHtmlLot = function () {
	var htmlLot = document.createElement("div");
	htmlLot.classList.add("lot");
	this.htmlBoard.appendChild(htmlLot);
	return htmlLot;
}

Board.prototype.updateGameState = function (player) {
	this.incrementPlyr();
	var sizeX = this.sizeX;
	var sizeY = this.sizeY;
	var j;
	var i;
	var gameEnd = true;
	for (j = 0; j < sizeY; j++) {
		for (i = 0; i < sizeX; i++) {
			let lot = this.lots[j][i];
			if (lot.updateLotOwner(player)) {
				this.currentPlyr = player.id;
			}
			if (!lot.isLotClosed()) {
				gameEnd = false;
			}
		}
	}
	this.updateGameVisuals();
	if (gameEnd) {
		this.gameEnd();
	}
}

Board.prototype.gameEnd = function () {
	var winPlayer = this.players[0];
	var draw = false;
	var i;
	for (i = 1; i < this.nbPlayers; i++) {
		let winScore = winPlayer.score;
		let compScore = this.players[i].score;
		if (winScore < compScore) {
			draw = false;
			winPlayer = this.players[i];
		} else if (winScore === compScore) {
			draw = true;
		}
	}
	this.gameEndCreateVisuals(winPlayer, draw);
}

Board.prototype.gameEndCreateVisuals = function (winPlayer, isDraw) {
	var width = board.htmlBoard.offsetWidth;
	var height = board.htmlBoard.offsetHeight;
	var msgWidth;
	var msgHeight;
	var winMsg = document.createElement("div");
    winMsg.classList.add("non-selectable-txt");
	if (isDraw) {
		winMsg.textContent = "Draw";
	} else {
		winMsg.textContent = "Player " + (winPlayer.id+1) + " has won !";
	}
	winMsg.style.color = "white";
	winMsg.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
	winMsg.style.fontSize = "5vw";
	winMsg.style.height = "auto";
	winMsg.style.width = "auto";
	winMsg.style.whiteSpace = "nowrap";
	winMsg.style.zIndex = 50;
	winMsg.style.position = "absolute";
	this.htmlBoard.appendChild(winMsg);

	msgWidth = winMsg.offsetWidth;
	msgHeight = winMsg.offsetHeight;

	winMsg.style.left = (width / 2) - (msgWidth / 2) + "px";
	winMsg.style.top = (height / 2) - (msgHeight / 2) + "px";

}

Board.prototype.updateGameVisuals = function () {
	var i;
	var j;
	var sizeX = this.sizeX;
	var sizeY = this.sizeY;
	for (j = 0; j < sizeY; j++) {
		for (i = 0; i < sizeX; i++) {
			this.hFences[j][i].updateVisuals(this);
			this.vFences[j][i].updateVisuals(this);
			this.lots[j][i].updateVisuals(this);
		}
		this.vFences[j][i].updateVisuals(this);
	}
	for (i = 0; i < sizeX; i++) {
		this.hFences[j][i].updateVisuals(this);
	}
	for (i = 0; i < this.nbPlayers; i++) {
		this.players[i].updateVisuals(this);
	}
}

Board.prototype.incrementPlyr = function () {
	var plyr = this.currentPlyr;
	plyr += 1;
	plyr = plyr % this.nbPlayers;
	this.currentPlyr = plyr;
}

Board.prototype.getCurrentPlayer = function () {
	return this.players[this.currentPlyr];
}

function BoardElement(x, y, htmlObj) {
	this.x = x;
	this.y = y;
	this.htmlObj = htmlObj;
}
