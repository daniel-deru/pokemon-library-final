const img = document.getElementById('img');
const display = document.createElement('img')
const pokemon = document.getElementById('name')
const height = document.getElementById('height')
const weight = document.getElementById('weight')
const pokeType = document.getElementById('types')
const ability = document.getElementById('ability')
const health = document.getElementById('health')
const attack = document.getElementById('attack')
const defence = document.getElementById('defence')
const speed = document.getElementById('speed')
const movesList = document.getElementById('moves')
const namesList = document.getElementById('names')
const namesContainer = document.getElementById('names-container')
const getPokemon = document.getElementById('get-pokemon')
const movesContainer = document.getElementById('moves-container')
const mainInfo = document.getElementById('main-info');
const scrollUp = document.getElementById('scroll-up')
const scrollDown = document.getElementById('scroll-down')
const menu = document.getElementById("menu")
//https://pokeapi.co/api/v2/pokemon-species/6/
//this is for the pokemon description
//use this api to get the response 
//for the next time i work on this project
//https://pokeapi.co/api/v2/move/
//this is for the move list to show the effect of each move
let counter = 1

async function next(){  
    counter++
    await getImage()
    await getData()
}

async function previous(){
    if(counter > 1){
        counter--
        await getImage()
        await getData()
    }
}

async function getImage(){
    const image = await fetch(`https://pokeres.bastionbot.org/images/pokemon/${counter}.png`)
    const imageRes = await image.blob()
    display.src = URL.createObjectURL(imageRes)
}

async function getData(){
    const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${counter}/`)
    const poke = await pokeData.json()
    pokemon.innerHTML = `${counter}. ${poke.name}`
    height.textContent = poke.height
    weight.textContent = poke.weight
    ability.textContent = poke.abilities[0].ability.name
    health.textContent = poke.stats[0].base_stat
    attack.textContent = poke.stats[1].base_stat
    defence.textContent = poke.stats[2].base_stat
    speed.textContent = poke.stats[5].base_stat

    //this is for the types
    let typesData = []
    for(type of poke.types){
        typesData.push(type.type.name)
        pokeType.textContent = typesData.join(' ')
    }

    //this is for the moves list
    let typeArray = []
    for(move of poke.moves){
        typeArray.push(`<li>${move.move.name}</li>`)
        movesList.innerHTML = typeArray.join('')
    }
    
}

async function getName(){
    const name = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=890`)
    const nameRes = await name.json()
    for(let i = 0; i < nameRes.results.length; i++){
       const names = document.createElement('li')
        names.textContent = nameRes.results[i].name
        namesList.append(names)
        names.addEventListener("click", () => {
          counter = i + 1
          getData()
          getImage()
          namesContainer.style.right = "-400px"
          namesList.style.opacity = "0"
          namesList.style.transform = "translateX(-50px)"
          
        })
    }

}
getName()
next()
previous()
img.append(display)

// this is for dom minupulation


scrollDown.addEventListener('click', () =>  movesContainer.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}))

scrollUp.addEventListener('click', () =>  mainInfo.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"}))

getPokemon.addEventListener('click', () => {
    if(namesContainer.style.right == "-400px"){
        namesContainer.style.right = "0px";
        namesList.style.opacity = "1"
        namesList.style.transform = "translateX(0px)"
    }else {
        namesContainer.style.right = "-400px"
        namesList.style.opacity = "0"
        namesList.style.transform = "translateX(-50px)"
    }  
})


 
