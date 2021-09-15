const express = require('express');
const sql = require('mssql');

const router = express.Router();

//router.get('/:userId', async (req, res) => {
router.get('/', async (req, res) => {

    // const { userId } = req.params;

    // console.log('UserID :' +userId);

    // var request = new sql.Request();

    // try {

        // request.query(`select * from TimeEntry where userId = ${userId}`, function (err, recordset) {

        //     if (err) console.log(err)

        //     res.send(recordset);

        // });

    // } catch(err) {

    //     console.log(err);

    // }

    try {
        let timeEntry = {
            "date": "",
            "hours": 0,
            "description": "",
            "billable": false,
            "projectKey": ""
        };

        timeEntry.date = "13/09/2021";
        timeEntry.hours = 8;
        timeEntry.description = "Moodys FE development";
        timeEntry.billable = true;
        timeEntry.projectKey = "moodys123";

        return res.status(200).json({ success: true, msg: "Timesheet Details", data: timeEntry });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, msg: "Error Occured" });
    }
});

router.post('/add', async (req, res) => {

    try {

        let timeEntryList = [];
        const date = new Date();

        timeEntryList = req.body.timeEntryList;

        console.log(timeEntryList);

        // var request = new sql.Request();

        var config = {
            user: process.env.DB_USER || "sas",
            password: process.env.DB_PWD || "Sharepoint@1234",
            database: process.env.DB_NAME || "sharepoint-db",
            server: 'homefront-db.database.windows.net',                 
        };

        if (timeEntryList.length != 0) {

            console.log('Length is not zero !!');

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();
                   
                timeEntryList.forEach(function (item, index) {
                    console.log(item, index);
    
                    request.query(`INSERT INTO dbo.TimeEntry (
                        
                        TimeDescription
                    )
                    VALUES
                        (
                            "himanshu"
                        )`, function (err, recordset) {
    
                        if (err) console.log(err)
            
                    });    
                });
            });

            // timeEntryList.forEach(function (item, index) {
            //     console.log(item, index);

            //     request.query(`INSERT INTO dbo.TimeEntry (
            //         TimeEntryDate,
            //         TimeHours,
            //         TimeDescription,
            //         Billable,
            //         ProjectResourceKey
            //     )
            //     VALUES
            //         (
            //             ${item.TimeEntryDate},
            //             ${item.TimeHours},
            //             ${item.TimeDescription},
            //             ${item.Billable},
            //             ${item.ProjectResourceKey}
            //         )`, function (err, recordset) {

            //         if (err) console.log(err)
        
            //     });


            // });

            return res.status(200).json({success: true, msg: "Timesheet Added"});

        } else {
            return res.status(200).json({success: false, msg: "Warning: Empty Data !!"});
        }

    } catch (err) {

        console.log(err);

    }

    // try{

    //     let timeEntry = {
    //         "date":"",
    //         "hours":0,
    //         "description":"",
    //         "billable":false,
    //         "projectKey":""
    //     };

    //     timeEntry.date = "13/09/2021";
    //     timeEntry.hours = 8;
    //     timeEntry.description = "Moodys FE development";
    //     timeEntry.billable = true;
    //     timeEntry.projectKey = "moodys123";

    //     return res.status(200).json({success: true, msg: "Timesheet Added", data: timeEntry});
    // }catch(err){
    //     console.log(err);
    //     return res.status(500).json({success: false, msg: "Error Occured"});
    // }
});


module.exports = router;

