function chess1010(x, y) {//草史莱姆
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
    skill1.innerHTML = '选择一个目标<img height="25px" width="25px" src="./img/chooseA.png" id="input1010_1_1" onclick="input(1,id,1)">造成一点伤害<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill1_launch()"></button>';
    skill2.innerHTML = '每三回合回一点血';
    skill3.innerHTML = '配备<p  class="md" onclick="alert(\'索敌模块：选择选择寻路最优的敌人\') ">就近 </p><p class="md" onclick="alert(\'定位模块：超敌人靠近\')">近战 </p><p class="md" onclick="alert(\'性格模块：不可攻击队友\')">团结 </p>';
    chess.skill1_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill1_cooling <= 0 && (chess.effect_sum[15] == 1 || chess.effect_sum[13] == 0) && chess.effect_sum[2] == 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input1010_1_1").value;
            chess.skill1_cooling = chess.skill1_max_cooling;
            hit(input1, -1, 0, selectid, chess.x, chess.y)
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
        if (chess.fixedid == active_fixedid && chess.skill2_cooling <= 0 && (chess.effect_sum[15] == 1 || chess.effect_sum[13] == 0) && chess.effect_sum[2] == 0) {
            var input1 = document.getElementById("controller_page3").querySelector("#input0_2_1").value;
            chess.skill2_cooling = chess.skill2_max_cooling;
            selector(selectid, 1); skill(2);
            overall_skill();
        } else if (chess.fixedid != active_fixedid) {
            alert('无法行动：非此角色的行动回合');
        } else if (chess.skill2_cooling > 0) {
            alert('技能尚未冷却!');
        }
    }
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (chess.fixedid == active_fixedid && chess.skill3_cooling <= 0 && (chess.effect_sum[15] == 1 || chess.effect_sum[13] == 0) && chess.effect_sum[2] == 0) {
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
    chess.movefunction = function (id, dir, count, form, source, x, y) {//form0主动1被动，主动dir==0视为推拉，自动检测方向，dir不为0则是传送,dir5为定点传送
        var chess = document.getElementById(id);
        if (state != 0) {
            input(3);
        }
        if (form == 0 && chess.fixedid == active_fixedid && chess.effect_sum[2] == 0 && chess.effect_sum[3] == 0) {//走路
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
                chess.health += hit_health;
                anim4(chess.x, chess.y, -(hit_health));
            }
        }
        else if (hit_health > 0) {
            if (chess.effect_sum[16] == 0) {
                chess.health += hit_health;
                anim3(chess.x, chess.y, hit_health);
            }
        }
        if (chess.health > chess.max_health + chess.effect_sum[10]) { chess.health = chess.max_health + chess.effect_sum[10]; }
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
                if (chess.effect[j][0] == 1) {
                    chess.effect_sum[1] += chess.effect[j][1];
                } else if (chess.effect[j][0] == 2) {
                    chess.effect_sum[1] -= chess.effect[j][1];
                } else if (chess.effect[j][0] == 3) {
                    chess.effect_sum[2] = 1;
                } else if (chess.effect[j][0] == 5) {
                    chess.effect_sum[3] = 1;
                } else if (chess.effect[j][0] == 7) {
                    chess.effect_sum[4] += chess.effect[j][1];
                } else if (chess.effect[j][0] == 8) {
                    chess.effect_sum[5] += chess.effect[j][1];
                } else if (chess.effect[j][0] == 9) {
                    chess.effect_sum[6] = 1;
                } else if (chess.effect[j][0] == 11) {
                    chess.effect_sum[7] += chess.effect[j][1];
                } else if (chess.effect[j][0] == 12) {
                    chess.effect_sum[7] -= chess.effect[j][1];
                } else if (chess.effect[j][0] == 13) {
                    chess.effect_sum[8] += chess.effect[j][1];
                } else if (chess.effect[j][0] == 14) {
                    chess.effect_sum[8] -= chess.effect[j][1];
                } else if (chess.effect[j][0] == 15) {
                    chess.effect_sum[9] += chess.effect[j][1];
                } else if (chess.effect[j][0] == 16) {
                    chess.effect_sum[9] -= chess.effect[j][1];
                } else if (chess.effect[j][0] == 17) {
                    chess.effect_sum[10] += chess.effect[j][1];
                } else if (chess.effect[j][0] == 18) {
                    chess.effect_sum[10] -= chess.effect[j][1];
                } else if (chess.effect[j][0] == 4) {
                    chess.effect_sum[11] = 1;
                } else if (chess.effect[j][0] == 6) {
                    chess.effect_sum[12] = 1;
                } else if (chess.effect[j][0] == 19) {
                    chess.effect_sum[13] = 1;
                } else if (chess.effect[j][0] == 20) {
                    chess.effect_sum[15] = 1;
                } else if (chess.effect[j][0] == 21) {
                    chess.effect_sum[16] = 1;
                }
            }
        }
    }
    chess.skillfunction = function (id) {//全局技能模块
        var chess = document.getElementById(id);
        var board = document.getElementById("board").children;
        var turn_damage = 1;//每回合攻击伤害
        var skill_input = 'input1010_1_1';//技能名称
        var attack_range = 1;//攻击范围
        if (chess.fixedid == active_fixedid) {
            var bool = 1;
            for (var i = 0; i < board.length; i++) {//确认是否行动
                if (chess.data[0] != 0 || (board[i].fixedid == chess.fixedid && board[i].id < chess.id && board[i].data[0] != 1)) {//如果有人行动未完成
                    bool = 0;
                }
            }
            if (bool) {//行动   
                chess.data[0] = -1;
                AI();
            }
        }
        function AI(end) {
            if (chess.effect_sum[2] == 0) {
                var next = 0;
                selector(id, 1);
                var num = 9999;//所需步数
                var dir = 0;//第一步方向  
                var barrier = -1;//障碍物id数组，不存在为-1
                var bool = 0;
                var health = 9999;//斩首的血量
                for (var h = 0; h < board.length; h++) {//找人 
                    if ((chess.data[1] == 1 && (board[h].class == 1 || board[h].class == 2) && board[h].enemy == 0) || (chess.data[1] == 2 && board[h].class == 1 && board[h].enemy == 0) || (chess.data[1] == 3 && board[h].class == 1 && board[h].health <= health && board[h].enemy == 0) || (chess.data[1] == 4 && board[h].enemy == 1)) {//找人 
                        for (var i = 1; i <= 16; i++) {//找地
                            for (var j = 1; j <= 16; j++) { //找地
                                for (var k = 0; k < board.length; k++) {//找合适的输出位置
                                    if (board[k].x == i && board[k].y == j) {
                                        if (detect_range(attack_range, board[h].id, board[k].id) == 1) {//改攻击范围   
                                            var r = route(chess.x, chess.y, board[k].x, board[k].y, chess.max_movement, turn_damage)// 改每回合伤害
                                            if (r[0] < num) {
                                                num = r[0];
                                                dir = r[1];
                                                barrier = r[2];
                                                health = board[h].health;
                                                var target = board[h];
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                if (num == 0) {//在攻击范围内
                    if (chess.skill1_cooling == 0 && (chess.effect_sum[15] == 1 || chess.effect_sum[13] == 0)) {//能打
                        setTimeout(function () { skill(1); }, 200);
                        setTimeout(function () { input(attack_range, skill_input, 1) }, 400);//改三个数据
                        setTimeout(function (x) { selector(x) }, 600, target.id);
                        setTimeout(function () { chess.skill1_launch() }, 800);
                        next = 1;
                    }
                    else {//不能打,继续靠近或远离
                        //一回合能走到，能打到目标，离目标更近(优)
                        var num2 = route(chess.x, chess.y, target.x, target.y, chess.max_movement, 1)[0];
                        var dir2 = 0;
                        if (chess.movement > chess.effect_sum[4] && chess.effect_sum[3] == 0) {
                            for (var i = 1; i <= 16; i++) {//找地
                                for (var j = 1; j <= 16; j++) { //找地
                                    for (var k = 0; k < board.length; k++) {
                                        if (board[k].x == i && board[k].y == j) {
                                            if (detect_range(attack_range, target.id, board[k].id) == 1) {//改攻击范围   
                                                var r = route(chess.x, chess.y, board[k].x, board[k].y, chess.max_movement, 1)
                                                if (r[0] <= chess.movement && ((chess.data[2] == 1 && route(i, j, target.x, target.y, chess.max_movement, 1)[0] < num2) || (chess.data[2] == 2 && route(i, j, target.x, target.y, chess.max_movement, 1)[0] > num2))) {//更近或更远
                                                    dir2 = r[1];
                                                    num2 = route(i, j, target.x, target.y, chess.max_movement, 1)[0];
                                                }
                                            }
                                            break;
                                        }
                                    }
                                }
                            }
                            if (num2 != route(chess.x, chess.y, target.x, target.y, chess.max_movement, 1)[0]) {
                                controller(2);
                                if (turn == 1) {
                                    var x = $(".turn")[0]; x.innerHTML = '转向 否'; x.style.backgroundColor = 'red'; turn = 0;
                                }
                                setTimeout(function () { chess.movefunction(id, dir2, 1, 0, 0, 0, 0) }, 200);
                                next = 2;
                            }
                        }
                    }
                }
                else {//打不到目标
                    //判断走不走
                    if (barrier == -1) { var move_bool = 1; }//走
                    else if (chess.data[4] == 2) { var move_bool = 0; }//打
                    else {//懦弱 有非友方障碍物就打
                        var num1 = 9999;
                        var move_bool = 1;
                        for (var l = 1; l < barrier[0]; l++) {
                            if (document.getElementById(barrier[l]).enemy == 0) {//有非友方障碍物
                                //判断能不能打到障碍物
                                var num1 = 9999;//所需步数
                                var dir1 = 0;//第一步方向 
                                for (var i = 1; i <= 16; i++) {//找地
                                    for (var j = 1; j <= 16; j++) { //找地
                                        for (var k = 0; k < board.length; k++) {//找合适的输出位置
                                            if (board[k].x == i && board[k].y == j) {
                                                if (detect_range(attack_range, barrier[l], board[k].id) == 1) {//改攻击范围   
                                                    var r = route(chess.x, chess.y, board[k].x, board[k].y, chess.max_movement, turn_damage)// 改每回合伤害
                                                    if (r[0] < num1 && r[2][0] == 1) {
                                                        num1 = r[0];
                                                        dir1 = r[1];
                                                        var target = document.getElementById(barrier[l]);
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (num1 < 9999) {//打
                                    move_bool = 0;
                                    break;
                                }
                            }
                        }
                    }
                    if (move_bool == 1) {//走
                        if (chess.movement > chess.effect_sum[4] && chess.effect_sum[3] == 0) {//走路
                            controller(2);
                            if (turn == 1) {
                                var x = $(".turn")[0]; x.innerHTML = '转向 否'; x.style.backgroundColor = 'red'; turn = 0;
                            }
                            setTimeout(function () { chess.movefunction(id, dir, 1, 0, 0, 0, 0) }, 200);
                            next = 2;
                        }
                    } else {//打障碍物
                        if (num1 == 0) {//在攻击范围内
                            if (chess.skill1_cooling == 0 && (chess.effect_sum[15] == 1 || chess.effect_sum[13] == 0)) {//能打
                                setTimeout(function () { skill(1); }, 200);
                                setTimeout(function () { input(attack_range, skill_input, 1) }, 400);//改三个数据
                                setTimeout(function (x) { selector(x) }, 600, target.id);
                                setTimeout(function () { chess.skill1_launch() }, 800);
                                next = 1;
                            }
                        }
                        else if (chess.movement > chess.effect_sum[4] && chess.effect_sum[3] == 0) {//走路
                            controller(2);
                            if (turn == 1) {
                                var x = $(".turn")[0]; x.innerHTML = '转向 否'; x.style.backgroundColor = 'red'; turn = 0;
                            }
                            setTimeout(function () { chess.movefunction(id, dir1, 1, 0, 0, 0, 0) }, 200);
                            next = 2;
                        }
                    }
                }
                if (next == 0 || chess.fixedid != active_fixedid) {//结束行动 
                    chess.data[0] = 1;
                    var bool = 1;
                    for (var i = 0; i < board.length; i++) {//是否进下一回合
                        if (board[i].fixedid == chess.fixedid && board[i].id > chess.id && board[i].data[0] == 0) {//如果有人行动未完成
                            bool = 0;
                        }
                    }
                    if (bool) {//下一个人物行动
                        next_act();
                    } else if (end == 1) {//下一个自己行动
                        setTimeout(function () { overall_skill(); }, 0);
                    } else if (end == 2) {//下一个自己行动
                        setTimeout(function () { overall_skill(); }, 0);
                    }
                }//继续行动 
                else if (next == 1) {//打人
                    setTimeout(function () { AI(1); }, 800);
                } else if (next == 2) {//走路
                    setTimeout(function () { AI(2); }, 200);
                }
            }
        }
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 2;//0地块,1人物,2召唤物3障碍物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
    chess.data[0] = 0;//是否行动完毕-1正在行动0没有1完毕
    chess.data[1] = 1;//索敌1就近2算计3对将4辅助5随机
    chess.data[2] = 1;//定位1近战2远战
    chess.data[3] = 1;//寻路2演算
    chess.data[4] = 1;//性格1团结2暴虐
    chess.data[5] = 4;//随机1随性2失心3马虎4清醒5严明
    chess.enemy = 1;
    chess.trap = 0;
    chess.effect = new Array(300);//0为index索引。特殊效果 ：1防御、2脆弱、3昏厥、4坚毅（无法被眩晕）、5束缚、6大型（无法被束缚）、7泥沼（移动耗费增加）、8火毒（持续掉血）、9超重（无法被推拉）、10免疫（免疫所有特殊效果）、11攻击+、12攻击-、13反应+、14反应-、15移动+、16移动- 、17最大生命+、18最大生命-、19缴械、20武装（无法被缴械）、21禁疗
    chess.effect_sum = new Array(30);//1受伤改动2昏厥3束缚4泥沼5火毒6超重7攻击改动8反应改动9移动改动10最大生命改动11坚毅12大型13缴械14免疫15武装16禁疗
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