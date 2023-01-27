// Variablen 
const checkZweitesEinkommen = document.getElementById("checkZweitesEinkommen");
const optionalDiv = document.getElementById("optionalDiv");
const einkommenEins = document.getElementById("einkommenEins");
const einkommenZwei = document.getElementById("einkommenZwei");
const submitForm = document.querySelector("form");
let gehalt, est, faktor, steuer, steuersatz;

checkZweitesEinkommen.addEventListener("change", () => {
    switch (checkZweitesEinkommen.checked) {
        case true:
            optionalDiv.classList.add("optionalDiv");
            return;
        case false:
            optionalDiv.classList.remove("optionalDiv");
    }
});

submitForm.addEventListener("change", calculateGehalt = () => {
//zweites Einkommen    const nettoBrutto = document.getElementById('aufschlagen').checked;
//welches Jahr    const steuersatz = parseFloat(document.querySelector('input[name="steuersatz"]:checked').value);
    switch (checkZweitesEinkommen.checked) {
        case true:
            gehalt = ((parseInt(einkommenEins.value) + parseInt(einkommenZwei.value)) / 2);
            console.log(gehalt);

            calculateEst();

            steuer = steuer * 2;
            steuersatz = steuer * 100 / gehalt;

            document.getElementById('endsteuer').innerHTML = `${steuer.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`;

            steuersatz = `${steuersatz.toFixed(2)} %`;
            document.getElementById('endgehalt').innerHTML = steuersatz.replace(".", ",");

            console.log("Ergebnisbereich formatiert: " + steuer + " und " + steuersatz);

            return;

        case false:
            gehalt = parseInt(einkommenEins.value);
            console.log(gehalt);
            calculateEst();

            steuersatz = steuer * 100 / gehalt;

            document.getElementById('endsteuer').innerHTML = `${steuer.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}`;

            steuersatz = `${steuersatz.toFixed(2)} %`;
            document.getElementById('endgehalt').innerHTML = steuersatz.replace(".", ",");

            console.log("Ergebnisbereich formatiert: " + steuer + " und " + steuersatz);
    }
});

function calculateEst() {
    switch (true) {
        case (gehalt <= 10347):
            console.log("============ Berechnung unter Grundfreibetrag");
            
            steuer = 0;
            steuersatz = steuer * 100 / gehalt;

            return;

        case (gehalt <= 14926):
            console.log("============ Berechnung unter 14 926€");
            
            faktor = (gehalt - 10347) / 10000;
            steuer = (1088.67 * faktor + 1400) * faktor;

            return;

        case (gehalt <= 58596):
            console.log("============ Berechnung unter 58 596€");
            
            faktor = (gehalt - 14926) / 10000;
            steuer = (206.43 * faktor + 2397) * faktor + 869.32;

            return;
    
        case (gehalt <= 277825):
            console.log("============ Berechnung unter 277 825€");
            
            steuer = 0.42 * gehalt - 9336.45;
            steuersatz = steuer * 100 / gehalt;

            return;

        case (gehalt > 277825):
            console.log("============ Berechnung ab 277 826€");
            
            steuer = 0.45 * gehalt - 17671.20;
            steuersatz = steuer * 100 / gehalt;

            return;
    }
};

