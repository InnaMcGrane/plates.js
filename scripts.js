function createElement(html) {
  const element = document.createElement("div");
  element.insertAdjacentHTML("beforeend", html);
  return element.firstElementChild;
}

const data = [
  {
    id: 235,
    counter: 20,
    description: "done it's done done it's done done it's done",
  },
  {
    id: 2342,
    counter: 677,
    description: "work time work time work time work time work time work time work time",
  },
  {
    id: 456,
    counter: 234,
    description: "sport",
  },
  {
    id: 677,
    counter: 234,
    description: "game",
  },
];

class Plates {
    _state = {
        allCounters: 0
    }
    
  constructor(data, Plate) {
    this._Plate = Plate;
    this._data = data;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._render();
  }

  _getTemplate() {
    return `<div class="plates">
        <span class="plates__counter">all counters: ${this._state.allCounters}</span>
        <div class="plates__items"></div>
        </div>`;
  }

  _setStateAllCounters(value) {
    this._state.allCounters = value
  }

  _setStateAllCountersHandler(value) {
    this._setStateAllCounters(value)
    this._render()
  }

  _generatePlates() {
    return this._data.map((props) => new this._Plate(props, this._setStateAllCountersHandler.bind(this)).element);
  }

  _render() {
    this._element.querySelector(".plates__items").innerHTML = '';
    this._element.querySelector(".plates__items").append(...this._generatePlates());
    this._element.querySelector(".plates__counter").textContent = `all counters: ${this._state.allCounters}`
  }

  get element() {
    return this._element;
  }
}

class Plate {
  _state = {
    showDescription: false,
  };

  constructor({ counter, description }, handler) {
    this._counter = counter;
    this._description = description;
    this._handler = handler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
    this._render();
  }

  _getTemplate() {
    return `<div class="plate">
                <span class="plate__counter">${this._counter}</span>
                <span class="plate__description">${this._description}</span>
                <div class="plate__btns">
                    <button class="btn btn--more">more</button>
                    <button class="btn btn--add">add</button>
                </div>
            </div>`;
  }

  _addListeners() {
    this._element.querySelector(".btn--more").addEventListener("click", () => {
      this._setStateShowDescription(!this._state.showDescription);
      this._render();
    });
    
    this._element.querySelector(".btn--add").addEventListener("click", () => {
        this._handler(this._counter)
    });
  }

  _setStateShowDescription(value) {
    this._state.showDescription = value;
  }

  _render() {
    this._element.querySelector(".plate__description").textContent = this._state.showDescription === true ? this._description : this._description.slice(0, 12) + "..."
  }

  get element() {
    return this._element;
  }
}

const root = document.querySelector(".root");
root.insertAdjacentElement("beforeend", new Plates(data, Plate).element);
