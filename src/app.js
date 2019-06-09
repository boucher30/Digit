'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');
const { GoogleSheetsCMS } = require('jovo-cms-googlesheets');
const rp = require('request-promise');

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

function getMonth(month){
    var value;
    switch(month){
        case 'january': 
            value = 1;
            break;
        case 'february': 
            value = 2;
            break;
        case 'march': 
            value = 3;
            break;
        case 'april': 
            value = 4;
            break;
        case 'may': 
            value = 5;
            break;
        case 'june': 
            value = 6;
            break;
        case 'july': 
            value = 7;
            break;
        case 'august': 
            value = 8;
            break;
        case 'september': 
            value = 9;
            break;
        case 'october': 
            value = 10;
            break;
        case 'november': 
            value = 11;
            break;
        case 'december': 
            value = 12;
            break;
    }
    return value;
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
            default:
                // app.$alexaSkill.ask("hello");
               // app.ask("The year " + year + " currently doesn't have any stored data. Please choose from 2016, 2017, or 2018.");
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
            default:
                //app.$alexaSkill.ask("hello");
                //app.ask("The year " + year + " currently doesn't have any stored data. Please choose from 2016, 2017, or 2018.");
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
        let month = this.$inputs.month.value;
        var sheet = getSheet(year, "pl");
        let income;
        if(month){
            let monthRow = getMonth(month);
            income = sheet[monthRow][indexes.INCOME_COLUMN];
        }
        else{
            income = sheet[indexes.TOTALS_ROW][indexes.INCOME_COLUMN];
        }
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
    },

    AdditionalPaidInCapitalIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let apic = sheet[indexes.ADDITIONAL_PAID_IN_CAPITAL][1]
        this.$speech.addT('response.apic', {year, apic});
        this.ask(this.$speech);

    },

    CapitalStockIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let cap_stock = sheet[indexes.CAPITAL_STOCK][1]
        this.$speech.addT('response.cap_stock', {year, cap_stock});
        this.ask(this.$speech);

    },

    OwnersCapitalIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let own_cap = sheet[indexes.OWNERS_CAPITAL][1]
        this.$speech.addT('response.own_cap', {year, own_cap});
        this.ask(this.$speech);

    },

    TotalLiabilitiesIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let tot_liab = sheet[indexes.TOTAL_LIABILITIES][1]
        this.$speech.addT('response.tot_liab', {year, tot_liab});
        this.ask(this.$speech);

    },

    TotalEquityIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let tot_equ = sheet[indexes.TOTAL_EQUITY][1]
        this.$speech.addT('response.tot_equ', {year, tot_equ});
        this.ask(this.$speech);

    },

    TotalEquityAndLiabilitesIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let tot_equ_and_liab = sheet[indexes.TOTAL_LIABILITIES_AND_EQUITY][1]
        this.$speech.addT('response.tot_equ_and_liab', {year, tot_equ_and_liab});
        this.ask(this.$speech);

    },

    NetWorkingCapitalIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let network_cap = sheet[indexes.NET_WORKING_CAPITAL][1]
        this.$speech.addT('response.network_cap', {year, network_cap});
        this.ask(this.$speech);

    },

    QuickRatioIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let quick_ratio = sheet[indexes.QUICK_RATIO][1]
        this.$speech.addT('response.quick_ratio', {year, quick_ratio});
        this.ask(this.$speech);

    },

    WorkingCapitalRatioIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let work_cap_ratio = sheet[indexes.WORKING_CAPITAL_RATIO][1]
        this.$speech.addT('response.work_cap_ratio', {year, work_cap_ratio});
        this.ask(this.$speech);

    },

    DebtAndEquityRatioIntent(){
        let year = Number(this.$inputs.year.value);
        var sheet = getSheet(year, "bs");
        let debt_equ_ratio = sheet[indexes.DEBT_EQUITY_RATIO][1]
        this.$speech.addT('response.debt_equ_ratio', {year, debt_equ_ratio});
        this.ask(this.$speech);

    },

    Unhandled(){
        this.ask("I didn't catch that, please say it again.")
    }

    
});

module.exports.app = app;
