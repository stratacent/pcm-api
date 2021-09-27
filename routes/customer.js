const express = require('express');
const sql = require('mssql');

const router = express.Router();


router.get('/', async (req, res) => {

    try {

        var config = {
            user: process.env.DB_USER || "sas",
            password: process.env.DB_PWD || "Sharepoint@1234",
            database: process.env.DB_NAME || "sharepoint-db",
            server: 'homefront-db.database.windows.net',                 
        };

        if (true) {

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();

                request.query(`Select * from Customer`, function (err, recordset) {

                    if (err) console.log(err);

                    res.send(recordset);
        
                });
            });
            //return res.status(200).json({success: true, msg: "Customer Data Added."});

        } else {
            return res.status(200).json({success: false, msg: "Warning: Empty Data !!"});
        }

    } catch (err) {

        console.log(err);

    }

});

router.post('/add', async (req, res) => {

    try {

        let customer = {};
        const date = new Date();

        customer = req.body.customer;

        console.log('customer details: ' + customer);

        var config = {
            user: process.env.DB_USER || "sas",
            password: process.env.DB_PWD || "Sharepoint@1234",
            database: process.env.DB_NAME || "sharepoint-db",
            server: 'homefront-db.database.windows.net',                 
        };

        if (true) {

            sql.connect(config, function (err) {
    
                if (err) {
                    console.log(err);
                }
        
                var request = new sql.Request();
                   
                request.query(`INSERT INTO dbo.Customer (                        
                    CustomerName
                )
                VALUES
                    (
                        "Moodys"
                    )`, function (err, recordset) {

                    if (err) console.log(err)
        
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

            return res.status(200).json({success: true, msg: "Customer Data Added."});

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

