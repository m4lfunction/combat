#pragma strict

var questTracker : GameObject;
var money : float;

function Start () {
	questTracker = GameObject.Find("QuestTracker");
}

function Update () {
	if (gameObject.GetComponent(Counter).hp <= 0){
		money = PlayerPrefs.GetFloat("money");
		money += 2;
		PlayerPrefs.SetFloat("money", money);
		questTracker.GetComponent(Quests).cubeCounter--;
		Destroy(gameObject);
	}
}