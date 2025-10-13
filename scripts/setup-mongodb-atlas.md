# MongoDB Atlas Setup for Vercel Deployment

## 1. Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com
2. Sign up for a free account
3. Create a new project called "personal-dashboard"

## 2. Create Database Cluster
1. Click "Create Deployment"
2. Choose "M0 Sandbox" (Free tier)
3. Select a cloud provider and region (preferably AWS us-east-1)
4. Name your cluster "personal-dashboard-cluster"
5. Click "Create Deployment"

## 3. Configure Database Access
1. Go to "Database Access" in left menu
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `dashboard_user`
5. Generate a secure password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## 4. Configure Network Access
1. Go to "Network Access" in left menu
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
   - This is needed for Vercel serverless functions
4. Click "Confirm"

## 5. Get Connection String
1. Go to "Database" in left menu
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" driver
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `myFirstDatabase` with `personal_dashboard`

Example connection string:
```
mongodb+srv://dashboard_user:YOUR_PASSWORD@personal-dashboard-cluster.xxxxx.mongodb.net/personal_dashboard?retryWrites=true&w=majority
```

## 6. Environment Variables for Vercel
Set these in Vercel dashboard or CLI:
```bash
MONGODB_URI=your_atlas_connection_string
DB_NAME=personal_dashboard
NODE_ENV=production
```

## 7. Initialize Sample Data (Optional)
You can run a script to populate initial sample data once deployed.