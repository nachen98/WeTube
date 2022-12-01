# About WeTube

WeTube is a web application inspired by [YouTube](https://www.youtube.com/). It is an video sharing and social media platform .

**[Click here to view WeTube Live Site](https://wetube-nc.herokuapp.com/)**

## Please see below links to project Wiki

 - [API Documentation](https://github.com/nachen98/Youtube-Clone/wiki/API-Documentation)
 - [Database Schema](https://github.com/nachen98/Youtube-Clone/wiki/Database-Schema)
 - [Features](https://github.com/nachen98/Youtube-Clone/wiki/Features-List)
 - [Redux Store Shape](https://github.com/nachen98/Youtube-Clone/wiki/Redux-Store-Shape)
 
## Tech Stack

#### Frameworks, Platforms, & Libraries:
![Flask](https://camo.githubusercontent.com/ea92b069447aaf7b6ed27965700bc66cd0f7a450d0af50e0253e51af05ae73db/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f466c61736b2d4244424442443f7374796c653d666f722d7468652d6261646765266c6f676f3d466c61736b266c6f676f436f6c6f723d626c61636b)
![Python](https://camo.githubusercontent.com/053ff5f8af42deab62b674620537307a2b9d52613eff9901ff014a0d37f3e217/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f507974686f6e2d2532334637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d507974686f6e266c6f676f436f6c6f723d626c61636b)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Ubuntu](https://camo.githubusercontent.com/d6de31463470dd4540e7ece7849e6d38d423825f113ea4ae639f4dcfd0392d82/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5562756e74752d4539353432303f7374796c653d666f722d7468652d6261646765266c6f676f3d7562756e7475266c6f676f436f6c6f723d7768697465)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML](https://camo.githubusercontent.com/49fbb99f92674cc6825349b154b65aaf4064aec465d61e8e1f9fb99da3d922a1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f68746d6c352d2532334533344632362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d68746d6c35266c6f676f436f6c6f723d7768697465)
![CSS3](https://camo.githubusercontent.com/e6b67b27998fca3bccf4c0ee479fc8f9de09d91f389cccfbe6cb1e29c10cfbd7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f637373332d2532333135373242362e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d63737333266c6f676f436f6c6f723d7768697465)
![Heroku](https://camo.githubusercontent.com/d18f98a93a8ca015503870e592f96dbdf86f41048e9de1fbbbd4b2dcc7c456b1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6865726f6b752d2532333433303039382e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d6865726f6b75266c6f676f436f6c6f723d7768697465)
![Docker](https://camo.githubusercontent.com/6b7f701cf0bea42833751b754688f1a27b6090fdf90bf2b226addff01be817f0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f636b65722d2532333064623765642e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d646f636b6572266c6f676f436f6c6f723d7768697465)

#### Database:
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)


## Features Directions:

### Splashing Page

All videos are displayed to users. Clicking each video will direct user to the video detailed page.

![image](frontend/src/components/Images/splash-page.png)

### Sign-up Form

To comment and upload videos, you can sign up easily by filling out this modern sign-up form modal. 

![image](frontend/src/components/Images/signup-page.png)

### Log-in Form

Once signed-up, user will login by filling out this form. It also alow to log in as a demo user.

![image](frontend/src/components/Images/login-page.png)

### Dropdown Menu

The dropdown menu displays current user's info and the log-out tab.

![image](frontend/src/components/Images/logout-page.png)

### Upload a Video Form

Filling out this uploading video form will have your videos go public!

![image](frontend/src/components/Images/upload-video.png)

### Video Details Page

In this page you can vatch the videos, uploaders info, description, comments and list of recommended videos on the side. If you created this video, you can delete and edit it here too. 

![image](frontend/src/components/Images/single-video.png)
![image](frontend/src/components/Images/comments.png)

### Create a comment

Users can create comment to videos.

![image](frontend/src/Images/create-comment.png)

### Edit/Delete a comment

Users can edit or delete their comment.
![image](frontend/src/Images/edit-delete-comment.png)

## To-Do List:

 - Add the channel, description, search, like features.

## Get Started:

1. Clone this repository (only this branch)

   ```bash
   git clone git@github.com:nachen98/Youtube-Clone.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```
3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. From the root directory, cd into react-app, install your dependencies, run npm install, and WALA! You got your very own Discord clone.

   ```bash
   cd react-app
   ```

   ```bash
   npm install
   ```
   
   ```bash
   npm start
   ```


## Contact Information:

https://www.linkedin.com/in/na-chen-pharmd2019

https://github.com/nachen98