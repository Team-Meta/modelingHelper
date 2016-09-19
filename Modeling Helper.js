/**
 * Modeling Helper Beta.ver
 * @since 2016.9.17
 * @author Adagio
 */
<<<<<<< HEAD
var part = null,
    Color = android.graphics.Color,
=======
var startPoint = 0,
    part, Type, Sqaure = 1;
    
var AlertDialog = android.app.AlertDialog,
    DialogInterface = android.content.DialogInterface,
    Color = android.graphics.Color,
    AdapterView = android.widget.AdapterView,
    ArrayAdapter = android.widget.ArrayAdapter,
    EditText = android.widget.EditText,
    LinearLayout = android.widget.LinearLayout,
    Spinner = android.widget.Spinner,
    MainActivity = com.mojang.minecraftpe.MainActivity,
    Runnable = java.lang.Runnable,
>>>>>>> origin/master
    WHITE = Color.WHITE,
    ctx = MainActivity.currentMainActivity.get(),
    density = ctx.getResources().getDisplayMetrics().density;

/**
 * Model
 * @since 2016.9.17
 */
var Model = {};
Model.xDir = 1;
Model.yDir = -1;
Model.zDir = -1;
Model.magnify = 1;
Model.startPoint = 0;
Model.check = false;
Model.save = null;

/**
 * 블랙배열을 텍스트로 변환합니다.
 * @since 2016.9.17
 */
Model.set = function(arr, name) { //Block Data -> Text
    var returnString = "";
    for (var i = 0; i < arr.length; i++) {
        returnString += "var " + name + "_" + i + " = model.getPart(\"" + part + "\");\n " + name + "_" + i + ".addBox(" + arr[i][0] * Model.magnify * Model.xDir + ", " + arr[i][1] * Model.magnify * Model.yDir + ", " + arr[i][2] * Model.magnify * Model.zDir + ", " + 1 * Model.magnify + ", " + 1 * Model.magnify + ", " + 1 * Model.magnify + ");\n";
    }
    returnString += "}"; //중괄호 맺음
    ModelDialog(returnString);
    Model.save = arr;
    Model.setModel2Player();
};

/**
 * 블럭을 좌표배열로 변환합니다
 * @since 2016.9.17
 */
Model.get = function() {
    Model.rearray();
    var str = [];
    for (var X = Model.Sx; X <= Model.Ex; X++)
        for (var Y = Model.Sy; Y <= Model.Ey; Y++)
            for (var Z = Model.Sz; Z <= Model.Ez; Z++) {
                var tile = Level.getTile(X, Y, Z);
                if (tile != 0) {
                    var data = [X - Model.Rx, Y - Model.Ry, Z - Model.Rz, tile];
                    str.push(data);
                }
            }
    return str;
};

/**
 * 좌표를 크기순으로 배열합니다.
 * @since 2016.9.17
 */
Model.rearray = function() {
    Model.Sx = Math.min(Model.Sx, Model.Ex);
    Model.Ex = Math.max(Model.Sx, Model.Ex);
    Model.Sy = Math.min(Model.Sy, Model.Ey);
    Model.Ey = Math.max(Model.Sy, Model.Ey);
    Model.Sz = Math.min(Model.Sz, Model.Ez);
    Model.Ez = Math.max(Model.Sz, Model.Ez);
};

/**
 * 모델을 플레이어에게 적용합니다
 * @since 2016.9.17
 */
Model.setModel2Player = function() {
    Model.makeModel(Model.entityRender);
    Model.check = true;
};

Model.entityRender = Renderer.createHumanoidRenderer();
Model.makeModel = function(renderer) {
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
    leftleg.clear();
    var rightleg = model.getPart("rightLeg");
    rightleg.clear();
    for (var i in Model.save) {
        var block = model.getPart("body");
        block.addBox(Model.save[i][0] * Model.magnify * Model.xDir, Model.save[i][1] * Model.magnify * Model.yDir, Model.save[i][2] * Model.magnify * Model.zDir, 1 * Model.magnify, 1 * Model.magnify, 1 * Model.magnify)
    }
};
Model.makeModel(Model.entityRender);

function useItem(x, y, z, i, b) {
    if (i == 267 || i == 292) {
        if (i == 292) Level.destroyBlock(x, y, z, false);
        if (Model.startPoint == 0) {
            Model.Sx = x;
            Model.Sy = y;
            Model.Sz = z;
            Model.startPoint = 1;
            clientMessage("First Point Checked " + x + "/" + y + "/" + z);
        } else if (Model.startPoint == 1) {
            Model.Ex = x;
            Model.Ey = y;
            Model.Ez = z;
            Model.startPoint = 2;
            clientMessage("Second Point Checked " + x + "/" + y + "/" + z);
        } else if (Model.startPoint == 2) {
            Model.Rx = x;
            Model.Ry = y;
            Model.Rz = z;
            Model.startPoint = 0;
            clientMessage("Rotation Point Checked " + x + "/" + y + "/" + z);
            TypeDialog(Model.get());
        }
    }
}

function dp(pixel) {
    return Math.ceil(pixel * density);
}

<<<<<<< HEAD
function TypeDialog(arr) {
    ctx.runOnUiThread(new java.lang.Runnable({
=======
function TypeDialog(Arr) {
    ctx.runOnUiThread(new Runnable({
>>>>>>> origin/master
        run: function() {
            try {
                var adb = new AlertDialog.Builder(ctx, AlertDialog.THEME_DEVICE_DEFAULT_DARK);
                adb.setTitle("Setting");

                var L = new LinearLayout(ctx);
                L.setOrientation(1);
                L.setPadding(dp(4), dp(4), dp(4), dp(4));

                var bodyPart = ["head", "body", "leftarm", "rightarm", "leftleg", "rightleg"];

                editText = new EditText(ctx);
                editText.setHint("variableName");
                editText.setText("block");
                editText.setTextColor(WHITE);
                L.addView(editText);

                Bs = new EditText(ctx);
                Bs.setHint("확대율[x1]");
                Bs.setText("1");
                Bs.setTextColor(WHITE);
                L.addView(Bs);

                var spinner = new Spinner(ctx);
                var adapter = new ArrayAdapter(ctx, android.R.layout.simple_list_item_1, bodyPart);
                spinner.setAdapter(adapter);
                spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener({
                    onItemSelected: function(Parent, View, Position) {
                        part = bodyPart[Position];
                    }
                }))
                L.addView(spinner);

                adb.setView(L);

                adb.setPositiveButton("확인", new DialogInterface.OnClickListener({
                    onClick: function(d, w) {
                        Model.magnify = Bs.getText().toString();
                        Model.set(arr, editText.getText().toString());
                    }
                }));
                adb.show();
            } catch (e) {
                clientMessage(e);
            }
        }
    }));
}

function ModelDialog(text) {
    ctx.runOnUiThread(new Runnable({
        run: function() {
            try {

                var adb = new AlertDialog.Builder(ctx, AlertDialog.THEME_DEVICE_DEFAULT_DARK);
                adb.setTitle("Model Source");

                editText = new EditText(ctx);
                editText.setText(text);
                editText.setTextColor(WHITE);
                adb.setView(editText);

                adb.setPositiveButton("확인", new DialogInterface.OnClickListener({
                    onClick: function(d, w) {

                    }
                }));
                adb.show();
            } catch (e) {
                clientMessage(e);
            }
        }
    }));
}

function Rendering(ent) {
    Entity.setRenderType(ent, Model.entityRender.renderType);
}

function modTick() {
    if (Model.check) {
        Rendering(Player.getEntity());
    }
}

//기본코드
const basic = "var EntRender = Renderer.createHumanoidRenderer();\nMade(EntRender);\n\nfunction Made(renderer){\n var model = renderer.getModel()\nvar head = model.getPart(\"head\");\nhead.clear();\nvar rightarm = model.getPart(\"rightArm\");\nrightarm.clear();\nvar leftarm = model.getPart(\"leftArm\");\nleftarm.clear();\nvar body = model.getPart(\"body\");\nbody.clear();\nvar leftleg = model.getPart(\"leftLeg\");\nleftleg.clear()\nvar rightleg = model.getPart(\"rightLeg\");\nrightleg.clear()\n"
