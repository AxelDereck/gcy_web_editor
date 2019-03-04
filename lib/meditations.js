const moment = require('moment');
const Database = require('./database');
const dbConfig = require('./../config');
const sqlString = require('sqlstring');

var months = moment.months();
var mapMonths = [];
months.forEach((month) => {
    mapMonths[month.substr(0,3)] = month;
});
//console.log(dbConfig);
/*
console.log('Target Host : ' + dbConfig.host);
console.log('Target User : ' + dbConfig.user);
console.log('Target Pwd : ' + dbConfig.password);
console.log('Target DB : ' + dbConfig.database);
*/
//console.log(dbConfig);
var db = new Database( dbConfig );

module.exports = {
    /** Method to edit (update) a specific meditation **/
    editMeditation: function(req, res) {
        console.log("Inside editMeditation : " + req.body);

        /** Retrieving corresponding month **/
        parts = req.params.jour.split('-');
        let day = parts[0];
        let monthName = mapMonths[ parts[1] ];
		let titre = sqlString.escape(req.body.titre);
		let prelude = sqlString.escape(req.body.prelude);
		let message = sqlString.escape(req.body.message);
		let id = sqlString.escape(req.body.id);
		
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>	Prelude : " + prelude);
        /** Updating the meditation **/
        let query_upd_med = "UPDATE meditations SET "
            + " titre = " + titre + ","
            + " prelude = " + prelude + ","
            + " message = " + message + ""
            + " WHERE id=" + id + " ;"; // query database to get the selected  meditation
		let query_upd_med_secure = "UPDATE meditations SET titre = ?, prelude = ?, message = ? WHERE id = ? ;"; // query database to get the selected  meditation
        /*
        console.log('Param Jour : ' + req.body.jour);
        console.log('Param Titre : ' + req.body.titre);
        console.log('Param Jour : ' + req.body.prelude);
        console.log('Param Titre : ' + req.body.message);
        */
        db.query(query_upd_med)
        //db.query(query_upd_med_secure, [titre, prelude, message, id])
            .then(() => {
                /** Displaying the current meditation with corresponding message **/
                //TODO - manage alert message
                //this.showMeditation(req.params.month, req.params.day);
                this.showMeditation({monthName: monthName, day: day, res: res, success: true});
            })
            .catch( err => {
                console.log(err);
                console.log("SQL Executed : "  + query_upd_med);
                this.showMeditation({monthName: monthName, day: day, res: res, error: true});
            });
    },

    /** Method to display a specific meditation **/
    showMeditation: function({monthName, day, res, success, error} = {}) {
        console.log("Inside showMeditation");
        console.log("showMonth : " + monthName);
        var monthInitial = monthName.substring(0, 3);
        var cur_meditation, meditations;
        let query_ls_meds = "SELECT * FROM `meditations` WHERE `jour` LIKE '%-" + monthInitial + "' ORDER BY id ASC"; // query database to get all the players
        let query_sel_med = "SELECT * FROM `meditations` WHERE `jour` LIKE '" + day + "-" + monthInitial + "'"; // query database to get the selected  meditation
        console.log("Query : " + query_ls_meds);
        console.log("Query : " + query_sel_med);

        // execute query for list of meds
        db.query(query_sel_med)
        //db.query(query_ls_meds)
            .then( rows => {
                console.log('Returned lines : ' + rows.length);
                if(rows.length < 1) return new Error('Meditation inexistante !');
                cur_meditation = rows[0];
                return db.query(query_ls_meds);
            }, err => {
                throw err;
            })
            .then( rows => {
                meditations = rows;
                return true;
            }, err => {
                throw err;
            })
            .then( () => {
                console.log('Current meditation : ' + cur_meditation.jour);
                res.render('index.ejs', {
                    title: "Welcome to Editor | View Meditations of " + monthName,
                    data: {
                        cur_meditation: cur_meditation,
                        meditations: meditations,
                        months: months ,
                        success: success || false,
                        error: error || false
                    }
                });
            })
            .catch( err => {
                console.log(err);
            });
    }
};
