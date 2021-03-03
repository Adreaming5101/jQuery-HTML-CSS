$(function () {
    let wolfTimer;

    //1.监听游戏规则
    $(".rules").click(function () {
        //点击后游戏规则界面显示---淡入
        $(".rule").stop().fadeIn(100);
        //点击关闭按钮则隐藏---淡出
        $(".close").click(function () {
            $(".rule").stop().fadeOut(100)
        });

    });
    //监听开始游戏
    $(".start").click(function () {
        progressHandler();
        startWolfAnimation();
        $(".start").stop().fadeOut(100);
    });


    //2.监听重新开始按钮
    $(".reStart").click(function () {
        //淡入游戏开始界面----但是游戏结束界面还有，没有淡出
        // $(".container").stop().fadeIn(100);

        //直接淡出游戏结束界面即可
        $(".mask").stop().fadeOut(100);
        //进度条运动
        progressHandler();
        //调用动画
        startWolfAnimation();
    });


    // console.log($(".progress").width());
    //进度条处理方法
    function progressHandler() {
        //点击重新开始需要重新赋值
        $(".progress").css({
            width: 180,
        });

        //定义定时器
        let timer = setInterval(function () {
            //进度条当前宽度
            let $progressWidth = $(".progress").width();
            //减掉宽度
            $progressWidth -= 1;
            //重新给进度条赋值宽度
            $(".progress").css({
                width: $progressWidth,
            });

            //当宽度减为0时，清除定时器，并展示游戏结束界面---注意写在定时器里面，有个域的问题
            if ($progressWidth <= 0) {
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stopWolfAnimation()

            }

        }, 100);
    }


    // let wolfTimer;  //外层设置定时器变量，好全局访问

    //定义一个专门处理灰太狼的方法
    function startWolfAnimation() {
        //灰太狼图片数组
        let wolf_1 = ['images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png',
            './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png',];
        //小灰灰图片数组
        let wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png',
            './images/x5.png', './images/x5.png', './images/x7.png', './images/x8.png', './images/x9.png',];
        //2、定义一个数组用来保存图片出现的位置
        let arrPos = [
            {left: "100px", top: "115px"},
            {left: "20px", top: "160px"},
            {left: "190px", top: "142px"},
            {left: "105px", top: "193px"},
            {left: "19px", top: "221px"},
            {left: "202px", top: "212px"},
            {left: "120px", top: "275px"},
            {left: "30px", top: "295px"},
            {left: "209px", top: "297px"}
        ];
        /*写死图片出现位置*/
        //创建图片标签
        // let $wolfImage = $("<img src=''>");
        //
        // //图片定位
        // $wolfImage.css({
        //     position:"absolute",
        //     top:115,
        //     left:100,
        // });
        // //图片赋值内容
        // $wolfImage.attr("src", wolf_1[2]);
        //
        // //图片添加
        // $(".container").append($wolfImage)


        /*使图片出现的位置随机*/
        let $wolfImage = $("<img src='' class='images'>");


        //随机生成0-7的数
        let $index = Math.round(Math.random() * 8);


        //图片定位
        $wolfImage.css({
            position: "absolute",
            left: arrPos[$index].left,
            top: arrPos[$index].top,
        });


        //随机获取数组类型
        let wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;


        //添加图片内容
        // $wolfImage.attr("src", wolfType[5]);
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function () {
            if (wolfIndex > wolfIndexEnd) {
                $wolfImage.remove();  //切换完删除图片
                clearInterval(wolfTimer);  //删除定时器
                startWolfAnimation();
            }
            $wolfImage.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        }, 300);

        //图片添加
        $(".container").append($wolfImage);


        //调用处理游戏规则的方法
        GameRules($wolfImage);
        /*
        0*8=0
        0.1*8=0.8
        0.2*8=1.6
        0.3*8=2.4
        0.4*8=3.2
        0.5*8=4.0
        0.6*8=4.8
        0.7*8=5.6
        0.8*8=6.4
        0.9*8=7.2
        console.log(Math.random()); //0-1的小数
        console.log(Math.round(0.5));
        console.log(Math.round(0.4));
        //取到0-8的整数
        Math.round(Math.random()*8)
         */
    }

    //停止动画
    function stopWolfAnimation() {
        $(".images").remove();
        clearInterval(wolfTimer);
    }


    //处理游戏规则的方法
    function GameRules($wolfImage) {
        $wolfImage.one("click", function () {
            //修改索引
            window.wolfIndex = 6;
            window.wolfIndexEnd = 9;

            //当前点击图片的地址
            let $src = $(this).attr("src");
            //根据地址判断是否是灰太狼
            let flag = $src.indexOf("h") >= 0;

            //根据图片类型加减分数
            if (flag) {
                //+10
                $(".score").text(parseInt($(".score").text()) + 10)
            } else {
                // -10
                $(".score").text(parseInt($(".score").text()) - 10)
            }

        })
    }


});

