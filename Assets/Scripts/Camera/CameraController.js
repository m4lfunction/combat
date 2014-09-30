﻿#pragma strict

var target : GameObject;
var scrollSpeed : float = 20;
var distance : float = 50;

function Start () {

}

function Update () {
	transform.LookAt(target.transform);
	transform.Translate(Vector3.right * Time.deltaTime * Input.GetAxis("Horizontal") * scrollSpeed);
	transform.Translate(Vector3.up * Time.deltaTime * Input.GetAxis("Vertical") * scrollSpeed);
	transform.position = (transform.position - target.transform.position).normalized * distance + target.transform.position;
}