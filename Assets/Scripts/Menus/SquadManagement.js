#pragma strict

var money : float;
var goblinCounter : int;

function Start(){

	money = PlayerPrefs.GetFloat("money");
	goblinCounter = PlayerPrefs.GetInt("goblinCounter");

}

function OnGUI() {
	GUI.Box(Rect(10,30,200,30),"Money: "+money+" $");
	GUI.Box(Rect(220,30,200,30),"Goblins: "+goblinCounter);

	if (GUI.Button(Rect(10,70,200,30),"Buy Goblin - 2 $")){
		if (money >= 2){
			money -= 2;
			goblinCounter++;
		}
	}
	if (GUI.Button(Rect(10,110,200,30),"Cancel")){
		Application.LoadLevel("MainMenu");
	}
	if (GUI.Button(Rect(10,150,200,30),"Start Game")){
		PlayerPrefs.SetFloat("money", money);
		PlayerPrefs.SetInt("goblinCounter", goblinCounter);
		Application.LoadLevel("ChooseLevel");
	}
}