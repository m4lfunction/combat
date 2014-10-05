#pragma strict

function OnGUI() {
	if (GUI.Button(Rect(10,70,200,30),"Test")){
		Application.LoadLevel("Test");
	}
	if (GUI.Button(Rect(10,110,200,30),"Test 1")){
		Application.LoadLevel("Test1");
	}
	if (GUI.Button(Rect(10,150,200,30),"Test 2")){
		Application.LoadLevel("Test2");
	}
	
	if (GUI.Button(Rect(220,70,200,30),"The Forest")){
		Application.LoadLevel("TheForest");
	}
}