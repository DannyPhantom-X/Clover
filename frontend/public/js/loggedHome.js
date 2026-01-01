import {inputResizing, inputChecker } from './gen.js'
const closeTabBttn = document.querySelector('.close-tab-bttn')
const asidePanel = document.querySelector('.aside-panel')
const uploadBttn = document.querySelector('.upload-bttn')
const inputArea = document.querySelector('.input-area')
const imgBttn = document.getElementById('img-bttn')
const asideStatus  = document.querySelector('.aside-status')
const buildModeRadio = document.querySelector('.build-mode-radio');
const chatModeRadio = document.querySelector('.chat-mode-radio')
let isRunning = false
clickEnter()
inputResizing(inputArea)
inputChecker()
document.querySelector('.edit-icon').addEventListener('click', () => {
    if (!asideStatus.checked && window.matchMedia('(min-width: 600px)').matches) {
        asideStatus.checked = true
    }
})
document.querySelector('.menu-bttn').addEventListener('click', () => {
    asideStatus.checked = true
    document.querySelector('.aside-panel').style.display = 'flex'
    document.querySelector('.body-main').classList.add('shade')
    document.querySelector('.header').classList.add('shade')
    document.querySelector('.chat-fixed-div').classList.add('shade')
})
closeTabBttn.addEventListener('click', () => {
    if (asideStatus.checked && window.innerWidth >= '600px') {
        asideStatus.checked = false
    }else{
        document.querySelector('.aside-panel').style.display = 'none'
        document.querySelector('.body-main').classList.remove('shade')
        document.querySelector('.header').classList.remove('shade')
        document.querySelector('.chat-fixed-div').classList.remove('shade')
        asideStatus.checked = false
    }
})
uploadBttn.addEventListener('click', () => {
    ask()
})


window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 600px)').matches) {
        document.querySelector('.aside-panel').style.display = 'flex'
    }else{
        document.querySelector('.aside-panel').style.display = 'none'
    }
})

async function ask() {
    if(inputArea.value !== '' && !isRunning) {
        isRunning = true;
        document.querySelector('.upload-bttn > svg').style.animation = 'upAnddown 1s normal 0s infinite';
        document.querySelector('.upload-bttn').disabled = true;
        const question = inputArea.value
        inputArea.value  = '';
        if(chatModeRadio.checked) {
            document.querySelector('.fbi').innerHTML += `<div class="user-question">${question}</div>`;
            inputChecker()
            const response = await fetch('/c/ask', {
            method: 'Post',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({question: question})
            })
            const result = await response.json();
            const formattedHtml = DOMPurify.sanitize(marked.parse(result.cloverResponse));
            const el = document.createElement("div");
            el.innerHTML = formattedHtml;
            el.classList.add("clover-response");
            renderMathInElement(el);
            document.querySelector('.fbi').appendChild(el);
            document.querySelector('.upload-bttn > svg').style.animation = 'none';
            isRunning = false;
            document.querySelector('.upload-bttn').disabled = false;

        }else if(buildModeRadio.checked) {
            document.querySelector('.upload-bttn > svg').style.animation = 'none';
            isRunning = false;
            document.querySelector('.upload-bttn').disabled = false;
            alert('We are sorry Build Mode is not available right now')
        }
    }
}

export function clickEnter() {
    inputArea.addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
            e.preventDefault()
            ask()
        }
    })
}