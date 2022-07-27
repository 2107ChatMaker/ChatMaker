<img src="public/resources/chatmakerlogo.png">

## ChatMaker is a web application that allows users to submit prompts and also lets users have the ability to give responses to prompts for future use in game development or other industries. It generates a sense of community with users participating together.

## Features

- Written in NextJS
- Styled using Sass
- Uses MongoDB database
- Desktop and mobile compatable
- Ablility to export saved responses
- Create prompts
- Search through prompts
- Respond to prompts
- Rate responses

## Installation

Must have an internet connection on a mobile or desktop device

### Option 1: Clone the project

```
$ git clone https://github.com/2107ChatMaker/ChatMaker.git
```

### Option 2: Set up environment variables

```
$ npm i
```

### Option 3: Run development server

```
$ npm run dev
```

### File Structure

- CHATMAKER (root)
  - Src (contains all of the files needed for the application to work)
    - backEnd (contains all backend files relating to database and database functions)
      - dataAccessLayer
        - controller (actions relating to the database)
        - schemas (schemas for each collection in the database)
      - database (connection of the database to the application)
      - utility (includes tag for responses)
    - components (contains reusable components that are used throughout the page)
    - interfaces
    - pages (actaul webpages that users can navigate to and use)
      - api (API requests for prompts, users and responses)
    - styles (styling of pages)
    - utils (utility functions used throughout the application)

## Tech Stack

Software used in this project:

- [NextJS](https://www.swift.org/)
- [MongoDB](https://developer.apple.com/xcode/)
- [Mongoose](https://mongoosejs.com/)
- [Axios](https://www.npmjs.com/package/react-axios)
- [Sass](https://sass-lang.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Next-Auth](https://next-auth.js.org/)
- [React-Infinite-Scroll-Component](https://www.npmjs.com/package/react-infinite-scroll-component)
- [JWT](https://jwt.io/)
- [SendGrid](https://sendgrid.com/)

Many of symbols and imagery are from SF symbols:

- [MaterialUI](https://mui.com/)

## Authors

- Abbe Azale
- Phillip Chadwick
- Son Minh Nguyen
- Kelsey Zirk

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
