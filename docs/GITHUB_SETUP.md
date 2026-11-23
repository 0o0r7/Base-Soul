# GitHub Setup Instructions

## Option 1: Using GitHub CLI (Recommended)

1. **Authenticate with GitHub CLI**:
   ```bash
   gh auth login
   ```
   Follow the prompts to authenticate.

2. **Create repository and push**:
   ```bash
   cd base-soul
   gh repo create base-soul --public --source=. --remote=origin --push
   ```

## Option 2: Manual Setup

1. **Create repository on GitHub**:
   - Go to https://github.com/new
   - Repository name: `base-soul`
   - Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Add remote and push**:
   ```bash
   cd base-soul
   git remote add origin https://github.com/YOUR_USERNAME/base-soul.git
   git branch -M main
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

## Verify

After pushing, visit:
`https://github.com/YOUR_USERNAME/base-soul`

Your code should now be on GitHub! 🚀

