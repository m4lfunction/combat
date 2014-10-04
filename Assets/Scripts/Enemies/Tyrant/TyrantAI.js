#pragma strict

var target : GameObject;
var inCombat : boolean = false;
var fighting : boolean = false;

var dist : float;

private var agent : NavMeshAgent;
private var attackSpeed : float;
private var nextAttackIn : float;
private var attackDistance : float;
private var aggroRange : float;

private var lastFramePosition : Vector3;

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

if(FindClosestMinion() ==null){
	dist = Vector3.Distance(FindClosestHero().transform.position, transform.position);
	target = FindClosestHero();
}else{
	dist = Vector3.Distance(FindClosestMinion().transform.position, transform.position);
	target = FindClosestMinion();
}
	agent.SetDestination(target.transform.position);



	var currentFramePosition : Vector3 = transform.position;
 	var distance : float = Vector3.Distance(lastFramePosition, currentFramePosition);
 
 	lastFramePosition = currentFramePosition;
 	var currentSpeed: float = Mathf.Abs(distance)/Time.deltaTime;
 	
 	 	
  	if(inCombat == false){
  		if (currentSpeed > 0.1){
  			animation.CrossFade("walk01");
  		}
	}else{
	
  			animation.CrossFade("idle");
  	}
	if (dist <= aggroRange){
		inCombat = true;
	}
	
	if (gameObject.GetComponent(Counter).hp <= 0){
		Destroy(gameObject);
	}
	
	// Combat
	if(inCombat == true){
		if(fighting == false){
  			if (currentSpeed > 0.1){
  				animation.CrossFade("walk02");
  			}else{
  				animation.CrossFade("idle");
			}
		}
	
		var targetDistance = Vector3.Distance(gameObject.transform.position, target.transform.position);
		if(attackDistance >= targetDistance){
			fighting = true;
			if(Time.time >= nextAttackIn){
				transform.LookAt(target.transform);
				animation.CrossFade("attack01");
				target.GetComponent(Counter).hp--;
				nextAttackIn = Time.time + attackSpeed;
			}
		}
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

function FindClosestHero () : GameObject {
	// Find all game objects with tag Enemy
	var minion : GameObject[];
	minion = GameObject.FindGameObjectsWithTag("Hero"); 
	var closestHero : GameObject; 
	var distance = Mathf.Infinity; 
	var position = transform.position; 
	// Iterate through them and find the closest one
	for (var go : GameObject in minion)  { 
		var diff = (go.transform.position - position);
		var curDistance = diff.sqrMagnitude; 
		if (curDistance < distance) { 
			closestHero = go; 
			distance = curDistance; 
		} 
	} 
	return closestHero;
}