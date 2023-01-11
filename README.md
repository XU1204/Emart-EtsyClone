# Emarty
Live site: https://emart-etsyclone.onrender.com/

## What's this?
Emarty is a full-stack clone project that is originally cloned from Etsy. It's an e-commercial website that helps user to buy and sell products. This project aims for developers to practice using different technologies and build their web application from scratch.

## Technologies/Frameworks Used (Frontend and Backend)
- Frontend: React, Redux , JavaScript
- Backend: Flask, SQLALchemy, Python
- Database: SQLite(local), PostgreSQL(live site)


[<img src="https://user-images.githubusercontent.com/107005038/211913857-6de6041f-f3d0-4f60-8667-1052768c0ead.png" width="75" height="75">](https://www.python.org/) [<img src="https://user-images.githubusercontent.com/105324675/190725431-5033a82c-51ff-4a9a-b9ff-48ad606a2a5e.svg" width="75" height="75">](https://www.javascript.com/) [<img src="https://user-images.githubusercontent.com/105324675/190726531-63e5fa0c-5e9a-4e12-a4df-ac578bdfefb3.svg" width="75" height="75">](https://whatwg.org/) [<img src="https://user-images.githubusercontent.com/105324675/190727242-21af03e1-b793-4257-bdc5-14996fb8da63.svg" width="75" height="75">](https://www.css3.com/) [<img src="https://user-images.githubusercontent.com/105324675/190727472-da7d5a51-ef2e-4f71-b90c-333debd2d147.svg" width="75" height="75">](https://reactjs.org/) [<img src="https://user-images.githubusercontent.com/105324675/190727697-f61e28b7-1597-4be0-9dc4-dbc443790f86.svg" width="75" height="75">](https://redux.js.org/) [<img src="https://user-images.githubusercontent.com/105324675/190729715-5aeed1a2-0914-413e-ac4b-de23aa7ed802.svg" width="75" height="75">](https://nodejs.org/en) [<img src="https://user-images.githubusercontent.com/105324675/190729918-773ddf18-90d3-4d52-aa81-c02731d413bf.svg" width="75" height="75">](https://www.npmjs.com/)
[<img src="https://user-images.githubusercontent.com/105324675/190727354-8f322958-5b34-4c96-b052-358d06d0d9ef.svg" width="75" height="75">](https://www.postgresql.org/) [<img src="https://user-images.githubusercontent.com/105324675/190739700-864f937c-4e43-48ea-9216-00edb49d301d.svg" width="75" height="75">](https://sequelize.org/)

## MVP Core features
1. Product Listings
2. Shopping cart
3. Reviews
4. Likes

## Highlights
### Homepage
![homepage](https://user-images.githubusercontent.com/107005038/210838241-e732bb54-55d4-48b4-abfd-7d42e45ae06d.png)

### Login/Register
![login](https://user-images.githubusercontent.com/107005038/210838297-cbb50828-7572-437a-bc1c-7287e0263901.png)
![register](https://user-images.githubusercontent.com/107005038/210838305-cb5dd926-27d3-460c-b863-ecdb2db5df55.png)

### Product details
![detail](https://user-images.githubusercontent.com/107005038/210838392-16ea8438-be36-42a2-80f0-9b1b78de4d2f.png)

### User's Product Listings
![shop](https://user-images.githubusercontent.com/107005038/210838476-d0ad5092-6ad2-4a2b-9965-d5ee61f8c4b3.png)

### Create a new Listing
![create-listing](https://user-images.githubusercontent.com/107005038/210838532-4196a378-71da-4d96-bdc7-1d7bed5a8f2e.png)

### Shopping Cart
![cart](https://user-images.githubusercontent.com/107005038/210838611-a833ed9c-f410-44cd-b5a5-82c202f38678.png)

## Future Implementation Goals
1. Search Bar
2. Categories

## How to launch the full application locally
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

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

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
