const characters = [

  {
    name: "Pink Panther",
    category: "classic",
    type: "Iconic",
    tone: "linear-gradient(145deg,#ff79a8,#d72d67)",
    tilt: "-7deg"
  },

  {
    name: "Minion",
    category: "kids",
    type: "Comedy",
    tone: "linear-gradient(145deg,#ffd84e,#e7a91e)",
    tilt: "8deg"
  },

  {
    name: "SpongeBob",
    category: "iconic",
    type: "Iconic",
    tone: "linear-gradient(145deg,#ffe85b,#e5b72c)",
    tilt: "-5deg"
  },

  {
    name: "Patrick Star",
    category: "iconic",
    type: "Sidekick",
    tone: "linear-gradient(145deg,#ff9a9a,#df626e)",
    tilt: "7deg"
  },

  {
    name: "Tom",
    category: "classic",
    type: "Classic",
    tone: "linear-gradient(145deg,#aab2bd,#656b76)",
    tilt: "-8deg"
  },

  {
    name: "Jerry",
    category: "classic",
    type: "Classic",
    tone: "linear-gradient(145deg,#c58b55,#85522e)",
    tilt: "6deg"
  },

  {
    name: "Scooby-Doo",
    category: "classic",
    type: "Adventure",
    tone: "linear-gradient(145deg,#a8754d,#67422c)",
    tilt: "-4deg"
  },

  {
    name: "Bugs Bunny",
    category: "classic",
    type: "Classic",
    tone: "linear-gradient(145deg,#b9bec8,#747b87)",
    tilt: "5deg"
  },

  {
    name: "Doraemon",
    category: "kids",
    type: "Future",
    tone: "linear-gradient(145deg,#55bfff,#2875c9)",
    tilt: "-5deg"
  },

  {
    name: "Gumball",
    category: "kids",
    type: "Teen",
    tone: "linear-gradient(145deg,#67a9ff,#3569d4)",
    tilt: "8deg"
  },

  {
    name: "Garfield",
    category: "iconic",
    type: "Iconic",
    tone: "linear-gradient(145deg,#ffad46,#d86922)",
    tilt: "-6deg"
  },

  {
    name: "Popeye",
    category: "classic",
    type: "Legend",
    tone: "linear-gradient(145deg,#78c67b,#367c43)",
    tilt: "4deg"
  }

];


const grid =
  document.getElementById("characterGrid");

const search =
  document.getElementById("search");

const filter =
  document.getElementById("filter");


function renderCharacters() {

  const query =
    search.value.toLowerCase().trim();

  const selectedCategory =
    filter.value;


  const results =
    characters.filter(character => {

      const matchesSearch =
        !query ||
        character.name
          .toLowerCase()
          .includes(query);


      const matchesCategory =
        selectedCategory === "all" ||
        character.category === selectedCategory;


      return matchesSearch &&
             matchesCategory;

    });


  grid.innerHTML =
    results.map((character,index) => `

      <article
        class="char-card"
        onclick="openModal('${character.name}')"
      >

        <div
          class="char-art"
          style="
            --tone:${character.tone};
            --tilt:${character.tilt};
          "
        >

          <div
            style="
              width:22px;
              height:8px;
              border-radius:50%;
              background:rgba(0,0,0,.25);
              position:absolute;
              bottom:27px;
            "
          ></div>

        </div>


        <div class="char-meta">

          <div>

            <small>
              CHARACTER
              ${String(index + 1).padStart(2,"0")}
            </small>

            <h3>
              ${character.name}
            </h3>

          </div>


          <span class="tag">
            ${character.type}
          </span>

        </div>

      </article>

    `).join("");


  if (!results.length) {

    grid.innerHTML = `
      <div
        style="
          grid-column:1/-1;
          padding:50px;
          text-align:center;
          color:#777;
        "
      >
        No characters found.
      </div>
    `;

  }

}


search.addEventListener(
  "input",
  renderCharacters
);


filter.addEventListener(
  "change",
  renderCharacters
);


renderCharacters();


/* 3D ROTATION */

const rotateRange =
  document.getElementById("rotateRange");


rotateRange.addEventListener(
  "input",
  event => {

    const character =
      document.querySelector(
        ".viewer-character"
      );

    character.style.setProperty(
      "--rot",
      event.target.value + "deg"
    );

  }
);


/* MODAL */

function openModal(name) {

  document.getElementById(
    "modalTitle"
  ).textContent = name;


  document.getElementById(
    "modal"
  ).classList.add("open");


  document.getElementById(
    "modal"
  ).setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeModal() {

  document.getElementById(
    "modal"
  ).classList.remove("open");


  document.getElementById(
    "modal"
  ).setAttribute(
    "aria-hidden",
    "true"
  );

}


window.openModal =
  openModal;

window.closeModal =
  closeModal;


/* DARK / LIGHT MODE */

document
  .getElementById("themeBtn")
  .addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "light"
      );

    }
  );


/* ESC */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeModal();
    }

  }
);