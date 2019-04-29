// class Character {
//     constructor(name, att, def){
//         this.name = name;
//         this.att = att;
//         this.def = def;
//     }
//     attack(){

//     }
// }

// // function getP1Ready(){
// //     return new Character($("#p1_input").val(), getAttack(), getDefense())
// // }
// // function getP2Ready(){
// //     return new Character($("#p2_input").val(), getAttack(), getDefense())
// // }
// document.getElementById("p1_input_button").addEventListener("click", function(event){
//     event.preventDefault();
//     onSubmit($("#p1_input").val());
// });
// document.getElementById("p2_input_button").addEventListener("click", function(event){
//     event.preventDefault();
//     console.log("clicked")
//     onSubmit($("#p2_input").val());
// });



// function onSubmit(name){
//     let player = createPlayer(name);
//     getPokemon(player.name);
// }
// function createPlayer(name){
//     // e.preventDefault();
//     if (name){
//         return new Character(name, getAttack(), getDefense())
//     } else {
//         return new Character(Math.floor(Math.random()*800), getAttack(), getDefense())
//     }
// }
// function getAttack(){
//     return Math.random()
// }
// function getDefense(){
//     return Math.random()
// }

// function getPokemon(search){
//     let base = "https://pokeapi.co/api/v2/";
//     fetch(`https://pokeapi.co/api/v2/pokemon/${search}/`, {})
//     .then(res=> {return res.clone().json()})
//     .then(function(data){
//         setPlayer(data);
//     })
// }
// function setPlayer(data){
//     document.getElementById("p1_sprite").setAttribute("src", `${data.sprites.front_default}`)
//     console.log(data)
// }
// function getPokemon(search){
//     let base = "https://pokeapi.co/api/v2/";
//     fetch(`${base}pokemon/${search}`, function(res){
//         console.log(res.json())
//     })
// }
