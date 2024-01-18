function chess6(x, y) {//红王
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 6;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess.png";
    chess.name = "红王";
    chess.max_health = 10;//1~30 20
    chess.health = 10;
    chess.max_movement = 6;//1~20 5
    chess.movement = 6;
    chess.reflect = 5;//1~20 5   -1不可行动
    skill1.innerHTML = '选择最多5个目标<img height="25px" width="25px" id="input6_1_1" onclick="input(1,id,7)"><img height="25px" width="25px" id="input6_1_2" onclick="input(1,id,7)"><img height="25px" width="25px" id="input6_1_3" onclick="input(1,id,7)"><img height="25px" width="25px" id="input6_1_4" onclick="input(1,id,7)"><img height="25px" width="25px" id="input6_1_5" onclick="input(1,id,7)">拉动2格<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill1_launch()"></button>';
    skill2.innerHTML = '对面朝方向 前一排五格以及再前一排三格 发动一次斩击，造成2点伤害<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill2_launch()"></button>';
    skill3.innerHTML = '选择一个目标<img height="25px" width="25px" id="input6_3_1" onclick="input(1,id,1)">造成1点伤害并将其推动2格。若推动过程中或结束后目标碰到阻挡物则再造成一点伤害；否则技能冷却减一<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill3_launch()"></button>';
    chess.skill1_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill1_cooling <= 0) {
            setTimeout(function () { skill1_1() }, 0);
            setTimeout(function () { skill1_2() }, 0);
            setTimeout(function () { skill1_3() }, 0);
            setTimeout(function () { skill1_4() }, 0);
            setTimeout(function () { skill1_5() }, 0);
            function skill1_1() {
                var input1 = document.getElementById("controller_page3").querySelector("#input6_1_1").value;
                document.getElementById(input1).movefunction(input1, 0, -2, 1, selectid, chess.x, chess.y);
            }
            function skill1_2() {
                var input2 = document.getElementById("controller_page3").querySelector("#input6_1_2").value;
                document.getElementById(input2).movefunction(input2, 0, -2, 1, selectid, chess.x, chess.y);
            }
            function skill1_3() {
                var input3 = document.getElementById("controller_page3").querySelector("#input6_1_3").value;
                document.getElementById(input3).movefunction(input3, 0, -2, 1, selectid, chess.x, chess.y);
            }
            function skill1_4() {
                var input4 = document.getElementById("controller_page3").querySelector("#input6_1_4").value;
                document.getElementById(input4).movefunction(input4, 0, -2, 1, selectid, chess.x, chess.y);
            }
            function skill1_5() {
                var input5 = document.getElementById("controller_page3").querySelector("#input6_1_5").value;
                document.getElementById(input5).movefunction(input5, 0, -2, 1, selectid, chess.x, chess.y);
            }
            chess.skill1_cooling = chess.skill1_max_cooling;
            setTimeout(function () { skill(1) }, 10)
            overall_skill();
        }
    }
    chess.skill2_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill2_cooling <= 0) {
            var board = document.getElementById("board").children;
            var target = new Array(10);
            var num = 0;
            for (var i = 0; i < board.length; i++) {
                var tar = board[i];
                if (chess.direction == 1 && tar.class && ((tar.x == chess.x && tar.y == chess.y + 1) || (tar.x == chess.x && tar.y == chess.y + 2) || (tar.x == chess.x + 1 && tar.y == chess.y + 1) || (tar.x == chess.x - 1 && tar.y == chess.y + 1) || (tar.x == chess.x + 2 && tar.y == chess.y + 1) || (tar.x == chess.x - 2 && tar.y == chess.y + 1) || (tar.x == chess.x + 1 && tar.y == chess.y + 2) || (tar.x == chess.x - 1 && tar.y == chess.y + 2))) { target[num] = tar.id; num++; }
                if (chess.direction == 2 && tar.class && ((tar.x == chess.x + 1 && tar.y == chess.y) || (tar.x == chess.x + 1 && tar.y == chess.y + 1) || (tar.x == chess.x + 1 && tar.y == chess.y - 1) || (tar.x == chess.x + 1 && tar.y == chess.y + 2) || (tar.x == chess.x + 1 && tar.y == chess.y - 2) || (tar.x == chess.x + 2 && tar.y == chess.y + 1) || (tar.x == chess.x + 2 && tar.y == chess.y) || (tar.x == chess.x + 2 && tar.y == chess.y - 1))) { target[num] = tar.id; num++; }
                if (chess.direction == 3 && tar.class && ((tar.x == chess.x && tar.y == chess.y - 1) || (tar.x == chess.x && tar.y == chess.y - 2) || (tar.x == chess.x + 1 && tar.y == chess.y - 1) || (tar.x == chess.x - 1 && tar.y == chess.y - 1) || (tar.x == chess.x + 2 && tar.y == chess.y - 1) || (tar.x == chess.x - 2 && tar.y == chess.y - 1) || (tar.x == chess.x + 1 && tar.y == chess.y - 2) || (tar.x == chess.x - 1 && tar.y == chess.y - 2))) { target[num] = tar.id; num++; }
                if (chess.direction == 4 && tar.class && ((tar.x == chess.x - 1 && tar.y == chess.y) || (tar.x == chess.x - 1 && tar.y == chess.y + 1) || (tar.x == chess.x - 1 && tar.y == chess.y - 1) || (tar.x == chess.x - 1 && tar.y == chess.y + 2) || (tar.x == chess.x - 1 && tar.y == chess.y - 2) || (tar.x == chess.x - 2 && tar.y == chess.y + 1) || (tar.x == chess.x - 2 && tar.y == chess.y) || (tar.x == chess.x - 2 && tar.y == chess.y - 1))) { target[num] = tar.id; num++; }
            }
            for (var i = 0; i < num; i++) {
                document.getElementById(target[i]).hitfunction(target[i], -2, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y)
            }
            chess.skill2_cooling = chess.skill2_max_cooling;
            skill(2);
            overall_skill();
        }
    }
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill3_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input6_3_1").value;
            var target = document.getElementById(input1);
            var bool = 0;//是否撞墙
            target.hitfunction(input1, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y);
            setTimeout(function () { skill3_2(); }, 0)
            setTimeout(function () { target.movefunction(input1, 0, 1, 1, selectid, chess.x, chess.y); }, 0)
            setTimeout(function () { skill3_1() }, 150)
            function skill3_1() {
                skill3_2();
                target.movefunction(input1, 0, 1, 1, selectid, chess.x, chess.y);
            }
            setTimeout(function () { skill3_2() }, 300)
            function skill3_2() {
                if (chess.x > target.x && detect_resist(target.x - 1, target.y) == 1 && bool == 0) { target.hitfunction(input1, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y); bool = 1; }
                if (chess.x < target.x && detect_resist(target.x + 1, target.y) == 1 && bool == 0) { target.hitfunction(input1, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y); bool = 1; }
                if (chess.y > target.y && detect_resist(target.x, target.y - 1) == 1 && bool == 0) { target.hitfunction(input1, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y); bool = 1; }
                if (chess.y < target.y && detect_resist(target.x, target.y + 1) == 1 && bool == 0) { target.hitfunction(input1, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y); bool = 1; }
            }
            chess.skill3_cooling = chess.skill3_max_cooling;
            setTimeout(function () { if (bool == 0) { chess.skill3_cooling -= 1; } skill(3); }, 350)
            overall_skill();
        }
    }
    chess.skill1_src = "./img/skill-2.png";//skill1
    chess.skill1_name = "牵束";
    chess.skill1_max_cooling = 2;
    chess.skill1_cooling = 0;
    chess.skill1_class = 1;//1主动0被动
    chess.skill2_src = "./img/skill-2.png";//skill2
    chess.skill2_name = "斩击";
    chess.skill2_max_cooling = 2;
    chess.skill2_cooling = 2;
    chess.skill2_class = 1;
    chess.skill3_src = "./img/skill-2.png";//skill3
    chess.skill3_name = "鞘击";
    chess.skill3_max_cooling = 2;
    chess.skill3_cooling = 0;
    chess.skill3_class = 1;
    chess.movefunction = function (id, dir, count, form, source, x, y) {//form0主动1被动，主动dir==0视为推拉，自动检测方向，dir不为0则是传送
        var chess = document.getElementById(id);
        if (form == 0 && chess.fixedid == active_fixedid) {
            if (dir == 1) { if (chess.direction == 1) { if (detect_resist(chess.x, chess.y + 1) == 0 && chess.movement >= 1) { chess.y += 1; chess.movement -= 1 } } else { chess.direction = 1; chess.style.transform = "rotate(0deg)"; } }
            if (dir == 2) { if (chess.direction == 2) { if (detect_resist(chess.x + 1, chess.y) == 0 && chess.movement >= 1) { chess.x += 1; chess.movement -= 1 } } else { chess.direction = 2; chess.style.transform = "rotate(90deg)"; } }
            if (dir == 3) { if (chess.direction == 3) { if (detect_resist(chess.x, chess.y - 1) == 0 && chess.movement >= 1) { chess.y -= 1; chess.movement -= 1 } } else { chess.direction = 3; chess.style.transform = "rotate(180deg)"; } }
            if (dir == 4) { if (chess.direction == 4) { if (detect_resist(chess.x - 1, chess.y) == 0 && chess.movement >= 1) { chess.x -= 1; chess.movement -= 1 } } else { chess.direction = 4; chess.style.transform = "rotate(270deg)"; } }
            selector(id, 1);
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
                if (dir == 5) { if (detect_resist(count[0], count[1]) == 0) { chess.x = count[0]; chess.y = count[1]; } }
            }
        }
        chess.style.left = (chess.x - 1) * 25 + "px";
        chess.style.bottom = (chess.y - 1) * 25 + "px";
        overall_skill();
        if (form == 1 && count > 1 && dir == 0) { setTimeout(function () { chess.movefunction(id, dir, count - 1, form, source, x, y) }, 150); }
        if (form == 1 && count < -1 && dir == 0) { setTimeout(function () { chess.movefunction(id, dir, count + 1, form, source, x, y) }, 150); }
    }
    chess.hitfunction = function (id, hit_health, hit_max_health, hit_movement, hit_max_movement, hit_reflect, hit_class, hit_target, source, x, y) {//0物1真，0锁敌1锁地 11个值
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
    chess.skillfunction = function (id) {//全局技能模块
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 1;//0地块,1人物,2召唤物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
    chess.data[1] = 0;//眩晕id
    chess.data[2] = 0;//眩晕人物原反应
    chess.data[3] = -2;//眩晕时回合
    chess.enemy = 0;
    chess.trap = 0;
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
    chess.setAttribute("onclick", "selector(id,0)")
    if (detect_resist(x, y) == 0) { document.getElementById("board").appendChild(chess); }
    id++;
    overall_skill();
}