# meet-ez-share

### Overview

chrome extension to create and share google meet meetings easily

## Features

1. It should allow users to create a new Google Meet meeting and quickly share the meeting link with others.
2. It should allow users to choose which email to create meetings if they have multiple Google Accounts signed in.
3. Cache the selected email for further meetings.
4. Make it easy to create and share new meeting links only using Keyboard shortcuts.

### Keyboard shortcuts

1. `ALT+SHIFT+G` : Launch the Chrome Extension (not working)
2. `ALT+SHIFT+N` : Create a new meeting
3. `ALT+SHIFT+C` : Copy the meeting link onto Clipboard (not working)

These shortcuts will enable the users to create and share meetings easily.

## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **14**.
2. Clone this repository.
3. Run `npm install` to install the dependencies. If you get any authorization issues, try running `sudo npm install`
4. Run `npm start` or `sudo npm start`
5. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
6. Now you are all set to use the extension.

## Structure

Mainly all the code related things are inside the src folder and if you want to see the settings of the extension, you can checkout the **manifest.json** inside the src folder, it shows all the permission taken by the chrome extension and all the other bundles which are being used.

### Frontend scripts

\_./src/Popup/Popup.jsx

Frontend scripts are inside the **_popup folder_** inside the src. These files basically handles all the ui elements of the extension. Reading email and meetId on mounting of these ui elements from cache.

### Listener scripts

\_./src/Background/index.js

Listener scripts mainly handle all the authentication/revoking of token and creation of meeting whenever there is a trigger from frontend.

Following actions inside these scripts :

1. Listening to commands for any shortcut.
2. calling calendars api for creating a new meeting.
3. Whenver switch-user is called revoking the token and opening a new window for selecting a new user.

## Q:How would you identify a great engineer?

**Ans :** A great engineer with whom I would love to work with should be a person who have a knack for **solving problems**, these only come when someone is **curious** and have an eye for **an attention to detail**. But just solving problems is not enough, you should be able to **create processes** so that if the problem arises again it is detected and solved within that process or framework, that's how you differentiate between a good and a great engineer.

Quality I would like to point out specifically for a great engineer would be -

1. A great colleague - One who feels responsible for his as well as the growth of his fellow peers.
2. Good communiation - Able to communicate the real problem after identifying it.
3. Make tradeoffs - He is able to take in account the amount of effort, time taken and resources to do a task and make the necessary tradeoffs to complete the task on time and efficiently.
4. Lazy - He should be able to re-use things that are previously built and not wasting time and resources on doing those tasks again and again or worse doing it manually.
