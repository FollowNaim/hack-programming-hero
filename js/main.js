const obj = JSON.parse(data).data;
const img = document.querySelector(".img img");
const milestones = document.querySelector(".milestones");
const doneLists = document.querySelector(".done-lists");
const title = document.querySelector(".title");
const desc = document.querySelector(".desc");

function init() {
  createMilestones();
}

function milestoneSort() {
  const a = document.querySelectorAll(".milestones .milestone");
  const b = Array.from(a);
  const c = b.sort((a, b) => {
    return a.id - b.id;
  });
  const p = a[0].parentNode;
  c.forEach((el) => p.appendChild(el));
}

function createDoneList(el) {
  const parentEl = el.parentNode.parentNode.parentNode;
  if (el.checked) {
    milestones.removeChild(parentEl);
    doneLists.appendChild(parentEl);
  } else {
    milestones.appendChild(parentEl);
    milestoneSort();
  }
}

function openMilestone(el, index) {
  const shownPanel = document.querySelector(".open");
  const currentPanel = el.parentNode.nextElementSibling;
  const head = el.parentNode;
  if (!currentPanel.classList.contains("open") && shownPanel) {
    shownPanel.classList.remove("open");
    head.classList.remove("open");
  }
  currentPanel.classList.toggle("open");
  head.classList.toggle("open");
  console.log(el);
  img.src = obj[index].image;
  title.textContent = obj[index].name;
  desc.textContent = obj[index].description
    ? obj[index].description
    : "Module Description Here";
  console.log(Boolean(desc.textContent));
}

function createMilestones() {
  milestones.innerHTML += obj
    .map((module, index) => {
      return `
                <div class="milestone" id="${index}" >
                  <div class="shown-panel">
                    <div class="checkbox">
                      <input onclick="createDoneList(this)" type="checkbox" name="" id="" />
                    </div>
                    <p onclick="openMilestone(this, ${index})">${
        module.name
      }</p>
      <i class="fa-solid fa-angle-down"></i>
                  </div>
                  <div class="hidden-panel">
                    <div class="modules">
                      ${module.modules
                        .map((el) => {
                          console.log(el);
                          return `
                          <div class="module">
                          <p>${el.name}</p>
                          </div>
                          `;
                        })
                        .join("")}
                    </div>
                  </div>
                </div>
                `;
    })
    .join("");
}

init();

console.log(obj);
