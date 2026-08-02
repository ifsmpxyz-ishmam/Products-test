
const container = document.getElementById('task-container');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
async function FetchTasks() {
    try {
        const response = await fetch('/.netlify/functions/getTasks');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}
function renderTasks(tasks) {
    container.innerHTML = '';   
    tasks.forEach(task => {
        const divt = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = task.fields['Task-Name'];
        divt.appendChild(p);
        container.appendChild(divt);
    });
    };
    FetchTasks().then(tasks => {
    renderTasks(tasks.records);
});
