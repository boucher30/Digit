// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
    logging: true,
 
    intentMap: {
       'AMAZON.StopIntent': 'END',
    },

    cms: {
        GoogleSheetsCMS: {
            spreadsheetId: '1bBWdgTgUz7CJUMqhaLPZTWiVXuAwWqhcKYScr0LaAys',
            credentialsFile: './credentials/credentials.json',
            sheets: [
                {
                    name: 'pl_16',
                    position: 1,
                    range: 'A:Z',
               
                },
                {
                    name: 'pl_17',
                    position: 2,
                    range: 'A:Z',
                  
                },
                {
                    name: 'pl_18',
                    position: 3,
                    range: 'A:Z',
                  
                },
                {
                    name: 'bs_16',
                    position: 4,
                    range: 'A:Z',
                 
                },
                {
                    name: 'bs_17',
                    position: 5,
                    range: 'A:Z',
           
                },
                {
                    name: 'bs_18',
                    position: 6,
                    range: 'A:Z',
               
                },
                {
                    name: 'responses',
                    type: 'Responses',
                    position: 7,
                    range: 'A:Z',
                },
            ]
        }
    },
 
    db: {
         FileDb: {
             pathToFile: '../db/db.json',
         }
     },
 };
 