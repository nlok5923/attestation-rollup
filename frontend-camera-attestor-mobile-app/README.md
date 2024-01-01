# Pixel Police Mobile App

<div align="center">
    <img src="https://github.com/nlok5923/attestation-rollup/assets/76112446/74a3271c-9622-4be4-90a7-295fdea970a2" alt="Logo" height="500">
</div>

## About
The Pixel Police mobile app, built with React Native, empowers citizen journalists to confidently capture and share images. Integrated seamlessly with the protocol, the app ensures image authenticity by immediately signing each capture with a private key and recording transparent, traceable histories, thereby contributing to the fight against AI-generated content in media.

## Steps to run the mobile app
>**Note**: Please make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.
1. ``` cd ./frontend-camera-attestor-mobile-app ```
2. ``` npm i ```
3. Replace the ``` rollupUrl ``` value in ``` ./frontend-camera-attestor-mobile-app/src/context/imageContext.js ``` with the deploy URL of the rollup server. Note: For dev purposes, you can tunnel the localhost URL of the server via a service such as [ngrok](https://ngrok.com/).
4. ``` npm start ```
5. ``` npm run android ```
