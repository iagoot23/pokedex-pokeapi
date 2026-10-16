let keyboard = {
    currentKey: '',
    lastKey: '',
    timerIsOn: false,
    index: 0,
    key1: [''],
    key2: ['a', 'b', 'c'],
    key3: ['d', 'e', 'f'],
    key4: ['g', 'h', 'i'],
    key5: ['j', 'k', 'l'],
    key6: ['m', 'n', 'o'],
    key7: ['p', 'q', 'r', 's'],
    key8: ['t', 'u', 'v'],
    key9: ['w', 'x', 'y', 'z'],
    key0: ['-']
}

let timerId = 0;

//SCREENS AND INDICATORS

const mainScreen = document.querySelector('#main-screen'); //shows the pokémon sprite
const infoScreen = document.querySelector('#info-screen'); //shows what user types or current pokémon data
const smallDisplayLeft = document.querySelector('#small-display-left'); //shows the name of previous evolution
const smallDisplayRight = document.querySelector('#small-display-right'); //shows the name of next evolution
const ledRed = document.querySelector('.led--red');
const ledYellow = document.querySelector('.led--yellow');
const ledGreen = document.querySelector('.led--green');
const frameDotLeft = document.querySelector('.frame-dot--left');
const frameDotRight = document.querySelector('.frame-dot--right');
const powerLed = document.querySelector('.power-led');



//CONTROLS

const key1 = document.querySelector('#key-1'); //key for number 1
const key2 = document.querySelector('#key-2'); //key for number 2 | a b c
const key3 = document.querySelector('#key-3'); //key for number 3 | d e f
const key4 = document.querySelector('#key-4'); //key for number 4 | g h i
const key5 = document.querySelector('#key-5'); //key for number 5 | j k l
const key6 = document.querySelector('#key-6'); //key for number 6 | m n o
const key7 = document.querySelector('#key-7'); //key for number 7 | p q r
const key8 = document.querySelector('#key-8'); //key for number 8 | s t u
const key9 = document.querySelector('#key-9'); //key for number 9 | w x y z
const key10 = document.querySelector('#key-10'); //key for number 0 | -
const btnWhiteLeft = document.querySelector('#btn-white-left'); //search
const btnWhiteRight = document.querySelector('#btn-white-right'); //delete
const btnDarkLeft = document.querySelector('#btn-dark-left'); //toggles keyboard to letter mode
const btnDarkRight = document.querySelector('#btn-dark-right'); //toggles keyboard to number mode
const redButton = document.querySelector('#btn-red'); //shows the female version
const blueButton = document.querySelector('#btn-blue'); //shows the male version
const btnRound = document.querySelector('#btn-round'); //plays pokémon cry
const btnUp = document.querySelector('#btn-up'); //next pokémon by number
const btnDown = document.querySelector('#btn-down'); //previous pokémon by number
const btnLeft = document.querySelector('#btn-left'); //previous pokémon data
const btnRight = document.querySelector('#btn-right'); //next pokémon data
const btnYellow = document.querySelector('#led-yellow'); //toggles between normal and shiny

let pokedexState = {
    userTyping: false,
    keyboardMode: true, //false for number | true for letter
    validSearch: false
};


function resetTimer()
{
    clearTimeout(timerId);
    clearInterval(timerId);
    keyboard.timerIsOn = false;
}

function keyboardPressed(button)
{
    if (pokedexState.userTyping === false)
    {
        pokedexState.userTyping = true;
        infoScreen.textContent = '';
    }
    let buttonPressed = '';
    if(pokedexState.keyboardMode)
    {
        if (button === '1') return;
        keyboard.currentKey = button;
        if(keyboard.currentKey !== keyboard.lastKey) resetTimer();
        if(keyboard.timerIsOn)
        {
            keyboard.index = (keyboard.index + 1) %  keyboard[`key${button}`].length;
            infoScreen.textContent = infoScreen.textContent.slice(0, -1);
        }
        else 
        {
            keyboard.timerIsOn = true;
            keyboard.index = 0;
        }
        clearTimeout(timerId);
        timerId = setTimeout(resetTimer, 1000);
        buttonPressed = keyboard[`key${button}`][keyboard.index];
        keyboard.lastKey = keyboard.currentKey;
    }
    else buttonPressed = button;
    infoScreen.textContent += buttonPressed;
}

async function search()
{
    if(pokedexState.userTyping)
    {
        let endpoint = '';
        if (!pokedexState.keyboardMode && Number.isFinite(Number(infoScreen.textContent)))
        {
            endpoint = infoScreen.textContent;
            pokedexState.validSearch = true;
        }
        else if (pokedexState.keyboardMode && infoScreen.textContent.length <= 12)
        {
            endpoint = infoScreen.textContent;
            pokedexState.validSearch = true;
        }
        if(pokedexState.validSearch)
        {
            try
            {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`);
            }
            catch(error)
            {
                alert(error.msg);
            }
        }
    }
}

function clear()
{
    if(infoScreen.textContent.length > 1)
    {
        infoScreen.textContent = infoScreen.textContent.slice(0, -1);
    }
    else
    {
        pokedexState.userTyping = false;
        infoScreen.textContent = 'Aguardando dados…';
    }
}

key1.addEventListener('click', () => keyboardPressed('1'));
key2.addEventListener('click', () => keyboardPressed('2'));
key3.addEventListener('click', () => keyboardPressed('3'));
key4.addEventListener('click', () => keyboardPressed('4'));
key5.addEventListener('click', () => keyboardPressed('5'));
key6.addEventListener('click', () => keyboardPressed('6'));
key7.addEventListener('click', () => keyboardPressed('7'));
key8.addEventListener('click', () => keyboardPressed('8'));
key9.addEventListener('click', () => keyboardPressed('9'));
key10.addEventListener('click', () => keyboardPressed('0'));
btnWhiteLeft.addEventListener('click', search);
btnWhiteRight.addEventListener('click', clear);
btnDarkLeft.addEventListener('click', () => {if (!pokedexState.keyboardMode) pokedexState.keyboardMode = true; infoScreen.textContent = '';});
btnDarkRight.addEventListener('click', () => {if (pokedexState.keyboardMode) pokedexState.keyboardMode = false; infoScreen.textContent = '';});
