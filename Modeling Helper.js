/*
Made By Sky(magicwho@naver.com)
무단배포 및 무단수정을 엄금합니다.

9 0 37 0 7 14 15 919 0 13 1 0 99 0 1 5 18 15 911 0 5 16 3 913 0 15 914 
*/

var Crd = {};
var StartPoint = 0;
var part,Type,Save,Sqaure = 1,Check = false;
var Xv = 1,Yv = -1,Zv = -1;//방향.

const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

function useItem(x,y,z,i,b){
	if(i == 267){
		if(StartPoint == 0){
			Crd.Sx = x;
			Crd.Sy = y;
			Crd.Sz = z;
			StartPoint = 1;
			clientMessage("First Point Checked "+x+"/"+y+"/"+z)	 
		}
		else if(StartPoint == 1){
			Crd.Ex = x;
			Crd.Ey = y;
			Crd.Ez = z;
			StartPoint = 2;
			clientMessage("Second Point Checked "+x+"/"+y+"/"+z)	 
		}
		else if(StartPoint == 2){
			Crd.Rx = x;
			Crd.Ry = y;
			Crd.Rz = z;
			StartPoint = 0;
			clientMessage("Rotation Point Checked "+x+"/"+y+"/"+z)
			TypeDialog(Model.get())
		}
	}
}

const Model = {
	get : function(){
		Rearray()
		var Str=[];
		for(var X=Crd.Sx;X<=Crd.Ex;X++)
		for(var Y=Crd.Sy;Y<=Crd.Ey;Y++)
		for(var Z=Crd.Sz;Z<=Crd.Ez;Z++){
			var Tile = Level.getTile(X,Y,Z)
			if(Tile != 0){
				var A = [X-Crd.Rx,Y-Crd.Ry,Z-Crd.Rz,Tile]
				Str.push(A)
			}
		}
		return Str;
	},
	set : function(T,Arr){//Block Data -> Text
		var Md = "";
			for(var i in Arr){
				Md += "var "+T+"_"+i+" = model.getPart(\""+part+"\")\n "+T+"_"+i+".addBox("+Arr[i][0]*Sqaure*Xv+", "+ Arr[i][1]*Sqaure*Yv+", "+ Arr[i][2]*Sqaure*Zv+", "+1*Sqaure+", "+1*Sqaure+", "+1*Sqaure+")\n"
			}
		Md += "}"//중괄호 맺음
		ModelDialog(Md)
		Save = Arr;
		Model.Player();
	},
	Player : function(){
		Made(entRender)
		Check = true;
	}
}

function TypeDialog(Arr)//Dialog Type Choose
{
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
	try{

var adb = new android.app.AlertDialog.Builder(ctx,android.app.AlertDialog.THEME_HOLO_DARK);
adb.setTitle("Setting");

var L=new android.widget.LinearLayout(ctx);
L.setOrientation(1);

var bodyPart=["head","body","leftarm","rightarm","leftleg","rightleg"]

editText=new android.widget.EditText(ctx);
editText.setHint("type");
L.addView(editText)

Bs=new android.widget.EditText(ctx);
Bs.setHint("확대율[x1]");
Bs.setText("1")
L.addView(Bs)

spinner = new android.widget.Spinner(ctx)
adapter = new android.widget.ArrayAdapter(ctx,android.R.layout.simple_spinner_item,bodyPart)
spinner.setAdapter(adapter)
spinner.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
onItemSelected : function(Parent,View,Position){

part = bodyPart[Position];

}}))
L.addView(spinner)

adb.setView(L);

adb.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick: function(d,w){
	
Type = editText.getText().toString();
Sqaure = Bs.getText().toString();
Model.set(Type,Arr)

}}));
adb.show();
}catch(e){
clientMessage(e);
}
}}));
}

function ModelDialog(T)//Model Source
{
ctx.runOnUiThread(new java.lang.Runnable({
run : function(){
	try{

var adb = new android.app.AlertDialog.Builder(ctx,android.app.AlertDialog.THEME_HOLO_DARK);
adb.setTitle("Model Source");

editText = new android.widget.EditText(ctx);
editText.setText(T);
adb.setView(editText);

adb.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
onClick: function(d,w){

}}));
adb.show();
}catch(e){
clientMessage(e);
}
}}));
}

function Rearray(){//좌표 재배열.
var Bx = Crd.Sx,By = Crd.Sy,Bz = Crd.Sz,Kx = Crd.Ex,Ky = Crd.Ey,Kz = Crd.Ez;
	if(Crd.Sx > Crd.Ex){
		Crd.Ex = Bx;
		Crd.Sx = Kx;
	}
	 if(Crd.Sy > Crd.Ey){
		Crd.Ey = By;
		Crd.Sy = Ky;
	}
	 if(Crd.Sz > Crd.Ez){
		Crd.Ez = Bz;
		Crd.Sz = Kz;
	}
}

var entRender = Renderer.createHumanoidRenderer();
Made(entRender);

function Made(renderer)
{
	var model = renderer.getModel();
	var head = model.getPart("head");
	head.clear();
	var rightarm = model.getPart("rightArm");
	rightarm.clear();
	var leftarm = model.getPart("leftArm");
	leftarm.clear();
	var body = model.getPart("body");
	body.clear();
	var leftleg = model.getPart("leftLeg");
	leftleg.clear()
	var rightleg = model.getPart("rightLeg");
	rightleg.clear()
	for(var i in Save){
		var Ak = model.getPart("body");
		Ak.addBox(Save[i][0]*Sqaure*Xv, Save[i][1]*Sqaure*Yv, Save[i][2]*Sqaure*Zv, 1*Sqaure, 1*Sqaure, 1*Sqaure)
	}
}

function Rend(ent){
  Entity.setRenderType(ent, entRender.renderType);
}

function modTick(){
	if(Check){
		Rend(Player.getEntity())
	}
}

//기본코드
const basic = "var EntRender = Renderer.createHumanoidRenderer();\nMade(EntRender);\n\nfunction Made(renderer){\n var model = renderer.getModel()\nvar head = model.getPart(\"head\");\nhead.clear();\nvar rightarm = model.getPart(\"rightArm\");\nrightarm.clear();\nvar leftarm = model.getPart(\"leftArm\");\nleftarm.clear();\nvar body = model.getPart(\"body\");\nbody.clear();\nvar leftleg = model.getPart(\"leftLeg\");\nleftleg.clear()\nvar rightleg = model.getPart(\"rightLeg\");\nrightleg.clear()\n"