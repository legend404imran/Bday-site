# Assets

| File | What | Notes |
|---|---|---|
| `her-photo.jpg` | Her photograph | Already added (resized to 1080px wide) |
| `my-photo.jpg` | Your sunset photograph | Already added |
| `music.mp3` | Optional music | Under 5 MB. If missing, the music button stays hidden |

Different names or paths? Edit `CONFIG.photos` and `CONFIG.music` at the top of `script.js`. Use only music you have rights to.

## Test on your phone
1. Put the PC and phone on the same Wi‑Fi.
2. In the project folder run `python -m http.server 8000`.
3. Open `http://<PC-IP>:8000` on the phone (`ipconfig` / `ifconfig` shows the IP).

## Deploy (GitHub + Netlify)
1. `git init && git add . && git commit -m "birthday site"`, then push to a new **private** repo.
2. Netlify: Add new site, Import from Git, pick the repo. Build command empty, publish directory `/`.
3. Site settings: set a hard-to-guess site name. Anyone with the link can open the site and photos.
