#pragma strict

var quest1o1 : boolean = false;
var cubeCounter : int = 0;

function OnGUI () {
	GUI.Box(Rect(10,30,200,30),"Questlog");
	if (quest1o1 == false){
		GUI.Box(Rect(10,70,200,30),"destroy rebel supply crates");
		GUI.Box(Rect(220,70,50,30),cubeCounter+"/28");
	}
	
}

function Update(){
	if (quest1o1 == false){
		cubeCounter = 0;
		var enemyCheck = GameObject in GameObject.FindGameObjectsWithTag("Enemy");
		for(var enemy : GameObject in GameObject.FindGameObjectsWithTag("Enemy")){
			if(enemy.name == "Cube"){
        		cubeCounter++;
    		}
		}
		if (enemyCheck == null){
			quest1o1 = true;
		}
	}
		
	if (quest1o1 == true){
		EndLevel();
	}
}

function EndLevel(){
	Application.LoadLevel("SquadManagement");
}