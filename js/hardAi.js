function hardAi(){
    Ai.call(this);
}

hardAi.prototype.computeMove = function(board){
    var level1Fence = [];
    var level2Fence = [];
    var level3Fence = [];
    var level4Fence = [];
    var sizeX = board.sizeX;
    var sizeY = board.sizeY;
    var i;
    var j;
    var fType;
    var selectedLot;
    var selectedFence;
    for(j=0; j<sizeY; j++){
        for(i=0; i<sizeX; i++){
            for(fType=0; fType<2; fType++){
                let fence;
                let lot1;
                let lot2;
                if(fType===0){
                    if(j-1 < 0){
                        continue;
                    }
                    fence = board.hFences[j][i];
                    lot1 = board.lots[j][i];
                    lot2 = board.lots[j-1][i]
                }
                else{
                    if(i-1 < 0){
                        continue;
                    }
                    fence = board.vFences[j][i];
                    lot1 = board.lots[j][i];
                    lot2 = board.lots[j][i-1];
                }
                if(!fence.isDrawn){
                    let lot1Nbr = lot1.numberOfDrawnBorders();
                    let lot2Nbr = lot2.numberOfDrawnBorders();
                    if(lot1Nbr === 3 || lot2Nbr === 3){
                        level1Fence.push(fence);
                    }
                    else if(lot1Nbr === 2 || lot2Nbr === 2){
                        level4Fence.push(fence);
                    }
                    else if(lot1Nbr === 0 || lot2Nbr === 0){
                        level2Fence.push(fence);
                    }
                    else{
                        level3Fence.push(fence);
                    }
                }
            }
        }
    }
    if(level1Fence.length > 0){
        return this.randInArray(level1Fence);
    }
    else if(level2Fence.length > 0){
        return this.randInArray(level2Fence);
    }
    else if(level3Fence.length > 0){
        return this.randInArray(level3Fence);
    }
    else if(level4Fence.length > 0){
        return this.randInArray(level4Fence);
    }

}
