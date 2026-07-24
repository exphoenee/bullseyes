# BullsEye

BullsEye is a small 2D arcade game built with vanilla JavaScript using object-oriented
programming and bundled with [Vite](https://vitejs.dev/). You control a bull with the mouse
and protect the hatching larvae from the toads that keep coming in from the right side of the
screen. The game uses simple physics and circle-based collision detection, so objects collide
and push each other around.

It started from the [freeCodeCamp JS game crash course](https://www.youtube.com/watch?v=U34l-Xz5ynU&t=193s),
but the code has been completely refactored into a class hierarchy (`GameObject` base class with
`Player`, `Enemy`, `Egg`, `Larva`, `Obstacle` and particle subclasses).

**[▶ Play it live here!](https://bullseyes.netlify.app/)**

## Installation

The game uses ES modules, so it needs a dev/preview server — opening `index.html` directly from
the filesystem (`file://`) will not work.

```bash
git clone https://github.com/exphoenee/bullseyes.git
cd bullseyes
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

To create a production build: `npm run build`, then `npm run preview` to serve it locally.

## How to Play

Eggs appear on the field and hatch into larvae after a short countdown (shown above each egg).
A larva then crawls upward toward the top of the field:

- If a larva reaches the top safely, you **gain 1 point**.
- If a toad catches a larva, the larva is eaten and you **lose 1 point**.

You control the bull with the mouse — hold the mouse button and drag; the bull follows the
cursor. Use its body to push the toads away and buy the larvae time to escape.

### Scoring

- Reach **+21** points to win.
- Drop to **-10** points and it's game over.

### Controls

| Input | Action |
| --- | --- |
| Mouse (hold & drag) | Move the bull |
| `d` | Toggle collision hitboxes (debug view) |
| `r` | Restart after the game is over |

## Tech

- Vanilla JavaScript (ES modules, OOP)
- HTML5 Canvas 2D
- [Vite](https://vitejs.dev/) for dev server and bundling
- [uuid](https://www.npmjs.com/package/uuid) for object ids

## License

[MIT](./LICENSE) © exphoenee
