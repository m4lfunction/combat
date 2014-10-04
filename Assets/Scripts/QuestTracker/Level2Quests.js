#pragma strict

var quest1o1 : boolean = false;
var tyrantCounter : int = 0;
var maxTyrants : int;

function OnGUI () {
	GUI.Box(Rect(10,30,200,30),"Questlog");
	if (quest1o1 == false){
		GUI.Box(Rect(10,70,200,30),"kill all Tyrants");
		GUI.Box(Rect(220,70,50,30),tyrantCounter+"/"+maxTyrants);
	}
	
}

function Start(){
	if (quest1o1 == false){
		tyrantCounter = 0;
		var enemyCheck = GameObject in GameObject.FindGameObjectsWithTag("Enemy");
		for(var enemy : GameObject in GameObject.FindGameObjectsWithTag("Enemy")){
			if(enemy.name == "Tyrant"){
       			tyrantCounter++;
       			maxTyrants++;
   			}
		}
	}
}

function Update(){
	if (tyrantCounter == 0){
		quest1o1 = true;
	}
		
	if (quest1o1 == true){
		EndLevel();
	}
}

function EndLevel(){
	PlayerPrefs.Save();
	Application.LoadLevel("SquadManagement");
}