# writing-trainer

Writing Trainer where you can choose an amount of random words (German, or English) and an amount of minutes. Then you write, using those words, for the given amount of time.

Setup by running `npm install` in `ui` and `srv`

Start by executing `cd ui && ./run.sh` and `cd srv && ./run.sh` in two terminals, which will start an API server on http://localhost:8080 with the endoints `GET /words/de/$num` and `GET /words/en/$num`.

It will also start a UI on http://localhost:3000.
