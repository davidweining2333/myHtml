// 作品集progressBar
showreel1.onclick = function () {
    showreel.className = "progressBar state-1"
};

showreel2.onclick = function () {
    showreel.className = "progressBar state-2"
};

showreel3.onclick = function () {
    showreel.className = "progressBar state-3"
};

// 初始动画加载
setTimeout(function () {
    siteWelcome.classList.remove('active')
},200);

setTimeout(()=>{findClosest()},300)

//初始让所有特殊标签向下30px
let specificTags = document.querySelectorAll('[data-x]')
for(let i = 0;i<specificTags.length;i++){
    specificTags[i].classList.add('offset')
}
// topNavBar下滑样式改变
window.onscroll = function () {
    if(window.scrollY > 0 ){
        topNavBar.classList.add('sticky')
    }else {
        topNavBar.classList.remove('sticky')
    }
    findClosest()
}

function findClosest() {
    //标亮当前页面对应菜单
    let specificTags = document.querySelectorAll('[data-x]')
    let indexMin = 0
    for(let i = 0;i<specificTags.length;i++){
        if (Math.abs(specificTags[i].offsetTop - window.scrollY) <
            Math.abs(specificTags[indexMin].offsetTop - window.scrollY)) {
            indexMin = i
        }
    }
    //indexMin是离窗口顶部最近的元素
    specificTags[indexMin].classList.remove('offset')
    let id = specificTags[indexMin].id
    let a = document.querySelector('a[href="#'+ id +'"]')
    let li = a.parentNode
    let broAndMe = li.parentNode.children
    for (let i=0;i<broAndMe.length;i++){
        broAndMe[i].classList.remove('highlight')
    }
    li.classList.add('highlight')
}

let liTags = document.querySelectorAll('.menu > ul >li')
for(let i=0;i<liTags.length;i++){
    liTags[i].onmouseenter = function (x) {
        x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove('active')
    }
}

let aTags = document.querySelectorAll('.menu > ul >li >a')
for(let i=0;i<aTags.length;i++){
    aTags[i].onclick = function (x) {
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop
        let currentTop = window.scrollY
        let targetTop = top - 80
        let t = Math.abs(targetTop - currentTop)/100*300
        if (t > 500){t = 500}
        //手写的动画
        // let n = 25
        // let duration = 500/n //多少时间动一次
        // let distance = (targetTop - currentTop)/n //每次动多少距离
        // let i = 0
        // var id = setInterval(()=>{
        //     if(i<n){
        //     i = i + 1
        //     window.scrollTo(0,currentTop + distance*i)
        //     }else{
        //         window.clearInterval(id)
        //         return
        //     }
        // },duration)

        //tween.js
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);

        var coords = { y: currentTop };
        var tween = new TWEEN.Tween(coords)
            .to({ y: targetTop }, t)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function() {
                window.scrollTo(0,coords.y)
            })
            .start();
    }
}




