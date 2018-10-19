// fetch from API then turn into json 
fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(data => generateGallery(data.results))


const gallery = document.querySelector('#gallery');
const modalgroup = document.querySelector('#modalgroup')
const searchContainer = document.querySelector('.search-container')

// constructe the whole gallery and modal
function generateGallery (data) {
  //map through the data.results and make every card with an id 
  const profiles = data.map((item,i) => `
    <div class="card" id="${i}">
        <div class="card-img-container">
            <img class="card-img" src="${item.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>
    </div>
  `).join('');
  // set an id for every modal
  const modals = data.map((item,i) => `
    <div class="modal-container" id="${i}">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${item.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${item.name.first} ${item.name.last}</h3>
                <p class="modal-text">${item.email}</p>
                <p class="modal-text cap">${item.location.city}</p>
                <hr>
                <p class="modal-text">${item.phone}</p>
                <p class="modal-text">${item.location.street}, ${item.location.state}, ${item.location.postcode}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="${i}" class="modal-prev btn">Prev</button>
            <button type="button" id="${i}" class="modal-next btn">Next</button>
        </div>
    </div>
  `).join('')

  //insert the search bar and button
  const search = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
  `
  //put these three item into html
  gallery.innerHTML = profiles;
  modalgroup.innerHTML = modals;
  searchContainer.innerHTML = search;

  const singleModal = document.querySelectorAll(".modal-container");
  const card = document.querySelectorAll('.card')
  const closeBtn = document.querySelectorAll("#modal-close-btn");
  const prevBtn = document.querySelectorAll(".modal-prev")
  const nextBtn = document.querySelectorAll(".modal-next")
  const searchInput = document.querySelector("#search-input")
  const searchBtn = document.querySelector("#search-submit")

  searchBtn.addEventListener('click', function(e){
    e.preventDefault();
    //compare the lowercase of input and the card name text
    card.forEach(function(item){
      let name = item.children[1].children[0].innerText.toLowerCase();
      if(name.includes(searchInput.value.toLowerCase())) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
    //12 hidden madol + 12 hidden card = 24, which means 12 cards will be hidden if
    //there is no result
    x = document.querySelectorAll('[style="display: none;"]')
    if (x.length === 24) {
      alert('no result');
    }
 })
  //hide all modals 
  singleModal.forEach(e => e.style.display = "none")
  // when a card is clicked, hide the card and show the modal
  // show the modal if the modal id is the same as the clicked card id
  card.forEach(function(item){
    item.addEventListener('click', function() {
      singleModal[this.id].style.display = 'block'
    })
  })

  closeBtn.forEach(function(item){
    item.addEventListener('click', function() {
      singleModal.forEach(e => e.style.display = "none")
    })
  })
  //if the id of modal equals to or lower than 0, only show the first modal
  prevBtn.forEach(function(item){
    item.addEventListener('click', function(){
      let i = parseInt(this.id);
      if (i > 0) {
        singleModal[i-1].style.display = 'block'
        singleModal[i].style.display = 'none'
      } else {
        singleModal[0].style.display = 'block'
      }
    })
  })
  //if the id is less than 11, show the next modal, otherwise show the modal with the id "11"
  nextBtn.forEach(function(item){
    item.addEventListener('click', function(){
      let i = parseInt(this.id);
      if (i < 11) {
        singleModal[i+1].style.display = 'block'
        singleModal[i].style.display = 'none'
      } else {
        singleModal[11].style.display = 'block'
      }
    })
  })

}
