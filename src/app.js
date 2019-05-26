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
const MONTH_INDEX = 0;
const INCOME_INDEX = 1;
const COGS_INDEX = 2;
const GROSS_PROFIT_INDEX = 3;
const EXPENSES_INDEX = 4;
const NET_ORDINARY_INCOME_INDEX = 5;
const NET_INCOME_INDEX = 6;

const TOTAL_ROW = 14;



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
        let income = sheet[14][1]
        this.$speech.addT('response.income', {year, income});
        this.ask(this.$speech);

    },

    TotalCOGSIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let cogs = sheet[14][2]
        this.$speech.addT('response.cogs', {year, cogs});
        this.ask(this.$speech);
    },

    TotalGrossProfitIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let gross_profit = sheet[14][3]
        this.$speech.addT('response.gross_profit', {year, gross_profit});
        this.ask(this.$speech);
    },

    TotalExpensesIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let expense = sheet[14][4]
        this.$speech.addT('response.expense', {year, expense});
        this.ask(this.$speech);
    },

    TotalNetIncomeIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "pl");
        let net_income = sheet[14][6]
        this.$speech.addT('response.net_income', {year, net_income});
        this.ask(this.$speech);
    },

    CurrentRatioIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let ratio = sheet[29][1];
        this.$speech.addT('response.current_ratio', {year, ratio});
        this.ask(this.$speech);
    }

    

    
});

module.exports.app = app;
