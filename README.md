## Steps to start the application:
1) Clone application from github
2) Cd into the api directory within the project in terminal/shell
3) Run pip3 install -r requirements.txt (note the pip you use will depend on your python version) and then run pip freeze > requirements.txt
To start the virtual environment for the server run python3 -m venv venv then source venv/bin/activate. If you’re using pc run python -m venv venv and venv\Scripts\activate instead
4) To start the server run yarn start-api. If you get an error when doing this please set the FLASK_APP environment variable: export FLASK_APP=api.py and start the server again
5) In a different terminal/shell cd into the project directory and install the dependencies using npm install
6) Type yarn start to start the react application on [http://localhost:3000](http://localhost:3000)

## How to use the applicatication:
1) First create an account by clicking “here” in the Don’t have an account message
2) Create an account by following the instructions on the screen. Note form validation is implemented.
3) After registering click the login button and fill out your information to login
4) If the correct email/password were entered you’ll be on the home screen (personal image repository)
5) To upload an image click the “Upload an Image” button and fill out the appropriate information on the pop up screen. Note selecting the private checkbox will mean the image will not show up on the feed, but will still show up on your personal image repo.
6) To delete images either click the “Delete All” button to delete all of them or select the checkbox under the images you’d like to delete and click the “Delete” button.
7) Click Feed on the top left to go to a page where all public images from all the user’s can be seen. (Note there will be some images on there already from when I was testing)
8) On both the Feed and home screens you can click on the image to enlarge it
9) Click Personal on the top left to go back to your personal repository
10) Click the “Sign Out” button to log out (you will no longer be able to access the feed or home screens until you log back in) 
