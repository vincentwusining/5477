function chess9(x, y) {//定神游
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 9;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess9.png";
    chess.name = "定神游";
    chess.max_health = 17;//1~30 20
    chess.health = 17;
    chess.max_movement = 4;//1~20 5
    chess.movement = 4;
    chess.reflect = 6;//1~20 5   -1不可行动
    skill1.innerHTML = '移动归0，进入神游状态：最大移动+4，行动结束后立刻回到原位。（神游状态下发动 退出神游状态并回到原位）<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill1_launch()"></button>';
    skill2.innerHTML = '选择一个目标<img height="25px" width="25px" id="input9_2_1" onclick="input(1,id,3)">造成1一点伤害并施加神游印记。（神游状态下发动 传送至前方第三格）<button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill2_launch()"></button>';
    skill3.innerHTML = '击退范围内所有敌人两格（神游状态下发动 对范围内的敌人造成1点伤害，但对神游印记标记的敌人造成3点伤害并消除神游印记）范围演示：<img height="25px" width="25px" id="input9_3_1" onclick="input(1,id,13)"><button style="position: absolute;right: 0px;bottom: 0px;height: 25px;width:25px;" onclick="document.getElementById(selectid).skill3_launch()"></button>';
    chess.skill1_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill1_cooling <= 0) {
            if (chess.data[1] == 0) {//非神游
                chess.data[1] = 1;
                chess.movement = 0;
                chess.max_movement += 4;
            }
            else {//神游
                chess.data[1] = 0;
                chess.movement = 0;
                chess.max_movement -= 4;
                chess.x = chess.data[4];
                chess.y = chess.data[5];
                chess.style.left = (chess.x - 1) * 25 + "px";
                chess.style.bottom = (chess.y - 1) * 25 + "px";
            }
            chess.skill1_cooling = chess.skill1_max_cooling;
            selector(selectid);
            skill(1);
            overall_skill();
        }
    }
    chess.skill2_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill2_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input9_2_1").value;
            if (chess.data[1] == 0) {//非神游
                document.getElementById(input1).hitfunction(input1, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y);
                for (var i = 1; i <= 100; i++) {
                    if (chess.data[2][i] == 0) {
                        chess.data[2][i] = input1;
                        chess.data[2][i + 1] = 0;
                        break;
                    }
                }
            }
            else {//神游
                document.getElementById(selectid).movefunction(selectid, chess.direction, 3, 1, selectid, chess.x, chess.y);
            }
            chess.skill2_cooling = chess.skill2_max_cooling;
            skill(2);
            overall_skill();
        }
    }
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill3_cooling <= 0) {
            var board = document.getElementById("board").children;
            if (chess.data[1] == 0) {//非神游
                for (var i = 0; i < board.length; i++) {
                    if (board[i].class == 0) { continue; }
                    var dx = Math.abs(chess.x - board[i].x);
                    var dy = Math.abs(chess.y - board[i].y);
                    var abs_diff = dx + dy;
                    if (dx <= 2 && dy <= 2 && abs_diff <= 3 && abs_diff != 0) {
                        board[i].movefunction(board[i].id, 0, 2, 1, selectid, chess.x, chess.y);
                    }
                }
            }
            else {//神游
                for (var i = 0; i < board.length; i++) {
                    if (board[i].class == 0) { continue; }
                    var dx = Math.abs(chess.x - board[i].x);
                    var dy = Math.abs(chess.y - board[i].y);
                    var abs_diff = dx + dy;
                    if (dx <= 2 && dy <= 2 && abs_diff <= 3 && abs_diff != 0) {
                        var bool = 0;
                        for (var j = 1; chess.data[2][j] != 0; j++) {
                            if (chess.data[2][j] == board[i].id && bool == 0) {
                                bool = 1;
                                chess.data[2][j] = 0
                            }
                            else if (bool == 1) {
                                chess.data[2][j - 1] = chess.data[2][j];
                                chess.data[2][j] = 0;
                            }
                        }
                        if (bool == 1) {
                            board[i].hitfunction(board[i].id, -3, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y);
                        }
                        else {
                            board[i].hitfunction(board[i].id, -1, 0, 0, 0, 0, 0, 0, selectid, chess.x, chess.y);
                        }
                    }
                }
            }
            chess.skill3_cooling = chess.skill3_max_cooling;
            skill(3);
            overall_skill();
        }
    }
    chess.skill1_src = "./img/skill-2.png";//skill1
    chess.skill1_name = "定";
    chess.skill1_max_cooling = 1;
    chess.skill1_cooling = 0;
    chess.skill1_class = 1;//1主动0被动
    chess.skill2_src = "./img/skill-2.png";//skill2
    chess.skill2_name = "神游";
    chess.skill2_max_cooling = 1;
    chess.skill2_cooling = 0;
    chess.skill2_class = 1;
    chess.skill3_src = "./img/skill-2.png";//skill3
    chess.skill3_name = "仙";
    chess.skill3_max_cooling = 1;
    chess.skill3_cooling = 0;
    chess.skill3_class = 1;
    chess.movefunction = function (id, dir, count, form, source, x, y) {//form0主动1被动，主动dir==0视为推拉，自动检测方向，dir不为0则是传送
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
        if (chess.data[3] == 0 && chess.fixedid == active_fixedid && chess.data[1] == 1) {//开始行动且在神游状态
            chess.data[3] = 1;
            chess.data[4] = chess.x;
            chess.data[5] = chess.y;
        }
        else if (chess.data[3] == 1 && chess.fixedid != active_fixedid) {//结束行动
            chess.data[3] = 0;
            if (chess.data[1] == 1) {
                chess.x = chess.data[4];
                chess.y = chess.data[5];
                chess.style.left = (chess.x - 1) * 25 + "px";
                chess.style.bottom = (chess.y - 1) * 25 + "px";
            }
        }
    }

    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 1;//0地块,1人物,2召唤物
    chess.style.zIndex = 5;//地块0,人物5,动画粒子等20+
    chess.data = new Array(1000);//数据
    chess.data[1] = 0;//神游1
    chess.data[2] = new Array(100);//神游印记1开始
    chess.data[2][1] = 0;
    chess.data[3] = 0; //记录开始行动
    chess.data[4] = 0; //记录x
    chess.data[5] = 0; //记录y
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