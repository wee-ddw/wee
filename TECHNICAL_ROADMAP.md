# Spotify-Inspired Web App Technical Roadmap

## 1) Architecture
- Stack: Vanilla HTML/CSS/JS (upgrade path: React + Tailwind).
- Data layer: `data/tracks.json` as a mock API.
- UI regions: Sidebar, content grid, persistent bottom player.
- State model: current track index, play state, shuffle, repeat, volume.

## 2) MVP Features (implemented)
- Responsive dashboard with grid + flex hybrid layout.
- Transport controls: play/pause, previous, next.
- Seek/progress bar tied to `audio.currentTime`.
- Volume slider tied to `audio.volume`.
- Shuffle and repeat toggles.
- Active track highlighting and now-playing metadata.

## 3) API Strategy
- Current: static JSON file loaded with `fetch`.
- Future options:
  - Jamendo API for royalty-free previews.
  - Pixabay API for placeholder media assets.

## 4) Suggested Next Iterations
- Add playlists and queue support.
- Add keyboard shortcuts and accessibility labels.
- Persist volume and last track in local storage.
- Add service layer and typed models before backend integration.

## 5) File Structure
- `index.html`: layout shell and player controls.
- `style.css`: Spotify-inspired theme, responsive/grid styles.
- `script.js`: core audio player logic and UI bindings.
- `data/tracks.json`: mock track catalog.
