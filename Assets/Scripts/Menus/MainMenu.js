#pragma strict

function OnGUI() {
	if (GUI.Button(Rect(10,70,200,30),"START NEW GAME")){
		Application.LoadLevel("ChooseHero");
	}
	if (GUI.Button(Rect(10,110,200,30),"Continue")){
		Application.LoadLevel("SquadManagement");
	}
}