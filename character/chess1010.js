function chess1010(x, y) {//草史莱姆AI
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 1010;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess1010.png";
    chess.name = "草史莱姆";
    chess.max_health = 2;//1~30 20
    chess.health = 2;
    chess.max_movement = 4;//1~20 5
    chess.movement = 4;
    chess.reflect = 5;//1~20 5   -1不可行动
    skill1.innerHTML = '选择一个目标<img height="25px" width="25px" id="input1010_1_1" onclick="input(1,id,1)">造成一点伤害<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill1_launch()"></button>';
    skill2.innerHTML = '';
    skill3.innerHTML = '配备<p  class="md" onclick="alert(\'索敌模块：选择就近敌人\') ">就近 </p><p class="md" onclick="alert(\'定位模块：超敌人靠近\')">近战 </p><p class="md" onclick="alert(\'寻路模块：能直接抵达时总是绕路，避开陷阱。不能直接抵达则寻找所需攻击最少的路劲\')">懦弱 </p><p class="md" onclick="alert(\'性格模块：不可攻击队友\')">团结 </p><p class="md" onclick="alert(\'随机模块：在决定是否移动/移动方向/是否攻击时 有5%可能不按照计划行动\')">清醒 </p>';
    chess.skill1_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill1_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input1010_1_1").value;
            document.getElementById(input1).hitfunction(input1, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y)
            chess.skill1_cooling = chess.skill1_max_cooling;
            skill(1);
            overall_skill();
        }
    }
    chess.skill2_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill2_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input0_2_1").value;
            chess.skill2_cooling = chess.skill2_max_cooling;
            skill(2);
            overall_skill();
        }
    }
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill3_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input0_3_1").value;
            chess.skill3_cooling = chess.skill3_max_cooling;
            skill(3);
            overall_skill();
        }
    }
    chess.skill1_src = "./img/skill-2.png";//skill1
    chess.skill1_name = "攻击";
    chess.skill1_max_cooling = 1;
    chess.skill1_cooling = 0;
    chess.skill1_class = 1;//1主动0被动
    chess.skill2_src = "./img/skill0.png";//skill2
    chess.skill2_name = "无";
    chess.skill2_max_cooling = 1;
    chess.skill2_cooling = 0;
    chess.skill2_class = 0;
    chess.skill3_src = "./img/skillAI.png";//skill3
    chess.skill3_name = "AI";
    chess.skill3_max_cooling = 0;
    chess.skill3_cooling = 0;
    chess.skill3_class = 0;
    chess.movefunction = function (id, dir, count, form, source, x, y) {//form0主动1被动，主动dir==0视为推拉，自动检测方向，dir不为0则是传送,5为定点传送
        var chess = document.getElementById(id);
        if (form == 0 && chess.fixedid == active_fixedid) {//走路
            if (dir == 1) { if (chess.direction == 1) { if (detect_resist(chess.x, chess.y + 1) == 0 && chess.movement >= 1) { chess.y += 1; chess.movement -= 1 } } else { chess.direction = 1; chess.style.transform = "rotate(0deg)"; } }
            if (dir == 2) { if (chess.direction == 2) { if (detect_resist(chess.x + 1, chess.y) == 0 && chess.movement >= 1) { chess.x += 1; chess.movement -= 1 } } else { chess.direction = 2; chess.style.transform = "rotate(90deg)"; } }
            if (dir == 3) { if (chess.direction == 3) { if (detect_resist(chess.x, chess.y - 1) == 0 && chess.movement >= 1) { chess.y -= 1; chess.movement -= 1 } } else { chess.direction = 3; chess.style.transform = "rotate(180deg)"; } }
            if (dir == 4) { if (chess.direction == 4) { if (detect_resist(chess.x - 1, chess.y) == 0 && chess.movement >= 1) { chess.x -= 1; chess.movement -= 1 } } else { chess.direction = 4; chess.style.transform = "rotate(270deg)"; } }
            selector(id, 1);
        }
        else if (form == 1) {//推拉\传送
            if (dir == 0) {//推拉
                var prex = chess.x;
                var prey = chess.y;
                if (count > 0) {//推
                    if (x > chess.x && detect_resist(chess.x - 1, chess.y) == 0) { prex -= 1; }
                    if (x < chess.x && detect_resist(chess.x + 1, chess.y) == 0) { prex += 1; }
                    if (y > chess.y && detect_resist(chess.x, chess.y - 1) == 0) { prey -= 1; }
                    if (y < chess.y && detect_resist(chess.x, chess.y + 1) == 0) { prey += 1; }
                    if (detect_resist(prex, prey) == 0) { setTimeout(function () { chess.x = prex; chess.y = prey; chess.style.left = (chess.x - 1) * 25 + "px"; chess.style.bottom = (chess.y - 1) * 25 + "px"; }, 100) }
                }
                else if (count < 0) {//拉
                    if (x > chess.x && detect_resist(chess.x + 1, chess.y) == 0) { prex += 1; }
                    if (x < chess.x && detect_resist(chess.x - 1, chess.y) == 0) { prex -= 1; }
                    if (y > chess.y && detect_resist(chess.x, chess.y + 1) == 0) { prey += 1; }
                    if (y < chess.y && detect_resist(chess.x, chess.y - 1) == 0) { prey -= 1; }
                    if (detect_resist(prex, prey) == 0) { setTimeout(function () { chess.x = prex; chess.y = prey; chess.style.left = (chess.x - 1) * 25 + "px"; chess.style.bottom = (chess.y - 1) * 25 + "px"; }, 100) }
                }
            }
            else {//传送
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
        var chess = document.getElementById(id);
        var board = document.getElementById("board").children;
        if (chess.fixedid == active_fixedid) {
            selector(id, 1);
            var target_id = 0;
            if (chess.data[1] == 1) {//就近
                var tid = 0;//tempid
                var tdistance = 9999;//tempdistance
                for (var i = 0; i < board.length; i++) {
                    if (board[i].class != 0 && board[i].enemy != 1 && Math.abs(board[i].x - chess.x) + Math.abs(board[i].y - chess.y) < tdistance) {
                        tid = board[i].id;
                        tdistance = Math.abs(board[i].x - chess.x) + Math.abs(board[i].y - chess.y);
                    }
                }
                target_id = tid;
            }
            else if (chess.data[1] == 2) {//算计

            }
            else if (chess.data[1] == 3) {//斩首
                var tid = 0;//tempid
                var thealth = 9999;//temphealth
                for (var i = 0; i < board.length; i++) {
                    if (board[i].class == 1 && chess.enemy != 1 && board[i].health < thealth) {
                        tid = board[i].id;
                        thealth = board[i].health;
                    }
                }
                target_id = tid;
            }
            var target = document.getElementById(target_id);//以上确定目标
            alert(5)
            if (chess.data[2] == 1) {
                var next = [[0, 1], [1, 0], [0, -1], [-1, 0]];
                var road = [99999, 0, 99999, 999999, 99999]//步数 方向 攻击 攻击停留 陷阱
                for (var i = 0; i <= 3; i++) {//走四个方向
                    //  alert(chess.x); alert(chess.y); alert(target.x + next[i][0]); alert(target.y + next[i][1]); alert(chess.max_movement); alert(chess.data[4] - 1); alert(chess.data[3]);
                    var temproad = route(chess.x, chess.y, target.x + next[i][0], target.y + next[i][1], chess.max_movement, 1, chess.data[4] - 1, chess.data[3]);
                    if (chess.data[3] == 1) {//懦弱
                        if (temproad[3] < road[3]) {
                            road = temproad;
                        }
                        else if (temproad[5] < road[5]) {
                            road = temproad;
                        }
                        else if (temproad[1] < road[1]) {
                            road = temproad;
                        }
                    }
                    if (chess.data[3] == 2) { }
                    if (chess.data[3] == 3) { }
                }
            }
            else if (chess.data[2] == 2) { }
            else if (chess.data[2] == 3) { }
            var dir = road[1];//以上确定下一步方向
            var next = [[0, 0], [0, 1], [1, 0], [0, -1], [-1, 0]];
            var bool = 0;//是否为障碍
            alert(4)
            for (var i = 0; i < board.length; i++) {
                if (board[i].x == chess.x + next[dir][0] && board[i].y == chess.y + next[dir][1] && board[i].class != 0) {
                    bool = 1;
                }
            }
            alert(3)
            if (bool == 1) {
                alert(2)
            }
            else {
                alert(1)
                controller(2);
                document.getElementById(selectid).movefunction(selectid, dir, 1, 0, 0, 0, 0)
            }
        }
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 1;//0地块,1人物,2召唤物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
    chess.data[1] = 1;//索敌1就近2算计3斩首
    chess.data[2] = 1;//定位1近战2远战3场外
    chess.data[3] = 1;//寻路1懦弱2演算3莽撞
    chess.data[4] = 1;//性格1团结2暴虐
    chess.data[5] = 4;//随机1随性2失心3马虎4清醒5严明
    chess.enemy = 1;
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