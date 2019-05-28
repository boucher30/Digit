'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { GoogleSheetsCMS } = require('jovo-cms-googlesheets');

const app = new App();
/*
Dictionary to hold all constants from the spreadsheet
*/
let indexes = {
    //PROFIT & LOSSES CONSTANTS
    TOTALS_ROW: 14,
    MONTH_COLUMN: 0,
    INCOME_COLUMN: 1,
    COGS_COLUMN : 2,
    GROSS_PROFIT_COLUMN : 3, 
    EXPENSES_COLUMN : 4, 
    NET_ORDINARY_INCOME_COLUMN : 5, 
    NET_INCOME_COLUMN : 6,
    // BALANCE SHEET CONSTANTS
    TOTAL_CHECKING_SAVINGS : 0,
    TOTAL_ACCOUNTS_RECEIVABLE : 1, 
    INVENTORY_ASSEST : 2, 
    FIXED_ASSEST_SC : 3, 
    TOTAL_CURRENT_ASSESTS : 5, 
    TOTAL_FIXED_ASSESTS : 6, 
    TOTAL_OTHER_ASSESTS : 7, 
    TOTAL_ASSESTS : 8, 
    TOTAL_ACCOUNTS_PAYABLE : 10, 
    TOTAL_CREDIT_CARDS : 11, 
    TOTAL_OTHER_CURRENT_LIABILITES : 12,
    TOTAL_CURRENT_LIABILITIES : 14, 
    TOTAL_LONG_TERM_LIABILITIES : 15,
    ADDITIONAL_PAID_IN_CAPITAL : 17,
    CAPITAL_STOCK : 18,
    OWNERS_CAPITAL : 19, 
    NET_INCOME : 21,
    TOTAL_LIABILITIES : 23,
    TOTAL_EQUITY : 24,
    TOTAL_LIABILITIES_AND_EQUITY : 26,
    CURRENT_RATIO : 29,
    NET_WORKING_CAPITAL: 30,
    WORKING_CAPITAL_RATIO : 31,
    QUICK_RATIO : 32,
    DEBT_EQUITY_RATIO : 33
};

app.use(
    new Alexa(),
    new GoogleSheetsCMS(),
    new JovoDebugger(),
    new FileDb()
);


function Quarter(startIndex, endIndex){
    this.startIndex = startIndex;
    this.endIndex = endIndex;
}

function chooseQuarter(quarter){
    var q;
    switch(quarter){
        case 1:
            q = new Quarter(1,3);
            break;
        case 2:
            q = new Quarter(4,6);
            break;
        case 3:
            q = new Quarter(7,9);  
            break;
        case 4:
            q = new Quarter(10,12);
            break;
    }
    return q;
}

function getSheet(year, type){
    var sheet;
    if(type == "pl"){
        switch(year){
            case 2018:
                sheet = app.$cms.pl_18.slice();
                break;
            case 2017:
                sheet = app.$cms.pl_17.slice();
                break;
            case 2016:
                sheet = app.$cms.pl_16.slice();      
                break;
        }
    }
    else{
        switch(year){
            case 2018:
                sheet = app.$cms.bs_18.slice();
                break;
            case 2017:
                sheet = app.$cms.bs_17.slice();
                break;
            case 2016:
                sheet = app.$cms.bs_16.slice();      
                break;
        }
    }
    return sheet;
}



app.setHandler({


    LAUNCH() {
        this.$speech.addT('response.greeting');
        this.ask(this.$speech);
    },


    TotalIncomeIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let income = sheet[indexes.TOTALS_ROW][indexes.INCOME_COLUMN]
        this.$speech.addT('response.income', {year, income});
        this.ask(this.$speech);

    },

    TotalCOGSIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let cogs = sheet[indexes.TOTALS_ROW][indexes.COGS_COLUMN]
        this.$speech.addT('response.cogs', {year, cogs});
        this.ask(this.$speech);
    },

    TotalGrossProfitIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let gross_profit = sheet[indexes.TOTALS_ROW][indexes.GROSS_PROFIT_COLUMN]
        this.$speech.addT('response.gross_profit', {year, gross_profit});
        this.ask(this.$speech);
    },

    TotalExpensesIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let expense = sheet[indexes.TOTALS_ROW][indexes.EXPENSES_COLUMN]
        this.$speech.addT('response.expense', {year, expense});
        this.ask(this.$speech);
    },

    TotalNOIIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let noi = sheet[indexes.TOTALS_ROW][indexes.NET_ORDINARY_INCOME_COLUMN]
        this.$speech.addT('response.noi', {year, noi});
        this.ask(this.$speech);
    },

    TotalNetIncomeIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let net_income = sheet[indexes.TOTALS_ROW][indexes.NET_INCOME_COLUMN]
        this.$speech.addT('response.net_income', {year, net_income});
        this.ask(this.$speech);
    },

    CurrentRatioIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let ratio = sheet[indexes.TOTALS_ROW][indexes.CURRENT_RATIO];
        this.$speech.addT('response.current_ratio', {year, ratio});
        this.ask(this.$speech);
    }

    

    
});

module.exports.app = app;
