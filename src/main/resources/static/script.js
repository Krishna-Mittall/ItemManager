// 🌍 API Base URL (LIVE DEPLOYMENT)
// 👉 Replace with your real koyeb link
const API_BASE_URL = 'https://YOUR-KOYEB-APP.koyeb.app/item';

// Store tasks locally for display
let recentTasks = [];

// DOM Elements
const addItemForm = document.getElementById('addItemForm');
const getItemForm = document.getElementById('getItemForm');
const addMessage = document.getElementById('addMessage');
const getMessage = document.getElementById('getMessage');
const taskResult = document.getElementById('taskResult');
const tasksList = document.getElementById('tasksList');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    displayRecentTasks();
});

// Setup Event Listeners
function setupEventListeners() {
    addItemForm.addEventListener('submit', handleAddItem);
    getItemForm.addEventListener('submit', handleGetItem);
}

// Handle Add Item Form Submission
async function handleAddItem(e) {
    e.preventDefault();

    const formData = new FormData(addItemForm);
    const itemData = {
        name: formData.get('name'),
        description: formData.get('description')
    };

    clearMessage(addMessage);

    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(itemData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to add task');
        }

        const newItem = await response.json();

        showMessage(addMessage, `Task added successfully! ID: ${newItem.id}`, 'success');

        recentTasks.unshift(newItem);
        if (recentTasks.length > 10) {
            recentTasks.pop();
        }

        displayRecentTasks();
        addItemForm.reset();

    } catch (error) {
        showMessage(addMessage, `Error: ${error.message}`, 'error');
        console.error('Error adding item:', error);
    }
}

// Handle Get Item
async function handleGetItem(e) {
    e.preventDefault();

    const formData = new FormData(getItemForm);
    const itemId = formData.get('id');

    clearMessage(getMessage);
    hideTaskResult();

    try {
        const response = await fetch(`${API_BASE_URL}/${itemId}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Task with ID ${itemId} not found`);
            }
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to fetch task');
        }

        const item = await response.json();

        displayTaskResult(item);
        showMessage(getMessage, 'Task found successfully!', 'success');

    } catch (error) {
        showMessage(getMessage, `Error: ${error.message}`, 'error');
        console.error('Error fetching item:', error);
    }
}

// Display Task Result
function displayTaskResult(item) {
    document.getElementById('resultId').textContent = item.id;
    document.getElementById('resultName').textContent = item.name;
    document.getElementById('resultDescription').textContent = item.description;
    taskResult.classList.remove('hidden');
}

// Hide Task Result
function hideTaskResult() {
    taskResult.classList.add('hidden');
}

// Display Recent Tasks
function displayRecentTasks() {
    if (recentTasks.length === 0) {
        tasksList.innerHTML = '<p class="empty-state">No tasks added yet</p>';
        return;
    }

    const tasksHTML = recentTasks.map(task => `
        <div class="task-item">
            <div class="task-item-header">
                <span class="task-item-name">${escapeHtml(task.name)}</span>
                <span class="task-item-id">ID: ${task.id}</span>
            </div>
            <div class="task-item-description">${escapeHtml(task.description)}</div>
        </div>
    `).join('');

    tasksList.innerHTML = tasksHTML;
}

// Message helpers
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
    element.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => clearMessage(element), 5000);
    }
}

function clearMessage(element) {
    element.textContent = '';
    element.className = 'message';
    element.style.display = 'none';
}

// Escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// 🌐 Production Network Error Handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);

    alert('Unable to connect to deployed backend. Please check if your Koyeb service is running.');
});

console.log('Smart Task Manager initialized');
console.log('API Base URL:', API_BASE_URL);
