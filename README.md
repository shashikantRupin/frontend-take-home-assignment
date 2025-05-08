
# Mood-Based Movie Recommendation Ad 🎬😄

This is a 300x600px display ad built using **React**, **TypeScript**, **Vite**, and a combination of **Tailwind CSS** and **custom plain CSS**, which uses the user's **camera** to detect their **mood** and recommend a **movie** accordingly. It integrates the **OpenAI API** for mood detection from a captured face image and provides a smooth animation experience with **GSAP**.

## 🔮 Features

- Detects mood from a face scan using OpenAI.
- Offers fallback mood selection if camera access is denied.
- Animations with GSAP during scanning.
- Displays mood-based movie recommendations.
- Interactive UI with hover and selected states.
- Lightweight and fully contained under 5MB.

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- OpenAI API
- GSAP (for animations)
- HTML5 Video and Canvas APIs

## 🚀 How to Run Locally

```bash
git clone https://github.com/shashikantRupin/frontend-take-home-assignment
cd mood-movie-recommender
npm install
npm run dev
