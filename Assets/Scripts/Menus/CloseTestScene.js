#pragma strict

function OnGUI() {
	if (GUI.Button(Rect(10,70,200,30),"MAIN MENU")){
		Application.LoadLevel("MainMenu");
	}
}