// MongoDB initialization script
db = db.getSiblingDB('personal_dashboard');

// Create a user for the application
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'personal_dashboard'
    }
  ]
});

// Create transactions collection with some sample data
db.transactions.insertMany([
  {
    _id: ObjectId(),
    amount: -50.00,
    category: 'Food',
    description: 'Grocery shopping',
    date: new Date('2024-01-15'),
    type: 'expense'
  },
  {
    _id: ObjectId(),
    amount: 2000.00,
    category: 'Salary',
    description: 'Monthly salary',
    date: new Date('2024-01-01'),
    type: 'income'
  },
  {
    _id: ObjectId(),
    amount: -120.00,
    category: 'Utilities',
    description: 'Electricity bill',
    date: new Date('2024-01-10'),
    type: 'expense'
  }
]);

// Create goals collection with sample data
db.goals.insertMany([
  {
    _id: ObjectId(),
    name: 'Emergency Fund',
    targetAmount: 5000.00,
    currentAmount: 1200.00,
    dueDate: new Date('2024-12-31'),
    description: 'Save for emergencies'
  },
  {
    _id: ObjectId(),
    name: 'Vacation',
    targetAmount: 1500.00,
    currentAmount: 300.00,
    dueDate: new Date('2024-06-30'),
    description: 'Summer vacation fund'
  }
]);

print('Database initialized successfully!');
