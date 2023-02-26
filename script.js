// data load in api
const phoneLoadData = async (input, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
  const res = await fetch(url);
  const data = await res.json();
  phoneDataShow(data.data, dataLimit);
};

// data show
const phoneDataShow = (phones, dataLimit) => {
  const phoneContainer = document.getElementById("phoneContainer");
  phoneContainer.innerHTML = "";
  phones = phones.slice(0, dataLimit);
  // display no phone
  const NoPhone = document.getElementById("NoPhone");
  const showALL = document.getElementById("showALL");
  if (phones.length === 0) {
    NoPhone.classList.remove("d-none");
    showALL.classList.add("d-none");
  } else if (dataLimit && phones.length >= 15) {
    NoPhone.classList.add("d-none");
    showALL.classList.remove("d-none");
  } else {
    NoPhone.classList.add("d-none");
    showALL.classList.add("d-none");
  }
  // display phone
  phones.forEach((phone) => {
    const phoneContainerDiv = document.createElement("div");
    phoneContainerDiv.innerHTML = `
        <div class="col">
          <div class="card w-75 p-3 mx-auto bg-body-tertiary border border-2 border-secondary-subtle">
            <img src="${phone.image}" class="card-img-top" alt="${phone.brand}" />
            <div class="card-body">
              <h5 class="card-title">${phone.brand}</h5>
              <p class="card-text">
                ${phone.phone_name}
              </p>
              <button onclick="detailLoadData('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal"> 
                Details 
              </button>
            </div>
          </div>
        </div>
`;
    phoneContainer.appendChild(phoneContainerDiv);
  });
  toggle(false);
};

// Search btn
const searchBtn = document.getElementById("searchBtn");
const showMoreBtn = document.getElementById("showMoreBtn");

const processSearch = (number) => {
  toggle(true);
  const inputField = document.getElementById("inputField");
  const inputValue = inputField.value;
  phoneLoadData(inputValue, number);
};

searchBtn.addEventListener("click", () => {
  processSearch(15);
});

// show more btn
showMoreBtn.addEventListener("click", () => {
  processSearch();
});

// all phone load in UI(start)
phoneLoadData("d", 12);

// loader
const loader = document.getElementById("loader");
const toggle = (isLoading) => {
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

// search field enter key handler
document.getElementById("inputField").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    processSearch(15);
  }
});

// details data load in api
const detailLoadData = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  detailsDataShow(data.data);
};

// details data show in modal
const detailsDataShow = (data) => {
  const detailsShowTitle = document.getElementById("detailsShowTitle");
  const detailsShowDescription = document.getElementById(
    "detailsShowDescription"
  );
  detailsShowTitle.innerText = `${data.name}`;
  detailsShowDescription.innerHTML = `
  <div>
    <div class="card">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><span class="fw-bolder">ChipSet:</span>  ${
            data.mainFeatures.chipSet
          }</li>
          <li class="list-group-item"><span class="fw-bolder">Memory:</span>    ${
            data.mainFeatures.memory
          }</li>
          <li class="list-group-item"><span class="fw-bolder">Display:</span> ${
            data.mainFeatures.displaySize
          }</li>
          <li class="list-group-item"><span class="fw-bolder">Storage:</span> ${
            data.mainFeatures.storage
          }</li>
          <li class="list-group-item"><span class="fw-bolder">Release_Date:</span> ${
            data.releaseDate ? data.releaseDate : "No releaseDate"
          }</li>
        </ul>
    </div>
  </div>
  `;
};
