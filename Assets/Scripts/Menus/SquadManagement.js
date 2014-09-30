#pragma strict

var money : float;

function Start(){

	money = PlayerPrefs.GetFloat("money");

}

function OnGUI() {
	GUI.Box(Rect(10,30,200,30),"Money: "+money+" $");

	if (GUI.Button(Rect(10,70,200,30),"Buy Goblin - 2 $")){
		
	}
	if (GUI.Button(Rect(10,110,200,30),"Main Menu")){
		Application.LoadLevel("MainMenu");
	}
	if (GUI.Button(Rect(10,150,200,30),"START GAME")){
		Application.LoadLevel("Test");
	}
}