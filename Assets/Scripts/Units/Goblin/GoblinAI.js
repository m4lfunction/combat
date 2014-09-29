#pragma strict

var inCombat : boolean = false;
var fighting : boolean = false;

private var attackSpeed : float;
private var nextAttackIn : float;
private var attackDistance : float;

private var agent : NavMeshAgent;
private var lastFramePosition: Vector3;
private var target : GameObject;

function Start () {

	nextAttackIn = Time.time;

	attackSpeed = gameObject.GetComponent(Counter).attackSpeed;
	attackDistance = gameObject.GetComponent(Counter).attackDistance;

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
	var hit: RaycastHit;
	// When the mouse is clicked...	
	if (Input.GetMouseButtonDown(1)) {
		// If the click was on an object then set the agent's
		// destination to the point where the click occurred.
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		
		if (Physics.Raycast(ray, hit)) {
			if(hit.collider.tag == "Enemy"){
				agent.SetDestination(hit.transform.position);
				target = hit.transform.gameObject;
				inCombat = true;
			}else{
				agent.SetDestination(hit.point);
				inCombat = false;
			}
		}
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