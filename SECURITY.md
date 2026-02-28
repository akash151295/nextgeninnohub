# NextGen InnoHub - Security Setup

## 🔒 Security Measures Implemented

### 1. Repository Privacy
- Make this repo **PRIVATE** on GitHub
- Go to Settings → Danger Zone → Change visibility → Make private

### 2. Sensitive Data Protection
- Never commit passwords or API keys to GitHub
- Use `.gitignore` to exclude sensitive files
- Store intern data in Google Sheets (not in repo)

### 3. Default Credentials (CHANGE THESE!)
Current demo credentials in `db.js`:
```
Admin: admin / admin123
Employee: employee / emp123
Intern: intern / int123
```

**⚠️ IMPORTANT: Change these passwords before going live!**

### 4. Data Storage
- User credentials → localStorage (browser-based)
- Intern data → Google Sheets (external, secure)
- No sensitive data in GitHub repo

### 5. Recommended Next Steps
1. Change all default passwords
2. Set up Firebase Authentication (optional)
3. Use environment variables for API keys
4. Enable HTTPS on your domain
5. Add rate limiting for login attempts

## 🚀 Deployment
Website works on GitHub Pages even with private repo!
- Code: Private on GitHub
- Website: Public at your domain
- Data: Secure in Google Sheets
