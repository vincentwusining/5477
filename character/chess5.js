function chess5(x, y) {//无人飞只因操作员
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 5;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess5.png";
    chess.name = "无人只因操控员";
    chess.max_health = 17;
    chess.health = 17;
    chess.max_movement = 4;
    chess.movement = 4;
    chess.reflect = 7;
    skill1.innerHTML = '选择位置<img height="25px" width="25px" id="input5_1_1" onclick="input(2,id,2)">生成一个战斗无人机<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill1_launch()"></button>';
    skill2.innerHTML = '选择位置<img height="25px" width="25px" id="input5_2_1" onclick="input(2,id,2)">生成一个救治无人机<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill2_launch()"></button>';
    skill3.innerHTML = '选择最多五个目标<img height="25px" width="25px" id="input5_3_1" onclick="input(1,id,12)"><img height="25px" width="25px" id="input5_3_2" onclick="input(1,id,12)"><img height="25px" width="25px" id="input5_3_3" onclick="input(1,id,12)"><img height="25px" width="25px" id="input5_3_4" onclick="input(1,id,12)"><img height="25px" width="25px" id="input5_3_5" onclick="input(1,id,12)">使其中的无人机进入暴走状态，持续两回合。两回合后对所有无人机造成100点伤害<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill3_launch()"></button>';
    chess.skill1_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill1_cooling <= 0 && chess.reflect != -1) {
            var input1 = document.getElementById("controller_page3").querySelector("#input5_1_1").value;
            chess1005(input1[0], input1[1]);
            chess.skill1_cooling = chess.skill1_max_cooling;
            skill(1);
            overall_skill();
        }
    }
    chess.skill2_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill2_cooling <= 0 && chess.reflect != -1) {
            var input1 = document.getElementById("controller_page3").querySelector("#input5_2_1").value;
            chess1006(input1[0], input1[1]);
            chess.skill2_cooling = chess.skill2_max_cooling;
            skill(2);
            overall_skill();
        }
    }
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill3_cooling <= 0 && chess.reflect != -1) {
            setTimeout(function () { skill3_1() }, 0);
            setTimeout(function () { skill3_2() }, 0);
            setTimeout(function () { skill3_3() }, 0);
            setTimeout(function () { skill3_4() }, 0);
            setTimeout(function () { skill3_5() }, 0);
            function skill3_1() {
                var input1 = document.getElementById("controller_page3").querySelector("#input5_3_1").value;
                var target1 = document.getElementById(input1);
                if (target1.fixedid == 1005 || target1.fixedid == 1006) {
                    target1.data[1] = 1;//暴走
                }
            }
            function skill3_2() {
                var input2 = document.getElementById("controller_page3").querySelector("#input5_3_2").value;
                var target2 = document.getElementById(input2);
                if (target2.fixedid == 1005 || target2.fixedid == 1006) {
                    target2.data[1] = 1;//暴走
                }
            }
            function skill3_3() {
                var input3 = document.getElementById("controller_page3").querySelector("#input5_3_3").value;
                var target3 = document.getElementById(input3);
                if (target3.fixedid == 1005 || target3.fixedid == 1006) {
                    target3.data[1] = 1;//暴走
                }
            }
            function skill3_4() {
                var input4 = document.getElementById("controller_page3").querySelector("#input5_3_4").value;
                var target4 = document.getElementById(input4);
                if (target4.fixedid == 1005 || target4.fixedid == 1006) {
                    target4.data[1] = 1;//暴走
                }
            }
            function skill3_5() {
                var input5 = document.getElementById("controller_page3").querySelector("#input5_3_5").value;
                var target5 = document.getElementById(input5);
                if (target5.fixedid == 1005 || target5.fixedid == 1006) {
                    target5.data[1] = 1;//暴走
                }
            }
            chess.data[3] = round;
            setTimeout(function () { skill(3); chess.skill3_cooling = chess.skill3_max_cooling; overall_skill(); }, 10)

        }
    }
    chess.skill1_src = "./img/skill5.1.png";//skill1
    chess.skill1_name = "战斗只因";
    chess.skill1_max_cooling = 2;
    chess.skill1_cooling = 0;
    chess.skill1_class = 1;//1主动0被动
    chess.skill2_src = "./img/skill5.2.png";//skill2
    chess.skill2_name = "救治只因";
    chess.skill2_max_cooling = 5;
    chess.skill2_cooling = 3;
    chess.skill2_class = 1;
    chess.skill3_src = "./img/skill-2.png";//skill3
    chess.skill3_name = "暴走";
    chess.skill3_max_cooling = 6;
    chess.skill3_cooling = 6;
    chess.skill3_class = 1;
    chess.movefunction = function (id, dir, count, form, source, x, y) {//form1主动0被动，主动dir==0视为推拉，自动检测方向，dir不为0则是传送
        var chess = document.getElementById(id);
        if (form == 0 && chess.fixedid == active_fixedid && chess.reflect != -1) {
            if (dir == 1) { if (chess.direction == 1) { if (detect_resist(chess.x, chess.y + 1) == 0 && chess.movement >= 1) { chess.y += 1; chess.movement -= 1 } } else { chess.direction = 1; chess.style.transform = "rotate(0deg)"; } }
            if (dir == 2) { if (chess.direction == 2) { if (detect_resist(chess.x + 1, chess.y) == 0 && chess.movement >= 1) { chess.x += 1; chess.movement -= 1 } } else { chess.direction = 2; chess.style.transform = "rotate(90deg)"; } }
            if (dir == 3) { if (chess.direction == 3) { if (detect_resist(chess.x, chess.y - 1) == 0 && chess.movement >= 1) { chess.y -= 1; chess.movement -= 1 } } else { chess.direction = 3; chess.style.transform = "rotate(180deg)"; } }
            if (dir == 4) { if (chess.direction == 4) { if (detect_resist(chess.x - 1, chess.y) == 0 && chess.movement >= 1) { chess.x -= 1; chess.movement -= 1 } } else { chess.direction = 4; chess.style.transform = "rotate(270deg)"; } }
            selector(id);
        }
        else if (form == 1) {
            if (dir == 0) {
                var prex = chess.x;
                var prey = chess.y;
                if (count > 0) {
                    if (x > chess.x && detect_resist(chess.x - 1, chess.y) == 0) { prex -= 1; }
                    if (x < chess.x && detect_resist(chess.x + 1, chess.y) == 0) { prex += 1; }
                    if (y > chess.y && detect_resist(chess.x, chess.y - 1) == 0) { prey -= 1; }
                    if (y < chess.y && detect_resist(chess.x, chess.y + 1) == 0) { prey += 1; }
                    if (detect_resist(prex, prey) == 0) { setTimeout(function () { chess.x = prex; chess.y = prey; chess.style.left = (chess.x - 1) * 25 + "px"; chess.style.bottom = (chess.y - 1) * 25 + "px"; }, 100) }
                }
                else if (count < 0) {
                    if (x > chess.x && detect_resist(chess.x + 1, chess.y) == 0) { prex += 1; }
                    if (x < chess.x && detect_resist(chess.x - 1, chess.y) == 0) { prex -= 1; }
                    if (y > chess.y && detect_resist(chess.x, chess.y + 1) == 0) { prey += 1; }
                    if (y < chess.y && detect_resist(chess.x, chess.y - 1) == 0) { prey -= 1; }
                    if (detect_resist(prex, prey) == 0) { setTimeout(function () { chess.x = prex; chess.y = prey; chess.style.left = (chess.x - 1) * 25 + "px"; chess.style.bottom = (chess.y - 1) * 25 + "px"; }, 100) }
                }
            }
            else {
                if (dir == 1) { if (detect_resist(chess.x, chess.y + count) == 0) { chess.y += count } }
                if (dir == 2) { if (detect_resist(chess.x + count, chess.y) == 0) { chess.x += count } }
                if (dir == 3) { if (detect_resist(chess.x, chess.y - count) == 0) { chess.y -= count } }
                if (dir == 4) { if (detect_resist(chess.x - count, chess.y) == 0) { chess.x -= count } }
            }
        }
        chess.style.left = (chess.x - 1) * 25 + "px";
        chess.style.bottom = (chess.y - 1) * 25 + "px";
        overall_skill();
        if (form == 1 && count > 1 && dir == 0) { setTimeout(function () { chess.movefunction(id, dir, count - 1, form, source, x, y) }, 150); }
        if (form == 1 && count < -1 && dir == 0) { setTimeout(function () { chess.movefunction(id, dir, count + 1, form, source, x, y) }, 150); }
    }
    chess.hitfunction = function (id, hit_health, hit_max_health, hit_movement, hit_max_movement, hit_reflect, hit_class, hit_target, source, x, y) {//0物1真 0锁敌1锁地 11个值
        var chess = document.getElementById(id);
        chess.health += hit_health * chess.hit_multiply;
        if (hit_health < 0) {
            chess.health += chess.hit_add;
            anim4(chess.x, chess.y, -(hit_health * chess.hit_multiply + chess.hit_add));
        }
        if (hit_health > 0) {
            anim3(chess.x, chess.y, hit_health);
        }
        chess.max_health += hit_max_health;
        chess.movement += hit_movement;
        chess.max_movement += hit_max_movement;
        chess.reflect += hit_reflect;
        if (chess.health > chess.max_health) { chess.health = chess.max_health; }
        if (chess.movement > chess.max_movement) { chess.movement = chess.max_movement; }
        if (chess.health <= 0) { anim5(chess.x, chess.y); document.getElementById("board").removeChild(chess); }
        overall_skill();
    }
    chess.skillfunction = function (id) {
        var chess = document.getElementById(id);
        if (round == chess.data[3] + 2 && active_fixedid == chess.fixedid) {
            var board = document.getElementById("board").children
            for (var i = 0; i < board.length; i++) {
                if ((board[i].fixedid == 1005 || board[i].fixedid == 1006) && (board[i].data[1] == 1) && board[i].class + 1) {
                    board[i].hitfunction(board[i].id, -100, 0, 0, 0, 0, 0, 0, id, chess.x, chess.y)
                }
            }
        }
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 1;//0地块,1人物,2召唤物
    chess.style.zIndex = 5;//地块0,人物5,动画粒子等20+
    chess.data = new Array(1000);//数据
    chess.data[3] = -99;
    //tag

    chess.attack_add = 0;
    chess.attack_multiply = 1;
    chess.hit_add = 0;
    chess.hit_multiply = 1;
    skill1.setAttribute("hidden", "hidden")
    skill2.setAttribute("hidden", "hidden")
    skill3.setAttribute("hidden", "hidden")
    chess.appendChild(skill1);
    chess.appendChild(skill2);
    chess.appendChild(skill3);
    chess.x = x;
    chess.y = y;
    chess.direction = 1;
    chess.skillable = 1;
    chess.movable = 1;
    chess.style.backgroundImage = "url(" + chess.img + ")";
    chess.style.left = (chess.x - 1) * 25 + "px";
    chess.style.bottom = (chess.y - 1) * 25 + "px";
    chess.setAttribute("onclick", "selector(id)")
    document.getElementById("board").appendChild(chess);
    id++;
    overall_skill();
}