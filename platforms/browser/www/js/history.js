document.addEventListener("backbutton", function(e) {
    if (!document.getElementById("alert_wrapper1").classList.contains("hidden")) {
        insertResults.deleteAlert(false);
    } else window.location.href = "./index.html";
}, false);

var InsertResults = function() {
    if (!localStorage.getItem("deleted_nodes")) 
        localStorage.setItem("deleted_nodes", JSON.stringify(new Array()));
    this.deletedNodes = JSON.parse(localStorage.getItem("deleted_nodes"));
    this.outputDOM = document.getElementById("history_of_games");
    this.outputString = "";

    this.toBeDeleted = 0;
    this.deleteAlert = function(confirm) {
        if (confirm === true) {
            this.deleteEntry(this.toBeDeleted);
        } else if (confirm === false) {
            document.getElementById("alert_wrapper1").classList.add("hidden");
        } else {
            this.toBeDeleted = parseInt(confirm);
            document.getElementById("alert_wrapper1").classList.remove("hidden");
        }
    }

    this.deleteEntry = function(index) {
        this.deletedNodes.push(index);
        localStorage.setItem("deleted_nodes", JSON.stringify(this.deletedNodes));
        window.location.href = "./history.html";
    }

    this.i = 1;
    while (localStorage.getItem("game" + this.i)) {
        this.i++;
    }
    this.i--;

    while (localStorage.getItem("game" + this.i)) {
        if (this.deletedNodes.indexOf(this.i) >= 0) {
            this.i--;
            continue;
        }

        this.resultsJSON = localStorage.getItem("game" + this.i);
        this.resultsObj = JSON.parse(this.resultsJSON);

        this.outputString += `<button id="`;
        this.outputString += "game" + this.i;
        this.outputString +=        `" class="button button_big">
                                <div class="delete_entry" onclick="insertResults.deleteAlert(`;
        this.outputString += this.i;
        this.outputString += `)"><img class="icon icon_delete" src="../icons/close.png"></div>
                                <div class="scores_wrapper">
                                    <div class="scores_wrapper_left">
                                        <p class="player1_name">`;
        this.outputString += this.resultsObj['player1_name'];
        this.outputString += `          </p>
                                        <p class="player1_score">`;
        this.outputString += this.resultsObj['player1_score'];
        this.outputString += `          </p>
                                    </div>
                                    <div class="scores_wrapper_right">
                                        <p class="player2_score">`;
        this.outputString += this.resultsObj['player2_score'];
        this.outputString += `          </p>
                                        <p class="player2_name">`;
        this.outputString += this.resultsObj['player2_name'];
        this.outputString += `          </p>
                                    </div>
                                </div>
                                <p class="date">`;
        this.outputString += this.resultsObj['game_date'];
        this.outputString += `   </p>
                            </button>`;
        this.i--;
    }

    this.outputDOM.innerHTML = this.outputString;
}

var insertResults = new InsertResults();