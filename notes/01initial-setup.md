# Node JS, TypeScript, MongoDB, Mongoose Adventure

Create an API with pagination using the services on top. I will learn to work with a backend using TypeScript as well as re-learn how to work with mongoDB locally as the community version of MongoDB is available in Focal Fossa now.

## Initial Setup

I copied from three servers, CRWN-CLOTHING TS server that I had already made, the CrossFit Virrey Server, and the pizzeria cosmica server. I started with a bare-bones approach and will work from there. I created my new standard .prettierrc file, and set up the routes folder and first index.

## NodeJS & NVM

I realized that the version of nodejs I had installed using apt was ancient. I realized that there is no official node install on apt, so I decided to go ahead and set up nvm (node version manager). The installation is a lot easier than expected and I now have the latest version of node running, 14.x up from 10.x

## MongoDB Local Install and Execution

I installed the MongoDB community version for Focal Fossa. The procedure is well documented in the [MongoDB Installation Docs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/).

### MongoDB Installation

1. Get the repo with the GPG key.
2. Create a list file for MongoDB
3. Reload the package DB with `sudo apt-get update`
4. Install MongoDB Packages with `` s`udo apt-get install -y mongodb-org ``

### Running MongoDB

There are two processes, one that runs in the background: **mongod** and the shell that we run using **mongo**. Mongod needs to be running for the mongo shell to work and interact. To run mongod in the background we can do choose to run it using **systemctl** or **service**, both will run the service in the background and will not require an open terminal.

1. sudo systemctl start mongod
   or
1. sudo service mongod start

To check if the process is running we need to run 2. sudo systemctl status mongod
or 2. sudo service mongod status

This will return a status for our service.

To stop or restart mongo you use the respective stop or restart commands.

To use the shell we just ron `mongo`.

As an additional note, you can set up the process to **execute automatically at booting**. It takes 61MB of RAM.

### Throuble shooting.

My service was not starting, and it was exiting with a status code of 14 that gave no useful information. Thankfully [this article](https://medium.com/@adhityad3v/mongodb-code-exited-status-14-f9f9f3d3e244) saved me. I had to find a .sock file inside temp:

`cd /tmp; ls -l *.sock`

Which returned the name of the mongodb sock file.

Then **the owner of the sock file had to change**, using **chown**. I tried to run the code but got an **invalid user** error. To fix this I had to find the right username by going to the `/etc/passwd file.`

I used the user **mongodb:mongodb** and was able to change ownership. When I ran **mongod** the status was active and I could use the mongo shell.

## Mongo Shell

### show dbs and use

I went back to Colt's course to re-learn the shell basics. We execute the shell and we dun the **show dbs** command to see what dbs we have. Now we have 3, admin, config, local. To create a new one we use the **use** command. I created mine using: `use pagination-demo` which is the name of my DB. Becasue the DB is empty, even if we run **show dbs** we won't see it.

### insert, show collections, find CR

We will create a new collection in the CLI using **db.user.insert**, where db is the db we are currently on, user is the collection name, and insert will have the document we will insert into that collection.

` db.user.insert({name: "moerse", age: 29})`

We get a message with a WriteResult. Then we run **show collections** which will output a list of collections, in our case **user**.

We run `db.user.find()` it will return every document inside the user collection because we are not passing any arguments to the method. We see that we have the object we created but it has an additional **\_id** filed with an **ObjectId** which has a hashed mongoDB string.

I create another use with **db.user.insert()** and then run find and get both items. Afterwards I run find() with a filter `db.user.find({ user: "moerse" })` which will only return the document that matches.

## update and remove UD

We can update a document using **db.user.update()** which takes 2 arguments, the selector, and the update. `db.user.update({name: "moerse"}, {age: 30})` which we can see that updated the document, however **we removed every other property and now the document just has age 30**. To fix this we run `db.user.update({age: 30}, {$set: {name: 'moerse'}})` and now we fixed the document and updated it using the mongoDB operator.

To remove a document we do `db.user.remove({name: "marmot"})` which will remove the document that matches the query. **If many documents match the query, it will remove all of them**. We can use .limit() to limit this, but by default it will eliminate them all.

## drop and show collections

I ran `db.user.drop()` which eliminated the entire collections. Then I ran `show collections` and there where no collections in the DB anymore, creating a clean slate for the new DB created from within the server using mongoose.

## Dotenv blunder

I had my .env file inside the src/ folder, so my server was running in dist and couldn't find the strings. Fortunately it was taken care of.
