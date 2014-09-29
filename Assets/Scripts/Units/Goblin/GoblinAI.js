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

	flag = GameObject.Find("Flag");

	nextAttackIn = Time.time;

	attackSpeed = gameObject.GetComponent(Counter).attackSpeed;
	attackDistance = gameObject.GetComponent(Counter).attackDistance;
	aggroRange = gameObject.GetComponent(Counter).aggroRange;

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

	// Move character
	//var hit: RaycastHit;
	// When the mouse is clicked...	
	//if (Input.GetMouseButtonDown(1)) {
		// If the click was on an object then set the agent's
		// destination to the point where the click occurred.
		//var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		//if (Physics.Raycast(ray, hit)) {
			//if(hit.collider.tag == "Enemy"){
				//agent.SetDestination(hit.transform.position);
				//target = hit.transform.gameObject;
				//inCombat = true;
			//}else{
				//agent.SetDestination(hit.point);
				//inCombat = false;
			//}
		//}
	//}
	if(inCombat == false){
		agent.SetDestination(flag.transform.position);
	}else{
		agent.SetDestination(target.transform.position);
	}
	
	var dist = Vector3.Distance(FindClosestEnemy().transform.position, transform.position);
	if (dist <= aggroRange){
		inCombat = true;
		target = FindClosestEnemy();
	}
	
	
	// Combat
	if(inCombat == true){
		if(fighting == false){
  			if (currentSpeed > 0.1){
  				animation.CrossFade("run");
  			}else{
  				animation.CrossFade("combat_idle");
			}
		}
	
		var targetDistance = Vector3.Distance(gameObject.transform.position, target.transform.position);
		if(attackDistance >= targetDistance){
			fighting = true;
			print("in attack distance");
			if(Time.time >= nextAttackIn){
				transform.LookAt(target.transform);
				animation.CrossFade("attack1");
				target.GetComponent(Counter).hp--;
				nextAttackIn = Time.time + attackSpeed;
			}
		}
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