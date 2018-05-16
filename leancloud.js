var APP_ID = 'AroY7t48mkz6kd9h55x3frIJ-gzGzoHsz';
var APP_KEY = 'd0iAF8bJfWcVYBc30EaHAneJ';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var myForm = document.querySelector('#messageForm')
myForm.addEventListener('submit',function (e) {
    e.preventDefault()
    let name = myForm.querySelector('input[name=name]').value;
    let content = myForm.querySelector('input[name=content]').value;
    var Message = AV.Object.extend('messageList');
    var message = new Message();
    message.save({
        name:name,
        content:content
    }).then(function(object) {
        var li = document.createElement('li');
        li.innerText = `${object.attributes.name}:${object.attributes.content}`;
        messageList.append(li)
        myForm.querySelector('input[name=content]').value =''
    })
})

var query = new AV.Query('messageList');
query.find().then(function (messages) {
    var messages = messages.map((item)=>item.attributes)
    console.log(name)
    messages.forEach((message)=>{
        var name = message.name;
        var content = message.content;
        var li = document.createElement('li');
        li.innerText = `${name}:${content}`;
        messageList.append(li)
    })
}).then(function(todos) {
    // 更新成功
}, function (error) {
    // 异常处理
});



