const demoList = document.getElementById("movie-list");
const demo = document.getElementById("demo");

class ClassDemo {
  constructor(id, title, imageUrl, rating, description, handlerCode) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.rating = rating;
    this.description = description;
    this.handlerCode = handlerCode;
  }
}

class ClassDemoItem {
  constructor(classDemo) {
    this.classDemo = classDemo;
  }

  render() {
    const card = document.createElement("div");
    card.classList = "col-md-6 col-lg-4 mb-5";
    card.innerHTML = `
    <div class="media-image">
    <img src="${this.classDemo.imageUrl}" alt="Image" class="img-fluid" />
    <div class="media-image-body">
      <h2 class="font-secondary text-uppercase">${this.classDemo.title}</h2>
      <span class="d-block mb-3">${this.classDemo.rating}/5 stars</span>
      <p>${this.classDemo.description}</p>
      <p><a href="${this.classDemo.handlerCode}" class="btn btn-primary text-white px-4"><span class="caption">Demo Url</span></a></p>
      <p><a href=""> Edit </a></p>
      <div class="btn btn-outline-danger">
        <i class="far fa-trash-alt" onclick="deleteDemo(${this.classDemo.id})"></i>
      </div>
    </div>
  </div>
    `;
    return card;
  }
}
//<a href=""onclick="deleteDemo(${this.classDemo.id})"> Delete </a>

class ClassDemoList {
  demos = [
    new ClassDemo(
      1,
      "Unconventional Calculator",
      "./images/caculator.png",
      "5",
      "Using calculator to teach JavaScript basic concepts",
      "./w2-calculator/index.html"
    ),
    new ClassDemo(
      2,
      "Monster Killer",
      "./images/monster.png",
      "3",
      "Using monster killer to demonstrate how to use JavaScript if and loops",
      "./w4-monster/index.html"
    ),
    new ClassDemo(
      3,
      "DOM Movie",
      "./images/monster.png",
      "4",
      "Use DOM Movie to show how to interact with DOM objects",
      "./w7-dom-movie/index.html"
    ),
    new ClassDemo(
      4,
      "Music Player",
      "./images/music.png",
      "2",
      "A project demo for an elegant music player",
      ""
    ),
    new ClassDemo(
      5,
      "Video Player",
      "./images/video.png",
      "3",
      "A project demo for an customized video player",
      ""
    ),
  ];

  constructor() {}

  render() {
    // const header = document.createElement("h1");
    // header.id = "mid-heading";
    // // header.textContent = '108-2 JavaScript Final Project';
    // // header.innerHTML = `
    // //       108-2 JavaScript Final Project &nbsp &nbsp &nbsp
    // //       <a class="btn btn-outline-warning"
    // //           ><i class="fas fa-plus-circle fa-2x"></i
    // //         ></a>
    // //   `;
    // demoList.append(header);
    const cardList = document.createElement("div");
    cardList.classList = "row";
    cardList.id = "mid-card-list";
    for (const item of this.demos) {
      const demoItem = new ClassDemoItem(item);
      console.log("demoItem", demoItem);
      const demoEl = demoItem.render();
      console.log("demoEl", demoEl);
      cardList.append(demoEl);
    }
    demoList.append(cardList);
  }
}

const classDemoList = new ClassDemoList();
classDemoList.render();

const showDemoList = () => {
  demoList.classList = "visible";
  demo.classList = "invisible";
};

// const showDemo = (srcUrl) => {
//   demoList.classList = "invisible";
//   demo.classList = "visible";
//   demo.style.marginTop = "100px";
//   demo.innerHTML = `
//   <iframe src="${srcUrl}" height="900px" width=100% ></iframe>
//   `;
// };

const deleteDemo = (id) => {
  // console.log('classDemoList.demos 1', classDemoList.demos);
  classDemoList.demos.forEach((item, i) => {
    if (item.id == id) classDemoList.demos.splice(i, 1);
  });
  // console.log('classDemoList.demos 2', classDemoList.demos);
  demoList.innerHTML = "";
  classDemoList.render();
};
////////////////////////////////////////////////
////////////////////原始JS(modal)///////////////
///////////////////////////////////////////////

const addMovieModal = document.getElementById("add-modal");
//console.log(addMovieModal);
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const startAddMovieButton = document.querySelector("header button");
// const startAddMovieButton = document.querySelector('header').lastElementChild;
const backdrop = document.getElementById("backdrop");
// const backdrop = document.body.firstElementChild;
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
// const userInputs = addMovieModal.getElementsByTagName('input');
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
  closeMovieDeletionModal();
  updateUI();
};

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();

  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId)); // will not work :(

  cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);

  cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (
  id,
  title,
  imageUrl,
  rating,
  description,
  url
) => {
  const newMovieElement = document.createElement("div");
  newMovieElement.className = "col-md-6 col-lg-4 mb-5";
  newMovieElement.innerHTML = `
  
  <div class="media-image">
  <img src="${imageUrl}" alt="Image" class="img-fluid" />
  <div class="media-image-body">
    <h2 class="font-secondary text-uppercase">${title}</h2>
    <span class="d-block mb-3">${rating}/5 stars</span>
    <p>${description}</p>
    <p><a href="${url}" class="btn btn-primary text-white px-4"><span class="caption">Demo Url</span></a></p>
    <p><a href=""> Edit </a></p><div class="btn btn-outline-danger">
    <i class="far fa-trash-alt" onclick="deleteDemo(${id})"></i>
  </div>

  </div>
</div>
  `;

  newMovieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, id)
  );
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  // function() {}
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  const descriptionValue = userInputs[3].value;
  const demoUrlValue = userInputs[4].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    descriptionValue.trim() === "" ||
    demoUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
    description: descriptionValue,
    url: demoUrlValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating,
    newMovie.description,
    newMovie.url
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
