//On vérifie que le DOM est bien chargé
document.addEventListener("DOMContentLoaded",()=>{init();}
,false);

function init(){
	//
	var tableau = [
		{Janvier:[19,36,9,56,68,53,28,143]},
		{Fevrier:[9,16,4,29,39,35,31,112]},
		{Mars:[1,2,1,11,21,26,36,89]},
		{Avril:[2,6,5,21,32,38,30,111]},
		{Mai:[15,37,18,90,88,63,18,200]},
		{Juin:[82,108,25,158,171,88,18,334]},
		{Juillet:[206,238,32,334,339,124,37,565]},
		{Aout:[210,403,39,552,541,198,39,807]},
		{Septembre:[462,505,54,706,684,202,66,1080]},
		{Octobre:[355,455,57,602,610,197,72,929]},
		{Novembre:[120,171,41,267,274,145,40,441]},
		{Decembre:[]}
	];

	const semaine = document.getElementById("semaine");
	const vap = document.getElementById("vap");
	const vir = document.getElementById("vir");
	const send = document.getElementById("submit");
}