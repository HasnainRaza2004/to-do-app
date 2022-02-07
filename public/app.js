// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-analytics.js";
import { getDatabase, push, set, ref, remove, child, onChildAdded, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7oGdoZVDx4xRdb4VnixM9faD7AgwjM6Y",
    authDomain: "assignment-of-to-do.firebaseapp.com",
    projectId: "assignment-of-to-do",
    storageBucket: "assignment-of-to-do.appspot.com",
    messagingSenderId: "149903964016",
    appId: "1:149903964016:web:6bc4492fbdbed4aa0f81b5",
    measurementId: "G-JNQEDP0EWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)


var addBtn = document.getElementById('addBtn')



addBtn.onclick = function () {
    let obj = {
        todo: todoInp.value,
    }
    const newTodoKey = push(child(ref(db), 'todos')).key
    obj.key = newTodoKey
    set(ref(db, 'todos/' + newTodoKey), obj);
}


onChildAdded(ref(db, 'todos'), (snapshot) => {

    var showlist = document.getElementById('showlist')
    var todoLi = document.createElement('li')
    var para = document.createElement('p')
    var todoTextNode = document.createTextNode(snapshot.val().todo);
    todoLi.setAttribute('class', 'todolist')
    todoLi.setAttribute('id', snapshot.val().key)
    para.appendChild(todoTextNode)
    todoLi.appendChild(para);
    showlist.appendChild(todoLi)


    var deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('id', 'deleteTodo')
    deleteBtn.setAttribute('class', 'deleteTodo btn btn-danger mx-3')
    var deleteTextNode = document.createTextNode('DELETE')
    deleteBtn.appendChild(deleteTextNode)
    todoLi.appendChild(deleteBtn)

    var editBtn = document.createElement('button')
    editBtn.setAttribute('id', 'editTodo')
    editBtn.setAttribute('class', 'editTodo btn btn-primary mx-3 px-3')

    var editText = document.createTextNode('EDIT')
    editBtn.appendChild(editText)
    todoLi.appendChild(editBtn)
})



setTimeout(() => {
    let deleteTodos = document.querySelectorAll('.deleteTodo')

    deleteTodos.forEach(element => {
        element.addEventListener('click', function (e) {
            var selectedId = e.target.parentNode.id

            remove(child(ref(db), 'todos/' + selectedId))
            e.target.parentNode.remove()
        })
    })
}, 3000);

setTimeout(() => {
    let deleteTodos = document.querySelectorAll('.editTodo')

    deleteTodos.forEach(element => {
        element.addEventListener('click', function (e) {
            var selectedId = e.target.parentNode.id
            var value = e.target.parentNode.firstChild.innerHTML
            var updateVal = prompt('Update Todo', value)
            var obj = {
                todo: updateVal
            }
            update(child(ref(db), 'todos/' + selectedId), obj)
            console.log(selectedId)
            e.target.parentNode.firstChild.innerHTML = updateVal
        })
    })
}, 3000);
