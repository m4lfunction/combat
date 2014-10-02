#pragma strict

function OnGUI() {
	if (GUI.Button(Rect(10,70,200,30),"Test")){
		Application.LoadLevel("Test");
	}
	if (GUI.Button(Rect(10,110,200,30),"Level 1")){
		//Application.LoadLevel("Level1");
	}
}