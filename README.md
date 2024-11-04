# 🎮 rawg.io Fetcher

A powerful tool for collecting and organizing video game data via the RAWG API.

![RAWG API](https://pbs.twimg.com/profile_images/951372339199045632/-JTt60iX_80x80.jpg)

## ✨ Features

- 📥 Automatic game retrieval from the RAWG API
- 🔍 Intelligent filtering of relevant data
- 💾 Export to structured JSON format
- ⚠️ Robust error handling
- 🚀 Optimized performance

## 📋 Prerequisites

- Node.js (v12+)
- npm

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArizakiDev/rawg.io-fetcher.git
   ```

2. **Navigate to the project**
   ```bash
   cd rawg.io-fetcher
   ```

3. **Install dependencies**
   ```bash
   npm install axios
   ```

## 💻 Usage

1. Configure your RAWG API key in `index.js`
2. Run the script:
   ```bash
   node index.js
   ```
3. Find your data in `games.json`

## 📦 Data Format

The `games.json` file follows this structure:

```json
[
{
"id": "game_id",
"name": "game_name",
"slug": "game_slug",
"background_image": "image_url",
"links": [
{ "name": "PlayStation Store", "url": "playstation_url" },
{ "name": "Steam", "url": "steam_url" }
]
},
...
]
```

**PS4 Need 334 pages for games.**
