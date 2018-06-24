//On vérifie que le DOM est bien chargé
document.addEventListener("DOMContentLoaded",()=>{init();}
,false);

function init(){
	
	var tableau = [
		["Janvier",[19,36,9,56,68,53,28,143]],
		["Fevrier",[9,16,4,29,39,35,31,112]],
		["Mars",[1,2,1,11,21,26,36,89]],
		["Avril",[2,6,5,21,32,38,30,111]],
		["Mai",[15,37,18,90,88,63,18,200]],
		["Juin",[82,108,25,158,171,88,18,334]],
		["Juillet",[206,238,32,334,339,124,37,565]],
		["Aout",[210,403,39,552,541,198,39,807]],
		["Septembre",[462,505,54,706,684,202,66,1080]],
		["Octobre",[355,455,57,602,610,197,72,929]],
		["Novembre",[120,171,41,267,274,145,40,441]],
		["Decembre",[46,64,22,104,117,67,36,221]]
	];
	var regime = ["Min","10%","20%","50%","Moy","80%","90%","Max"];
	
	const send = document.getElementById("evaluer");
	//
	send.addEventListener("click",()=>{
		const resultTable = document.getElementById("resultTable");
		const myChart = document.getElementById("myChart");
		const semaine = document.getElementById("semaine").value;
		const vapUn = document.getElementById("vap1").value;
		const vapDeux = document.getElementById("vap2").value;
		const vapTrois = document.getElementById("vap3").value;
		const vi = document.getElementById("vi").value;
		const result = document.getElementById("output_part");
		const pd = document.getElementById("p");
		var puissance = "";
		//On vériffie que tout les champs sont non vides
		if(semaine === "" || vapUn === "" || vapDeux === "" || vapTrois === "" || vi === ""){
			alert("Veuillez remplir tout les champs!");	
		}else{
			//On vérifie la validité des valeurs entrées
			if(Number.isInteger(semaine)){
				alert("Erreur sur le type de valeur entrees!");
				}else{
					let i = monthNumber(semaine)[0]-1;
					let j = 0;
					let cptSemaine = 5;
					let vap2 = (parseInt(vapUn) + parseInt(vapDeux) + parseInt(vapTrois))/3;console.log(vap2);
					var vapPosition = 0;
					var Vev = 0;
					let totalVapv = 0;
					var vex = 199000000;
					while(i<tableau.length && cptSemaine<=25 && tableau[i][j] !== "Decembre"){
						if(cptSemaine === 5){
							let tableCopy = tableau[i][1].slice(0);
							tableCopy.sort(function(a, b){return b-a});
							while(j<tableCopy.length){							
								if(vap2>=tableCopy[j]){
									vap2 = tableCopy[j];
									vapPosition = tableau[i][1].indexOf(vap2);
									console.log(tableau[i][1].indexOf(vap2));
									requestAnimationFrame(()=>{
										document.getElementById("regime").innerHTML = regime[vapPosition];
									});
									break;
							}
							j++;
						}
						}else{
							vap2 = tableau[i][1][vapPosition];
						}												
							console.log(tableau[i][0]+' Volume : '+vap2);						
						vap2 = (parseInt(vapUn) + parseInt(vapDeux) + parseInt(vapTrois))/3;
						j = 0;					
						i++;
						cptSemaine += 5;						
					}
						//Vex = 199000000
						//Vru = 5 808 420 000 - Vapv
						//Vapv = Somme des vap des autres mois
						var vcu = 604800*(20-parseInt(semaine)+1)*60;
						/*
							Si Vrd>=Vru alors
								affiche Optimisation réalisée
							sinon
								Vcd = Vru + Vex - Vapr - Vi
								tarifCentrale = (Vcd-Vcu)*valeurArgent1 //Valeur absolue
								tarifRegularisation = (Vru-Vrd)*valeurArgent2 //Valeur absolue
								  Si(tarifCentrale>tarifRegularisation)
								  	affiche Privilégier la régularisation
								  Sinon
								  	affiche Privilégier la centrale
						*/						
					//On calcul Vapr
					var totalVapr = 0;
					i = 6;
					while(i<=tableau.length && i<11){
						totalVapr += tableau[i][1][vapPosition];
						i++;
					}
					var vapr = parseInt(totalVapr)*604800*4; 
					var vo = parseInt(vi) + parseInt(vapr) - (604800*(20-parseInt(semaine)+1)) - parseInt(Vev);
					var vrd = parseInt(vo) - parseInt(vex);//Add Vapv
						requestAnimationFrame(()=>{
							document.getElementById("vo").innerHTML = vo;
						});
					//On calcul Vapv 
					var vapv = 0;
					i = 0;
					j = 0;
					while(i<=tableau.length && tableau[i][j] !== "Juillet" && tableau[i][j] !== "Aout" 
						&& tableau[i][j] !== "Septembre" && tableau[i][j] !== "Octobre" && tableau[i][j] !== "Novembre"){
						vapv += tableau[i][1][vapPosition];
						i++;
					}
					vapv *= 604800*4;
					vrd -= parseInt(vapv);
					var vru = 6007420000 - parseInt(vapv);
					var vcd = parseInt(vru) + parseInt(vex) - parseInt(vapr) - parseInt(vi) - parseInt(Vev);
					
						if(vrd>=vru){
							document.getElementById("or").innerHTML = "Pas d'action";
						}else{
							if(vcd>=vcu){
								document.getElementById("or").innerHTML = "Completer les "+(parseInt(vru)-parseInt(vrd))+" m3 pour la regularisation";
							/*requestAnimationFrame(()=>{
							document.getElementById("tc").innerHTML = "";
							});
							requestAnimationFrame(()=>{
							document.getElementById("tr").innerHTML = "";
							});*/
							}else{
								puissance = Math.abs((0.92*997*9.9*0.000001*(parseInt(vcu)-parseInt(vcd)))/3800);
								var tarifCentrale = (parseInt(vcd)-parseInt(vcu))*33.33;
								var tarifRegularisation = (parseInt(vru)-parseInt(vrd))*5.787;
								if(tarifCentrale>=tarifRegularisation){
								document.getElementById("or").innerHTML = "Completer "+(parseInt(vcu)-parseInt(vcd))+" m3 par la centrale thermique";
								}else{
								document.getElementById("or").innerHTML = "Fonctionnement de la centrale au debit moyen de 60 m3/s";
								}
								requestAnimationFrame(()=>{
									document.getElementById("tc").innerHTML = tarifCentrale;
		
								});								
								/*requestAnimationFrame(()=>{
									document.getElementById("tr").innerHTML = tarifRegularisation;
								});*/
							}							
													}
					//
					requestAnimationFrame(()=>{
							document.getElementById("vcd").innerHTML = Math.abs(vcd);
						});
					requestAnimationFrame(()=>{
							document.getElementById("vrd").innerHTML = Math.abs(vrd);
						});
					requestAnimationFrame(()=>{
							document.getElementById("vru").innerHTML = Math.abs(vru);
						});
					requestAnimationFrame(()=>{
							document.getElementById("vcu").innerHTML = Math.abs(vcu);
						});
					requestAnimationFrame(()=>{
								
									pd.innerHTML = puissance;
								});
				
					//
					graphs(Math.abs(vru),Math.abs(vrd),Math.abs(vcu),Math.abs(vcd));
				}
		}		
	},false);
function monthNumber(semaine){
if(semaine>=1 && semaine<5){
		//Juillet
		return [7,"Juillet"];
	}else if(semaine>=5 && semaine<10){
		//Aout
		return [8,"Aout"];
	}else if(semaine>=10 && semaine<15){
		//Septembre
		return [9,"Septembre"];
	}else if(semaine>=15 && semaine<20){
		//Octobre
		return [10,"Octobre"];
	}else if(semaine>=20 && semaine<25){
		//Novembre
		return [11,"Novembre"];
	}
}
function graphs(vru,vrd,vcu,vcd){
	//Chart
	var ctx = document.getElementById("myChart").getContext('2d');
	var ctx2 = document.getElementById("myChart2").getContext('2d');
	var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Vru","Vrd"],
        datasets: [{
            label: '',
            data: [vru,vrd],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
	var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["Vcu","Vcd"],
        datasets: [{
            label: '',
            data: [vcu,vcd],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}graphs();
}