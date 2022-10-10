const sendCountry = require('./services/sendCountry');

class ManagerCron {
    constructor(){
        this.jobs = [sendCountry]
    };

    run(){
        this.jobs.forEach(job => job.start());
    };
};

module.exports = new ManagerCron()