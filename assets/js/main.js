// Variablen 
const checkZweitesEinkommen = document.getElementById("checkZweitesEinkommen");
const optionalDiv = document.getElementById("optionalDiv");
const einkommenEins = document.getElementById("einkommenEins");
const einkommenZwei = document.getElementById("einkommenZwei");
const submitForm = document.querySelector("form");
let jahr, gehalt, est, faktor, steuer, steuersatz;
let grenze1, grenze2, grenze3, grenze4, fall2Var1, fall2Var2, fall3Var1, fall3Var2, fall4Var1, fall5Var1;

//Zweites Einkommen toggle ein-/ausblenden
checkZweitesEinkommen.addEventListener("change", () => {
    switch (checkZweitesEinkommen.checked) {
        case true:
            optionalDiv.classList.add("optionalDiv");
            return;
        case false:
            optionalDiv.classList.remove("optionalDiv");
    }
});

//Unterschiedliche Werte je Jahr speichern
submitForm.addEventListener("change", getYearlyVariables = () => {
    
    jahr = document.querySelector('input[name="jahr"]:checked').value;

    switch (jahr) {
        case "2022":
            console.log(jahr);
            grenze1 = 10347;
            grenze2 = 14926;
            grenze3 = 58596;
            grenze4 = 277825;
            fall2Var1 = 1088.67;
            fall3Var1 = 206.43;
            fall3Var2 = 869.32;
            fall4Var1 = 9336.45;
            fall5Var1 = 17671.20;
            return;

        case "2021":
            console.log(jahr);
            grenze1 = 9744;
            grenze2 = 14753;
            grenze3 = 57918;
            grenze4 = 274612;
            fall2Var1 = 995.21;
            fall3Var1 = 208.85;
            fall3Var2 = 950.96;
            fall4Var1 = 9136.63;
            fall5Var1 = 17374.99;
            return;

        case "2020":
            console.log(jahr);
            grenze1 = 9408;
            grenze2 = 14532;
            grenze3 = 57051;
            grenze4 = 270500;
            fall2Var1 = 972.87;
            fall3Var1 = 212.02;
            fall3Var2 = 972.79;
            fall4Var1 = 8963.74;
            fall5Var1 = 17078.74;
    }
});


//Switch ob ein Gehalt oder zwei, berechnet Gehalt, gibt den Wert an die Est Funnktion weiter und gibt anschließend das Ergebnis aus (bei zwei Einkommen wird die Steuer noch verdoppelt)
submitForm.addEventListener("change", calculateGehalt = () => {
    switch (checkZweitesEinkommen.checked) {
        case true:
            gehalt = ((parseInt(einkommenEins.value) + parseInt(einkommenZwei.value)) / 2);

            calculateEst();

            steuer = steuer * 2;
            steuersatz = steuer * 100 / gehalt;

            document.getElementById('endsteuer').innerHTML = (isNaN(steuer)) ? '0,00€' : `${steuer.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`;

            steuersatz = `${steuersatz.toFixed(2)} %`;
            document.getElementById('endgehalt').innerHTML = (steuersatz != "NaN %") ? steuersatz.replace(".", ",") :'0,00%';

            console.log("Ergebnisbereich formatiert: " + steuer + " und " + steuersatz);

            return;

        case false:
            gehalt = parseInt(einkommenEins.value);

            calculateEst()

            steuersatz = steuer * 100 / gehalt;

            document.getElementById('endsteuer').innerHTML = (isNaN(steuer)) ? '0,00€' : `${steuer.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`;

            steuersatz = `${steuersatz.toFixed(2)} %`;
            document.getElementById('endgehalt').innerHTML = (steuersatz != "NaN %") ? steuersatz.replace(".", ",") :'0,00%';

            console.log("Ergebnisbereich formatiert: " + steuer + " und " + steuersatz);
    }
});


//Wird von der Gehaltsfunktion aufgerufen und berechnet dann die Est, gibt das Ergebnis anschließend wieder an die Gehaltsfunktion zurück
function calculateEst() {
    switch (true) {
        case (gehalt <= grenze1):
            console.log("============ Berechnung unter Grundfreibetrag");
            
            steuer = 0;
            steuersatz = steuer * 100 / gehalt;

            return;

        case (gehalt <= grenze2):
            console.log("============ Berechnung unter " + grenze2);
            
            faktor = (gehalt - grenze1) / 10000;
            steuer = (fall2Var1 * faktor + 1400) * faktor;

            return;

        case (gehalt <= grenze3):
            console.log("============ Berechnung unter " + grenze3);
            
            faktor = (gehalt - grenze2) / 10000;
            steuer = (fall3Var1 * faktor + 2397) * faktor + fall3Var2;

            return;
    
        case (gehalt <= grenze4):
            console.log("============ Berechnung unter " + grenze4);
            
            steuer = 0.42 * gehalt - fall4Var1;
            steuersatz = steuer * 100 / gehalt;

            return;

        case (gehalt > grenze4):
            console.log("============ Berechnung ab " + grenze4);
            
            steuer = 0.45 * gehalt - fall5Var1;
            steuersatz = steuer * 100 / gehalt;
    }
};