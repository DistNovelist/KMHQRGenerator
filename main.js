document.getElementById("Generate").onclick = function(){
    var gradeNum= Number(document.getElementById("grade").value);
    var classNum = Number(document.getElementById("class").value);
    var studentNum = Number(document.getElementById("studentNum").value);
    var sector1 = String(gradeNum * 1000 + classNum * 100 + studentNum);
    var normalTemp = document.getElementById("normalTempL").value + document.getElementById("normalTempS").value;
    var todayTemp = document.getElementById("todayTempL").value + document.getElementById("todayTempS").value;
    if (document.getElementById("cough").checked){
        var cough = "1";
    }
    else{
        var cough = "0";
    }
    if (document.getElementById("soreThroat").checked){
        var soreThroat = "1";
    }
    else{
        var soreThroat = "0";
    }
    if (document.getElementById("malaise").checked){
        var malaise = "1";
    }
    else{
        var malaise = "0";
    }
    var now = new Date()
    var date = (now.getMonth()+1)*100+now.getDate();
    var date_padded =  ("0"+ date.toString()).slice(-4);
    var outputString = sector1 + "," + date_padded + "," + normalTemp + "," + todayTemp + "," + cough + "," + soreThroat + "," + malaise + "," + document.getElementById("etc").value;
    console.log(outputString);
    document.getElementById("result").src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + outputString;
    document.getElementById("resultText").innerText = outputString;

    document.cookie = "grade=" + String(gradeNum) + ";";
    document.cookie = "class=" + String(classNum) + ";";
    document.cookie = "studentNum=" + String(studentNum) + ";";
    document.cookie = "normalTempL=" + document.getElementById("normalTempL").value + ";";
    document.cookie = "normalTempS=" + document.getElementById("normalTempS").value + ";";
    document.cookie = "max-age=604800;";
}

window.onload = function(){
    //警告文表示
    //var now = new Date("Apr 1, 2021 8:00");
    var now = new Date();
    var datenum =  (now.getMonth()+1)*100+now.getDate();
    if(datenum > 400 && datenum < 415){
        document.getElementById("autoinfo").innerHTML = "新学年になりました。学年・クラス・出席番号が間違っていないか、よくご確認ください。<br>";
    }

    //cookieの設定
    document.cookie = "Secure;";
    document.cookie = "SameSite=none;";
    if(document.cookie!=""){
        const cookie_list = ["grade","class","studentNum","normalTempL","normalTempS"];
        var r = document.cookie.split(';');
        r.forEach(function(value) {
            //cookie名と値に分ける
            var content = value.split('=');
            content[0] = content[0].replace(" ","");
            //console.log(content[0]);
            if(cookie_list.includes(content[0])){
                document.getElementById(content[0]).value = content[1];
            }
        })
        document.getElementById("debug_Cookie").innerText = document.cookie;
    }else{
        document.getElementById("debug_Cookie").innerText = "no cookies";
    }
}