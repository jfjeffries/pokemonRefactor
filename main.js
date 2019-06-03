(function(){
    var p1;
    var p2;
    var p1_input = document.getElementById("p1_input");
    var p1_input_button = document.getElementById("p1_input_button");
    var p1_random_button = document.getElementById("p1_random_button");
    var p1_def = document.getElementById("p1_def");
    var p1_att = document.getElementById("p1_att");
    var p1_name = document.getElementById("p1_name");
    var p1_lifebar_status = document.getElementById("p1_lifebar_status");
    var p1_sprite = document.getElementById("p1_sprite");
    var p1_intro_field = document.getElementById("p1_intro_field");
    var p1_intro_name = document.getElementById("p1_intro_name");
    var p1_slogan = document.getElementById("p1_slogan");

    var p2_input = document.getElementById("p2_input");
    var p2_input_button = document.getElementById("p2_input_button");
    var p2_random_button = document.getElementById("p2_random_button");
    var p2_def = document.getElementById("p2_def");
    var p2_att = document.getElementById("p2_att");
    var p2_name = document.getElementById("p2_name");
    var p2_lifebar_status = document.getElementById("p2_lifebar_status");
    var p2_sprite = document.getElementById("p2_sprite");
    var p2_intro_field = document.getElementById("p2_intro_field");
    var p2_intro_name = document.getElementById("p2_intro_name");
    var p2_slogan = document.getElementById("p2_slogan");

    var fight_button = document.getElementById("fight_button")
    
    window.addEventListener("load", function(){
        var background = getBackground();
        
        document.getElementById("battle_area").style.backgroundImage = `url(${background})`;
    })



    fight_button.addEventListener('click', function(event){
        if(!p1){
            alert("Please enter Player 1")
        } else if(!p2){
            alert("Please enter Player 2")
        } else {
            // getTerrainAndOpponentBonus();
            battle();
        }
    })
    p1_input_button.addEventListener('click', function(event){
        getPokemon(p1_input.value, 1)
    })
    p1_random_button.addEventListener('click', function(event){
        getPokemon(returnRandom(805), 1)
    })
    p2_input_button.addEventListener('click', function(event){
        getPokemon(p2_input.value, 2)
    })
    p2_random_button.addEventListener('click', function(event){
        getPokemon(returnRandom(805), 2)
    })
    class Game{
        constructor(player1, player2){
            this.player1 = player1;
            this.player2 = player2;
        }

    }
    
    class Player{
        constructor(id, name, att, def, img_src, type, lifebar){
            this.id = id;
            this.name = name;
            this.att = att;
            this.def = def;
            this.img_src = img_src;
            this.type = type;
            this.lifebar = lifebar;
        }
        hp = 100;
        att_bonus = 1;
        def_bonus = 1;
        bonus_saying = '';
        att_num = function(){
            if(this.id == 1){
                return p1_att;
            } else {
                return p2_att;
            }
        }

        setStats(){
            this.att_num.innerHTML = this.att;
        }

        findRandomBonus(){
            let x;
            do{
                x = Math.random();
            }
            while( x < 0.4 );
            this.def = Math.floor((this.def * x)) + this.def;
            this.att = Math.floor((this.att * x)) + this.att;
            this.def_bonus = Math.floor(x * 100)/100;
            this.att_bonus = Math.floor(x * 100)/100;
            console.log(this);
        }

        findBonus(enemy){
            console.log(this.name, this.type, enemy)
            switch (this.type){
                case 'bug': {
                    if(enemy == 'psychic' || enemy == 'grass' || enemy == 'dark'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'fight' || enemy == 'fire' || enemy == 'flying' || enemy == 'ghost' || enemy == 'poison' || enemy == 'steel' || enemy == 'fairy'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                    break;
                }
                case 'electric': {
                    if(enemy == 'flying' || enemy == 'water'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'dragon' || enemy == 'electric' || enemy == 'grass'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    };
                    if(enemy == 'ground'){
                        this.att = 0;
                        this.bonus_saying = "OH NO! Cannot harm the enemy!";
                    }
                }
                break;
                case 'fire': {
                    if(enemy == 'bug' || enemy == 'grass' || enemy == 'ice' || enemy == 'steel'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'dragon' || enemy == 'fire' || enemy == 'rock' || enemy == 'water'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }    
                }
                break;
                case 'grass': {
                    if(enemy == 'ground' || enemy == 'rock' || enemy == 'water'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'bug' || enemy == 'fire' || enemy == 'dragon' || enemy == 'grass' || enemy == 'poison' || enemy == 'steel' || enemy == 'flying'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    };
                }
                break;
                case 'normal': {
                    if(enemy == 'rock' || enemy == 'steel'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    };
                }
                break;
                case 'rock': {
                    if(enemy == 'bug' || enemy == 'fire' || enemy == 'flying' || enemy == 'ice'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'fight' || enemy == 'ground' || enemy == 'steel'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    };
                }
                break;
                case 'dark': {
                    if(enemy == 'ghost' || enemy == 'psychic'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    }
                    if(enemy == 'dark' || enemy == 'fight' || enemy == 'fairy'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                }
                break;
                case 'fairy': {
                    if(enemy == 'dark' || enemy == 'dragon' || enemy == 'fight'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'fire' || enemy == 'poison' || enemy == 'steel'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                }
                break;
                case 'flying': {
                    if(enemy == 'bug' || enemy == 'grass' || enemy == 'fight'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'electric' || enemy == 'rock' || enemy == 'steel'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                }
                break;
                case 'ground': {
                    if(enemy == 'electric' || enemy == 'fire' || enemy == 'poison' || enemy == 'rock' || enemy == 'steel'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'bug' || enemy == 'grass'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                    if(enemy == 'flying'){
                        this.att = 0;
                        this.bonus_saying = "OH NO! Cannot harm the enemy!";
                    }
                }
                break;
                case 'poison': {
                    if(enemy == 'grass' || enemy == 'fairy'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'ghost' || enemy == 'ground' || enemy == 'rock' || enemy == 'poison'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                }
                break;
                case 'steel': {
                    if(enemy == 'fairy' || enemy == 'ice' || enemy == 'rock'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'electric' || enemy == 'fire' || enemy == 'steel' || enemy == 'water'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                }
                break;
                case 'dragon': {
                    if(enemy == 'dragon'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'steel'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                    if(enemy == 'fairy'){
                        this.att = 0;
                        this.bonus_saying = "OH NO! Cannot harm the enemy!";
                    }
                }
                break;
                case 'fighting': {
                    if(enemy == 'dark' || enemy == 'ice' || enemy == 'normal' || enemy == 'rock' || enemy == 'steel'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'bug' || enemy == 'fairy' || enemy == 'flying' || enemy == 'poison' || enemy == 'psychic'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                    if(enemy == 'ghost'){
                        this.att == 0;
                        this.bonus_saying = "OH NO! Cannot harm the enemy!";
                    }
                }
                break;
                case 'ghost': {
                    if(enemy == 'ghost' || enemy == 'psychic'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'dark'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                    if(enemy == 'normal'){
                        this.att = 0;
                        this.bonus_saying = "OH NO! Cannot harm the enemy!";
                    }
                }
                break;
                case 'ice': {
                    if(enemy == 'dragon'  || enemy == 'flying' || enemy == 'ground'|| enemy == 'grass'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'ice' || enemy == 'fire' || enemy == 'steel' || enemy == 'water'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                }
                break;
                case 'psychic': {
                    if(enemy == 'fighting' || enemy == 'poison'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'psychic' || enemy == 'steel'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                    if(enemy == 'dark'){
                        this.att = 0;
                        this.bonus_saying = "OH NO! Cannot harm the enemy!";
                    }
                }
                break;
                case 'water': {
                    if(enemy == 'fire' || enemy == 'ground' || enemy == 'rock'){
                        this.att *=2;
                        this.bonus_saying = "Strong against this type, Attack doubled!"
                    };
                    if(enemy == 'dragon' || enemy == 'grass' || enemy == 'water'){
                        this.att *= .5;
                        this.bonus_saying = "Weak against this type, Attack halved!"
                    }
                }
                break;
                default: this.bonus_saying = "No particular strength."
            }
        }

        get_hit(hit_str){
            console.log(this, this.hp)
            this.hp -= hit_str;
            this.lifebar.style = `width: ${this.hp}%`;

        }
    }
    
    function returnRandom(upper_limit){
        return Math.floor(Math.random()*upper_limit)
    }

    function getPokemon(search, player){
        resetIfExists(player);
        fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`, {})
        .then(res=> {return res.clone().json()})
        .then(function(data){
            if(player === 1){
                p1 = new Player(1, data.name, data.stats[4].base_stat, data.stats[3].base_stat, data.sprites.front_default, data.types[0].type.name, p1_lifebar_status)
                introAnimation(p1);
                return p1;
            } else {
                p2 = new Player(2, data.name, data.stats[4].base_stat, data.stats[3].base_stat, data.sprites.front_default, data.types[0].type.name, p2_lifebar_status)
                introAnimation(p2);
                return p2;
            }
        })
        .then(res => {
            // introAnimation(res);
            return res;
        })
        .then(res => {
            let timeout = setTimeout(function(){
                setPlayer(res);
            }, 2000)
        })
    }

    function setPlayer(player){

        if(player == undefined){
            return;
        }
        if(player.id === 1){
            p1_att.innerHTML = player.att;
            p1_def.innerHTML = player.def;
            p1_name.innerHTML = player.name;
            p1_sprite.setAttribute("src", player.img_src);
            p1_sprite.style.display = "block";
        }else{
            p2_att.innerHTML = player.att;
            p2_def.innerHTML = player.def;
            p2_name.innerHTML = player.name;
            p2_sprite.setAttribute("src", player.img_src)
            p2_sprite.style.display = "block";
        }
    }

    function getBackground(){
        let x = returnRandom(4);
        
        switch(x){
            case 1:
                return "./resources/desert.jpg"
            case 2:
                return "./resources/forest.jpg"
            case 3:
                return "./resources/beach.webp"
            case 0:
                $(".toggled").css("color", "black")
                return "./resources/grass.jpg"
            default:
                return "./resources/forest.jpg"
        }
    }
    
    //Main battle function
    function battle(){
        // let game = new Game(p1, p2);
        // // game.player1.findRandomBonus();
        // // game.player2.findRandomBonus();

        // // game.player1.findBonus(game.player2.type);
        // // game.player2.findBonus(game.player1.type);

        // // console.log(game)

        console.log("p1 bonus 1", p1.bonus_saying)
        p1.findRandomBonus();
        console.log("p1 bonus 2", p1.bonus_saying)
        p2.findRandomBonus();
        console.log("p1 bonus 3", p1.bonus_saying)
        p1.findBonus(p2.type);
        console.log("p1 bonus 4", p1.bonus_saying)
        p2.findBonus(p1.type);
        let game = new Game(p1,p2);
        console.log(game);

        //Display bonuses or negatives
        //Check to make sure someone can do damage (ex. normal vs ghost will not work)
        
        //while(?) both have hitpoints, do a turn
        //Check hp levels
        //If winner, decide winner, if not, do another turn
        // while(p1.hp>0 && p2.hp>0){

        // }
    }
    function turn(){
        
        let att= new Promise(function(resolve, reject){
            p1Attack : setTimeout(function(){
                resolve(p2.get_hit(p1.att),
                console.log("p2 hit", p2.hp))
            }, 1500)
        })
        .then({
            p2Attack : setTimeout(function(){
                p1.get_hit(p2.att)
                console.log("p1 hit", p1.hp)
            }, 1500)
        })
        if(p1.hp <= 0 || p2.hp <=0){
            p1Attack.clearTimeout();
            p2Attack.clearTimeout();
            if(p1.hp <= 0){
                endGame(p2);
            } else {
                endGame(p1);
            }
        }
    }

    function endGame(winner){
        return;
    }

    /******************************
     Animations
    ******************************/
    
    function introAnimation(player){
        if(player.id === 1){
            p1_intro_name.innerText = player.name;
            p1_intro_field.style.display = "block";
            let delay = setTimeout(function(){
                p1_intro_field.style.display = "none";

            }, 2000);
        } else {
            p2_intro_name.innerText = player.name;
            p2_intro_field.style.display = "block";
            let delay = setTimeout(function(){
                p2_intro_field.style.display = "none";
            }, 2000);
        }
        return;
    }

    function getHitAnimation(player){
        return;
    }

    function attackAnimation(player){
        return;
    }

    function winnerAnimation(player){
        return;
    }

    function resetIfExists(player){
        if(player === 1 && p1){
            p1_att.innerHTML = "";
            p1_def.innerHTML = "";
            p1_name.innerHTML = "";
            p1_sprite.setAttribute("src", "");
            p1_sprite.style.display = "none";
            p1.bonus_saying = "";
            p1.att = 0;
            p1.def = 0;
            p1.att_bonus = 0;
            p1.def_bonus = 0;
            p1.hp = 100;
        }else if(player === 2 && p2){
            p2_att.innerHTML = "";
            p2_def.innerHTML = "";
            p2_name.innerHTML = "";
            p2_sprite.setAttribute("src", "")
            p2_sprite.style.display = "none";
            p2.bonus_saying = "";
            p2.att = 0;
            p2.def = 0;
            p2.att_bonus = 0;
            p2.def_bonus = 0;
            p2.hp = 100;
        }
        return;
    }
    function reset(){
        location.reload();
    }


})()













/************************************

Function to find the strongest (or whatever) Pokemon

*************************************/

// var x = 1;
// var z = 1;
// var y = "";

// for(let i=1; i<804; i++){
//     fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`, {})
//     .then(res=> {return res.clone().json()})
//     .then(function(data){
//         // console.log(data.stats[4].base_stat)
//         if(data.stats[4].base_stat > x){
//             x = data.stats[4].base_stat;
//             y = data.name;
//             console.log("best offense", i, x, y)
//         }
//         if(data.stats[3].base_stat > z){
//             z = data.stats[3].base_stat;
//             y = data.name;
//             console.log("best defense", i, z, y)
//         }
//     })
// }