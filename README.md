# noteTaker

## Description

This is a simple note taker application that can be used to write, save, and delete notes. This application will use an express backend; save and retrieve note data from a JSON file.


* The application has a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

* The application uses the following API routes:

  * GET `/api/notes` - this will read the `db.json` file and return all saved notes as JSON.

  * POST `/api/notes` - this will receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

  * DELETE `/api/notes/:id` - this will receive a query parameter containing the id of a note to delete. This means each note has a unique `id` when it's saved. 
     In order to delete a note, you'll read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete

## Criteria

The application will allow users to create and save notes.

The user can view previously saved notes.

The user can also delete previously saved notes.

* Below is an example of what the application may look like:
![noteTakerScreenshot](/Images/.png?raw=true)

## Deployed Application 
* This app is deployed to Heroku. Below is a link you can folllow to depoyed application:

- - -