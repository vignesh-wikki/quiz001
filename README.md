# MathQuiz Bot Project

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
  1. [Cloning the Repository](#1-cloning-the-repository)
  2. [Installing Dependencies](#2-installing-dependencies)
  3. [Environment Setup](#3-environment-setup)
  4. [Running the Bot Locally](#4-running-the-bot-locally)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
  1. [Starting the Quiz](#1-starting-the-quiz)
  2. [Pausing and Ending the Quiz](#2-pausing-and-ending-the-quiz)
- [Security Features](#security-features)
- [Deployment](#deployment)
  1. [Preparing for Deployment](#1-preparing-for-deployment)
  2. [Deploying on Render](#2-deploying-on-render)
- [Project Links](#project-links)

## Introduction
This project is a Telegram bot that conducts a math quiz for users. Built using Telegraf, it allows users to start, pause, and end quizzes, while enforcing time limits and preventing cheating.

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A Telegram Bot Token (from BotFather)

## Setup and Installation

### 1. Cloning the Repository
Clone the repository to your local machine using the following command:

- git clone https://github.com/your-username/           mathquiz-bot.git

##  Installing Dependencies
- Install the necessary dependencies
- npm install

## Environment Setup
- Create a .env file in the root directory and add your Telegram Bot Token:
- BOT_TOKEN=your-telegram-bot-token

## Running the Bot Locally
- Run the bot locally with the following command:
- npm run dev

## Project Structure
- mathquiz-bot/
│
├── routes/                          # Quiz logic and Telegram bot routes 
├── .env                              # Environment variables 
├── package.json                      # npm configuration 
├── webpack.config.js                 # Webpack configuration 
└── README.md                         # Project documentation


## Project Links
- GitHub: https://github.com/vignesh-wikki/Telegram_bot.git
- Live Demo: https://telegram-bot-exg9.onrender.com/
- Telegram Bot: https://t.me/quiz_0101_bot

## Note: Please run the project locally to see results. The Render hosting free tier instances are very slow, so testing locally will give a better experience.