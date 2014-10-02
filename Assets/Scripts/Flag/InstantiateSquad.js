#pragma strict

var golemBase : GameObject;

var goblinBase : GameObject;
private var goblinCounter : int = 0;

function Start () {
	if (PlayerPrefs.GetString("Hero") == "Golem"){
		var golem = Instantiate(golemBase, transform.position, transform.rotation);
	}
}

function Update () {
	if (goblinCounter < PlayerPrefs.GetInt("goblinCounter")){
		var goblin = Instantiate(goblinBase, transform.position, transform.rotation);
		goblinCounter++;
	}
}