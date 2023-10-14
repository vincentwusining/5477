function chess1006(x, y) {//名称
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 1006;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess1006.png";
    chess.name = "救治无人机";
    chess.max_health = 3;
    chess.health = 3;
    chess.max_movement = 3;
    chess.movement = 3;
    chess.reflect = 8;
    skill1.innerHTML = '每回合治疗场上所有无人机1点生命';
    skill2.innerHTML = '暴走状态下治疗2点生命，移动+2';
    skill3.innerHTML = '';
    chess.skill1_src = "./img/skill-3.png";//skill1
    chess.skill1_name = "治疗";
    chess.skill1_max_cooling = 0;
    chess.skill1_cooling = 0;
    chess.skill1_class = 0;//1主动0被动
    chess.skill2_src = "./img/skill-3.png";//skill2
    chess.skill2_name = "暴走";
    chess.skill2_max_cooling = 0;
    chess.skill2_cooling = 0;
    chess.skill2_class = 0;
    chess.skill3_src = "./img/skill0.png";//skill3
    chess.skill3_name = "无";
    chess.skill3_max_cooling = 1;
    chess.skill3_cooling = 0;
    chess.skill3_class = 0;
    chess.movefunction = function (id, dir, count, form, source, x, y) {//form1主动0被动，主动dir==0视为推拉，自动检测方向，dir不为0则是传送
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
    chess.skillfunction = function (id) {
        var chess = document.getElementById(id);
        if (chess.data[1] == 1 && chess.data[2] == 0) {
            chess.data[2] = 1;//已加速度
            chess.hitfunction(id, 0, 0, 2, 2, 0, 0, 0, id, chess.x, chess.y);
        }
        if (active_fixedid == chess.fixedid && chess.data[3] != round) {
            var board = document.getElementById("board").children
            chess.data[3] = round;
            for (var i = 0; i < board.length; i++) {
                if ((board[i].fixedid == 1005 || board[i].fixedid == 1006) && board[i].class + 1) {
                    if (chess.data[1] == 0) {
                        board[i].hitfunction(board[i].id, 1, 0, 0, 0, 0, 0, 0, id, chess.x, chess.y)
                    }
                    else {
                        board[i].hitfunction(board[i].id, 2, 0, 0, 0, 0, 0, 0, id, chess.x, chess.y)
                    }
                }
            }
        }
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 1;//0地块,1人物,2召唤物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
    chess.data[1] = 0;
    chess.data[2] = 0;
    chess.data[3] = 0;
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