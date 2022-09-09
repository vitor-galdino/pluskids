
const splitSyllable = word => word.match(syllableRegex);

const firstLetterUpper = str => str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

const menuBox = document.querySelector(".main-menu");

function reloadHtmlandAddHeader() {
    menuBox.innerHTML = "";
    const header = document.createElement("header");
    menuBox.appendChild(header);
    return header;
}

// home page section
let userName = "";
const userNameBtn = document.querySelector(".username-confirmed");
userNameBtn.addEventListener("click", function () {
    const userNameId = document.querySelector("#username");
    userName = userNameId.value;

    const errorName = document.querySelector(".error-name");

    if (userName) return renderAlphabetPage(userName);
    else {
        errorName.style.opacity = 1;
        errorName.innerText = "Nome invalido! Tente novamente!";
        setTimeout(function () {
            errorName.style.opacity = 0;
            return;
        }, 3500,)
    }
})

// alphabet word choice section
function renderAlphabetPage(user) {
    const header = reloadHtmlandAddHeader();
    menuBox.classList.add("alphabet-menu")
    header.innerHTML = `
    <h2 class="alphabet-title">Olá, ${firstLetterUpper(user)}, qual vai ser a letra do dia?</h2>
    <span>Escolha abaixo uma das opções:</span>
    `;
    renderAlphabet();
}

function renderAlphabet() {
    const div = document.createElement("div");
    div.classList.add("alphabet-box");
    menuBox.appendChild(div);
    for (let i = 0; i < syllableList.length; i++) {
        const button = document.createElement("button");
        button.classList.add("on-btn", "letter-btn")
        button.innerHTML = `<span>${syllableList[i].letter}</span>`
        div.appendChild(button);

        // choice of letter
        let alphabetBtn = document.querySelector(".alphabet-box");
        alphabetBtn.addEventListener("click", function (event) {
            let btn = event.path[1];

            if (btn.classList[1] === "letter-btn") {
                btn.classList.remove("on-btn");
                btn.classList.add("off-btn");
                setTimeout(function () {
                    let letterChoice = btn.textContent;
                    userLetterChoice(letterChoice);
                    return renderPlayground(letterChoice);
                }, 277)
            }
        })
    }
}

// function isAllCompletedToday() {

// }

let letter = "";
function userLetterChoice(value) {
    letter = value;
    return letter;
}

// playground of syllabes
function renderPlayground(chosenLetter) {
    const header = reloadHtmlandAddHeader();
    header.innerHTML = "<h2>Leia as sílabas a seguir:</h2>"

    capitalizeSyllables(chosenLetter);

    const div = document.createElement("div");
    div.classList.add("box-btn");
    menuBox.appendChild(div);

    const continueBtn = document.createElement("button");
    continueBtn.classList.add("off-btn", "continue-btn");
    continueBtn.innerHTML = `<span>Continuar</span>`;

    const skipBtn = document.createElement("button");
    skipBtn.classList.add("on-btn", "skip-btn");
    skipBtn.innerHTML = `<span>Pular</span>`;
    div.append(skipBtn, continueBtn);

    skipBtn.addEventListener("click", skipStepButton);
}

function capitalizeSyllables(letter) {
    let word = [];
    let randomNum;
    let syllables;

    for (let i = 0; i < syllableList.length; i++) {
        if (syllableList[i].letter === letter.toUpperCase()) {
            if (syllableList[i].words.length === 0) {
                renderFinalScreen();
                
            } else {
                randomNum = Math.floor(Math.random() * syllableList[i].words.length);

                word.push(syllableList[i].words[randomNum]);
                syllables = word.map(splitSyllable)[0];

                // remove used syllable in the array
                syllableList[i].words.splice(randomNum, 1);
            }
        }
    }
    return renderSyllables(syllables);
}

function renderSyllables(syllabesArr) {
    const div = document.createElement("div");
    div.classList.add("syllabes-box");
    menuBox.appendChild(div);
    for (let i = 0; i < syllabesArr.length; i++) {
        const button = document.createElement("button");
        button.classList.add("on-btn", "syllabe-btn")
        button.innerHTML = `<span>${syllabesArr[i].toUpperCase()}</span>`
        div.appendChild(button);
    }
    const syllabesButton = document.querySelector(".syllabes-box");
    syllabesButton.addEventListener("click", pressBtnAndActivate);
}

function pressBtnAndActivate(event) {
    const btn = event.path[1];
    const btnArr = event.path[2].children;

    if (btn.classList[1] === "syllabe-btn") {
        btn.classList.remove("on-btn");
        btn.classList.add("off-btn");
    }
    let count = 0;
    for (let i = 0; i < btnArr.length; i++) {
        if (btnArr[i].classList[1] === "off-btn") {
            count++;
        }
    }
    if (btnArr.length === count) {
        const activateBtn = document.querySelector(".continue-btn");
        activateBtn.classList.remove("off-btn");
        activateBtn.classList.add("on-btn");
        activateBtn.addEventListener("click", continueStepButton);
    }
}

let count = 0;
function continueStepButton() {
    count++;
    renderPlayground(letter);
}

function skipStepButton(event) {
    const btn = event.path[1];
    btn.classList.remove("on-btn");
    btn.classList.add("off-btn");
    setTimeout(function() {
        renderPlayground(letter);
    }, 177)
}

// final screen

function renderFinalScreen() {
    const header = reloadHtmlandAddHeader();

    const div = document.createElement("div");
    div.classList.add("last-screen");
    menuBox.appendChild(div);

    header.innerHTML = `<h2>Parabéns, ${userName} !</h2>`;

    const p = document.createElement("p");
    if (count >= 2) {
        p.innerText = `Você já aprendeu ${count} palavras novas hoje.`;
    } else if (count === 1) {
        p.innerText = `Você já aprendeu ${count} palavra nova hoje.`;
    }
    header.appendChild(p);

    const backButton = document.createElement("button");
    backButton.classList.add("on-btn");
    backButton.innerHTML = `<span>Voltar ao Menu</span>`
    div.append(header, backButton);

    backButton.addEventListener("click", function() {
        backButton.classList.remove("on-btn");
        backButton.classList.add("off-btn");
        setTimeout(function() {
            renderAlphabetPage(userName);
        }, 277)
    })
}