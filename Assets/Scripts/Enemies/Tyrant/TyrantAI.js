#pragma strict

var isObjective : boolean = false;
var questTracker : GameObject;
var money : float;

var target : GameObject;
var targetDist : float;
var inCombat : boolean = false;
var fighting : boolean = false;

private var minionDist : float;
private var heroDist : float;

private var agent : NavMeshAgent;
private var attackSpeed : float;
private var nextAttackIn : float;
private var attackDistance : float;
private var aggroRange : float;

private var lastFramePosition : Vector3;

var currentSpeed : float;

function Start () {


	// get stats
	attackSpeed = gameObject.GetComponent(Counter).attackSpeed;
	attackDistance = gameObject.GetComponent(Counter).attackDistance;
	aggroRange = gameObject.GetComponent(Counter).aggroRange;
	agent = GetComponent.<NavMeshAgent>();
	
	// By default loop all animations
	animation.wrapMode = WrapMode.Loop;
	animation["attack01"].wrapMode = WrapMode.Once;

	questTracker = GameObject.Find("QuestTracker");
}

function Update () {

	heroDist = Vector3.Distance(FindClosestHero().transform.position, transform.position);
	minionDist = Vector3.Distance(FindClosestMinion().transform.position, transform.position);

			
	if(FindClosestMinion() == null || heroDist < minionDist){
		target = FindClosestHero();
	}else{
		target = FindClosestMinion();
	}
	
	targetDist = Vector3.Distance(transform.position, target.transform.position);
	
	if (targetDist <= aggroRange){
		agent.SetDestination(target.transform.position);
	}else{
		agent.SetDestination(transform.position);
	}

	var currentFramePosition : Vector3 = transform.position;
 	var distance : float = Vector3.Distance(lastFramePosition, currentFramePosition);
 
 	lastFramePosition = currentFramePosition;
 	currentSpeed = Mathf.Abs(distance)/Time.deltaTime;
 	
	Animate();
	if (targetDist <= aggroRange){
		inCombat = true;
	}
	
	if (gameObject.GetComponent(Counter).hp <= 0){
		questTracker.GetComponent(Quests).tyrantCounter--;
		money = PlayerPrefs.GetFloat("money");
		money += gameObject.GetComponent(Counter).price / 4;
		PlayerPrefs.SetFloat("money", money);
		Destroy(gameObject);
	}
	
	// Combat
	if(inCombat == true){
		if(attackDistance >= targetDist){
			if(Time.time >= nextAttackIn){
				transform.LookAt(target.transform);
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

function Animate(){
	if(targetDist >= attackDistance){
 		if (currentSpeed > 0.1){
  			animation.CrossFade("walk01");
		}else{
			animation.CrossFade("idle");
  		}
  	}else{
  		animation.CrossFade("attack01");
  	}
}