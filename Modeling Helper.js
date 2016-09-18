/**
 * Modeling Helper Beta.ver
 * @since 2016.9.17
 * @author Adagio
 */
var startPoint = 0,
    part, Type, Sqaure = 1;
var Color = android.graphics.Color,
    WHITE = Color.WHITE,
    ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
    density = ctx.getResources().getDisplayMetrics().density;

/**
 * Model
 * @since 2016.9.17
 */
var Model = {};
Model.save = null;
Model.xDir = 1,
    Model.yDir = -1,
    Model.zDir = -1;
Model.Sx = 0;
Model.Sy = 0;
Model.Sz = 0;
Model.Ex = 0;
Model.Ey = 0;
Model.Ez = 0;
Model.Rx = 0;
Model.Ry = 0;
Model.Rz = 0;
Model.check = false;
Model.isChecked = false;

/**
 * 모델을 플레이어에게 적용합니다
 * @since 2016.9.17
 */
Model.setModel2Player = function() {
    Model.makeModel(Model.entityRender);
    Model.check = true;
};

/**
 * 블랙배열을 텍스트로 변환합니다.
 * @since 2016.9.17
 */
Model.set = function(arr, name, magnification, isChecked) { //Block Data -> Text
    var returnString = "";
    for (var i = 0; i < arr.length; i++) {
        if (isChecked) {
            if (Model.firstSx != arr[i][0] && Model.firstSy != arr[i][1] && Model.firstSz != arr[i][2])
                returnString += "var " + name + "_" + i + " = model.getPart(\"" + part + "\");\n " + name + "_" + i + ".addBox(" + arr[i][0] * magnification * Model.xDir + ", " + arr[i][1] * magnification * Model.yDir + ", " + arr[i][2] * magnification * Model.zDir + ", " + 1 * magnification + ", " + 1 * magnification + ", " + 1 * magnification + ");\n";
            if (Model.firstEx != arr[i][0] && Model.firstEy != arr[i][1] && Model.firstEz != arr[i][2])
                returnString += "var " + name + "_" + i + " = model.getPart(\"" + part + "\");\n " + name + "_" + i + ".addBox(" + arr[i][0] * magnification * Model.xDir + ", " + arr[i][1] * magnification * Model.yDir + ", " + arr[i][2] * magnification * Model.zDir + ", " + 1 * magnification + ", " + 1 * magnification + ", " + 1 * magnification + ");\n";
        } else {
            returnString += "var " + name + "_" + i + " = model.getPart(\"" + part + "\");\n " + name + "_" + i + ".addBox(" + arr[i][0] * magnification * Model.xDir + ", " + arr[i][1] * magnification * Model.yDir + ", " + arr[i][2] * magnification * Model.zDir + ", " + 1 * magnification + ", " + 1 * magnification + ", " + 1 * magnification + ");\n";
        }
    }
    returnString += "}"; //중괄호 맺음
    ModelDialog(returnString);
    Model.save = arr;
    Model.setModel2Player();
};

/**
 * 좌표를 크기순으로 배열합니다.
 * @since 2016.9.17
 */
Model.rearray = function() {
    Model.firstSx = Model.Sx,
        Model.firstSy = Model.Sy,
        Model.firstSz = Model.Sz,
        Model.firstEx = Model.Ex,
        Model.firstEy = Model.Ey,
        Model.firstEz = Model.Ez;
    if (Model.Sx > Model.Ex) {
        Model.Ex = Model.firstSx;
        Model.Sx = Model.firstEx;
    }
    if (Model.Sy > Model.Ey) {
        Model.Ey = Model.firstSy;
        Model.Sy = Model.firstEy;
    }
    if (Model.Sz > Model.Ez) {
        Model.Ez = Model.firstSz;
        Model.Sz = Model.firstEz;
    }
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
        if (Model.isChecked) {
            var block = model.getPart("body");
            if (Model.firstSx !== Model.save[i][0] && Model.firstSy !== Model.save[i][1] && Model.firstSz !== Model.save[i][2]) {}
            block.addBox(Model.save[i][0] * Sqaure * Model.xDir, Model.save[i][1] * Sqaure * Model.yDir, Model.save[i][2] * Sqaure * Model.zDir, 1 * Sqaure, 1 * Sqaure, 1 * Sqaure);
            if (Model.firstEx !== Model.save[i][0] && Model.firstEy !== Model.save[i][1] && Model.firstEz !== Model.save[i][2]) {}
            block.addBox(Model.save[i][0] * Sqaure * Model.xDir, Model.save[i][1] * Sqaure * Model.yDir, Model.save[i][2] * Sqaure * Model.zDir, 1 * Sqaure, 1 * Sqaure, 1 * Sqaure);
        } else if (!Model.isChecked) {
            var block = model.getPart("body");
            block.addBox(Model.save[i][0] * Sqaure * Model.xDir, Model.save[i][1] * Sqaure * Model.yDir, Model.save[i][2] * Sqaure * Model.zDir, 1 * Sqaure, 1 * Sqaure, 1 * Sqaure);
        }
    }
};
Model.makeModel(Model.entityRender);

function useItem(x, y, z, i, b) {
    if (i == 267) {
        if (startPoint == 0) {
            Model.Sx = x;
            Model.Sy = y;
            Model.Sz = z;
            startPoint = 1;
            clientMessage("First Point Checked " + x + "/" + y + "/" + z);
        } else if (startPoint == 1) {
            Model.Ex = x;
            Model.Ey = y;
            Model.Ez = z;
            startPoint = 2;
            clientMessage("Second Point Checked " + x + "/" + y + "/" + z);
        } else if (startPoint == 2) {
            Model.Rx = x;
            Model.Ry = y;
            Model.Rz = z;
            startPoint = 0;
            clientMessage("Rotation Point Checked " + x + "/" + y + "/" + z);
            TypeDialog(Model.get());
        }
    }
}

function dp(pixel) {
    return Math.ceil(pixel * density);
}

function TypeDialog(arr) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var adb = new android.app.AlertDialog.Builder(ctx, android.app.AlertDialog.THEME_DEVICE_DEFAULT_DARK);
                adb.setTitle("Setting");

                var L = new android.widget.LinearLayout(ctx);
                L.setOrientation(1);
                L.setPadding(dp(4), dp(4), dp(4), dp(4));

                var bodyPart = ["head", "body", "leftarm", "rightarm", "leftleg", "rightleg"];

                var editText = new android.widget.EditText(ctx);
                editText.setHint("variableName");
                editText.setText("block");
                editText.setTextColor(WHITE);
                L.addView(editText);

                var Bs = new android.widget.EditText(ctx);
                Bs.setHint("확대율[x1]");
                Bs.setText("1");
                Bs.setTextColor(WHITE);
                L.addView(Bs);

                var checkBox = new android.widget.CheckBox(ctx);
                checkBox.setText("터치한 블럭X");
                checkBox.setChecked(Model.isChecked);
                L.addView(checkBox);

                var spinner = new android.widget.Spinner(ctx);
                var adapter = new android.widget.ArrayAdapter(ctx, android.R.layout.simple_list_item_1, bodyPart);
                spinner.setAdapter(adapter);
                spinner.setOnItemSelectedListener(new android.widget.AdapterView.OnItemSelectedListener({
                    onItemSelected: function(Parent, View, Position) {
                        part = bodyPart[Position];
                    }
                }))
                L.addView(spinner);

                adb.setView(L);

                adb.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
                    onClick: function(d, w) {
                        Model.isChecked = checkBox.isChecked();
                        Model.set(arr, editText.getText().toString(), Bs.getText().toString(), checkBox.isChecked());
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
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {

                var adb = new android.app.AlertDialog.Builder(ctx, android.app.AlertDialog.THEME_DEVICE_DEFAULT_DARK);
                adb.setTitle("Model Source");

                editText = new android.widget.EditText(ctx);
                editText.setText(text);
                editText.setTextColor(WHITE);
                adb.setView(editText);

                adb.setPositiveButton("확인", new android.content.DialogInterface.OnClickListener({
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
