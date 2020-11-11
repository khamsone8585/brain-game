let firstNumberList
let secondNumberList
let countedNumber

let timer
let totalTime
let reset

const timeStart = () =>{
    timer = setInterval(()=>{
        totalTime++

        // 905 -> 905 % 100 = 5 milliSeconds
        //905 -> 5 = 900 / 100 = 9 Seconds

        let milliSeconds = totalTime % 100
        let seconds = (totalTime - milliSeconds) / 100

        if(milliSeconds < 10){
            milliSeconds = `0${milliSeconds}`
        }

        if(seconds < 10){
            seconds = `0${seconds}`
        }

        document.getElementById('timer').innerHTML = `${seconds} : ${milliSeconds}`
    }, 10)
}

//TimeStop
const timerStop = () => clearInterval(timer)

const autoReset = () =>{
    if(countedNumber.length === 0){
        reset = setInterval(firstDisplay, 8000)
    }
}

const firstDisplay = () =>{
    clearInterval(reset)
    timerStop()
    totalTime = 0
    firstNumberList = []
    secondNumberList = []
    countedNumber = []

    document.getElementById('timer').innerHTML = `00 : 00`

    for(let i = 1; i < 26; i++){
        // [] -> 11 -> [11]
        // [11] -> 11 -> 23 -> [11, 23]
        const getNumber = () =>{
            const number = Math.floor(Math.random() * 25) + 1
            
            const exist = firstNumberList.find(item => item === number)

            if(exist) return getNumber()

            firstNumberList.push(number)

        }
        getNumber()
    } 
    

    firstNumberList.map((num, i) => {
        const html = document.getElementById(`${i + 1}`)
        html.innerHTML = num


        // attach Onclick Function
        html.addEventListener('click', playGame(html))
    })
    autoReset()
}

window.onload = firstDisplay

const playGame = element => () => {
    clearInterval(reset)
    const value = element.innerHTML

    if(+value !== countedNumber.length + 1) return

    countedNumber.push(+value)

    if(countedNumber.length === 1){
        timeStart()
    }

    if(+value < 26){
        const getNumber = () =>{
            const number = Math.floor(Math.random() * 25) + 26
            
            const exist = secondNumberList.find(item => item === number)

            if(exist) return getNumber()

            secondNumberList.push(number)
            element.innerHTML = number

        }
        getNumber()
    } else{
        element.innerHTML = ''
    }
    if(countedNumber.length === 50){
        timerStop()
    }
}

//Restart 
document.getElementById('restart').addEventListener('click', firstDisplay)