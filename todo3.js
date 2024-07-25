//const todoList = []; 
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
const baseTodoId = 'todoitem'; 
 
function deleteElement(id) { 
    // находим по id индекс элемента, который нужно удалить 
    const index = todoList.findIndex(item => item.id === id); 
    // удаляем элемент из массива 
    todoList.splice(index, 1); 
    // находим по id карточку элемента в шаблоне и удаляем 
    document.getElementById(baseTodoId + id).remove(); 
	saveTodoList(); // сохранение после удаления
	
} 
 
function addToDo() { 
    // получаем форму из нашего html 
    const form = document.forms.toDoForm; 
    // достаем значения каждого из полей ввода 
    const newTodo = { 
        id: createNewId(), // вызываем нашу функцию, создающую id для элемента 
        title: form.elements.title.value, 
        color: form.elements.color.value, 
        date: form.elements.date.value, 
        description: form.elements.description.value, 
		
		completed: false //  свойство для отслеживания выполнения задачи
		
		
    } 
    todoList.push(newTodo); 
    addToDoToHtml(newTodo); 
	saveTodoList(); // сохранение после добавления
	
} 
 
function createNewId() { 
    // проверяем, есть ли уже элементы в массиве 
    // если нет - id нового элемента = 1 
    // если элементы уже есть - преобразуем массив элементов в массив их id (с помощью "map") 
    // например, было: 
    // [ 
    //     { 
    //         id: 1, 
    //         title: 'название 1', 
    //         color: '#000000', 
    //         description: 'описание 1' 
    //     }, 
    //     { 
    //         id: 3, 
    //         title: 'название 3', 
    //         color: '#ffffff', 
    //         description: 'описание 3' 
    //     } 
    // ] 
    // а стало: [ 1, 3 ] 
    // после этого в получившемся массиве ищем максимальный элемент и прибавляем 1 - такой id точно будет уникальным 
    return todoList.length === 0 ? 
        1 : Math.max( 
            ...todoList.map(todo => todo.id) 
        ) + 1; 
} 
 
function addToDoToHtml(newToDo) { 
    // создаем div для нового элемента 
    const div = document.createElement('div'); 
    // присваиваем div id нашего элемента 
    div.id = baseTodoId + newToDo.id; 
    // указываем свойство класса 
    div.className = 'row my-3'; 
 
    // добавляем html код содержимого для элемента 
    // при этом вставляем в него текст из полей переменной "newToDo" 
    // для этого используем кавычки ``, 
    // а когда нам нужно вставить посреди текста переменную - используем ${*название переменной*} 
					 
	
					
		div.innerHTML = `<div class="col"> 
                        <div class="card"> 
                            <div class="card-header" style="height: 35px; background-color: ${newToDo.color}; border-radius: 0;"></div> 
                            <div class="card-body"> 
                                <h5 class="card-title"> ${newToDo.title} </h5> 
                                <p class="card-text"> ${newToDo.description} </p> 
                                <p class="card-text text-muted"> ${newToDo.date} </p> 
                                <div class="d-flex justify-content-end align-items-center mt-2">
                                    <div class="form-check me-3">
                                        <input class="form-check-input" type="checkbox" id="checkbox-${newToDo.id}" ${newToDo.completed ? 'checked' : ''} onclick="Completion(${newToDo.id})">
                                        <label class="form-check-label" for="checkbox-${newToDo.id}">
                                            Выполнено
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="select-${newToDo.id}">
                                        <label class="form-check-label" for="select-${newToDo.id}">
                                            Выбрать
                                        </label>
                                    </div>
                                </div>
                                <button type="button" class="btn btn btn-link" onclick="deleteElement(${newToDo.id})"> Удалить задачу </button> 
                            </div> 
                        </div> 
                     </div>`; 

					
    // добавляем наш элемент в контейнер из шаблона 
    document.getElementById('toDoContainer').append(div); 
}


function Completion(id) {
    // Находим задачу по id
    const todo = todoList.find(item => item.id === id);
    if (todo) {
        // Переключаем состояние выполнения задачи
        todo.completed = !todo.completed; 
        const card = document.getElementById(baseTodoId + id);
        
    }
}

function deleteSelected() {
    // Находим все карточки задач
    const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="select-"]:checked');
    
    selectedCheckboxes.forEach(checkbox => {
        const todoId = checkbox.id.replace('select-', ''); // Извлекаем id задачи
        deleteElement(Number(todoId)); // Удаляем задачу по id
    });
	saveTodoList(); 
}

window.onload = function() {
    todoList.forEach(todo => addToDoToHtml(todo)); 
};

function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
