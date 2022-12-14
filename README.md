# Secret Draws App
___

This is the frontend for the Santa Draws app [backend repo here](https://github.com/LCHeffernan/backend-secret-santa). This was a group project that was part of the Manchester Codes bootcamp course. You can view the presentation explaining this app [here](https://www.youtube.com/watch?app=desktop&v=CUrmqMA-IB0&feature=youtu.be).

---

### Decsription

An app for all the family! Christmas present budget getting out of control? Sick of pulling names out of a hat and having to redraw when you pick yourself? Try our app!

The app will allow you to:

- Sign up,
- Log in,
- Assign a gift exchange date and budget,
- Countdown with you to Christmas,
- Generate a group invite link to the draw,
- Automatically assign a name to you, excluding yourself,
- Allow you to add your likes and dislikes, or a wishlist of your own,
- Let other gift-givers send you tips and links to present ideas for the person you have drawn, anonymously!

<img src="/src/images/SD_login.png" width="193" height="413" alt="Santa draws login page" title="Santa draws login page"/><img src="/src/images/SD_create_event.png" width="193" height="413" alt="Santa draws create event page" title="Santa draws create event page"/><img src="/src/images/SD_event.png" width="193" height="413" alt="Santa draws display event page" title="Santa draws display event page"/>
---

### Installation Instructions

1. Run `git clone https://github.com/SuzBarnes/secret-santa` into the console.
2. `cd` into the new directory
3. Run `npm install`

---

### Useful Commands:

| How to...     | Command                  | Further Details                                                            |
| ------------- | ------------------------ | -------------------------------------------------------------------------- |
| Start the app | `npm start`              | it will load on localhost:3000                                             |
| Test          | `npm test`               | the tests will take place and any errors will be displayed in your console |
| Format        | `npx prettier --write .` | Prettier is the ESLint tool used to help with formatting of the App        |

---

### How to use:
- First you must register for an account and then login.
- Then you can create your own secret Santa event (you are the admin for this event) and send the invitation to everyone, or you can join an event someone else has already created.
- You can change your account details and update your likes and dislikes so the person who gets drawn your name has ideas of what to buy you.
- Once everyone had joined your event, you (the admin of the event) can click the draw names button which will assign everyone a name. 
- You can view your events in the my events page and add suggestions anonymously for anyone else in the event.

---

### Technologies

- Created by bootstrapping the [Create React App](https://github.com/facebook/create-react-app).
- Uses React, JavaScript, JSX and SASS.

---

### Further time

In the future we would like to include more tests for better coverage and to refactor the code to be DRY. Additional features we would like to add include:
- Change the event invite code to be either a string of words or a larger number with a expiration time on it.
- Add postal address field for worldwide Secret Draws use,
- Send a notification to users when the names have been drawn,
- Expand it for different events by adding other themes to app using useContext hook.
We would also like to deploy the app.


### Authors

|Social| Alex Bradley | Suzannah Barnes | Lisa Heffernan |
| ------ | ------ | ------ | ------ |
|GitHub|[@AlexPBradley](https://github.com/AlexPBradley)|[@SuzBarnes](https://github.com/SuzBarnes)|[@LCHeffernan](https://github.com/LCHeffernan)|
|LinkedIn|[Alex Bradley](https://www.linkedin.com/in/alexpbradley/)|[Suzannah Barnes](https://www.linkedin.com/in/suzannah-barnes/)|[Lisa Heffernan](https://www.linkedin.com/in/lisa-heffernan-54b61312a)|
|Twitter| | |[@Iisaheffernan](https://twitter.com/Iisaheffernan)|
