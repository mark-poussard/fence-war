function Board(){
    this.hFences = [];
    this.vFences = [];
    this.lots = [];

    this.sizeX = 0;
    this.sizeY = 0;

    this.players = [];
    this.currentPlyr = 0;
    this.nbPlayers = 0;

    this.initBoard(htmlBoard, sizeX, sizeY, nbPlayers){
	this.sizeX = sizeX;
	this.sizeY = sizeY;
	this.htmlBoard = htmlBoard;
	this.hFences = this.createHFences(sizeX, sizeY);
	this.vFences = this.createVFences(sizeX, sizeY);
	this.lots = this.createLots(sizeX, sizeY);
    }

    this.setBorders = function(){
	var sizeX = this.sizeX;
	var sizeY = this.sizeY;
	var i;
	for(i=0; i<sizeX; i++){
	    this.hFences[0][i].isDrawn = true;
	    this.hFences[sizeY+1].isDrawn = true;
	}
	for(i=0; i<sizeY; i++){
	    this.vFences[i][0].isDrawn = true;
	    this.vFences[i][sizeX+1].isDrawn = true;
	}
    }

    this.createHFences = function(sizeX, sizeY){
	var hFences = [];
	var j;
	var i;
	for(j=o; j < sizeY+1; j++){
	    hFences[j] = [];
	    for(i=0; i < sizeX; i++){
		let htmlHFence = this.createHtmlHFence();
		hFences[j].push(new HFence(htmlHFence));
	    }
	}
	return hFences;
    }

    this.createHtmlHFence = function(){
	var hFence = document.createElement("div");
	this.htmlBoard.appendChild(hFence);
	return hFence;
    }

    this.createVFences = function(sizeX, sizeY){
	var vFences = [];
	var j;
	var i;
	for(j=o; j < sizeY; j++){
	    vFences[j] = [];
	    for(i=0; i < sizeX+1; i++){
		let htmlVFence = this.createHtmlVFence();
		vFences[j].push(new VFence(htmlVFence));
	    }
	}
	return vFences;
    }

    this.createHtmlVFence = function(){
	var vFence = document.createElement("div");
	this.htmlBoard.appendChild(vFence);
	return vFence;
    }

    this.createLots = function(sizeX, sizeY){
	var lots = [];
	var j;
	for(j=0; j < sizeY; j++){
	    lots.push(createLotLine(sizeX, j));
	}
	return lots;
    }

    this.createLotLine = function(sizeX, j){
	var topFences = this.hFences[j];
	var bottomFences = this.hFences[j+1];
	var lineFences = this.vFences[j];
	var lineLots = [];
	var i;
	for(i=0; i < sizeX; i++){
	    let topFence = topFences[i];
	    let bottomFence = bottomFences[i];
	    let leftFence = lineFences[i];
	    let rightFence = lineFences[i+1];
	    lineLots.push(this.createLot(topFence, bottomFence, leftFence, rightFence));
	}
	return lineLots;
    }

    this.createLot = function(topFence, bottomFence, leftFence, rightFence){
	var htmlLot = this.createHtmlLot();
	return new Lot(htmlLot, topFence, bottomFence, leftFence, rightFence);
    }

    this.createHtmlLot = function(){
	var htmlLot = document.createElement("div");
	this.htmlBoard.appendChild(htmlLot);
	return htmlLot;
    }

    this.updateGameState = function(player){
	this.incrementPlyr(); 
	var sizeX = this.sizeX;
	var sizeY = this.sizeY;
	var j;
	var i;
	for(j=0; j<sizeY; j++){
	    for(i=0; i<sizeX; i++){
		let lot = this.lots[j][i];
		if(lot.updateLotOwner(player)){
		    this.currentPlyr = player.id;
		}
	    }
	}
    }

    this.incrementPlyr = function(){
	var plyr = this.currentPlyr;
	plyr += 1;
	plyr = plyr % this.nbPlayers;
	this.currentPlyr = plyr;
    }

    this.getCurrentPlayer = function(){
	return this.players[this.currentPlyr];
    }
}

function Lot(htmlObj, topFence, bottomFence, leftFence, rightFence){
    this.htmlObj = htmlObj;
    this.topFence = topFence;
    this.bottomFence = bottomFence;
    this.leftFence = leftFence;
    this.rightFence = rightFence;
    this.ownedBy = null;

    this.isLotClosed = function(){
	return this.topFence.isDrawn && this.bottomFence.isDrawn && this.leftFence.isDrawn && this.rightFence.isDrawn;
    }

    this.updateLotOwner = function(player){
	if(this.ownedBy === null && this.isLotClosed() === true){
	    this.ownedBy = player;
	    player.points += 1;
	    this.updateVisuals();
	    return true;
	}
	return false;
    }

    this.updateVisuals = function(){
	this.htmlObj.style.backgroundColor = this.ownedBy.color;
    }
}

function Fence(htmlObj){
    var self = this;
    this.htmlObj = htmlObj;
    this.isDrawn = false;

    this.draw = function(player){
	this.isDrawn = true;
	board.updateGameState(player);
    }

    htmlObj.onclick = function(){
	if(!self.isDrawn){
	    var player = board.getCurrentPlayer();
	    self.draw(player);
	}
    }
}

function HFence(htmlObj){
    Fence.call(this, htmlObj);
}

function VFence(htmlObj){
    Fence.call(this, htmlObj);
}

function Player(id){
    this.id = id;
    this.points = 0;
    switch(id){
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
}
