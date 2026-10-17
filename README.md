# Flappy Bird Clone

A recreation of the classic Flappy Bird game built with JavaScript, HTML5 Canvas, and CSS. The project was created to practise game development concepts including game loops, collision detection, object movement, and event handling.

## Features

- Smooth bird movement with gravity and jumping mechanics
- Randomly generated pipes
- Real-time score tracking
- High-score tracking during the current play session
- Collision detection
- Game over screen
- Restart functionality
- Lightweight and browser-based

## Screenshots

### Main Menu

[Add screenshot here]

### Gameplay

<img width="263" height="470" alt="image" src="https://github.com/user-attachments/assets/8d8e3fb6-3c0d-4edd-8f69-9659e487a4eb" />


### Game Over Screen

[Add screenshot here]

## Technologies Used

- JavaScript (ES6)
- HTML5
- CSS3
- HTML5 Canvas API

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/flappy-bird-clone.git
```

Navigate to the project directory:

```bash
cd flappy-bird-clone
```

Open `index.html` in your preferred browser.

## Controls

| Action | Input |
|---------|--------|
| Jump | Spacebar |
| Jump | E |
| Restart | x |

## Project Structure

```text
flappy-bird-clone/
│
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── flappybird.png
│   ├── flappybirdbottompipe.png
│   ├── flappybirdtoppipe.png
│   └── background.png
│
└── README.md
```

## How It Works

The game uses a continuous game loop to update object positions and render frames. The bird is affected by gravity each frame and can be moved upwards through player input. Pipes are generated at regular intervals with random gap positions. The player earns points by successfully passing through pipe gaps while avoiding collisions.

## Future Improvements

- Sound effects and background music
- Difficulty scaling
- Multiple bird skins
- Online leaderboard

## Learning Outcomes

This project helped develop skills in:

- Object-oriented programming
- Event handling
- Collision detection
- State management
- Animation using requestAnimationFrame

## License

This project is for educational purposes and is inspired by the original Flappy Bird game

## Author

Created by Isabelle as a personal JavaScript game development project.
