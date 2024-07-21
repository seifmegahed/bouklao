# Bouklao web app

![Vercel](https://vercelbadge.vercel.app/api/seifmegahed/bouklao)

Web app game for [@bouklao](https://www.instagram.com/bouklao) the cat.

![](https://utfs.io/f/f9a3ac67-ea3e-4618-a53b-9c627ad56391-m5amct.png)

## Game
* Chrome dino clone based on [WebDevSimplified](https://github.com/WebDevSimplified/chrome-dino-game-clone)'s [tutorial](https://www.youtube.com/watch?v=47eXVRJKdkU) but rewritten in React and Typescript
* All the game logic is in the `src/pages/game` folder
* Game engine heartbeat based on `requestAnimationFrame` in a `useLayoutEffect` hook
* Score stored locally for guest users
* Score stored in Firestore for logged in users
* login using Google account

## Tech stack
* React
* Typescript
* Tailwind
* Firebase Auth
* Firebase Firestore

## Hosting
* PROD: Firebase hosting: [bouklao.com](https://www.bouklao.com)
* DEV: Vercel: [bouklao.vercel.app](https://bouklao.vercel.app)

## To do
- [x] Add leader board
- [x] Add drop down menu
- [ ] Use inline BASE64 image data instead of files
- [ ] refactor engine?
- [ ] Add sound effects
- [ ] Add instagram login
- [ ] Add welcome/help modal
- [ ] Change database to postgres because Firestore's bundle size is too big
- [ ] Port to Next.js?

## Getting Started

to run the app locally you need to setup a firebase project

### Firebase setup
* Create a Firebase project
* Setup a Firestore database
* Setup a Firebase Auth

Change the `.firebaserc` file to point to your Firebase project

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

* Install the Firebase CLI
* Login to your Firebase project using `firebase login`
* Run `firebase deploy --only firestore`

Create a `.env` file in the root of the project and add the following variables from your Firebase project

```env
VITE_FIREBASE_APIKEY = "your-firebase-api-key"
VITE_FIREBASE_AUTHDOMAIN = "your-firebase-auth-domain"
VITE_FIREBASE_PROJECTID = "your-firebase-project-id"
VITE_FIREBASE_STORAGEBUCKET = "your-firebase-storage-bucket"
VITE_FIREBASE_MESSAGINGSENDERID = "your-firebase-messaging-sender-id"
VITE_FIREBASE_APPID = "your-firebase-app-id"

VITE_FIREBASE_APPCHECKKEY = "your-firebase-app-check-key"
```

Alternatively you can use the Firebase emulator, but you will have to adjust the `auth` to use `email/password` instead of `Google` authentication.

**Game should work without firebase**

```bash
npm install
npm run dev
```

## License
Rights for the images and icons are retained by [bouklao](https://www.instagram.com/bouklao) you cannot use them without permission.

Source code is licensed under the MIT License. You may use, modify, and distribute the source code under the terms of the MIT license.

For the full text of the license, please see the [LICENSE](https://github.com/seifmegahed/bouklao/blob/main/LICENSE) file.

