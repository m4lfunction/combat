#pragma strict

function Start () {

}

function Update () {
	if (Input.GetMouseButtonDown(1)) {

		var hit: RaycastHit;
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
		if (Physics.Raycast(ray, hit)) {
			print (hit.point);
			gameObject.transform.position = hit.point;
		}
	}
}