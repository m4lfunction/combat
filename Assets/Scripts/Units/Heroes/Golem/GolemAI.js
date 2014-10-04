#pragma strict

var inCombat : boolean = false;
var fighting : boolean = false;

var flag : GameObject;

private var attackSpeed : float;
private var nextAttackIn : float;
private var attackDistance : float;
private var aggroRange : float;

private var agent : NavMeshAgent;
private var lastFramePosition: Vector3;
private var target : GameObject;

function Start () {
	// get stats
	attackSpeed = gameObject.GetComponent(Counter).attackSpeed;
	attackDistance = gameObject.GetComponent(Counter).attackDistance;
	aggroRange = gameObject.GetComponent(Counter).aggroRange;

	// flag is waypoint
	flag = GameObject.Find("Flag");

	// ready to attack at start
	nextAttackIn = Time.time;

	agent = GetComponent.<NavMeshAgent>();
	
	// By default loop all animations
	animation.wrapMode = WrapMode.Loop;
	lastFramePosition = transform.position;
}

function Update () {

	if(target == null){
		inCombat = false;
		fighting = false;
	}

	var currentFramePosition : Vector3 = transform.position;
 	var distance : float = Vector3.Distance(lastFramePosition, currentFramePosition);
 
 	lastFramePosition = currentFramePosition;
 	var currentSpeed: float = Mathf.Abs(distance)/Time.deltaTime;
 
  	// Switch between idle and walk
  	if(inCombat == false){
  		if (currentSpeed > 0.1){
  			animation.CrossFade("walk");
  		}else{
  			animation.CrossFade("idle");
		}
	}

	// Movement
	if(inCombat == false){
		agent.SetDestination(flag.transform.position);
	}else{
		agent.SetDestination(target.transform.position);
	}
	
	// attack enemy when in aggroRange
	var dist = Vector3.Distance(FindClosestEnemy().transform.position, transform.position);
	if (dist <= aggroRange){
		inCombat = true;
		target = FindClosestEnemy();
	}
	
	
	// Combat
	if(inCombat == true){
		if(fighting == false){
  			if (currentSpeed > 0.1){
  				animation.CrossFade("walk");
  			}else{
  				animation.CrossFade("idle");
			}
		}
	
		var targetDistance = Vector3.Distance(gameObject.transform.position, target.transform.position);
		if(attackDistance >= targetDistance){
			fighting = true;
			if(Time.time >= nextAttackIn){
				transform.LookAt(target.transform);
				animation.CrossFade("hpunch");
				target.GetComponent(Counter).hp--;
				print("attacking "+target+target.GetComponent(Counter).hp);
				nextAttackIn = Time.time + attackSpeed;
			}
		}
	}
	
	if (gameObject.GetComponent(Counter).hp <= 0){
		Destroy(gameObject);
	}
}

function FindClosestEnemy () : GameObject {
	// Find all game objects with tag Enemy
	var gos : GameObject[];
	gos = GameObject.FindGameObjectsWithTag("Enemy"); 
	var closestEnemy : GameObject; 
	var distance = Mathf.Infinity; 
	var position = transform.position; 
	// Iterate through them and find the closest one
	for (var go : GameObject in gos)  { 
		var diff = (go.transform.position - position);
		var curDistance = diff.sqrMagnitude; 
		if (curDistance < distance) { 
			closestEnemy = go; 
			distance = curDistance; 
		} 
	} 
	return closestEnemy;
}