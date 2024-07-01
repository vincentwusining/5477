function chess1008(x, y) {//大炮
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 1008;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess1008.png";
    chess.name = "大炮";
    chess.max_health = 6;//1~30 20
    chess.health = 6;
    chess.max_movement = 0;//1~20 5
    chess.movement = 0;
    chess.reflect = -1;//1~20 5   -1不可行动
    skill1.innerHTML = '无法行动，无法移动，无法被移动。';
    skill2.innerHTML = '若军火商在周围四格，则对反方向范围内所有敌人造成3点范围伤害。范围演示：<img height="25px" width="25px" src="./img/chooseB.png" id="input1008_1_1" onclick="input(3,id,14)">（需在军火商行动回合行动）<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill2_launch()"></button>';
    skill3.innerHTML = '若军火商在周围四格，则对自身造成10点伤害。（需在军火商行动回合行动）<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill3_launch()"></button>';
    chess.skill2_launch = function () {
        var chess = document.getElementById(selectid);
        if (7 == active_fixedid && chess.skill2_cooling <= 0 && (chess.effect_sum[15] == 1 || chess.effect_sum[13] == 0) && chess.effect_sum[2] == 0) {
            var board = document.getElementById("board").children;
            var dir = 0;
            var loc = [-1, -1];
            for (var i = 0; i < board.length; i++) {
                if (board[i].fixedid == 7) {
                    if (board[i].x == chess.x && board[i].y == chess.y + 1) {
                        dir = 1;
                        loc = [chess.x, chess.y - 6];
                        break;
                    }
                }
                if (board[i].fixedid == 7) {
                    if (board[i].x == chess.x + 1 && board[i].y == chess.y) {
                        dir = 2;
                        loc = [chess.x - 6, chess.y];
                        break;
                    }
                }
                if (board[i].fixedid == 7) {
                    if (board[i].x == chess.x && board[i].y == chess.y - 1) {
                        dir = 3;
                        loc = [chess.x, chess.y + 6];
                        break;
                    }
                }
                if (board[i].fixedid == 7) {
                    if (board[i].x == chess.x - 1 && board[i].y == chess.y) {
                        dir = 4;
                        loc = [chess.x + 6, chess.y];
                        break;
                    }
                }
            }
            var target = new Array(30);
            var num = 0;
            for (var i = 0; i < board.length; i++) {
                if (board[i].class == 0) { continue; }
                var dx = Math.abs(loc[0] - board[i].x);
                var dy = Math.abs(loc[1] - board[i].y);
                var abs_diff = dx + dy;
                if (dx <= 2 && dy <= 2 && abs_diff <= 3) {
                    target[num] = board[i].id;
                    num++;
                }
            }
            for (var i = 0; i < num; i++) {
                hit(target[i], -3, 0, selectid, chess.x, chess.y)
            }
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
        if (7 == active_fixedid && chess.skill3_cooling <= 0 && (chess.effect_sum[15] == 1 || chess.effect_sum[13] == 0) && chess.effect_sum[2] == 0) {
            var board = document.getElementById("board").children;
            for (var i = 0; i < board.length; i++) {
                if (board[i].fixedid == 7) {
                    if ((board[i].x == chess.x && board[i].y == chess.y + 1) || (board[i].x == chess.x + 1 && board[i].y == chess.y) || (board[i].x == chess.x && board[i].y == chess.y - 1) || (board[i].x == chess.x - 1 && board[i].y == chess.y)) {
                        hit(chess.id, -10, 0, board[i].id, chess.x, chess.y);
                    }
                }
            }
        } else if (chess.fixedid != active_fixedid) {
            alert('无法行动：非此角色的行动回合');
        } else if (chess.skill3_cooling > 0) {
            alert('技能尚未冷却!');
        }
    }
    chess.skill1_src = "./img/skill-3.png";//skill1
    chess.skill1_name = "固定";
    chess.skill1_max_cooling = 0;
    chess.skill1_cooling = 0;
    chess.skill1_class = 0;//1主动0被动
    chess.skill2_src = "./img/skill-2.png";//skill2
    chess.skill2_name = "开炮";
    chess.skill2_max_cooling = 1;
    chess.skill2_cooling = 1;
    chess.skill2_class = 1;
    chess.skill3_src = "./img/skill-2.png";//skill3
    chess.skill3_name = "拆除";
    chess.skill3_max_cooling = 0;
    chess.skill3_cooling = 0;
    chess.skill3_class = 1;
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
    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 2;//0地块,1人物,2召唤物3障碍物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
    chess.enemy = 0;
    chess.trap = 0;
    chess.effect = new Array(300);//0为index索引。特殊效果 ：1防御、2脆弱、3昏厥、4坚毅（无法被眩晕）、5束缚、6大型（无法被束缚）、7泥沼（移动耗费增加）、8火毒（持续掉血）、9超重（无法被推拉）、10免疫（免疫所有特殊效果）、11攻击+、12攻击-、13反应+、14反应-、15移动+、16移动- 、17最大生命+、18最大生命-、19缴械、20武装（无法被缴械）、21禁疗
    chess.effect_sum = new Array(30);//1受伤改动2昏厥3束缚4泥沼5火毒6超重7攻击改动8反应改动9移动改动10最大生命改动11坚毅12大型13缴械14免疫15武装16禁疗
    chess.effect[0] = 1;
    chess.range_display_array = [];//选择人物时范围演示
    chess.range_display_arrayA = [];//选择技能时范围演示
    chess.range_display_arrayB = [];//选择技能时范围演示
    chess.range_display_arrayC = [];//选择技能时范围演示
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