function Game() {
    document.addEventListener("backbutton", function(e) {
        if (!document.getElementById("alert_wrapper1").classList.contains("hidden")) {
            game.endGame(false);
        } else if (!document.getElementById("alert_wrapper2").classList.contains("hidden")) {
            game.editAlert(false);
        } else if (!document.getElementById("alert_wrapper3").classList.contains("hidden")) {
            game.foul(false);
        } else if (document.getElementById("game_page")) {
            e.preventDefault();
            game.endGame();
        }
    }, false);

    this.player1 = {
        name: document.getElementById("player1"),
        points: document.getElementById("player1_points"),
        frames: document.getElementById("player1_frames")
    };

    this.player2 = {
        name: document.getElementById("player2"),
        points: document.getElementById("player2_points"),
        frames: document.getElementById("player2_frames")
    }

    this.setPlayersNames = function() {
        if (localStorage.getItem("player1").length != 0) {
            this.player1.name.innerHTML = localStorage.getItem("player1");
        } else this.player1.name.innerHTML = "Gracz1";

        if (localStorage.getItem("player2").length != 0) {
            this.player2.name.innerHTML = localStorage.getItem("player2");
        } else this.player2.name.innerHTML = "Gracz2";
    }

    this.addPoints = function(element, points) {
        if (element.id[0] == 'L') {
            this.player1.points.innerHTML = parseInt(this.player1.points.innerHTML) + parseInt(points);
        } else this.player2.points.innerHTML = parseInt(this.player2.points.innerHTML) + parseInt(points);
    }

    this.editScore = function(confirm) {
        if (confirm === undefined) {
            document.getElementById("top_bar_main").classList += " hidden";
            document.getElementById("top_bar_edit").classList.remove("hidden");
        } else if (confirm == false) {
                document.getElementById("top_bar_main").classList.remove("hidden");
                document.getElementById("top_bar_edit").classList += " hidden";
        }
    }

    this.editAlert = function(confirm) {
        if (confirm === undefined) {
            document.getElementById("player1_points_edit").value = game.player1.points.innerHTML;
            document.getElementById("player2_points_edit").value = game.player2.points.innerHTML;
            document.getElementById("alert_wrapper2").classList.remove("hidden");
        } else if (confirm == true) {
            game.player1.points.innerHTML = document.getElementById("player1_points_edit").value;
            game.player2.points.innerHTML = document.getElementById("player2_points_edit").value;
            this.editAlert(false);
        } else if (confirm == false) {
            document.getElementById("alert_wrapper2").classList += " hidden";
            // FOR FURTHER VERSIONS 
            // this.editScore(false);
        }
    }

    this.foul = function(confirm) {
        var player1 = document.getElementById("player1_foul");
        var player2 = document.getElementById("player2_foul");
        var players_remove_highlight = function() {
            player1.classList.remove("highlighted");
            player2.classList.remove("highlighted");
        }
        var four_pts = document.getElementById("four_pts");
        var five_pts = document.getElementById("five_pts");
        var six_pts = document.getElementById("six_pts");
        var seven_pts = document.getElementById("seven_pts");
        var points_remove_highlight = function() {
            four_pts.classList.remove("highlighted");
            five_pts.classList.remove("highlighted");
            six_pts.classList.remove("highlighted");
            seven_pts.classList.remove("highlighted");
        }
        if (confirm === undefined) {
            player1.firstChild.innerHTML = this.player1.name.innerHTML;
            player2.firstChild.innerHTML = this.player2.name.innerHTML;
            document.getElementById("alert_wrapper3").classList.remove("hidden");
        } else if (confirm == true) {
            var highlighted = document.getElementsByClassName("highlighted");
            if (highlighted[0].id == 'player1_foul') {
                if (highlighted[1].id == 'four_pts') this.player1.points.innerHTML = parseInt(this.player1.points.innerHTML) + 4;
                if (highlighted[1].id == 'five_pts') this.player1.points.innerHTML = parseInt(this.player1.points.innerHTML) + 5;
                if (highlighted[1].id == 'six_pts') this.player1.points.innerHTML = parseInt(this.player1.points.innerHTML) + 6;
                if (highlighted[1].id == 'seven_pts') this.player1.points.innerHTML = parseInt(this.player1.points.innerHTML) + 7;                
            } else if (highlighted[0].id == 'player2_foul') {             
                if (highlighted[1].id == 'four_pts') this.player2.points.innerHTML = parseInt(this.player2.points.innerHTML) + 4;
                if (highlighted[1].id == 'five_pts') this.player2.points.innerHTML = parseInt(this.player2.points.innerHTML) + 5;
                if (highlighted[1].id == 'six_pts') this.player2.points.innerHTML = parseInt(this.player2.points.innerHTML) + 6;
                if (highlighted[1].id == 'seven_pts') this.player2.points.innerHTML = parseInt(this.player2.points.innerHTML) + 7;
            }
            document.getElementById("alert_wrapper3").className += " hidden";
        } else if (confirm == false) {
            document.getElementById("alert_wrapper3").className += " hidden";
        } else if (confirm == 'player1') {
            players_remove_highlight();
            player1.classList.add("highlighted");
        } else if (confirm == 'player2') {
            players_remove_highlight();
            player2.classList.add("highlighted");
        } else if (confirm == '4pts') {
            points_remove_highlight();
            four_pts.classList.add("highlighted");
        } else if (confirm == '5pts') {
            points_remove_highlight();
            five_pts.classList.add("highlighted");
        } else if (confirm == '6pts') {
            points_remove_highlight();
            six_pts.classList.add("highlighted");
        } else if (confirm == '7pts') {
            points_remove_highlight();
            seven_pts.classList.add("highlighted");
        }
    }

    this.endGame = function(confirm) {
        if (confirm === undefined) {
            document.getElementById("alert_wrapper1").classList.remove("hidden");
        } else {
            if (confirm == true) {
                this.saveResultAndGoToMainPage();
            } else {
                document.getElementById("alert_wrapper1").className += " hidden";
            }
        }
    }

    this.saveResultAndGoToMainPage = function() {
        if (this.player1.points.innerHTML != 0 || this.player2.points.innerHTML != 0) {
            var i = 1;
            while (localStorage.getItem("game" + i)) {
                i++;
            }
            this.gameIndex = "game" + i;
            this.date = new Date();

            this.month = this.date.getMonth() + 1;

            this.todaysDate = this.date.getDate()
            + "."
            + this.month
            + "."
            + this.date.getFullYear();

            localStorage.setItem("game" + i,
            `{
                "player1_name":"` + this.player1.name.innerHTML + `",
                "player1_score":` + this.player1.points.innerHTML + `,
                "player2_score":` + this.player2.points.innerHTML + `,
                "player2_name":"` + this.player2.name.innerHTML + `",
                "game_date":"` + this.todaysDate + `"
            }`);
        }
        window.location.href = "./index.html";
    }
}

var game = new Game();
game.setPlayersNames();