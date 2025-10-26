#!/bin/bash
# Push DotDrop to GitHub
# Run this script after creating the repository on GitHub

echo "🚀 DotDrop - Push to GitHub"
echo "================================"
echo ""

# Check if remote exists
if git remote get-url origin > /dev/null 2>&1; then
    echo "✓ Remote 'origin' is configured"
    git remote -v
else
    echo "⚠ Adding remote 'origin'..."
    git remote add origin https://github.com/interzone/dotdrop.git
fi

echo ""
echo "📋 Commits ready to push:"
git log --oneline --graph -5

echo ""
echo "🔄 Pushing to GitHub..."
git push -u origin master

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View at: https://github.com/rafabez/dotdrop"
else
    echo ""
    echo "❌ Push failed!"
    echo ""
    echo "Possible reasons:"
    echo "1. Repository doesn't exist yet - create it at https://github.com/new"
    echo "2. Authentication required - configure Git credentials"
    echo "3. Network issues - check your connection"
    echo ""
    echo "Need help? Check: https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories"
fi
