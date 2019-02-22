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
    
    fight_button.addEventListener('click', function(event){

    })
    p1_input_button.addEventListener('click', function(event){
        // event.preventDefault();
        // getPokemon(p1_input.value, 1);
        // console.log(p1);
        // setPlayer(p1)
        let prom = new Promise(function(resolve, reject){
            resolve(getPokemon(p1_input.value, 1));
        }).then(function(){
            setPlayer(p1)
        })
    })
    p1_random_button.addEventListener('click', function(event){
        let prom = new Promise(function(resolve, reject){
            resolve(getPokemon(returnRandom(805), 1));
        }).then(function(){
            setPlayer(p1)
        })
        // prom;
        // console.log(p1);
    })
    p2_input_button.addEventListener('click', function(event){
        let prom = new Promise(function(resolve, reject){
            resolve(getPokemon(p2_input.value, 2));
        }).then(function(){
            setPlayer(p2)
        })
    })
    p2_random_button.addEventListener('click', function(event){
        let prom = new Promise(function(resolve, reject){
            resolve(getPokemon(returnRandom(805), 2));
        }).then(function(){
            setPlayer(p2)
        })
    })
    
    class Player{
        constructor(id, name, att, def, img_src){
            this.id = id;
            this.name = name;
            this.att = att;
            this.def = def;
            this.img_src = img_src;
        }
        attack(){

        }
        get_hit(){

        }
    }
    function returnRandom(upper_limit){
        return Math.floor(Math.random()*upper_limit)
    }
    function getPokemon(search, player){
        // let base = "https://pokeapi.co/api/v2/";
        fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`, {})
        .then(res=> {return res.clone().json()})
        .then(function(data){
            if(player === 1){
                p1 = new Player(1, data.name, data.stats[4].base_stat, data.stats[3].base_stat, data.sprites.front_default)
            } else {
                p2 = new Player(2, data.name, data.stats[4].base_stat, data.stats[3].base_stat, data.sprites.front_default)
            }
        })
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
    function reset(){
        location.reload();
    }

})()