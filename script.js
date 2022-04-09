const selected = new Map();
const checkedImg = './images/checked.png';
const unCheckedImg = './images/unchecked.png';

function getResultMap() {
    if (selected.get('one') == selected.get('two') 
        || selected.get('one') == selected.get('three')) {
        result = selected.get('one');
    } else if (selected.get('two') == selected.get('three')) {
        result = selected.get('two');
    } else {
        result = selected.get('one');
    }
    
    return RESULTS_MAP[result];
}

function getResult() {
    resultMap = getResultMap();  

    const result = document.querySelector('#result');
    result.style.display = 'flex';

    const h1 = document.querySelector('#result h1');
    h1.textContent = resultMap['title'];
    const p = document.querySelector('#result p');
    p.textContent = resultMap['contents'];
 
    const restartButton = document.querySelector('#result div');
    restartButton.style.display = 'flex';

    restartButton.addEventListener('click', _ => {
        window.location.reload(true)
    });
}

function onClick(event) {
    const clicked = event.currentTarget;
    const queryOldAns = 'div[data-question-id="' + clicked.dataset.questionId +
        '"][data-choice-id="' + selected.get(clicked.dataset.questionId) + '"]';
    const queryNewAns = 'div[data-question-id="' + clicked.dataset.questionId +
        '"][data-choice-id="' + clicked.dataset.choiceId + '"]';

    const entries = document.
        querySelectorAll('[data-question-id="' + clicked.dataset.questionId + '"]')

    // diseleziono la risposta selezionata
    if (selected.get(clicked.dataset.questionId) == clicked.dataset.choiceId) {
        for (let entry of entries) {
            entry.style.opacity = 1;
            entry.style.backgroundColor = '#f4f4f4';
        }

        const image = document.querySelector(queryNewAns + ' .checkbox');
        image.src = unCheckedImg;
        selected.delete(clicked.dataset.questionId);
        return;
    }

    const unClicked = document.querySelector(queryOldAns);

    // se esiste, deseleziona la vecchia risposta, altrimenti 
    // deseleziona tutto tranne la risposta corrente
    if (unClicked) {
        unClicked.style.opacity = 0.6;
        unClicked.style.backgroundColor = '#f4f4f4';
        document.querySelector(queryOldAns + ' .checkbox').src = unCheckedImg;
    } else {
        for (let entry of entries) {
            if (entry.dataset.choiceId != clicked.dataset.choiceId) {
                entry.style.opacity = 0.6;
                entry.style.backgroundColor = '#f4f4f4';
            }
        }
    }

    // seleziona l'elemento cliccato
    clicked.style.backgroundColor = '#cfe3ff';
    clicked.style.opacity = 1;
    const image = document.querySelector(queryNewAns + ' .checkbox');
    image.src = checkedImg;
    selected.set(clicked.dataset.questionId, clicked.dataset.choiceId);

    // controlla se ho tre risposte
    if (selected.size >= 3) {
        for (const ans of anss) {
            ans.removeEventListener('click', onClick);
        }
        getResult();
    }
}

const anss = document.querySelectorAll('section div');
for (const ans of anss) {
    ans.addEventListener('click', onClick);
}
