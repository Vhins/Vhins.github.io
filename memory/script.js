
let choosen_deck_type

function play() {
    document.getElementById("first_question").style.display = "none"
    document.getElementById("second_question").style.display = "flex"
}

function chooseDeckType(event) {
    choosen_deck_type = DECKS[event.target.id]
    document.getElementById("second_question").style.display = "none"

    initializeGame()
}

const gameCards = []

function initializeGame() { //* aggiungendo le carte con dei nuovi id 12 + 12
    let new_card_id = choosen_deck_type.length

    for (let card of choosen_deck_type) {
        gameCards.push(card)

        new_card_id += 1
        const new_card = JSON.parse(JSON.stringify(card))
        new_card.id = new_card_id
        gameCards.push(new_card)
    }

    randomizeDeck()
}

function randomizeDeck() { //* mischiando le carte, posizione nell array

    for (let i = 0; i < gameCards.length * 10; i++) {
        const casualNumber_1 = Math.floor(Math.random() * gameCards.length)
        const casualNumber_2 = Math.floor(Math.random() * gameCards.length)

        let cache_swap = gameCards[casualNumber_1]

        gameCards[casualNumber_1] = gameCards[casualNumber_2]
        gameCards[casualNumber_2] = cache_swap
    }

    addCardsToHTML()
}

const handler = function(event) {
    flipCard(event.target.id)
}

function addCardsToHTML() { //* aggiungendo le carte all html
    const container = document.getElementById("game")

    let card_number = 0

    for (const carta of gameCards) {
        card_number += 1

        const div = document.createElement("div")
        div.innerText = card_number
        div.id = carta.id
        div.style.backgroundImage = `url(${carta.link})`
        div.className = "non_girata"
        div.setAttribute("flipped", false)

        div.addEventListener("click", handler, true)

        container.appendChild(div)
    }

    document.getElementById("game").style.display = "flex"
}

let last_flipped_card = null

let turni = 0
let carte_giuste = 0
let can_flip = true

async function flipCard(id) {

    if (!can_flip) {
        return
    }

    can_flip = false

    const carta = document.getElementById(id)

    if (carta.getAttribute("flipped") === "false") {

        carta.setAttribute("flipped", true)
        carta.className = "girata"

        turni += 0.5

        if (last_flipped_card) {
            await wait(1000)
        }

        if (last_flipped_card !== null) {
            if (carta.style.backgroundImage == last_flipped_card.style.backgroundImage) {
                carte_giuste += 1
                console.log('dajee ', carte_giuste)
                last_flipped_card = null
                if (carte_giuste === gameCards.length / 2) {
                    alert('vittoria in ' + turni + ' turni')
                    location.reload()
                }
            } else {
                carta.setAttribute("flipped", false)
                carta.className = "non_girata"
                last_flipped_card.setAttribute("flipped", false)
                last_flipped_card.className = "non_girata"

                last_flipped_card = null
            }
        } else {
            last_flipped_card = document.getElementById(id)
        }




    } else {
        console.error('carta gia girata, scegline un altra')
    }

    can_flip = true

}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
