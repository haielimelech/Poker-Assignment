//crating a class for the card
class Card{
    constructor(color,value){
        const avaliableColor = ["red","black"];
        if(!avaliableColor.includes(color)){
            throw new Error("Invalid color");
        }
        if(value < 1 || value > 13){
            throw new Error("Invalid value");
        }
        this.color = color;
        this.value = value;
    }
}

//creating a class for the game
class Game {
    constructor(cards){
        //check if the cards is an array and if it has 5 cards
        if(Array.isArray(cards) === false || cards.length != 5){
            throw new Error("Invalid cards");
        }
        this.cards = cards;
    }
    
    //check if there is a pair
    check(cardValues, numberToCheck, twoKindOfPairs=false) {
        //save cards numbers
        const keys = Object.keys(cardValues);
        let pairs = 0;
        for (let value of keys) {
            //check the card details
            const card = cardValues[value];
            if(twoKindOfPairs){
                if (card.count >= numberToCheck && (card.red === numberToCheck && card.black === numberToCheck)) {
                    return true;
                }else{
                    if (card.count >= numberToCheck && (card.red === numberToCheck || card.black === numberToCheck)) {
                        pairs++;
                    }
                }
            }else{
                if(((card.count >= numberToCheck) && (card.red === numberToCheck || card.black === numberToCheck))){
                    return true;
                }
        }
    }
    if (twoKindOfPairs && pairs === numberToCheck) {
        return true;
    }

    return false;
}

    checkPairs() {
        const cardsValues = {};
        // Loop through the cards, check the cards colors and values, and store them in the object
        for (let card of this.cards) {
            if (!cardsValues[card.value]) {
                cardsValues[card.value] = { red: 0, black: 0, count: 0 };
            }
            cardsValues[card.value][card.color]++;
            cardsValues[card.value].count++;
        }  

        //check if there is a four of a kind
        console.log(cardsValues);
        if(this.check(cardsValues,4)){
            return "Four of a kind";
        }else if(this.check(cardsValues,2) && this.check(cardsValues,3)){
            return "Full House";  
        }else if(this.check(cardsValues,3)){
            return "Three of a kind";
        }else if(this.check(cardsValues,2,true)){
            return "Two pairs";
        }else if(this.check(cardsValues,2)){
            return "Pairs";
        }else{
            return "no Pairs Found";
        }
    }
}

const cards1 = [
    new Card("black",1),
    new Card("black",1),
    new Card("black",1),
    new Card("red",4),
    new Card("red",4),
];

console.log(cards1);

const game1 = new Game(cards1);

console.log(game1.checkPairs());