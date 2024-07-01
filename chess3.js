
function chess3(x, y) {//小道行者
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 3;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess3.png";
    chess.name = "小道行者";
    chess.max_health = 10;
    chess.health = 10;
    chess.max_movement = 5;
    chess.movement = 5;
    chess.reflect = 10;
    skill1.innerHTML = '收到攻击时请求一次移动(不可躲避锁定人物的攻击)';
    skill2.innerHTML = '敌人朝自己移动时对其造成3点伤害';
    skill3.innerHTML = '敌人周围四格全有阻挡时，每回合造成1点伤害。';
    chess.skill1_src = "./img/skill0.png";//skill1
    chess.skill1_name = "闪避";
    chess.skill1_max_cooling = 1;
    chess.skill1_cooling = 0;
    chess.skill1_class = 0;//1主动0被动
    chess.skill2_src = "./img/skill0.png";//skill2
    chess.skill2_name = "不要过来啊";
    chess.skill2_max_cooling = 1;
    chess.skill2_cooling = 0;
    chess.skill2_class = 0;
    chess.skill3_src = "./img/skill0.png";//skill3
    chess.skill3_name = "窒息";
    chess.skill3_max_cooling = 0;
    chess.skill3_cooling = 0;
    chess.skill3_class = 0;
    chess.movefunction = function (id, dir, count, form, source, x, y) {
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
            }
        }
        chess.style.left = (chess.x - 1) * 25 + "px";
        chess.style.bottom = (chess.y - 1) * 25 + "px";
        if (form == 1 && count > 1 && dir == 0) { setTimeout(function () { chess.movefunction(id, dir, count - 1, form, source, x, y) }, 200); }
        if (form == 1 && count < -1 && dir == 0) { setTimeout(function () { chess.movefunction(id, dir, count + 1, form, source, x, y) }, 200); }
    }
    chess.hitfunction = function (id, hit_health, hit_class, source, x, y) {//0物1真 0锁敌1锁地 
        var chess = document.getElementById(id);
        chess.health += hit_health * chess.hit_multiply;
        if (hit_health < 0) {
            chess.health += chess.hit_add;
        }
        chess.max_health += hit_max_health;
        chess.movement += hit_movement;
        chess.max_movement += hit_max_movement;
        chess.reflect += hit_reflect;
        if (chess.health > chess.max_health + chess.effect_sum[10]) { chess.health = chess.max_health + chess.effect_sum[10]; }
        if (chess.movement > chess.max_movement) { chess.movement = chess.max_movement; }
        anim1(chess.x, chess.y);
        if (chess.health <= 0) { document.getElementById("board").removeChild(chess); }
    }
    chess.effectfunction = function (id, x) {
        var chess = document.getElementById(id);
        if (chess.effect_sum[14] == 1) {//免疫
            if (x[0] == 10) {
                chess.effect[chess.effect[0]] = x;
                chess.effect[0]++;
            }
        } else {//不免疫
            if (x[0] == 3) {
                if (chess.effect_sum[11] == 0) {
                    chess.effect[chess.effect[0]] = x;
                    chess.effect[0]++;
                }
            }
            else if (x[0] == 5) {
                if (chess.effect_sum[12] == 0) {
                    chess.effect[chess.effect[0]] = x;
                    chess.effect[0]++;
                }
            }
            else if (x[0] == 11) {
                for (var j = 1; j < chess.effect[0]; j++) {
                    if (chess.effect[j][0] == 2) {
                        chess.effect[0]--;
                        for (var k = j; k < chess.effect[0]; k++) {
                            chess.effect[k] = chess.effect[k + 1];
                        }
                        j--;
                    }
                }
            }
            else if (x[0] == 12) {
                for (var j = 1; j < chess.effect[0]; j++) {
                    if (chess.effect[j][0] == 3) {
                        chess.effect[0]--;
                        for (var k = j; k < chess.effect[0]; k++) {
                            chess.effect[k] = chess.effect[k + 1];
                        }
                        j--;
                    }
                }
            }
            else {
                chess.effect[chess.effect[0]] = x;
                chess.effect[0]++;
            }

            //重新计算
            for (var j = 1; j <= 15; j++) {
                chess.effect_sum[j] = 0;
            }
            for (var j = 1; j < chess.effect[0]; j++) {
                if (chess.effect[j][0] == 1) {
                    chess.effect_sum[1] -= chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 2) {
                    chess.effect_sum[1] += chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 3) {
                    chess.effect_sum[2] = 1;
                }
                else if (chess.effect[j][0] == 5) {
                    chess.effect_sum[3] = 1;
                }
                else if (chess.effect[j][0] == 7) {
                    chess.effect_sum[4] += chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 8) {
                    chess.effect_sum[5] += chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 9) {
                    chess.effect_sum[6] = 1;
                }
                else if (chess.effect[j][0] == 11) {
                    chess.effect_sum[7] += chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 12) {
                    chess.effect_sum[7] -= chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 13) {
                    chess.effect_sum[8] += chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 14) {
                    chess.effect_sum[8] -= chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 15) {
                    chess.effect_sum[9] += chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 16) {
                    chess.effect_sum[9] -= chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 17) {
                    chess.effect_sum[10] += chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 18) {
                    chess.effect_sum[10] -= chess.effect[j][1];
                }
                else if (chess.effect[j][0] == 4) {
                    chess.effect_sum[11] = 1;
                }
                else if (chess.effect[j][0] == 6) {
                    chess.effect_sum[12] = 1;
                }
            }
        }
    }
    chess.skillfunction = function (id) {
        var chess = document.getElementById("board").children;//窒息
        var self = document.getElementById(id);
        if (round > self.data[0]) {
            for (var i = 1; i <= 1000; i++) {
                self.data[i] = 0;
            }
            self.data[0] = round;
        }
        for (var i = 0; i < chess.length; i++) {
            var x = chess[i].x;
            var y = chess[i].y;
            if (chess[i].class != 0 && detect_resist(x, y - 1) == 1 && detect_resist(x, y + 1) == 1 && detect_resist(x + 1, y) == 1 && detect_resist(x - 1, y) == 1 && self.data[chess[i].id] == 0) {
                self.data[chess[i].id] = 1;
                hit(chess[i].id, -1, 0, id, x, y);
            }
        }
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 1;//0地块,1人物,2召唤物3障碍物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
    chess.data[0] = 0;
    chess.enemy = 0;
    chess.trap = 0;
    chess.effect = new Array(300);//0为index索引。特殊效果 ：1防御、2脆弱、3昏厥、4坚毅（无法被眩晕）、5束缚、6大型（无法被束缚）、7泥沼（移动耗费增加）、8火毒（持续掉血）、9超重（无法被推拉）、10免疫（免疫所有特殊效果）、11攻击+、12攻击-、13反应+、14反应-、15移动+、16移动- 、17最大生命+、18最大生命-
    chess.effect_sum = new Array(30);//1受伤改动2昏厥3束缚4泥沼5火毒6超重7攻击改动8反应改动9移动改动10最大生命改动11坚毅12大型14免疫
    chess.effect[0] = 1;
    chess.range_display_array = [];//选择人物时范围演示
    chess.range_display_arrayA = [];//选择技能时范围演示
    chess.range_display_arrayB = [];//选择技能时范围演示
    chess.range_display_arrayC = [];//选择技能时范围演示
    //tag

    for (var i = 0; i <= 25; i++) {
        chess.effect_sum[i] = 0;
    }

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
