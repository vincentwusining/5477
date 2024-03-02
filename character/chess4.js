
function chess4(x, y) {//狂刀
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 4;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess4.png";
    chess.name = "狂刀";
    chess.max_health = 10;//1~30 20
    chess.health = 10;
    chess.max_movement = 7;//1~20 5
    chess.movement = 7;
    chess.reflect = 7;//1~20 5   -1不可行动
    skill1.innerHTML = '选择一个目标<img height="25px" width="25px" id="input4_1_1" onclick="input(1,id,16)">若之间无障碍且移动足够，消耗对应移动冲刺至目标前，造成3点伤害，并击退1格<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill1_launch()"></button>';
    skill2.innerHTML = '消耗7点移动，使下回合额外增加3点移动、冲锋伤害增加1点<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill2_launch()"></button>';
    skill3.innerHTML = '受伤时，若移动足够，消耗3点移动抵挡1点伤害并对攻击者造成1点伤害';
    chess.skill1_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill1_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input4_1_1").value;
            var target = document.getElementById(input1);
            if (target.x > chess.x) {
                var n = Math.abs(target.x - chess.x);
                if (chess.movement >= n - 1) {
                    var num = 0;
                    for (var i = 1; i < n; i++) {
                        if (detect_resist(chess.x + i, chess.y) != 0) {
                            num++;
                        }
                    }
                    if (num == 0) {
                        if (chess.direction != 2) {
                            chess.movefunction(chess.id, 2, 1, 0, 0, 0, 0);
                        }
                        for (var i = 1; i < n; i++) {
                            setTimeout(function () { chess.movefunction(chess.id, 2, 1, 0, 0, 0, 0) }, (i - 1) * 50);
                        }
                        var damage = -3;
                        if (chess.data[1] == 1 && round == chess.data[2] + 1) { damage--; }
                        setTimeout(function () { hit(input1, damage, 0, selectid, chess.x, chess.y) }, n * 50);
                        setTimeout(function () { target.movefunction(input1, 0, 1, 1, selectid, chess.x, chess.y) }, n * 50);
                        chess.skill1_cooling = chess.skill1_max_cooling;
                    }
                }
            }
            if (target.x < chess.x) {
                var n = Math.abs(target.x - chess.x);
                if (chess.movement >= n - 1) {
                    var num = 0;
                    for (var i = 1; i < n; i++) {
                        if (detect_resist(chess.x - i, chess.y) != 0) {
                            num++;
                        }
                    }
                    if (num == 0) {
                        if (chess.direction != 4) {
                            chess.movefunction(chess.id, 4, 1, 0, 0, 0, 0);
                        }
                        for (var i = 1; i < n; i++) {
                            setTimeout(function () { chess.movefunction(chess.id, 4, 1, 0, 0, 0, 0) }, (i - 1) * 50);
                        }
                        var damage = -3;
                        if (chess.data[1] == 1 && round == chess.data[2] + 1) { damage--; }
                        setTimeout(function () { hit(input1, damage, 0, selectid, chess.x, chess.y) }, n * 50);
                        setTimeout(function () { target.movefunction(input1, 0, 1, 1, selectid, chess.x, chess.y) }, n * 50);
                        chess.skill1_cooling = chess.skill1_max_cooling;
                    }
                }
            }
            if (target.y > chess.y) {
                var n = Math.abs(target.y - chess.y);
                if (chess.movement >= n - 1) {
                    var num = 0;
                    for (var i = 1; i < n; i++) {
                        if (detect_resist(chess.x, chess.y + i) != 0) {
                            num++;
                        }
                    }
                    if (num == 0) {
                        if (chess.direction != 1) {
                            chess.movefunction(chess.id, 1, 1, 0, 0, 0, 0);
                        }
                        for (var i = 1; i < n; i++) {
                            setTimeout(function () { chess.movefunction(chess.id, 1, 1, 0, 0, 0, 0) }, (i - 1) * 50);
                        }
                        var damage = -3;
                        if (chess.data[1] == 1 && round == chess.data[2] + 1) { damage--; }
                        setTimeout(function () { hit(input1, damage, 0, selectid, chess.x, chess.y) }, n * 50);
                        setTimeout(function () { target.movefunction(input1, 0, 1, 1, selectid, chess.x, chess.y) }, n * 50);
                        chess.skill1_cooling = chess.skill1_max_cooling;
                    }
                }
            }
            if (target.y < chess.y) {
                var n = Math.abs(target.y - chess.y);
                if (chess.movement >= n - 1) {
                    var num = 0;
                    for (var i = 1; i < n; i++) {
                        if (detect_resist(chess.x, chess.y - i) != 0) {
                            num++;
                        }
                    }
                    if (num == 0) {
                        if (chess.direction != 3) {
                            chess.movefunction(chess.id, 3, 1, 0, 0, 0, 0);
                        }
                        for (var i = 1; i < n; i++) {
                            setTimeout(function () { chess.movefunction(chess.id, 3, 1, 0, 0, 0, 0) }, (i - 1) * 50);
                        }
                        var damage = -3;
                        if (chess.data[1] == 1 && round == chess.data[2] + 1) { damage--; }
                        setTimeout(function () { hit(input1, damage, 0, selectid, chess.x, chess.y) }, n * 50);
                        setTimeout(function () { target.movefunction(input1, 0, 1, 1, selectid, chess.x, chess.y) }, n * 50);
                        chess.skill1_cooling = chess.skill1_max_cooling;
                    }
                }
            }
            selector(selectid, 1); skill(1);
            overall_skill();
        } else if (chess.fixedid != active_fixedid) {
            alert('无法行动：非此角色的行动回合');
        } else if (chess.skill1_cooling > 0) {
            alert('技能尚未冷却!');
        }
    }
    chess.skill2_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill2_cooling <= 0) {
            if (chess.movement >= 7) {
                chess.movement -= 7;
                chess.data[1] = 1;//蓄势
                chess.data[2] = round;//回合
                chess.data[3] = 1;//是否加过移动1否0是
                selector(chess.id, 1);
                chess.skill2_cooling = chess.skill2_max_cooling;
                selector(selectid, 1); skill(2);
            }
            overall_skill();
        } else if (chess.fixedid != active_fixedid) {
            alert('无法行动：非此角色的行动回合');
        } else if (chess.skill2_cooling > 0) {
            alert('技能尚未冷却!');
        }
    }
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill3_cooling <= 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input0_3_1").value;
            chess.skill3_cooling = chess.skill3_max_cooling;
            selector(selectid, 1); skill(3);
            overall_skill();
        } else if (chess.fixedid != active_fixedid) {
            alert('无法行动：非此角色的行动回合');
        } else if (chess.skill3_cooling > 0) {
            alert('技能尚未冷却!');
        }
    }
    chess.skill1_src = "./img/skill-2.png";//skill1
    chess.skill1_name = "冲锋";
    chess.skill1_max_cooling = 1;
    chess.skill1_cooling = 0;
    chess.skill1_class = 1;//1主动0被动
    chess.skill2_src = "./img/skill-2.png";//skill2
    chess.skill2_name = "蓄势";
    chess.skill2_max_cooling = 1;
    chess.skill2_cooling = 0;
    chess.skill2_class = 1;
    chess.skill3_src = "./img/skill-3.png";//skill3
    chess.skill3_name = "刀反";
    chess.skill3_max_cooling = 0;
    chess.skill3_cooling = 0;
    chess.skill3_class = 0;
    chess.movefunction = function (id, dir, count, form, source, x, y) {//form0主动1被动，主动dir==0视为推拉，自动检测方向，dir不为0则是传送,dir5为定点传送
        var chess = document.getElementById(id);
        if (state != 0) {
            input(3);
        }
        if (form == 0 && chess.fixedid == active_fixedid && chess.effect_sum[2] == 0) {//走路
            var move_decrease = 1 + chess.effect_sum[4];
            if (dir == 1) { if (chess.direction == 1 || turn == 0) { if (detect_resist(chess.x, chess.y + 1) == 0 && chess.movement >= move_decrease && chess.effect_sum[3] == 0) { chess.y += 1; chess.movement -= move_decrease } } else { chess.direction = 1; chess.style.transform = "rotate(0deg)"; } }
            if (dir == 2) { if (chess.direction == 2 || turn == 0) { if (detect_resist(chess.x + 1, chess.y) == 0 && chess.movement >= move_decrease && chess.effect_sum[3] == 0) { chess.x += 1; chess.movement -= move_decrease } } else { chess.direction = 2; chess.style.transform = "rotate(90deg)"; } }
            if (dir == 3) { if (chess.direction == 3 || turn == 0) { if (detect_resist(chess.x, chess.y - 1) == 0 && chess.movement >= move_decrease && chess.effect_sum[3] == 0) { chess.y -= 1; chess.movement -= move_decrease } } else { chess.direction = 3; chess.style.transform = "rotate(180deg)"; } }
            if (dir == 4) { if (chess.direction == 4 || turn == 0) { if (detect_resist(chess.x - 1, chess.y) == 0 && chess.movement >= move_decrease && chess.effect_sum[3] == 0) { chess.x -= 1; chess.movement -= move_decrease } } else { chess.direction = 4; chess.style.transform = "rotate(270deg)"; } }
            selector(id, 1);
        }
        else if (form == 1) {//推拉\传送
            if (dir == 0) {//推拉
                if (chess.effect_sum[6] == 0) {
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
    chess.hitfunction = function (id, hit_health, hit_class, source, x, y) {//0物1真 0锁敌1锁地 
        var chess = document.getElementById(id);
        if (hit_health < 0) {
            hit_health += chess.effect_sum[1];
            if (hit_health < 0) {
                if (chess.movement >= 3) {
                    chess.movement -= 3
                    hit_health++;
                    hit(source, -1, 0, selectid, chess.x, chess.y);
                }
                if (hit_health < 0) {
                    chess.health += hit_health;
                    anim4(chess.x, chess.y, -(hit_health));
                }
            }
        }
        else if (hit_health > 0) {
            anim3(chess.x, chess.y, hit_health);
        }
        if (chess.health > chess.max_health) { chess.health = chess.max_health; }
        if (chess.health <= 0) { anim5(chess.x, chess.y); document.getElementById("board").removeChild(chess); }
        overall_skill();
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
            else if (x[0] == 19) {
                if (chess.effect_sum[20] == 0) {
                    chess.effect[chess.effect[0]] = x;
                    chess.effect[0]++;
                }
            }
            else if (x[0] == 4) {
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
            else if (x[0] == 6) {
                for (var j = 1; j < chess.effect[0]; j++) {
                    if (chess.effect[j][0] == 5) {
                        chess.effect[0]--;
                        for (var k = j; k < chess.effect[0]; k++) {
                            chess.effect[k] = chess.effect[k + 1];
                        }
                        j--;
                    }
                }
            }
            else if (x[0] == 20) {
                for (var j = 1; j < chess.effect[0]; j++) {
                    if (chess.effect[j][0] == 19) {
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
                if (chess[i].effect[j][0] == 1) {
                    chess[i].effect_sum[1] -= chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 2) {
                    chess[i].effect_sum[1] += chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 3) {
                    chess[i].effect_sum[2] = 1;
                } else if (chess[i].effect[j][0] == 5) {
                    chess[i].effect_sum[3] = 1;
                } else if (chess[i].effect[j][0] == 7) {
                    chess[i].effect_sum[4] += chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 8) {
                    chess[i].effect_sum[5] += chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 9) {
                    chess[i].effect_sum[6] = 1;
                } else if (chess[i].effect[j][0] == 11) {
                    chess[i].effect_sum[7] += chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 12) {
                    chess[i].effect_sum[7] -= chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 13) {
                    chess[i].effect_sum[8] += chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 14) {
                    chess[i].effect_sum[8] -= chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 15) {
                    chess[i].effect_sum[9] += chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 16) {
                    chess[i].effect_sum[9] -= chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 17) {
                    chess[i].effect_sum[10] += chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 18) {
                    chess[i].effect_sum[10] -= chess[i].effect[j][1];
                } else if (chess[i].effect[j][0] == 4) {
                    chess[i].effect_sum[11] = 1;
                } else if (chess[i].effect[j][0] == 6) {
                    chess[i].effect_sum[12] = 1;
                } else if (chess[i].effect[j][0] == 19) {
                    chess[i].effect_sum[13] = 1;
                } else if (chess[i].effect[j][0] == 20) {
                    chess[i].effect_sum[15] = 1;
                }
            }
        }
    }
    chess.skillfunction = function (id) {//全局技能模块
        var chess = document.getElementById(id);
        if (chess.data[1] == 1 && round == chess.data[2] + 1 && chess.data[3] == 1) {
            chess.movement += 3;
            chess.data[3]--;
        }
        if (round > chess.data[2] + 1) {
            chess.data[1] = 0;
            chess.data[2] = 0;
        }
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 1;//0地块,1人物,2召唤物3障碍物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
    chess.data[1] = 0;
    chess.data[2] = 0;
    chess.enemy = 0;
    chess.trap = 0;
    chess.effect = new Array(300);//0为index索引。特殊效果 ：1防御、2脆弱、3昏厥、4坚毅（无法被眩晕）、5束缚、6大型（无法被束缚）、7泥沼（移动耗费增加）、8火毒（持续掉血）、9超重（无法被推拉）、10免疫（免疫所有特殊效果）、11攻击+、12攻击-、13反应+、14反应-、15移动+、16移动- 、17最大生命+、18最大生命-、19缴械、20武装（无法被缴械）
    chess.effect_sum = new Array(30);//1受伤改动2昏厥3束缚4泥沼5火毒6超重7攻击改动8反应改动9移动改动10最大生命改动11坚毅12大型13缴械14免疫15武装
    chess.effect[0] = 1;
    //tag

    for (var i = 0; i <= 25; i++) {
        chess.effect_sum[i] = 0;
    }
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