//On vérifie que le DOM est bien chargé
document.addEventListener("DOMContentLoaded",()=>{init();}
,false);

function init(){
	//
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
	
	const send = document.getElementById("submit");
	//
	send.addEventListener("click",()=>{
		const semaine = document.getElementById("semaine").value;
		const vapUn = document.getElementById("vap1").value;
		const vapDeux = document.getElementById("vap2").value;
		const vapTrois = document.getElementById("vap3").value;
		const vi = document.getElementById("vi").value;
		const result = document.getElementById("output_part");
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
					let totalVap = 0;
					let totalVapv = 0;
					var vex = 199000000;
					while(i<tableau.length && cptSemaine<=25 && tableau[i][j] !== "Decembre"){
						if(cptSemaine === 5){
							let tableCopy = tableau[i][1].slice(0);
							tableCopy.sort(function(a, b){return b-a});
							while(j<tableCopy.length){							
								if(vap2>=tableCopy[j]){
									vap2 = tableCopy[j];
									totalVap += vap2;
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
							totalVap += vap2;
						}												
							console.log(tableau[i][0]+' Volume : '+vap2);						
						vap2 = (parseInt(vapUn) + parseInt(vapDeux) + parseInt(vapTrois))/3;
						j = 0;					
						i++;
						cptSemaine += 5;
						//Vapr = parseInt(totalVap)*604800*4 
						//Vex = 199000000
						//Vru = 5 808 420 000 - Vapv
						//Vapv = Somme des vap des autres mois
						//Vcu = (604800*(20-parseInt(semaine)+1)
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
						var vo = parseInt(vi) + (parseInt(totalVap)*604800*4) - (604800*(20-parseInt(semaine)+1));
						var vrd = vo - vex;//Add Vapv
						requestAnimationFrame(()=>{
							document.getElementById("vo").innerHTML = vo;
						});
					}
					//On calcul Vapv 
					let vapv = 0;
					i = 0;
					j = 0;
					while(i<=tableau.length && tableau[i][j] !== "Juillet" && tableau[i][j] !== "Aout" 
						&& tableau[i][j] !== "Septembre" && tableau[i][j] !== "Octobre" && tableau[i][j] !== "Novembre"){
						vapv += tableau[i][1][vapPosition];
						i++;
					}
					vrd += vapv;
					requestAnimationFrame(()=>{
							document.getElementById("vapv").innerHTML = vapv;
						});
					requestAnimationFrame(()=>{
							document.getElementById("vapr").innerHTML = parseInt(totalVap)*604800*4;
						});
					//
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
}