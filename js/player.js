function Player(id, htmlObj, board) {
    var self = this;
	this.htmlObj = htmlObj;
	this.id = id;
	this.score = 0;
    this.ai = null;
    this.toggleNbr = 0;
	switch (id) {
	case 0:
		// Red
		this.color = "#FB5031";
		break;
	case 1:
		// Blue
		this.color = "#237F9D";
		break;
	case 2:
		// Green
		this.color = "#24B856";
		break;
	case 3:
		this.color = "yellow";
		break;
	case 4:
		this.color = "orange";
		break;
	}

    this.htmlObj.onclick = function(){
            if(self.toggleNbr === 0){
                self.ai = new Ai();
                self.toggleNbr = 1;
            }
        else if(self.toggleNbr === 1){
            self.ai = new hardAi();
            self.toggleNbr = 2;
        }
            else{
                self.ai = null;
                self.toggleNbr = 0;
            }
            self.updateVisuals(board);
        if(board.currentPlyr === self.id){
            board.makeAiPlay();
        }
    }
}

Player.prototype.updateVisuals = function (board) {
    var self = this;
    var plrTypeTxt;
    switch(this.toggleNbr){
        case 0:
        plrTypeTxt = "Human";
        break;
        case 1:
        plrTypeTxt = "Computer - easy";
        break;
        case 2:
        plrTypeTxt = "Computer - hard";
        break;
    }
    this.htmlObj.classList.add("non-selectable-txt");

	this.htmlObj.textContent = "Player " + (this.id+1) + "(" + plrTypeTxt + ")" + " : " + this.score;
	this.htmlObj.style.backgroundColor = this.color;
	this.htmlObj.style.color = "white";
	this.htmlObj.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
	this.htmlObj.style.margin = "10px";
    this.htmlObj.style.cursor = "pointer";
	if (board.currentPlyr === this.id) {
		this.htmlObj.style.border = "3px solid black";
	} else {
		this.htmlObj.style.border = null;
	}
}
