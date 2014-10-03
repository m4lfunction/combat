#pragma strict

var target : GameObject;
var inCombat : boolean = false;

private var agent : NavMeshAgent;
private var attackSpeed : float;
private var nextAttackIn : float;
private var attackDistance : float;
private var aggroRange : float;

	var lastFramePosition : Vector3;
	var currentFramePosition : Vector3;
 	var distance : float;

function Start () {
	// get stats
	attackSpeed = gameObject.GetComponent(Counter).attackSpeed;
	attackDistance = gameObject.GetComponent(Counter).attackDistance;
	aggroRange = gameObject.GetComponent(Counter).aggroRange;
	agent = GetComponent.<NavMeshAgent>();
	
	// By default loop all animations
	animation.wrapMode = WrapMode.Loop;

}

function Update () {
var currentSpeed: float = Mathf.Abs(distance)/Time.deltaTime;
	currentFramePosition = transform.position;
 	distance = Vector3.Distance(lastFramePosition, currentFramePosition);
  	if(inCombat == false){
  		if (currentSpeed > 0.1){
  			animation.CrossFade("walk01");
  		}else{
  			animation.CrossFade("idle");
		}
	}

	target = FindClosestMinion();
	agent.SetDestination(target.transform.position);

	if (gameObject.GetComponent(Counter).hp <= 0){
		Destroy(gameObject);
	}
}

function FindClosestMinion () : GameObject {
	// Find all game objects with tag Enemy
	var minion : GameObject[];
	minion = GameObject.FindGameObjectsWithTag("Minion"); 
	var closestMinion : GameObject; 
	var distance = Mathf.Infinity; 
	var position = transform.position; 
	// Iterate through them and find the closest one
	for (var go : GameObject in minion)  { 
		var diff = (go.transform.position - position);
		var curDistance = diff.sqrMagnitude; 
		if (curDistance < distance) { 
			closestMinion = go; 
			distance = curDistance; 
		} 
	} 
	return closestMinion;
}