// Set up functions for chatbot to work with CRUD operations

const {spawn} = require('child_process')
const path = require('path');

exports.getModel = (req, res) => {
      try {
          console.log(req.body);
          const python = spawn('python3', [process.cwd() + '/nlp-model/chatbot_query.py', req.body.query])
          // var modelOutput = null;
          python.stdout.on('data', function (data) {            
            const modelOutput = JSON.parse(data);
            console.log("sending output...")
            res.send(modelOutput);
            console.log("done!")
            // modelOutput = data;
            // console.log(data.toString('utf-8'));
          });
          python.stderr.on('data', function(data) {
            console.log("There is an error!");
            console.log(Buffer.from(data, 'utf-8').toString());
          })
          // console.log(modelOutput)
          // in close event we are sure that stream is from child process is closed
          python.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
          });
        }
      catch(err) {
        console.log(err);
        reject('failed to load python model');
      }
};
