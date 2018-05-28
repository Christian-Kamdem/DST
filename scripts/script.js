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
	
	const send = document.getElementById("submit");
	//
	send.addEventListener("click",()=>{
		const semaine = document.getElementById("semaine").value;
		const vap = document.getElementById("vap").value;
		const vir = document.getElementById("vir").value;
		const result = document.getElementById("result");
		//On vériffie que tout les champs sont non vides
		if(semaine === "" || vap === "" || vir === ""){
			alert("Veuillez remplir tout les champs!");	
		}else{
			//On vérifie la validité des valeurs entrées
			if(Number.isInteger(semaine)){
				alert("Erreur sur le type de valeur entree!");
				}else{
					let i = monthNumber(semaine)[0]-1;
					let j = 0;
					let cptSemaine = 5;
					let vap2 = vap;
					while(i<tableau.length && cptSemaine<=20){
						tableau[i][1].sort(function(a, b){return b-a});
						while(j<tableau[i][1].length){							
							if(vap2>tableau[i][1][j]){
								vap2 = tableau[i][1][j];
								break;
							}
							j++;
						}console.log(tableau[i][0]+' Volume : '+vap2);						
						vap2 = vap;
						j = 0;
						//console.log(tableau[i]+' Vap : '+vap);						
						i++;
						cptSemaine += 5; 
					}
				}
		}		
	},false);
function monthNumber(semaine){
	if(semaine>=1 && semaine<5){
		//Décembre
		return [1,"Decembre"];
	}else if(semaine>=5 && semaine<9){
		//Janvier
		return [2,"Janvier"];
	}else if(semaine>=9 && semaine<13){
		//Février
		return [3,"Fevrier"];
	}else if(semaine>=13 && semaine<17){
		//Mars
		return [4,"Mars"];
	}else if(semaine>=17 && semaine<21){
		//Avril
		return [5,"Avril"];
	}else if(semaine>=21 && semaine<25){
		//Mai
		return [6,"Mai"];
	}else if(semaine>=25 && semaine<30){
		//Juin
		return [7,"Juin"];
	}else if(semaine>=30 && semaine<34){
		//Juillet
		return [8,"Juillet"];
	}else if(semaine>=34 && semaine<38){
		//Aout
		return [9,"Aout"];
	}else if(semaine>=38 && semaine<42){
		//Septembre
		return [10,"Septembre"];
	}else if(semaine>=42 && semaine<46){
		//Octobre
		return [11,"Octobre"];
	}else if(semaine>=46 && semaine<50){
		//Novembre
		return [12,"Novembre"];
	}
}
}