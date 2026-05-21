# Pong Game

A classic Pong game built with HTML, CSS, and JavaScript with mouse and keyboard controls.

## Features

✨ **Player Controls**
- Use your **mouse** to move the left paddle vertically
- Or use **Arrow Keys (Up/Down)** or **W/S** to control the paddle
- Keep the ball from passing your paddle!

🤖 **Computer AI**
- The right paddle is controlled by AI with adjustable difficulty
- The AI tracks the ball but with some randomness for a fair challenge

🎮 **Game Features**
- Smooth ball physics with collision detection
- Ball spin based on paddle collision point
- Wall collision detection for top and bottom walls
- Real-time scoreboard
- Bouncing ball with smooth animations
- Glowing effects for modern visual appeal
- Reset button to start a new game

## How to Play

1. Open `index.html` in a web browser
2. Move the left paddle using your mouse or arrow keys
3. Hit the ball towards the computer's paddle
4. Score points when the computer misses the ball
5. Click "Reset Game" to start over

## Game Rules

- The ball bounces off walls and paddles
- If the ball passes your paddle (left side), the computer scores
- If the ball passes the computer's paddle (right side), you score
- First to reach a score can continue playing indefinitely

## Technical Details

- **Canvas Size**: 800x400 pixels
- **Ball Speed**: 5 pixels per frame
- **Paddle Speed**: 6 pixels per frame (player), 5.5 pixels per frame (AI)
- **Collision Detection**: Rectangle-circle collision for paddles
- **AI Difficulty**: 85% accuracy with strategic tracking zones

## Files

- `index.html` - Game structure and UI
- `style.css` - Styling and animations
- `game.js` - Core game logic and physics

Enjoy the game! 🎮