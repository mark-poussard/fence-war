(function () {
	window.board = new Board();
	var boardHtml = document.getElementsByClassName("board")[0];
	var headerHtml = document.getElementsByClassName("gameHeader")[0];
    document.getElementById("loadMapId").addEventListener("click", function (e) {
        e.preventDefault();
        var nbPlayers = document.getElementById("nbPlayers").value;
        var sizeX = document.getElementById("sizeX").value;
        var sizeY = document.getElementById("sizeY").value;
        while (boardHtml.firstChild) {
            boardHtml.removeChild(boardHtml.firstChild);
        }
        while (headerHtml.firstChild) {
            headerHtml.removeChild(headerHtml.firstChild);
        }
        board.initBoard(boardHtml, headerHtml, sizeX, sizeY, nbPlayers);
    });
})();
