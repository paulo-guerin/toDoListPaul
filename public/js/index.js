
let addBar= document.getElementById("addBar");
let addButton=document.getElementById("addButton");
let listSection= document.getElementById("listSection");
let listCount = 0;
if (localStorage.getItem("listCountStorage")){
  listCount = parseInt(localStorage.getItem("listCountStorage"));
} else {
  localStorage.setItem("listCountStorage", 0);
}

let sortedList=[];
for (i = 0; i < localStorage.length; i++)   {
  if(localStorage.key(i)!="listCountStorage"){
    let currentKey = parseInt(localStorage.key(i));
    let currentValue = localStorage.getItem(localStorage.key(i));
    let currentElement = {key : currentKey, value : currentValue};
    sortedList.push(currentElement);
  }
}
function compare(a, b) {
  const keyA = a.key;
  const keyB = b.key;

  let comparison = 0;
  if (keyA > keyB) {
    comparison = 1;
  } else if (keyA < keyB) {
    comparison = -1;
  }
  return comparison;
}
sortedList.sort(compare);

sortedList.forEach(element => {
  let newListElement = document.createElement("div");
  setUpNewListElement(newListElement);
  newListElement.id=element.key;
  newListElement.innerHTML=element.value;
})

addButton.addEventListener('click', event => {
  console.log("Hello");
  listCount += 1;
  localStorage.listCountStorage = listCount;
  localStorage.setItem(listCount, addBar.value);
  console.log(localStorage.getItem(listCount));
  addBar.value='';
  let newListElement = document.createElement("div");
  setUpNewListElement(newListElement);
  newListElement.id=listCount;
  newListElement.innerHTML=localStorage.getItem(listCount);
});

function setUpNewListElement(newListElement){
  newListElement.className="listElement";
  newListElement.setAttribute('draggable', 'true');
  newListElement.setAttribute('ondragstart', 'drag(event)');
  newListElement.setAttribute('ondrop', 'drop(event)');
  newListElement.setAttribute('ondragover', 'allowDrop(event)');
  // let svg1 = document.createElementNS("../images/check-mark.svg", "svg");
  // console.log(svg1);
  // svg1. setAttribute ("viewBox", "0 0 300 300" );
  // svg1.setAttribute ("width", "20");
  // svg1.setAttribute ("height", "20");
  // newListElement.appendChild(svg1);

  listSection.appendChild(newListElement);
}

function allowDrop(ev) {
  ev.preventDefault();
}

let draggedElementId = 0;
function drag(ev) {
  ev.dataTransfer.setData("div", ev.target.id);
  draggedElementId=parseInt(ev.target.id);
}

let droppedElementId = 0;
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("div");
  if(ev.target.id != "afterList"){
    ev.target.before(document.getElementById(data));
    droppedElementId=parseInt(ev.target.id);
    attributeIds(true);
  }else{
    document.querySelectorAll(".listElement:last-child")[0].after(document.getElementById(data));
    droppedElementId=parseInt(document.querySelectorAll(".listElement").length);
    attributeIds(false);
  }
}

function attributeIds(insideList){
  let start=draggedElementId;
  let stop=droppedElementId;
  let change = -1;
  if(draggedElementId>droppedElementId){
    start=droppedElementId;
    stop=draggedElementId;
    change= 1;
  }

  console.log(start);
  console.log(stop);
  
  document.getElementById(draggedElementId).id = "dragged";
  document.getElementById(droppedElementId).id = "dropped";
  if(change==-1){
    for(i=start+1; i<stop; i++){
      let currentElement = document.querySelectorAll(".listElement")[i-2];
      currentElement.id = parseInt(currentElement.id)+change;
    }
    if(insideList==true){
    document.getElementById("dragged").id = droppedElementId+change;
    document.getElementById("dropped").id = droppedElementId;
    } else {
      document.getElementById("dragged").id = droppedElementId;
      document.getElementById("dropped").id = droppedElementId+change;
    }
  } else {
    for(i=start; i<=stop; i++){
      let currentElement = document.querySelectorAll(".listElement")[i-1];
      console.log(currentElement);
      currentElement.id = parseInt(currentElement.id)+change;
    }
    console.log("hello");
    document.querySelectorAll(".listElement")[droppedElementId-1].id = droppedElementId;
    document.querySelectorAll(".listElement")[droppedElementId].id = droppedElementId+change;
  }
  document.querySelectorAll(".listElement").forEach( element =>{
    localStorage.setItem(element.id, element.innerHTML);
  })
}


