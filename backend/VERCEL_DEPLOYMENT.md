# Deploying to Vercel

## Quick Deployment Steps

### 1. Install Vercel CLI (Optional)
```bash
npm i -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel](https://vercel.com)** and sign in with GitHub
2. **Click "Add New Project"**
3. **Import your GitHub repository** (or upload the backend folder)
4. **Configure Project:**
   - **Root Directory:** `backend`
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   ```
   MONGODB_URI = mongodb+srv://learningDB:shivam1234@cluster0.xm2akip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   NODE_ENV = production
   CLIENT_URL = https://your-frontend-url.vercel.app
   ```

6. **Click "Deploy"**

### 3. Deploy via CLI

```bash
cd backend
vercel
```

Follow the prompts:
- Set up and deploy? `Y`
- Which scope? (Select your account)
- Link to existing project? `N`
- Project name? `fest-yuva-nirman-backend`
- In which directory is your code located? `./`
- Want to override settings? `N`

### 4. Add Environment Variables via CLI

```bash
vercel env add MONGODB_URI
vercel env add NODE_ENV
vercel env add CLIENT_URL
```

### 5. Update Frontend

After deployment, Vercel will give you a URL like:
```
https://fest-yuva-nirman-backend.vercel.app
```

**Update your frontend HTML** to use this URL instead of localhost:
```javascript
const API_URL = 'https://your-backend-url.vercel.app';

fetch(`${API_URL}/api/registrations`, {
  // ... rest of your code
});
```

## Important Notes

### MongoDB Atlas Whitelist
Make sure to whitelist Vercel's IP addresses in MongoDB Atlas:
1. Go to MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add specific Vercel IP ranges

### CORS Configuration
Update CLIENT_URL environment variable on Vercel to match your frontend domain:
```
CLIENT_URL=https://your-frontend.vercel.app
```

### Testing Your Deployment

Test the deployed API:
```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Create registration
curl -X POST https://your-backend-url.vercel.app/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"teamName":"Test","teamLeader":"John","email":"test@example.com","phone":"+919876543210","teamSize":"3","problemChoice":"edu1"}'
```

## Vercel Configuration

The `vercel.json` file is already configured with:
- Serverless function deployment
- Proper routing
- Production environment

## Troubleshooting

### Error: Module not found
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify

### Error: MongoDB connection timeout
- Check MongoDB Atlas Network Access
- Verify connection string in environment variables

### CORS Error
- Update `CLIENT_URL` in Vercel environment variables
- Make sure it matches your frontend domain exactly

## Local Development

For local development, continue using:
```bash
npm run dev
```

The code automatically detects Vercel environment and adjusts accordingly.
