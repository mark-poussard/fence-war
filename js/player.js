function Player(id, htmlObj) {
	this.htmlObj = htmlObj;
	this.id = id;
	this.score = 0;
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

	this.updateVisuals = function (board) {
		this.htmlObj.textContent = "Player " + this.id + " : " + this.score;
		this.htmlObj.style.backgroundColor = this.color;
		this.htmlObj.style.color = "white";
		this.htmlObj.style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
		this.htmlObj.style.margin = "10px";
		if (board.currentPlyr === this.id) {
			this.htmlObj.style.borderBottom = "3px solid black";
		} else {
			this.htmlObj.style.borderBottom = null;
		}
	}
}