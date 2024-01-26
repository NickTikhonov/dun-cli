# dun

Zero friction git commits powered GPT-3.5 ✨

Without `dun` 🤦‍♂️
```
> git add --all                   
> git commit -m "Update README.md"
[main 91d1c76] Update README.md
 1 file changed, 15 insertions(+), 1 deletion(-)
```

With `dun` 😍
```
> dun
✔ Committed: Update README.md with installation and usage instructions
```

### Install

You will need to provide your `OPENAI_API_KEY` as an environment variable.

```
npm i --g dun-cli
echo 'export OPENAI_API_KEY="<Your OPEN_AI Key>"' >> ~/.bashrc
source ~/.bashrc
```