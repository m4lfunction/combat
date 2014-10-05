#pragma strict

function Start(){
	PlayerPrefs.SetFloat("money", 0);
	PlayerPrefs.SetInt("goblinCounter", 0);
}

function OnGUI() {
	if (GUI.Button(Rect(10,70,200,30),"Golem")){
		PlayerPrefs.SetString("Hero","Golem");
		Application.LoadLevel("ChooseLevel");
	}
	
	if (GUI.Button(Rect(10,110,200,30),"Ancient Spider")){
		PlayerPrefs.SetString("Hero","AncientSpider");
		Application.LoadLevel("ChooseLevel");
	}
}