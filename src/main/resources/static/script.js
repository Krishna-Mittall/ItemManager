// API Base URL
const API_BASE_URL = 'http://localhost:8080/item';

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

    // Clear previous messages
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
        
        // Show success message
        showMessage(addMessage, `Task added successfully! ID: ${newItem.id}`, 'success');
        
        // Add to recent tasks
        recentTasks.unshift(newItem);
        if (recentTasks.length > 10) {
            recentTasks.pop(); // Keep only last 10 tasks
        }
        displayRecentTasks();
        
        // Reset form
        addItemForm.reset();
        
    } catch (error) {
        showMessage(addMessage, `Error: ${error.message}`, 'error');
        console.error('Error adding item:', error);
    }
}

// Handle Get Item Form Submission
async function handleGetItem(e) {
    e.preventDefault();
    
    const formData = new FormData(getItemForm);
    const itemId = formData.get('id');

    // Clear previous messages and results
    clearMessage(getMessage);
    hideTaskResult();

    try {
        const response = await fetch(`${API_BASE_URL}/${itemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Task with ID ${itemId} not found`);
            }
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to fetch task');
        }

        const item = await response.json();
        
        // Display task result
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

// Show Message
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message ${type}`;
    element.style.display = 'block';

    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            clearMessage(element);
        }, 5000);
    }
}

// Clear Message
function clearMessage(element) {
    element.textContent = '';
    element.className = 'message';
    element.style.display = 'none';
}

// Escape HTML to prevent XSS
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

// Utility: Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Error Handler for Network Issues
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    // Check if it's a network error
    if (event.reason && event.reason.message.includes('fetch')) {
        alert('Unable to connect to the server. Please make sure your Spring Boot application is running on http://localhost:8080');
    }
});

// Log initialization
console.log('Smart Task Manager initialized');
console.log('API Base URL:', API_BASE_URL);
