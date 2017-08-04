
var $ = function(obj){
    if(typeof obj == 'string'){
        if(obj.charAt(0)=='.'){
            return document.getElementsByClassName(obj.slice(1,obj.length));
        }

        if(obj.charAt(0)=='#'){
            return document.getElementById(obj.slice(1,obj.length));
        }
    }
}

function formser(form){
    var form = document.getElementById(form);
    var arr = {};
    for (var i = 0; i < form.elements.length; i++) {
        var feled = form.elements[i];
        switch(feled.type) {
            case undefined:
            case 'button':
            case 'file':
            case 'reset':
            case 'submit':
                break;
            case 'checkbox':
            case 'radio':
                if (!feled.checked) {
                    break;
                }
            default:
                if (arr[feled.name]) {
                    arr[feled.name]=arr[feled.name]+','+feled.value;
                }else{
                    arr[feled.name]=feled.value;

                } 
        }
    }
    return arr
}

var removeClass = function(dom, data){
    var cls = dom.className;
    var arr = cls.split( /\s+/ );
    var reArr = []; 
    for( var i = 0; i < arr.length; i++ ){
        if( arr[ i ] != data )
        {
            reArr.push(arr[ i ]);
        }
    };

    var cls = reArr.join( " " );

    cls = cls.replace( /^\s|\s$/g, "" );

    dom.className = cls;
}

function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    return arr.join('&');
}

function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.error && options.error(xhr.status);
            }
        }
    }
}

var buttonFunc = function(id, apiName){
    event.preventDefault();
    var formData = {};
    formData = formser('mainForm');
    formData.ID = id;
    ajax({
        url: 'http://'+window.location.host+'/comment/'+apiName,              //请求地址
        type: "post",                       //请求方式
        data: formData,        //请求参数
        dataType: "json",
        success: function (response, xml) {
            // 此处放成功后执行的代码
            response = JSON.parse(response);
            var resultDom = $('.result-msg')[0];
            var result = '';
            if(response.result == 0){
                resultDom.className = 'result-msg success';
                result = '操作成功';
            }else{
                resultDom.className = 'result-msg error';
                result = '操作失败 '+response.message;
            }
            resultDom.innerHTML = result;
            setTimeout(function(){
                location.reload();
            }, 1000);
        },
        error: function (status) {
            // 此处放失败后执行的代码
            alert(status);
        }
    });
}

var changeFunc = function(){
    event.preventDefault();
    var buttons = this.parentNode.childNodes;
    buttons.forEach(function(e,i){
//        console.log(e.tagName);
        if(e.tagName=='BUTTON'){
            e.className = e.className+' pure-button-disabled';
            if(e.className.indexOf('submit-button')!=-1){
                removeClass(e, 'pure-button-disabled');
            }
        }
        
    })

    var node = this.parentNode.previousSibling;
    while(node != null){
        var inputNode;
        var inputAttr = document.createAttribute("name");
        inputAttr.nodeValue = node.attributes.getNamedItem('data-name').textContent;
        
        if(node.attributes.getNamedItem('data-name').textContent=='ATTITUDE'){
            inputNode = document.createElement('textarea');
            inputNode.rows = node.innerHTML.length/20+2;
            inputNode.cols = 45;
            inputNode.innerHTML = node.innerHTML;
        }else{
            inputNode = document.createElement('input');
            inputNode.value = node.innerHTML;
        }
        inputNode.attributes.setNamedItem(inputAttr);
        node.innerHTML = '';
        node.appendChild(inputNode);
        node = node.previousSibling;
    }
//    console.log(this.parentNode.previousSibling);
}

var init = function(){
    var changeBtn = $('.change-button');
    for(var i = 0;i < changeBtn.length;i++){
        changeBtn[i].onclick = changeFunc;
    } 
}

init();
