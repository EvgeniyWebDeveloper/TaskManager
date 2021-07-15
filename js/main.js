const container=document.querySelector(".toDoList")
const addTask=document.querySelector("#addTask");
const formWrapper=document.querySelector(".form__wrapper")
const form=document.querySelector(".form")
const closeBtn=document.querySelector(".menu__icon")
let list=document.querySelector(".list")
let listItems=[]
let checkboxes=document.querySelectorAll(".checkbox")
const enterTask=document.querySelector("#enterTask")
const newTaskTitle=document.querySelector("#new_task_title")
const newTaskText=document.querySelector("#new_task_desc")
const newTaskTime=document.querySelector("#new_task_time")
const remainingTasks=document.querySelector("#remainingTasks")
let countOfTasksSpan=document.querySelector("#countOfTasks")
let countOfComplTasks=document.querySelector("#tasksDone")
let showPersent=document.querySelector("#showPercent")
let classesToAdd = [ 'animate__animated','animate__bounceOutLeft' ];
let countOfTasks=0;
let completeTasks=0;
let newTask={
    title:"tile",
    text:"text",
    time:"12:00",
    item:''
}

function changeProgress() {
    let dataPercent=completeTasks*100/countOfTasks;
    let diagramBox = document.querySelector('.diagram');
    diagramBox.dataset.percent=Math.round(dataPercent);
}
function progressView(){
    let diagramBox = document.querySelectorAll('.diagram.progress');
    diagramBox.forEach((box) => {
        let deg = (360 * box.dataset.percent / 100) + 180;
        if(box.dataset.percent >= 50){
            box.classList.add('over_50');
        }else{
            box.classList.remove('over_50');
        }
        box.querySelector('.piece.right').style.transform = 'rotate('+deg+'deg)';
        showPersent.textContent=box.dataset.percent+"%"
    });
}

function getCheckboxes() {
    checkboxes=document.querySelectorAll(".checkbox")
    
    checkboxes.forEach(function(element,index) {
        checkboxes[index].addEventListener('click', ()=>{   
            console.log("удалние")
            deleteTask(index)
        });
      });
      
}
function quantityOfTasks() {
    countOfTasks++
    countOfTasksSpan.textContent=countOfTasks
    changeProgress()
    progressView()
    
}
function completedTasks() {
    completeTasks++
    countOfComplTasks.textContent=completeTasks
    changeProgress()
    progressView()
}
function onChangeTasksQuant() {
    remainingTasks.textContent=list.childNodes.length-1
    if(list.childNodes.length-1==0){
        container.classList.add("emptyList")
    }
}

function getListItems() {
     listItems=document.querySelectorAll(".list__item")
     console.log(listItems.length+"айтемы")
}
function deleteTask(index){
    newTask.item=listItems[index]
    console.log(newTask.item)

    newTask.item.classList.add(...classesToAdd)
    setTimeout(() => {
        list.removeChild(newTask.item)
        onChangeTasksQuant()
        completedTasks()
    }, 1000);
    
}

function addItem() {
    if(container.classList.contains("emptyList")){
        container.classList.remove("emptyList")
    }
    let newTaskItem=`<li class="list__item"><div class="time"><span>${newTask.time}</span></div><div class="content"><div class="content__wrapper"><div class="subject">${newTask.title}</div><div class="description">${newTask.text}</div></div><input type="checkbox" name="" class="checkbox" ></div></li>`
    list.innerHTML+=newTaskItem
    onChangeTasksQuant()
    quantityOfTasks()
    newTaskTitle.value=newTaskText.value=newTaskTime.value=""
}

function removeClasses() {
    closeBtn.classList.remove("active")
    formWrapper.classList.remove("form__wrapper-active")
    form.classList.remove("form-active")
}

function addClasses(params) {
    closeBtn.classList.add("active")
    formWrapper.classList.add("form__wrapper-active")
    form.classList.add("form-active")
}

enterTask.addEventListener("click",(e)=>{
    e.preventDefault()
    newTask.title=newTaskTitle.value
    newTask.text=newTaskText.value
    newTask.time=newTaskTime.value
    addItem()
    getCheckboxes()
    getListItems()
    removeClasses()

})


addTask.addEventListener("click",()=>{
    
    addClasses()
})
closeBtn.addEventListener("click",()=>{
   
    removeClasses()
})