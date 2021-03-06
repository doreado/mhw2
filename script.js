const selected = new Map();
const checkedImg = './images/checked.png';
const unCheckedImg = './images/unchecked.png';

function getResultMap() {
    result = selected.get('two') == selected.get('three') ?
        selected.get('two') : selected.get('one');
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

function resetSelection(ans) {
    ans.classList.remove('selected');
    ans.classList.remove('unselected');
    ans.classList.add('emptySelection');
}

function unselect(ans) {
    ans.classList.remove('emptySelection');
    ans.classList.remove('selected');
    ans.classList.add('unselected');
}

function select(ans) {
    ans.classList.remove('emptySelection');
    ans.classList.remove('unselected');
    ans.classList.add('selected');
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
            resetSelection(entry);
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
        unselect(unClicked);
        document.querySelector(queryOldAns + ' .checkbox').src = unCheckedImg;
    } else {
        for (let entry of entries) {
            if (entry.dataset.choiceId != clicked.dataset.choiceId) {
                unselect(entry);
            }
        }
    }

    // seleziona l'elemento cliccato
    select(clicked);
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
