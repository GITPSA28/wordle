import View from './view.js';

class statsView extends View {
    _parentContainer = document.getElementById('model-container');
    _generateMarkup() {
        if (!this._data.visible) return '';
        let mark = `
<div class="model">
    <div class="model-header">
        <p class="model-title">
            Statistics
        </p>
        <div class="model-close" tabindex="0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd" />
            </svg>
        </div>
    </div>
    <div class="stats-container">
        <div class="stats-all">
            <div class="stats-single">
                <div class="stats-single-main">
                    <p class="stats-num">
                        ${this._data.played}
                    </p>
                </div>
                <p class="stats-title">
                    Played
                </p>
            </div>
            <div class="stats-single">
                <div class="stats-single-main">
                    <div class="stats-icon gold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd"
                                d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                                clip-rule="evenodd" />
                        </svg>


                    </div>
                    <p class="stats-num">
                        ${this._data.winPercent}
                    </p>
                </div>
                <p class="stats-title">
                    Win %
                </p>
            </div>
            <div class="stats-single">
                <div class="stats-single-main">
                    <div class="stats-icon ${
                        this._data.currentStreak < 2 ? ' grey' : 'orange'
                    }">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                            <path fill-rule="evenodd"
                                d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                                clip-rule="evenodd" />
                        </svg>


                    </div>
                    <p class="stats-num">
                        ${this._data.currentStreak}
                    </p>
                </div>
                <p class="stats-title">
                    Current Streak
                </p>
            </div>
            <div class="stats-single">
                <div class="stats-single-main">
                    <p class="stats-num">
                        ${this._data.maxStreak}
                    </p>
                </div>
                <p class="stats-title">
                    Max Streak
                </p>
            </div>
        </div>
        <div class="guesses-container">
            <p class="guesses-title">
                Guess distribution - ${this._data.difficulty}
            </p>
            <div class="guesses-graph-container">

                `;
        this._data.guess_distribution[this._data.difficulty].forEach(
            (val, i) => {
                mark += `<div class="guesses-single">
                    <p class="dist-row">
                        ${i + 1}
                    </p>
                    <div class="graph-single" style="width: ${
                        this._data.guessesWidths[this._data.difficulty][i]
                    };">
                        <p class="graph-num">
                            ${val}
                        </p>
                    </div>
                </div>`;
            },
        );

        mark += `
            </div>
        </div>
    </div>
</div>
`;
        return mark;
    }

    addHandlerCloseModel(handler) {
        this._parentContainer.addEventListener(
            'click',
            function (e) {
                const btn = e.target.closest('.model-close');
                const overlayClick = e.target.closest('.model');
                if (!btn && overlayClick) return;
                handler();
                this._parentContainer.classList.add('hidden');
            }.bind(this),
        );
    }
}
export default new statsView();
