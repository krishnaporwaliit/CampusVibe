# CampusVibe 🎓🔥

A comprehensive college social platform combining peer ratings and dating features, exclusively verified by college email domains.

## 🚀 Live Demo

**[Play with CampusVibe Live!](https://campusvibe-app-kp2026.web.app)**

## ✨ Features

### ⭐ Peer Rating
* Rate fellow students on a 1-5 star scale
* Semi-anonymous ratings (shows count but not identity)
* Campus-wide leaderboard

### 💖 Dating Features
* **Swipe Cards:** Classic Tinder-style matching. Swipe right to like, left to pass. Matches unlock chat.
* **Anonymous Crush:** Pick up to 3 crushes per day. You both get notified only if there is a mutual match. No awkward rejections!
* **Daily Match:** An algorithm pairs you with one person per day based on shared interests. You have 24 hours to accept or skip.
* **Blind Chat:** Get matched anonymously and chat for 24 hours with your identity hidden. Both users can choose to reveal themselves afterwards.

### 💬 Real-time Chat
* Instant messaging powered by Firebase Firestore for all your matches.

### 🔐 Security & Exclusivity
* Verified via college email addresses (e.g. `.edu` or `.ac.in`) to ensure the platform is exclusive to actual students.

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite, TailwindCSS
* **Backend (BaaS):** Firebase
  * **Auth:** Email/Password & Email Verification
  * **Database:** Cloud Firestore
  * **Storage:** Firebase Storage (for profile photos)
* **Routing:** React Router v6

## 💻 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/krishnaporwaliit/CampusVibe.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CampusVibe
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 License

MIT
