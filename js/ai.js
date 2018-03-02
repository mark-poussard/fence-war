function Ai(){
    this.randBetweenMinMax = function(min, max){
        return Math.floor((Math.random() * max) + min);
    }

    this.randInArray = function(array){
        return array[this.randBetweenMinMax(0, array.length)];
    }

    this.selectFence = function(lot){
        var i;
        var fences = lot.getFencesAsArray();
        var selectableFences = [];
        for(i=0; i<fences.length; i++){
            if(!fences[i].isDrawn){
                selectableFences.push(fences[i]);
            }
        }
        return this.randInArray(selectableFences);
    }
}

Ai.prototype.computeMove = function(board){
    var level1Lot = [];
    var level2Lot = [];
    var level3Lot = [];
    var level4Lot = [];
    var sizeX = board.sizeX;
    var sizeY = board.sizeY;
    var i;
    var j;
    var selectedLot;
    var selectedFence;
    for(j=0; j<sizeY; j++){
        for(i=0; i<sizeX; i++){
            let lot = board.lots[j][i];
            let dispNbr = this.dispatchLot(i, j, board);
            switch(dispNbr){
                case 1:
                level1Lot.push(lot);
                break;
                case 2:
                level2Lot.push(lot);
                break;
                case 3:
                level3Lot.push(lot);
                break;
                case 4:
                level4Lot.push(lot);
                break;
            }
        }
    }
    if(level1Lot.length > 0){
        selectedLot = this.randInArray(level1Lot);
    }
    else if(level2Lot.length > 0){
        selectedLot = this.randInArray(level2Lot);
    }
    else if(level3Lot.length > 0){
        selectedLot = this.randInArray(level3Lot);
    }
    else if(level4Lot.length > 0){
        selectedLot = this.randInArray(level4Lot);
    }
    
    return this.selectFence(selectedLot);
}

Ai.prototype.dispatchLot = function(i, j, board){
    let lot = board.lots[j][i];
    let nbr = lot.numberOfDrawnBorders();
    switch(nbr){
    case 0:
        return 3;
        break;
    case 1:
        return 2;
        break;
    case 2:
        return 4;
        break;
    case 3:
        return 1;
        break;
    }    
}
