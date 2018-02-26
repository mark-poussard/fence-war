function Board() {
	this.hFences = [];
	this.vFences = [];
	this.lots = [];

	this.sizeX = 0;
	this.sizeY = 0;

	this.players = [];
	this.currentPlyr = 0;
	this.nbPlayers = 0;

	this.initBoard = function (htmlBoard, htmlHeader, sizeX, sizeY, nbPlayers) {
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

	this.generatePlayers = function (nbPlayers) {
		var players = [];
		var i;
		for (i = 0; i < nbPlayers; i++) {
			let htmlPlayer = this.generatePlayerHtml();
			players.push(new Player(i, htmlPlayer));
		}
        return players;
	}

	this.generatePlayerHtml = function () {
		var htmlPlayer = document.createElement("span");
		this.htmlHeader.appendChild(htmlPlayer);
		return htmlPlayer;
	}

	this.setBorders = function () {
		var sizeX = this.sizeX;
		var sizeY = this.sizeY;
		var i;
		for (i = 0; i < sizeX; i++) {
			this.hFences[0][i].isDrawn = true;
			this.hFences[sizeY].isDrawn = true;
		}
		for (i = 0; i < sizeY; i++) {
			this.vFences[i][0].isDrawn = true;
			this.vFences[i][sizeX].isDrawn = true;
		}
	}

	this.createHFences = function (sizeX, sizeY) {
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

	this.createHtmlHFence = function () {
		var hFence = document.createElement("div");
		hFence.classList.add("hFence");
		this.htmlBoard.appendChild(hFence);
		return hFence;
	}

	this.createVFences = function (sizeX, sizeY) {
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

	this.createHtmlVFence = function () {
		var vFence = document.createElement("div");
		vFence.classList.add("vFence");
		this.htmlBoard.appendChild(vFence);
		return vFence;
	}

	this.createLots = function (sizeX, sizeY) {
		var lots = [];
		var j;
		for (j = 0; j < sizeY; j++) {
			lots.push(this.createLotLine(sizeX, j));
		}
		return lots;
	}

	this.createLotLine = function (sizeX, j) {
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

	this.createLot = function (x, y, topFence, bottomFence, leftFence, rightFence) {
		var htmlLot = this.createHtmlLot();
		let goLot = new BoardElement(x, y, htmlLot);
		return new Lot(goLot, topFence, bottomFence, leftFence, rightFence);
	}

	this.createHtmlLot = function () {
		var htmlLot = document.createElement("div");
		htmlLot.classList.add("lot");
		this.htmlBoard.appendChild(htmlLot);
		return htmlLot;
	}

	this.updateGameState = function (player) {
		this.incrementPlyr();
		var sizeX = this.sizeX;
		var sizeY = this.sizeY;
		var j;
		var i;
		for (j = 0; j < sizeY; j++) {
			for (i = 0; i < sizeX; i++) {
				let lot = this.lots[j][i];
				if (lot.updateLotOwner(player)) {
					this.currentPlyr = player.id;
				}
			}
		}
	}

	this.updateGameVisuals = function () {
		var i;
		var j;
		var sizeX = this.sizeX;
		var sizeY = this.sizeY;
		this.updatePlayerVisuals();
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

	this.incrementPlyr = function () {
		var plyr = this.currentPlyr;
		plyr += 1;
		plyr = plyr % this.nbPlayers;
		this.currentPlyr = plyr;
	}

	this.getCurrentPlayer = function () {
		return this.players[this.currentPlyr];
	}

	this.updatePlayerVisuals = function () {}
}

function Lot(boardObj, topFence, bottomFence, leftFence, rightFence) {
	this.boardObj = boardObj;
	this.topFence = topFence;
	this.bottomFence = bottomFence;
	this.leftFence = leftFence;
	this.rightFence = rightFence;
	this.ownedBy = null;

	this.isLotClosed = function () {
		return this.topFence.isDrawn && this.bottomFence.isDrawn && this.leftFence.isDrawn && this.rightFence.isDrawn;
	}

	this.updateLotOwner = function (player) {
		if (this.ownedBy === null && this.isLotClosed() === true) {
			this.ownedBy = player;
			player.points += 1;
			return true;
		}
		return false;
	}

	this.updateVisuals = function (board) {
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
		htmlObj.style.width = lotWidth + "px";
		htmlObj.style.height = lotHeight + "px";
		htmlObj.style.position = "absolute";
		htmlObj.style.left = (lotWidth * this.boardObj.x) + "px";
		htmlObj.style.top = (lotHeight * this.boardObj.y) + "px";
	}
}

function Fence(boardObj) {
	var self = this;
	this.boardObj = boardObj;
	this.isDrawn = false;

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
		var htmlObj = this.boardObj.htmlObj;
		var sizeX = board.sizeX;
		var width = board.htmlBoard.offsetWidth;
		var sizeY = board.sizeY;
		var height = board.htmlBoard.offsetHeight;
		var lotWidth = width / sizeX;
		var lotHeight = height / sizeY;
		htmlObj.style.position = "absolute";
		if (this.isDrawn) {
			htmlObj.style.backgroundColor = "black";
		} else {
			htmlObj.style.backgroundColor = "white";
		}
		htmlObj.style.left = (lotWidth * this.boardObj.x) + "px";
		htmlObj.style.top = (lotHeight * this.boardObj.y) + "px";
	}
}

function HFence(boardObj) {
	Fence.call(this, boardObj);

    var updateVisualsSuper = this.updateVisuals;
	this.updateVisuals = function (board) {
		updateVisualsSuper.call(this, board);
		var htmlObj = this.boardObj.htmlObj;
		var sizeX = board.sizeX;
		var width = board.htmlBoard.offsetWidth;
		htmlObj.style.width = (width / sizeX) + "px";
		htmlObj.style.height = "2px";

	}
}

function VFence(boardObj) {
	Fence.call(this, boardObj);

    var updateVisualsSuper = this.updateVisuals;
	this.updateVisuals = function (board) {
		updateVisualsSuper.call(this, board);
		var htmlObj = this.boardObj.htmlObj;
		var sizeY = board.sizeY;
		var height = board.htmlBoard.offsetHeight;
		htmlObj.style.width = "2px";
		htmlObj.style.height = (height / sizeY) + "px";
	}
}

function BoardElement(x, y, htmlObj) {
	this.x = x;
	this.y = y;
	this.htmlObj = htmlObj;
}

function Player(id, htmlObj) {
	this.htmlObj = htmlObj;
	this.id = id;
	this.points = 0;
	switch (id) {
	case 0:
		this.color = "red";
		break;
	case 1:
		this.color = "blue";
		break;
	case 2:
		this.color = "green";
		break;
	case 3:
		this.color = "yellow";
		break;
	case 4:
		this.color = "orange";
		break;
	}

	this.updateVisuals = function (board) {
		this.htmlObj.textContent = "Player " + this.id + " : " + this.points;
		this.htmlObj.style.backgroundColor = this.color;
		if (board.currentPlyr === this.id) {
			this.htmlObj.style.borderBottom = "3px solid black";
		} else {
			this.htmlObj.style.borderBottom = null;
		}
	}
}

(function () {
	window.board = new Board();
	var boardHtml = document.getElementsByClassName("board")[0];
	var headerHtml = document.getElementsByClassName("gameHeader")[0];
	board.initBoard(boardHtml, headerHtml, 10, 10, 2);
})();
