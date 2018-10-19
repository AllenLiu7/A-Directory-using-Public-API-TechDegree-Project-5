fetch('https://randomuser.me/api/?nat=us&results=12')
  .then(response => response.json())
  .then(data => generateGallery(data.results))


const gallery = document.querySelector('#gallery');
const modalgroup = document.querySelector('#modalgroup')
const searchContainer = document.querySelector('.search-container')

function generateGallery (data) {
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

  const search = `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
  `
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
    card.forEach(function(item){
      let name = item.children[1].children[0].innerText;
      if(name.includes(searchInput.value)) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })
    x = document.querySelectorAll('[style="display: none;"]')
    if (x.length === 24) {
      alert('no result');
    }
 })

  singleModal.forEach(e => e.style.display = "none")

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
