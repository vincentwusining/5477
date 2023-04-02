function chess1(x, y) {//勇者
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    chess.fixedid = 1;
    chess.img = "./img/chess1.png";
    chess.name = "勇士";
    chess.max_health = 2;
    chess.health = 2;
    chess.max_movement = 20;
    chess.movement = 20;
    chess.reflect = 20;
    skill1.innerHTML = '选择周围四格内目标<img height="25px" width="25px" id="input1_1_1" onclick="input(1,id,1)">造成5点伤害<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill1_launch()"></button>';
    skill2.innerHTML = '选择曼哈顿距离小于7的目标<img height="25px" width="25px" id="input1_2_1" onclick="input(1,id,7)">造成2点伤害<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill2_launch()"></button>';
    skill3.innerHTML = '选择全屏目标<img height="25px" width="25px" id="input1_3_1" onclick="input(1,id,2)">(选填)将其推动3格。选择全屏目标<img height="25px" width="25px" id="input1_3_2" onclick="input1(id,2)">(选填))将其拉动2格<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill3_launch()"></button>';
    chess.skill1_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill1_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input1_1_1").value;
            var target = document.getElementById(input1);
            chess.skill1_cooling = chess.skill1_max_cooling;
            target.hitfunction(input1, -5, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y);
            skill(1);
        }
    }
    chess.skill2_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill2_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input1_2_1").value;
            var target = document.getElementById(input1);
            setTimeout(function () { target.hitfunction(input1, -2, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y) }, 150)
            anim2(chess.x, chess.y, target.x, target.y);
            chess.skill2_cooling = chess.skill2_max_cooling;
            skill(2);
        }
    }
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill3_cooling <= 0) {
            setTimeout(function () { skill3_1() }, 0);
            setTimeout(function () { skill3_2() }, 0);
            function skill3_1() {
                var input1 = document.getElementById("controller_page3").querySelector("#input1_3_1").value;
                var target1 = document.getElementById(input1);
                target1.movefunction(input1, 0, 3, 1, selectid, chess.x, chess.y);
                chess.skill3_cooling = chess.skill3_max_cooling;
            }
            function skill3_2() {
                var input2 = document.getElementById("controller_page3").querySelector("#input1_3_2").value;
                var target2 = document.getElementById(input2);
                target2.movefunction(input2, 0, -2, 1, selectid, chess.x, chess.y);
                chess.skill3_cooling = chess.skill3_max_cooling;
            }
            setTimeout(function () { skill(3); }, 10);
        }
    }
    chess.skill1_src = "./img/skill1.1.png";//skill1
    chess.skill1_name = "攻击";
    chess.skill1_max_cooling = 1;
    chess.skill1_cooling = 0;
    chess.skill1_class = 1;
    chess.skill2_src = "./img/skill1.2.png";//skill2
    chess.skill2_name = "远程攻击";
    chess.skill2_max_cooling = 2;
    chess.skill2_cooling = 0;
    chess.skill2_class = 1;
    chess.skill3_src = "./img/skill1.3.png";//skill3
    chess.skill3_name = "超级水泵";
    chess.skill3_max_cooling = 1;
    chess.skill3_cooling = 0;
    chess.skill3_class = 1;
    chess.movefunction = function (id, dir, count, form, source, x, y) {
        var chess = document.getElementById(id);
        if (form == 0 && chess.fixedid == active_fixedid) {
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
    chess.hitfunction = function (id, hit_health, hit_max_health, hit_movement, hit_max_movement, hit_reflect, hit_class, hit_target, source, x, y) {
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
    chess.skillfunction = function (id) { }
    chess.resist = 1;
    chess.class = 1;
    chess.style.zIndex = 5;
    chess.data = new Array(1000);//数据
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