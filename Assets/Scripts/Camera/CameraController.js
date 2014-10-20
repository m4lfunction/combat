#pragma strict

var target : GameObject;
private var targetDistance : float;
var minTargetDistance : float = 5;
var maxTargetDistance : float = 50;
var scrollSpeed : float = 20;
var zoomFactor : float = 20;
var distance : float = 50;
var minHeight : float = 10;

function Start () {

}

function Update () {
	if(target==null){
		target = GameObject.FindWithTag("Hero");
	}
		
	if (target.transform) {
		targetDistance = Vector3.Distance(target.transform.position, transform.position);
	}
	if(targetDistance >= minTargetDistance && targetDistance <= maxTargetDistance){
		distance -= Input.GetAxis("Mouse ScrollWheel") * zoomFactor;
	}else{
		if(targetDistance <= minTargetDistance){
			distance++;
		}else{
			distance--;
		}
	}
}

function FixedUpdate(){
	var hit: RaycastHit;
	var downRay = new Ray(transform.position, -Vector3.up);	
	if (Physics.Raycast(downRay, hit)) {
		var terrainDistance : float = hit.distance;
		Debug.Log(terrainDistance);
		if (terrainDistance < minHeight) {
			transform.LookAt(target.transform);
			transform.Translate(Vector3.up * Time.deltaTime * scrollSpeed);
			transform.position = (transform.position - target.transform.position).normalized * distance + target.transform.position;
		}else{
			transform.LookAt(target.transform);
			transform.Translate(Vector3.right * Time.deltaTime * Input.GetAxis("Horizontal") * scrollSpeed);
			transform.Translate(Vector3.up * Time.deltaTime * Input.GetAxis("Vertical") * scrollSpeed);
			transform.position = (transform.position - target.transform.position).normalized * distance + target.transform.position;
		}
	
	}
}