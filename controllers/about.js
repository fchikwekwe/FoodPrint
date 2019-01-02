/*
* About
*/

module.exports = (app) => {
    // Why use FoodPrint?
    app.get('/whyfoodprint', (req, res) => {
        res.redirect('https://medium.com/@faith.chikwekwe/foodprint-carbon-tracking-for-your-eating-habits-7ddf624f8859');
    });

    // What is CO2e?
    app.get('/whatCO2e', (req, res) => {
        res.redirect('https://ecometrica.com/white-papers/greenhouse-gases-co2-co2e-and-carbon-what-do-all-these-terms-mean');
    });

    // Other Resources
    app.get('/resources', (req, res) => {
        res.redirect('http://css.umich.edu/factsheets/carbon-footprint-factsheet');
    });
};
