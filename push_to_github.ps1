# Replace these values with your GitHub username and repository name
$GITHUB_USERNAME = "andreakorkeamaki"
$REPO_NAME = "andrea-portfolio"

# GitHub repository URL
$REPO_URL = "https://github.com/andreakorkeamaki/portfolio.git"

# Commands to push to GitHub
git remote add origin $REPO_URL
git branch -M main
git push -u origin main

Write-Host "Website successfully pushed to GitHub at: $REPO_URL"
Write-Host "You can now deploy it using GitHub Pages or any other hosting service."
