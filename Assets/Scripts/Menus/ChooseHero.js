#pragma strict

function Start(){
	PlayerPrefs.SetFloat("money", 25);
	PlayerPrefs.SetInt("goblinCounter", 0);
}

function OnGUI() {
	if (GUI.Button(Rect(10,70,200,30),"Golem")){
		Application.LoadLevel("ChooseLevel");
	}
}