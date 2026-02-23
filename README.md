# LexiAI Chrome Extension ✨

## LexiAI is an AI-powered Chrome extension that instantly summarizes and paraphrases selected text directly within your browser. Simply highlight text, right-click, and choose how you want LexiAI to transform it.

## Summarization Service Repo: https://github.com/G1of1/lexi-summarization-service
## Paraphrasing Service Repo: https://github.com/G1of1/lexi-paraphrasing-service
## 🚀 Features
### 📚 Smart Summarization

Detailed Summary

Bullet Points

TL;DR

Study Notes

Simplified Explanation

### ✍️ Intelligent Paraphrasing

Standard

Shorten

Expand

Academic

Formal

### 💾 Local Save Support

Users can save generated summaries and paraphrases locally using Chrome’s Storage API.

### ⚡ Context Menu Integration

Select any text on a webpage → Right-click → Choose a LexiAI action → View results instantly.

### 🏗 Architecture Overview

This extension communicates with a deployed backend via an API Gateway.

User selects text
        ↓
Context Menu Click
        ↓
Background Service Worker
        ↓
API Gateway
        ↓
Summarization / Paraphrasing Service
        ↓
Response displayed via Content Script
### 🛠 Tech Stack

TypeScript

Chrome Extension (Manifest V3)

Vite

Chrome Storage API

Background Service Worker

Content Scripts

### 🧠 How It Works
Background Service Worker

Listens for context menu clicks

Sends selected text to backend API

Routes responses to content script

Content Script

Receives API response

Displays summary or paraphrased content

Handles UI rendering

Popup (Optional UI)

Can display saved history

Can manage authentication state

### 🧪 Debugging

To inspect the background service worker:

Go to chrome://extensions

Find LexiAI

Click Inspect Service Worker

If API requests fail:

Verify VITE_API_URL is correct

Ensure backend has CORS enabled

Confirm extension was rebuilt after env changes


### 🚀 Future Improvements

User authentication dashboard

Cloud-synced saved history

Export results to Markdown or PDF

Dark mode UI

Usage analytics

