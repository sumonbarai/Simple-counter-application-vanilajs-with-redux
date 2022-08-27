const parent = document.getElementById("parent");
const addCounterBtn = document.getElementById("addCounter");
const resetBtn = document.getElementById("reset");
// random number generator
const randomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};

// initial state
const counter = [
  {
    id: 1,
    count: 0,
    increment: 1,
    decrement: 1,
  },
];
// action type
const ADDCOUNTER = "addCounter";
const RESET = "reset";
const INCREMENT = "increment";
const DECREMENT = "decrement";

// action
const addCounter = (id) => {
  return {
    type: ADDCOUNTER,
  };
};

const reset = () => {
  return {
    type: RESET,
  };
};

const increment = (id) => {
  return {
    type: INCREMENT,
    payload: id,
  };
};
const decrement = (id) => {
  return {
    type: DECREMENT,
    payload: id,
  };
};

// reducer
const reducer = (state = counter, action) => {
  switch (action.type) {
    case ADDCOUNTER:
      return [
        ...state,
        {
          id: state.length + 1,
          count: 0,
        },
      ];
    case RESET:
      return state.map((obj) => {
        return {
          ...obj,
          count: 0,
        };
      });
    case INCREMENT:
      return state.map((obj) => {
        if (obj.id === action.payload) {
          return {
            ...obj,
            count: obj.count + randomNumber(),
          };
        }
        return obj;
      });
    case DECREMENT:
      return state.map((obj) => {
        if (obj.id === action.payload) {
          return {
            ...obj,
            count: obj.count - randomNumber(),
          };
        }
        return obj;
      });

    default:
      return state;
  }
};
// handler
const handleIncrement = (id) => {
  store.dispatch(increment(id));
};
const handleDecrement = (id) => {
  store.dispatch(decrement(id));
};
// store
const store = Redux.createStore(reducer);
const render = () => {
  let children = "";
  const currentState = store.getState();
  currentState.forEach((obj) => {
    children += `<div
    class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow mb-2"
  >
    <div class="text-2xl font-semibold">${obj.count}</div>
    <div class="flex space-x-3">
      <button class="bg-indigo-400 text-white px-3 py-2 rounded shadow" onclick="handleIncrement(${obj.id})">
        Increment
      </button>
      <button class="bg-red-400 text-white px-3 py-2 rounded shadow" onclick="handleDecrement(${obj.id})">
        Decrement
      </button>
    </div>
  </div>`;
  });
  parent.innerHTML = children;
};

store.subscribe(render);
render();
// addEvent listener
addCounterBtn.addEventListener("click", () => {
  store.dispatch(addCounter());
});
resetBtn.addEventListener("click", () => {
  store.dispatch(reset());
});
