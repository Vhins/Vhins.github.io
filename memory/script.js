const DECKS = {
    "D1": [
        {id: 1, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5535_0.jpg?q=80&scale.option=fill&w=400&h=0"},
        {id: 2, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5536_0.jpg?q=80"},
        {id: 3, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5537_0.jpg?q=80"},
        {id: 4, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5538_0.jpg?q=80"},
        {id: 5, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5539_0.jpg?q=80"},
        {id: 6, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5540_0.jpg?q=80"},
        {id: 7, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5541_0.jpg?q=80"},
        {id: 8, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5542_0.jpg?q=80"},
        {id: 9, link: "https://trucksrl.sirv.com/pub/media/catalog/product/i/m/image_5543_0.jpg?q=80"},
        {id: 10, link: "https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28D157162510W8333H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/numero-10-numero-dieci-calcio-playmaker-team-adesivo.jpg"},
        {id: 11, link: "https://st2.depositphotos.com/1011969/6671/i/950/depositphotos_66714411-stock-photo-number-11.jpg"},
        {id: 12, link: "https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A839PA4459PT28D196924273W9731H10000/views/1,width=800,height=800,appearanceId=839,backgroundColor=F2F2F2/simbolo-del-numero-12-adesivo.jpg"},
    ],

    "D2": [
        {id: 1, link: "https://www.laprovinciacr.it/resizer/480/-1/true/2023_10_08/Cattura-1696759177118.JPG--tutti_alla_ricerca_disperata_del_piccolo_cagnolino_athos.JPG?1696759177133"},
        {id: 2, link: "https://www.ciamanimali.com/stupload/stblog/1/55/75/5575large.jpg"},
        {id: 3, link: "https://www.villaggionatura.com/shop/modules/ph_simpleblog/covers/28.jpg"},
        {id: 4, link: "https://safarizimbabwe.it/wp-content/uploads/2022/05/zebra-safari-zimbabwe-770x293.jpg"},
        {id: 5, link: "https://www.my-personaltrainer.it/2023/09/19/quanto-vive-un-coniglio_900x760.jpeg"},
        {id: 6, link: "https://citynews-romatoday.stgy.ovh/~media/horizontal-mid/42908841148321/tigre-di-sumatra.jpg"},
        {id: 7, link: "https://www.focus.it/images/2022/09/20/ramphocelus-bresilius_1020x680.jpg"},
        {id: 8, link: "https://www.focus.it/images/2023/08/03/grande-scimmia-leonina-orig.jpg"},
        {id: 9, link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMflVx6-Kga8CurCYkzrGCnHKEYMeKoBg2oUhR3LMKdA&s"},
        {id: 10, link: "https://www.focusjunior.it/content/uploads/site_stored/imgs/0001/048/koalafamiglia.jpg"},
        {id: 11, link: "https://media-cdn.tripadvisor.com/media/photo-s/10/08/0f/ca/papera-bellissima.jpg"},
        {id: 12, link: "https://sostieni.wwf.it/wp-content/uploads/2023/09/Immagini-new-sostieni-5800-x-4182-px-26-scaled.jpg"},
    ]
}

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

// carta.setAttribute("flipped", false)
// carta.className = "non_girata"

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}