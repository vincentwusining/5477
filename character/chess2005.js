function chess2005(x, y) {//草地
    var chess = document.createElement("chess0");
    var skill1 = document.createElement("skill");
    var skill2 = document.createElement("skill");
    var skill3 = document.createElement("skill");
    chess.id = id;

    //以下需改动
    chess.fixedid = 2005;//1~1000人物1001~2000召唤物2001~3000地块
    chess.img = "./img/chess2005.png";
    chess.name = "草地";
    chess.max_health = 0;//1~30 20
    chess.health = 0;
    chess.max_movement = 0;//1~20 5
    chess.movement = 0;
    chess.reflect = -1;//1~20 5
    skill1.innerHTML = '可在此移动、生成';
    chess.skill1_src = "./img/skill2001.1.png";//skill1
    chess.skill1_name = "地块";
    chess.skill1_max_cooling = 0;
    chess.skill1_cooling = 0;
    chess.skill1_class = 0;//1主动0被动
    chess.skill2_src = "./img/skill0.png";//skill2
    chess.skill2_name = "无";
    chess.skill2_max_cooling = 1;
    chess.skill2_cooling = 0;
    chess.skill2_class = 0;
    chess.skill3_src = "./img/skill0.png";//skill3
    chess.skill3_name = "无";
    chess.skill3_max_cooling = 1;
    chess.skill3_cooling = 0;
    chess.skill3_class = 0;


    chess.skillfunction = function (id) {//全局技能模块
        var chess = document.getElementById(selectid);
    }
    chess.resist = 0;//1阻挡0不阻挡
    chess.class = 0;//0地块,1人物,2召唤物
    chess.style.zIndex = 0;//地块0~100,人物105,动画粒子等120+
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
    document.getElementById("board").appendChild(chess);
    id++;
    overall_skill();
}