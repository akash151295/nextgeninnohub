// Simple Browser Database using localStorage
// No account needed, works offline!

const DB = {
    // Initialize default data
    // ⚠️ SECURITY: Change these default passwords before production!
    init() {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([
                {username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User'},
                {username: 'employee', password: 'emp123', role: 'employee', name: 'Lead Intern'},
                {username: 'intern', password: 'int123', role: 'intern', name: 'Intern User', domain: 'HR'}
            ]));
        }
        if (!localStorage.getItem('interns')) localStorage.setItem('interns', JSON.stringify([]));
        if (!localStorage.getItem('tasks')) localStorage.setItem('tasks', JSON.stringify([]));
        if (!localStorage.getItem('certificates')) localStorage.setItem('certificates', JSON.stringify([]));
    },

    // Generic functions
    getAll(type) {
        return JSON.parse(localStorage.getItem(type) || '[]');
    },

    add(type, data) {
        const items = this.getAll(type);
        data.id = Date.now();
        data.createdAt = new Date().toISOString();
        items.push(data);
        localStorage.setItem(type, JSON.stringify(items));
        return data;
    },

    update(type, id, updates) {
        const items = this.getAll(type);
        const index = items.findIndex(item => item.id == id);
        if (index !== -1) {
            items[index] = {...items[index], ...updates};
            localStorage.setItem(type, JSON.stringify(items));
            return items[index];
        }
        return null;
    },

    delete(type, id) {
        const items = this.getAll(type);
        const filtered = items.filter(item => item.id != id);
        localStorage.setItem(type, JSON.stringify(filtered));
    },

    // Specific functions
    addUser(data) { return this.add('users', data); },
    addIntern(data) { return this.add('interns', data); },
    addTask(data) { return this.add('tasks', data); },
    addCertificate(data) { return this.add('certificates', data); },

    getInternsByEmployee(employeeName) {
        return this.getAll('interns').filter(i => i.assignedTo === employeeName);
    },

    getTasksByIntern(internName) {
        return this.getAll('tasks').filter(t => t.internName === internName);
    },

    updateTask(id, updates) {
        return this.update('tasks', id, updates);
    }
};

// Initialize on load
DB.init();
