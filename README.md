# LTA Fare System Procedure Document Web Application & AI-Chatbot

This project aims to make the LTA fare system protocol document retrieval process easy and user-friendly. This is done through a revamp of their existing webpage and the inclusion of an AI-Chatbot to aid users with their queries related to their search for documents. This project is a collaboration with NUS Computing Students.

## Installation

1. Download a code editor of your choice. [Visual Studio Code](https://code.visualstudio.com/download) is recommended. 

2. Ensure that the latest version of [Java](jdk.java.net/17/) is installed on your local computer.

3. Ensure that [MongoDB community server](https://www.mongodb.com/try/download) and [MongoDB Compass](https://www.mongodb.com/try/download/tools) is installed.
MongoDB Compass](https://www.mongodb.com/try/download/tools) is a interface that allows user to interact with the mongoDB server in a visual format.

4. Ensure that the latest version of [Node.js](https://nodejs.org/en/download/) is installed. 
[Node.js](https://nodejs.org/en/download/) Express is the framework used to code the backend RESTful APIs for the Fare System File Display Tool.

5. Ensure that [Python 3.9](https://www.python.org/downloads/) is installed. 
Python will be used to run the AI Chatbot backed code.

## Getting Started

1. Ensure that all the relevant python packages are installed on your local computer.
If your packages are not installed, use the package manager [pip](https://pip.pypa.io/en/stable/) to install relevant python packages used to run the AI-Chatbot Script:

```bash
pip install -r requirements.txt
``` 

or alternatively, install them individually:

```bash
pip install pandas
pip install numpy
pip install gensim
pip install spacy
pip install tika
pip install regex
pip install pymongo
pip install datetime
```

2. To run the Node.js Express backend server, open a bash terminal in the `/backend` directory (or enter `cd backend` if you are at the root directory) and install all the required packages:

```bash
npm install
```

All the relevant packages will be automatically downloaded and installed. Afterwards, start the server:

```bash
npm start
```

The server should be hosted on `port 8080`. You can visit the address `localhost:8000` and you should see a successful message if it is up and running.

3. To run the React Redux Frontend for the File Display Tool, open a seperate bash terminal in the `/frontend` directory (or enter `cd frontend` if you are at the root directory) and install all the required packages:

```bash
npm install
```

All the relevant packages will be automatically downloaded and installed. Afterwards, start the server:

```bash
npm start
```

A webpage hosted on `port 8081` will open in the default web browser with the address `localhost:8081`.

4. To run the React Frontend for the Chatbot Dashboard, open a seperate bash terminal in the `/visualization` directory (or enter `cd visualization` if you are at the root directory) and install all the required packages:

```bash
npm install
```

All the relevant packages will be automatically downloaded and installed. Afterwards, start the server:

```bash
npm start
```

A webpage hosted on `port 3000` will open in the default web browser with the address `localhost:3000`. 

Note that for the data to be accurately displayed on the dashboard, the backend server for the File Display Tool has to be up and running so that the API calls will be successful.


## Usage

## Credits

NUS Business Analytics Capstone Project Sem1AY2021 Team-17

Members:
* Joel Yap
* Tan Xue Hui
* Genevieve Ong
* Tobias Yap
* Mitchell Teh
