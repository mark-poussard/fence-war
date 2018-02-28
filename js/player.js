function Player(id, htmlObj, board) {
    var self = this;
	this.htmlObj = htmlObj;
	this.id = id;
	this.score = 0;
    this.ai = null;
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
        if(board.currentPlyr !== this.id){
            if(self.ai === null){
                self.ai = new Ai();
            }
            else{
                self.ai = null;
            }
            self.updateVisuals(board);
        }
    }
}

Player.prototype.updateVisuals = function (board) {
    var self = this;
    var plrTypeTxt;
    if(this.ai === null){
        plrTypeTxt = "Human";
    }
    else{
        plrTypeTxt = "Computer"
    }
    this.htmlObj.classList.add("non-selectable-txt");

	this.htmlObj.textContent = "Player " + (this.id+1) + "(" + plrTypeTxt + ")" + " : " + this.score;
	this.htmlObj.style.backgroundColor = this.color;
	this.htmlObj.style.color = "white";
	this.htmlObj.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
	this.htmlObj.style.margin = "10px";
	if (board.currentPlyr === this.id) {
		this.htmlObj.style.border = "3px solid black";
            this.htmlObj.style.cursor = "initial";
	} else {
		this.htmlObj.style.border = null;
            this.htmlObj.style.cursor = "pointer";
	}
}
