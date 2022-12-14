
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

function get8BallResponse(){
    let returnValue;
    const randomResponse = getRandomInt(0, 2);

    const yesResponses = ["Yes", "Obviously", "I wholeheartedly say yes", "Your mom would say yes to that",]
    const maybeResponses = ["Maybe", "I'd say you need some self reflection first", "I mean it could happen but what's the point?"]
    const noResponses = ["No", "Absolutley not", "I've never wanted to say no more to anything in my life", "I strongly suggest not doing that"]


    if(randomResponse === 0){

        const yesIndex = getRandomInt(0, yesResponses.length - 1)

        returnValue = yesResponses[yesIndex]
    }

    if(randomResponse === 1){

        const maybeIndex = getRandomInt(0, maybeResponses.length - 1)

        returnValue = maybeResponses[maybeIndex]
    }

    if(randomResponse === 2){

        const noIndex = getRandomInt(0, noResponses.length - 1)
        
        returnValue = noResponses[noIndex]

    }

    console.log(returnValue)
    return returnValue
}

get8BallResponse()