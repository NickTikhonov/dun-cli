# dun

Zero friction git commit workflow powered GPT-3.5 ✨

Before:
```
> git add --all
> git commit -m "Update README.md"
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

```
$> dun
✔ Committed: Update README.md with installation and usage instructions
```

### Install

```
npm i --g dun-cli
echo 'export OPENAI_API_KEY="<Your OPEN_AI Key>"' >> ~/.bashrc
source ~/.bashrc
```

### Use

```
git:(main) dun
✔ Committed: Update README.md with installation and usage instructions
```