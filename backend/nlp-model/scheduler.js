module.exports = app => {
    const cron = require("node-cron");
    const fs = require("fs");
    const {spawn} = require('child_process')

    // Creating a cron job which runs every day at midnight
    cron.schedule("*0 0 * * *", function() {
        
        try {
            console.log('python', process.cwd() + '/nlp-model/update_tfidf_corpus.py')
            // Mac users change below code to python3
            const python = spawn('python', [process.cwd() + "/nlp-model/update_tfidf_corpus.py"])
            python.stderr.on('data', function(data) {
              console.log("There is an error!");
              console.log(Buffer.from(data, 'utf-8').toString());
            })
            
            // Data to write on file
            let data = `${new Date().toUTCString()} 
            : Ran script\n`;

            // Appending data to logs.txt file
            fs.appendFile("./nlp-model/scheduler-logs.txt", data, function(err) {

            if (err) throw err;

            console.log("Status Logged!");
            });
          }

          catch(err) {
            console.log(err);
          }
    });
}