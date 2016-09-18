/**
 * Modeling Helper Beta.ver
 * @since 2016.9.17
 * @author Adagio
 */
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
    WHITE = Color.WHITE,
    ctx = MainActivity.currentMainActivity.get(),
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
Model.set = function(name, arr) { //Block Data -> Text
    var returnString = "";
    for (var i = 0; i < arr.length; i++) {
        returnString += "var " + name + "_" + i + " = model.getPart(\"" + part + "\");\n " + name + "_" + i + ".addBox(" + arr[i][0] * Sqaure * Model.xDir + ", " + arr[i][1] * Sqaure * Model.yDir + ", " + arr[i][2] * Sqaure * Model.zDir + ", " + 1 * Sqaure + ", " + 1 * Sqaure + ", " + 1 * Sqaure + ");\n";
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
    var Bx = Model.Sx,
        By = Model.Sy,
        Bz = Model.Sz,
        Kx = Model.Ex,
        Ky = Model.Ey,
        Kz = Model.Ez;
    if (Model.Sx > Model.Ex) {
        Model.Ex = Bx;
        Model.Sx = Kx;
    }
    if (Model.Sy > Model.Ey) {
        Model.Ey = By;
        Model.Sy = Ky;
    }
    if (Model.Sz > Model.Ez) {
        Model.Ez = Bz;
        Model.Sz = Kz;
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
        var block = model.getPart("body");
        block.addBox(Model.save[i][0] * Sqaure * Model.xDir, Model.save[i][1] * Sqaure * Model.yDir, Model.save[i][2] * Sqaure * Model.zDir, 1 * Sqaure, 1 * Sqaure, 1 * Sqaure)
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

function TypeDialog(Arr) {
    ctx.runOnUiThread(new Runnable({
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
                        Sqaure = Bs.getText().toString();
                        Model.set(editText.getText().toString(), Arr);
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
