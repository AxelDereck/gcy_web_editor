const moment = require('moment');
const meditations = require('./../lib/meditations');

var months = [];
moment.months().forEach((month) => {
    var key = month.substr(0, 3);
    months[key] = month;
});


module.exports = {
    getIndex: (req, res) => {
        meditations.showMeditation({monthName: 'January', day: '1', res: res});
    },

    showMonth: (req, res) => {
        meditations.showMeditation({monthName: req.params.month, day: '1', res: res});
    },

    showMeditation: (req, res) => {
        meditations.showMeditation({monthName: req.params.month, day: req.params.day, res: res});
    },

    showMeditationOk: (req, res) => {
        meditations.showMeditation({monthName: req.params.month, day: req.params.day, res: res, success: true});
    },

    showMeditationKo: (req, res) => {
        meditations.showMeditation({monthName: req.params.month, day: req.params.day, res: res, error: true});
    },

    showMeditationByJour: (req, res) => {
        parts = req.params.jour.split('-');
        var day = parts[0];
        var monthName = parts[1];
        console.log('In showMeditationByJour - day : ' + day + ' monthName : ' + monthName);
        meditations.showMeditation({monthName: monthName, day: day, res: res});
    },

    editMeditation: (req, res) => {
        /*
        var parts = req.params.jour.split('-');
        var monthName = months[parts[1]];
        */
        console.log('### Inside editMeditation from index.js >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log('Body : ' + req.body);
        console.log('Params : ' + req.params);
        console.log('Param Jour : ' + req.body.jour);
        console.log('Param Titre : ' + req.body.titre);
        meditations.editMeditation(req, res);
        //meditations.showMeditation({monthName: monthName, day: parts[0], res: res});
    },
};
