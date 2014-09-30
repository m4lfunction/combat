#pragma strict

function OnGUI() {
	if (GUI.Button(Rect(10,70,200,30),"START NEW GAME")){
		Application.LoadLevel("Test");
	}
	if (GUI.Button(Rect(10,110,200,30),"SQUAD MANAGEMENT")){
		Application.LoadLevel("SquadManagement");
	}
}