#pragma strict

// Kill Tyrants variables
var killTyrants : boolean = false;
var killTyrantsLogEntry : String = "Kill all Tyrants!";
private var killTyrantsPos : float;
private var allTyrantsKilled : boolean = false;
var tyrantCounter : int = 0;
private var maxTyrants : int = 0;

// Kill Cubes variables
var killCubes : boolean = false;
var killCubesLogEntry : String = "Destroy all supply crates!";
private var killCubesPos : float;
private var allCubesKilled : boolean = false;
var cubeCounter : int = 0;
private var maxCubes : int = 0;

function Start () {
	
	var enemyCheck = GameObject in GameObject.FindGameObjectsWithTag("Enemy");
	for(var enemy : GameObject in GameObject.FindGameObjectsWithTag("Enemy")){
		// get number of Tyrants in scene
		if (killTyrants == true){
			if(enemy.name == "Tyrant"){
   				tyrantCounter++;
   				maxTyrants++;
			}
		}
		// get number of Cubes in scene
		if (killCubes == true){
			if(enemy.name == "Cube"){
   				cubeCounter++;
   				maxCubes++;
   			}
   		}
	}
	
	killTyrantsPos = 70;
	killCubesPos = 110;
}

function Update () {
	if (tyrantCounter == 0 || killTyrants == false){
		if(allTyrantsKilled == false){
			killCubesPos -= 40;
			allTyrantsKilled = true;
		}
	}
	if (cubeCounter == 0 || killCubes == false){
		allCubesKilled = true;
	}
	if(allTyrantsKilled == true && allCubesKilled == true){
		EndLevel();
	}
}

function EndLevel(){
	PlayerPrefs.Save();
	Application.LoadLevel("SquadManagement");
}

function OnGUI () {
	GUI.Box(Rect(10,30,200,30),"Questlog");
	if (allTyrantsKilled == false){
		GUI.Box(Rect(10,killTyrantsPos,200,30),killTyrantsLogEntry);
		GUI.Box(Rect(220,killTyrantsPos,50,30),tyrantCounter+"/"+maxTyrants);
	}
	if (allCubesKilled == false){
		GUI.Box(Rect(10,killCubesPos,200,30),killCubesLogEntry);
		GUI.Box(Rect(220,killCubesPos,50,30),cubeCounter+"/"+maxCubes);
	}
}