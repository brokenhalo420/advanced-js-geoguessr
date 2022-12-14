# GeoGuessr
<p style="color:gray; font-style:italic;">Authors: Boyan Bogdanov & Mario Nikolov</p>

## Description
This is a replica of the famous game GeoGuessr. In short, this game may be played singleplayer or multiplayer. The game consists of one end goal "Find where you have spawned".

The game behinds by spawning you in a random location on the planet. Your screen will have two parts - the mini google map and the large street view map. You will then have to guess where you are at by navigating around with the street view map. You will have the functionality to return to your starting point at any time during your exploration.

When you are ready to make your guess, just drop a pin on the google mini map as to mark down your guess. The closer to your spawning location you have guessed the bigger the score you get.

One game consists of 3 rounds.


## How to run

>1. Server: `npm start` in `/server`
>2. Client: `npm run serve` in `/client`

## Database Overview
- User - A table representing the user's information
- Score - A table representing the score for each game

> The relationship between User and Score is one to many.
<p>
  <img src="./assets/geoguessr-db.png" alt="Geoguessr Database Diagram"/>
</p>
