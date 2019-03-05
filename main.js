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

    var p2_input = document.getElementById("p2_input");
    var p2_input_button = document.getElementById("p2_input_button");
    var p2_random_button = document.getElementById("p2_random_button");
    var p2_def = document.getElementById("p2_def");
    var p2_att = document.getElementById("p2_att");
    var p2_name = document.getElementById("p2_name");
    var p2_lifebar_status = document.getElementById("p2_lifebar_status");
    var p2_sprite = document.getElementById("p2_sprite");

    var fight_button = document.getElementById("fight_button")
    
    window.addEventListener("load", function(){
        var background = getBackground();
        
        document.getElementById("battle_area").style.backgroundImage = `url(${background})`;
    })



    fight_button.addEventListener('click', function(event){
        if(!p1){
            alert("Please enter Player 1")
        }else if(!p2){
            alert("Please enter Player 2")
        }else{

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

        attack(){

        }
        get_hit(hit_str){
            this.hp -= hit_str;
            this.lifebar.style = `width: ${this.hp}%`;

        }
    }
    function returnRandom(upper_limit){
        return Math.floor(Math.random()*upper_limit)
    }
    function getPokemon(search, player){
        fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`, {})
        .then(res=> {return res.clone().json()})
        .then(function(data){
            if(player === 1){
                return p1 = new Player(1, data.name, data.stats[4].base_stat, data.stats[3].base_stat, data.sprites.front_default, data.types[0].type.name, p1_lifebar_status)
            } else {
                return p2 = new Player(2, data.name, data.stats[4].base_stat, data.stats[3].base_stat, data.sprites.front_default, data.types[0].type.name, p2_lifebar_status)
            }
        })
        .then(res => setPlayer(res))
    }
    function setPlayer(player){

        if(player == undefined){
            return
        }
        if(player.id === 1){
            p1_att.innerHTML = player.att;
            p1_def.innerHTML = player.def;
            p1_name.innerHTML = player.name;
            p1_sprite.setAttribute("src", player.img_src)
        }else{
            p2_att.innerHTML = player.att;
            p2_def.innerHTML = player.def;
            p2_name.innerHTML = player.name;
            p2_sprite.setAttribute("src", player.img_src)
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
                // document.getElementsByClassName("toggled").style.color = "black";
                $(".toggled").css("color", "black")
                return "./resources/grass.jpg"
            default:
                return "./resources/forest.jpg"
        }
    }
    function reset(){
        location.reload();
    }

})()








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