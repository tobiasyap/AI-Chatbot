# LTA Fare Procedure Document Webpage & AI-Chatbot

This project aims to make LTA fare system protocol document retrieval easy and user-friendly. This is done through a revamp of the webpage and the inclusion of an AI-Chatbot to aid users with any queries related to searching for documents. THis project is a collaboration with NUS Computing Students.

## Installation

1. Download a code editor or you choice. [Visual Studio Code] (https://code.visualstudio.com/download) is recommended. 

2. Ensure that [Java] (jdk.java.net/17/) is installed on your local computer.
Java

3. Ensure that [MongoDB community server] (https://www.mongodb.com/try/download) and [MongoDB Compass] (https://www.mongodb.com/try/download/tools) is installed.
MongoDB Compass] (https://www.mongodb.com/try/download/tools) is a interface that allows user to interact with the mongodb server in a visual format.

4. Ensure that [Node.js] (https://nodejs.org/en/download/) is installed. 
[Node.js] (https://nodejs.org/en/download/) is the language used to code the Fare System File Display Tool.

5. Ensure that [Python] (https://www.python.org/downloads/) is installed. 
Python will be used to run the AI Chatbot backed code.

## Getting Started

1. Ensure that all the relevant python packages are install on the local computer.
If packages are not installed, use the package manager [pip](https://pip.pypa.io/en/stable/) to install relevant python packages used to run AI-Chatbot Script.

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

2. To run the MongoDB server, open a bash terminal and install all nodejs packages

```bash
npm install
```

All the relevant packages will be automatically downloaded and installed. Afterwards, start the server.

```bash
npm start
```

The server should be hosted on localhost:\\8081

3. To run the Fare System File Display Tool Frontend, open a seperate bash terminal and install all the nodejs packages.

```bash
npm install
```

All the relevant packages will be automatically downloaded and installed. Afterwards, start the server.

```bash
npm start
```

A webpage hosted on localhost:\\8080 will open in the default web browser.



## Usage

## Credits

NUS Business Analytics Capstone Project Sem1AY2021 Team-17

Members:
* Joel Yap
* Tan Xue Hui
* Genevieve Ong
* Tobias Yap
* Mitchell Teh