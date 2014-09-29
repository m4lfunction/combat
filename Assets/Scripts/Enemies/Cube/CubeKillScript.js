#pragma strict

function Start () {

}

function Update () {
	if (gameObject.GetComponent(Counter).hp <= 0){
		Destroy(gameObject);
	}
}