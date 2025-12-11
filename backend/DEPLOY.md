# Vercel Deployment - Quick Reference

## 🚀 Deploy in 3 Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Backend ready for Vercel"
git push
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set **Root Directory** to: `backend`
4. Add these Environment Variables:
   - `MONGODB_URI` = `mongodb+srv://learningDB:shivam1234@cluster0.xm2akip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - `NODE_ENV` = `production`
   - `CLIENT_URL` = (your frontend URL - update after deploying frontend)

5. Click **Deploy**

### Step 3: Update MongoDB Atlas
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## 📝 Your Deployed Backend URL
After deployment, you'll get a URL like:
```
https://fest-yuva-nirman-backend.vercel.app
```

## ✅ Test Your API
```bash
# Health check
curl https://YOUR-BACKEND-URL.vercel.app/api/health

# Test registration
curl -X POST https://YOUR-BACKEND-URL.vercel.app/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"teamName":"Test Team","teamLeader":"John Doe","email":"test@example.com","phone":"+919876543210","teamSize":"3","problemChoice":"edu1"}'
```

## 🔄 Update Frontend
Once deployed, update your frontend HTML:

Find this line in hackathon.html:
```javascript
const response = await fetch('http://localhost:5000/api/registrations', {
```

Change to:
```javascript
const response = await fetch('https://YOUR-BACKEND-URL.vercel.app/api/registrations', {
```

## 🎯 Important Notes

✅ **Backend is Vercel-ready** - No code changes needed  
✅ **MongoDB Atlas configured** - Using your existing connection  
✅ **Serverless functions** - Auto-scaling enabled  
✅ **CORS configured** - Will work with your frontend  

## 🆘 Need Help?

If deployment fails:
1. Check Vercel deployment logs
2. Verify MongoDB Atlas network access allows 0.0.0.0/0
3. Ensure all environment variables are set correctly
4. Check that Root Directory is set to `backend`
