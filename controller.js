import * as model from './model.js';
import guessView from './guessView.js';
import keyboardView from './keyboardView.js';
import settingsView from './settingsView.js';
import statsView from './statsView.js';
import headerView from './headerView.js';

const setWord = function () {
    const word = model.getWord();
    model.setCurrentWord(word);
    console.log(model.state.currentWord);
};
const displayGameView = function (shake = false) {
    guessView.update({
        curIndex: model.state.guessIndex,
        gusses: model.state.gusses,
        currentGuess: model.state.currentGuess,
        shake,
    });
    displayKeyboardView();
};
const addGuess = function () {
    if (model.state.isOver === true) return;
    if (model.state.currentGuess.length < 5) {
        guessView.renderError('Enter 5 letter word', 1);
        return true;
    }
    if (!model.checkWord(model.state.currentGuess.join(''))) {
        guessView.renderError('Not in word list', 1);
        return true;
    }
    model.addCurrentGuess();
    if (model.state.guessIndex === 1) {
        model.updateLocalStats(model.updateGamesPlayed);
    }
    if (model.state.isGuessed === true) {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {y: 0.6},
        });
    }
    if (!model.state.isGuessed && model.state.isOver) {
        guessView.renderError(
            `Correct answer is ${model.state.currentWord.toUpperCase()}`,
            3,
        );
    }
    if (model.state.isOver) {
        model.updateLocalStats(model.updateStats);
        headerView.update({
            streak: model.getCurrentStreak(),
        });
    }
};
const displayKeyboardView = function () {
    keyboardView.update({
        greenKey: model.state.greenKey,
        yellowKey: model.state.yellowKey,
        wrongKey: model.state.wrongKey,
        isOver: model.state.isOver,
    });
};

document.addEventListener('keydown', function (event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
        model.addLetter(event.key.toLowerCase());
        displayGameView();
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        displayGameView(addGuess());
    }
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace') {
        model.removeLetter();
        displayGameView();
    }
});
const restart = function (params) {
    model.restartGame();
    setWord();
    model.state.difficulty === 'easy' &&
        model.addLetter(model.state.currentWord[0]);
    displayGameView();
};
const keyPress = async function (key) {
    if (key === 'Enter') {
        displayGameView(addGuess());
        return;
    }
    if (key === 'Backspace') {
        model.removeLetter();
        displayGameView();
        return;
    }
    if (key === 'Restart') {
        restart();
        return;
    }
    model.addLetter(key.toLowerCase());
    displayGameView();
};

const closeSettings = function () {
    settingsView.render({visible: false});
};
const openSettings = function () {
    settingsView.render({
        visible: true,
        inProgress: model.state.guessIndex > 0 && !model.state.isOver,
        level: model.state.difficulty,
    });
    settingsView.addHandlerDifficultySelect(model.setDifficulty, restart);
    settingsView.addHandlerCloseSettings(closeSettings);
};
const openStats = function () {
    statsView.render({...model.getStatsDataUI(), visible: true});
    statsView.addHandlerCloseModel(closeStats);
};
const closeStats = function () {
    statsView.render({visible: false});
};
(async function () {
    await model.fetchWords();
    setWord();
    model.state.difficulty === 'easy' &&
        model.addLetter(model.state.currentWord[0]);
    headerView.render({
        streak: model.getCurrentStreak(),
    });
    headerView.addHandlerOpenStats(openStats);
    headerView.addHandlerOpenSettings(openSettings);
    guessView.render({
        curIndex: model.state.guessIndex,
        gusses: model.state.gusses,
        currentGuess: model.state.currentGuess,
    });
    keyboardView.render({
        greenKey: model.state.greenKey,
        yellowKey: model.state.yellowKey,
        wrongKey: model.state.wrongKey,
        isOver: model.state.isOver,
    });
    keyboardView.addHandlerKeyboard(keyPress);
})();
if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
    document.body.classList.add('dark');
}
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
        if (event.matches) document.body.classList.add('dark');
        else document.body.classList.remove('dark');
    });
