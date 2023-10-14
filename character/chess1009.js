function chess1009(x, y) {//沙袋
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 1009;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess1009.png";
    chess.name = "沙袋";
    chess.max_health = 1;//1~30 20
    chess.health = 1;
    chess.max_movement = 0;//1~20 5
    chess.movement = 0;
    chess.reflect = -1;//1~20 5   -1不可行动
    skill1.innerHTML = '无法行动，无法移动，无法被移动。不会成为机枪的攻击目标。';
    skill3.innerHTML = '若军火商在周围四格，则对自身造成10点伤害。（需在军火商行动回合行动）<button style="position: absolute;right: 0px;bottom: 0px;height: 50px;width:50px;" onclick="document.getElementById(selectid).skill3_launch()"></button>';
    chess.skill3_launch = function () {
        var chess = document.getElementById(selectid);
        if (7 == active_fixedid && chess.skill3_cooling <= 0) {
            var board = document.getElementById("board").children;
            for (var i = 0; i < board.length; i++) {
                if (board[i].fixedid == 7) {
                    if ((board[i].x == chess.x && board[i].y == chess.y + 1) || (board[i].x == chess.x + 1 && board[i].y == chess.y) || (board[i].x == chess.x && board[i].y == chess.y - 1) || (board[i].x == chess.x - 1 && board[i].y == chess.y)) {
                        chess.hitfunction(chess.id, -10, 0, 0, 0, 0, 0, 0, board[i].id, chess.x, chess.y);
                    }
                }
            }
        }
    }
    chess.skill1_src = "./img/skill-3.png";//skill1
    chess.skill1_name = "固定";
    chess.skill1_max_cooling = 0;
    chess.skill1_cooling = 0;
    chess.skill1_class = 0;//1主动0被动
    chess.skill2_src = "./img/skill0.png";
    chess.skill2_name = "无";
    chess.skill2_max_cooling = 0;
    chess.skill2_cooling = 0;
    chess.skill2_class = 0;//1主动0被动
    chess.skill3_src = "./img/skill-2.png";//skill3
    chess.skill3_name = "拆除";
    chess.skill3_max_cooling = 0;
    chess.skill3_cooling = 0;
    chess.skill3_class = 1;
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

    }
    chess.resist = 1;//1阻挡0不阻挡
    chess.class = 2;//0地块,1人物,2召唤物
    chess.style.zIndex = 105;//地块0~100,人物105,动画粒子等120+
    chess.data = new Array(1000);//数据
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