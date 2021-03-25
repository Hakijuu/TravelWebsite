function sprawdzDate1() {
    const now = new Date();
    now.setMonth(now.getMonth()+1)

    const str = document.getElementById('data').value.split("-");
    const data =new Date();
    data.setFullYear(parseInt(str[0]),parseInt(str[1])-1,parseInt(str[2]));

    if (now < data) return (true);
        else return (false);
}

function sprawdzDate2(data) {
    const now =new Date();
    now.setDate(now.getDay()+5)
    if(data > now) return true;
    else return false;
}

function sprawdzPole(pole_id,obiektRegex) {
    var obiektPole = document.getElementById(pole_id);
    if(!obiektRegex.test(obiektPole.value)) return (false);
    else return (true);
}

function sprawdz_radio(nazwa_radio){
    var obiekt=document.getElementsByName(nazwa_radio);
    for (i=0;i<obiekt.length;i++)
    { wybrany=obiekt[i].checked;
        if (wybrany) return true; }
    return false;
}

function sprawdz_box(box_id) {
    var obiekt=document.getElementById(box_id);
    if (obiekt.checked) return true;
    else return false;
}

function sprawdzDane() {
        var ok=true;
        obiektNazwisko = /(^([A-ZĄĆĘŁŃŚÓŻŹ][a-ąćęłńóśżź]{1,30} [A-ZĄĆĘŁŃŚÓŻŹ][a-ąćęłńóśżź]{1,30})$)|(^([A-ZĄĆĘŁŃŚÓŻŹ][a-ąćęłńóśżź]{1,30} [A-ZĄĆĘŁŃŚÓŻŹ][a-ąćęłńóśżź]{1,30}-[A-ZĄĆĘŁŃŚÓŻŹ][a-ąćęłńóśżź]{1,30})$)/; //wyrażenie regularne dla nazwiska
        obiektLu=/^[1-9]$|^[1][0-9]$|^[2][0]$/;

        if (!sprawdzPole("nazwisko",obiektNazwisko)) {
            ok=false;
            document.getElementById("nazwisko_error").innerHTML= "Wpisz poprawnie imie i nazwisko!";
        }
        else document.getElementById("nazwisko_error").innerHTML="";

        if (!sprawdzPole("lu",obiektLu)) {
            ok=false;
            document.getElementById("lu_error").innerHTML= "Wpisz poprawnią liczbę uczestników! (nie większą niż 20)";
        }
        else document.getElementById("lu_error").innerHTML="";

        if (!sprawdzDate1()) {
            ok=false;
            document.getElementById("data_error").innerHTML= "Wybierz poprawną date (Nie wcześniej niż miesiać od daty dzisiejeszej)";
        }
        else document.getElementById("data_error").innerHTML="";

       if (!sprawdz_radio("dni")) {
            ok=false;
            document.getElementById("dni_error").innerHTML="Musisz wybrac liczbę dni";
        }
        else document.getElementById("dni_error").innerHTML="";


        if (!sprawdz_box("regulamin")) {
            ok=false;
            document.getElementById("regulamin_error").innerHTML= "Akceptacja regulaminu jest wymagana do kupna wycieczki";
        }
        else document.getElementById("regulamin_error").innerHTML="";
    return ok;
}

function zapisz() {

    if (sprawdzDane()) {
        var item = {};
        var nazwisko = document.getElementById('nazwisko').value;
        var lu = document.getElementById('lu').value;
        var wycieczka = document.getElementById('wycieczka').value;
        var data = document.getElementById('data').value;

        var wyzywienie = document.getElementsByName('wyzywienie');
        var dane = "";
        for (i = 0; i < wyzywienie.length; i++) {
            if (wyzywienie[i].checked)
                dane += wyzywienie[i].value + " ";
        }

        var tab = document.getElementsByName('dni');
        var dni = "";

        for (i = 0; i < tab.length; i++) {
            if (tab[i].checked) {
                dni = tab[i].value;
                break;
            }
        }
        item.nazwisko = nazwisko;
        item.lu = lu;
        item.wycieczka = wycieczka;
        item.data = data;
        item.dane = dane;
        item.dni = dni;
        item.koszt = oblicz();

        var koszyk = JSON.parse(localStorage.getItem('koszyk'));
        if (koszyk == null) koszyk = [];
        koszyk.push(item);
        localStorage.setItem('koszyk', JSON.stringify(koszyk));
        return true;
    } else return false;
}

function wyswietl(){
    var koszyk = JSON.parse(localStorage.getItem('koszyk'));
    var kosz=document.getElementById('kosz');
    var str="";
    if(localStorage.length==0){
        kosz.innerHTML='<p>'+"Koszyk jest pusty"+'</p>';
    }else{
        for(var i=0;i<koszyk.length;i++){
            var licznik=i+1;
       str+='<div class="dropdown">'+
          '<button class="btn btn-primary bg-button dropdown-toggle w-75 mt-2" type="button" id="przykladowaListaPrimary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
          "Pozycja "+licznik+'</button>'+ '<div class="dropdown-menu w-75" aria-labelledby="przykladowaListaPrimary">'+ '<a class="dropdown-item" href="#">'+ " Imie i nazwisko: "+
          koszyk[i].nazwisko+ '</a>'+ '<a class="dropdown-item" href="#">'+" Liczba uczestników: "+koszyk[i].lu+'</a><a class="dropdown-item" href="#">'+" Wycieczka: "+koszyk[i].wycieczka+
          '</a><a class="dropdown-item" href="#">'+" Data wyjazdu: "+koszyk[i].data+'</a><a class="dropdown-item" href="#">'+" Wyżywienie: "+koszyk[i].dane+'</a><a class="dropdown-item" href="#">'+"" +
          " Ilośc dni: "+koszyk[i].dni+'</a><a class="dropdown-item" href="#">'+" Całkowity koszt: "+koszyk[i].koszt+
          ' zł</a></div><button class="btn btn-danger mt-2 ml-1" onclick="zrezygnuj('+i+')">X</button><button onclick="return dodajFormularz('+i+')" class="btn btn-danger mt-2 ml-1" >E</button></div>'
        } kosz.innerHTML=str;
    }
}

function dodajFormularz(i) {

    var koszyk=JSON.parse(localStorage.getItem('koszyk'));
    const str =koszyk[i].data.split("-");
    const dat =new Date();
    dat.setFullYear(parseInt(str[0]),parseInt(str[1])-1,parseInt(str[2]));

    if(sprawdzDate2(dat)){
    var edycja=document.getElementById('edycja');
    edycja.innerHTML=' <form method="post" action="">\n' +
        '                            <div class="form-group row">\n' +
        '                                <label class="col-4 col-form-label" for="nazwisko">Imię i nazwisko:</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <input id="nazwisko" name="nazwisko" placeholder="Imię i nazwisko" class="form-control">\n' +
        '                                    <div id="nazwisko_error" class="text-danger"></div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <label for="lu" class="col-4 col-form-label">Liczba uczestników:</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <input id="lu" name="lu" placeholder="1" class="form-control">\n' +
        '                                    <div id="lu_error" class="text-danger"></div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <label for="wycieczka" class="col-4 col-form-label">Wybierz wycieczke:</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <select id="wycieczka" name="wycieczka" class="custom-select">\n' +
        '                                        <option value="Parki Narodowe USA">Parki Narodowe USA</option>\n' +
        '                                        <option value="Szlakiem Draculi">Szlakiem Draculi</option>\n' +
        '                                        <option value="Wyprawa po fiordach">Wyprawa po fiordach</option>\n' +
        '                                        <option value="Śladami Faraona">Śladami Faraona</option>\n' +
        '                                        <option value="Kraj kwitnącej wiśni">Kraj kwitnącej wiśni</option>\n' +
        '                                        <option value="Wśród kangurów">Wśród kangurów</option>\n' +
        '                                    </select>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <label class="col-4 col-form-label" for="data">Data Wyjazdu:</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <input id="data" name="data" type="date" class="form-control">\n' +
        '                                    <div id="data_error" class="text-danger"></div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <label class="col-4">Wyżywienie:</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <div class="custom-control custom-checkbox custom-control-inline">\n' +
        '                                        <input name="wyzywienie" id="wyzywienie_0" type="checkbox" class="custom-control-input" value="sniadanie">\n' +
        '                                        <label for="wyzywienie_0" class="custom-control-label">Śniadanie</label>\n' +
        '                                    </div>\n' +
        '                                    <div class="custom-control custom-checkbox custom-control-inline">\n' +
        '                                        <input name="wyzywienie" id="wyzywienie_1" type="checkbox" class="custom-control-input" value="obiad">\n' +
        '                                        <label for="wyzywienie_1" class="custom-control-label">Obiad</label>\n' +
        '                                    </div>\n' +
        '                                    <div class="custom-control custom-checkbox custom-control-inline">\n' +
        '                                        <input name="wyzywienie" id="wyzywienie_2" type="checkbox" class="custom-control-input" value="kolacja">\n' +
        '                                        <label for="wyzywienie_2" class="custom-control-label">Kolacja</label>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <label class="col-4">Czas wycieczki (dni):</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <div class="custom-control custom-radio custom-control-inline">\n' +
        '                                        <input name="dni" id="dni_0" type="radio" class="custom-control-input" value="7">\n' +
        '                                        <label for="dni_0" class="custom-control-label">7</label>\n' +
        '                                    </div>\n' +
        '                                    <div class="custom-control custom-radio custom-control-inline">\n' +
        '                                        <input name="dni" id="dni_1" type="radio" class="custom-control-input" value="14">\n' +
        '                                        <label for="dni_1" class="custom-control-label">14</label>\n' +
        '                                    </div>\n' +
        '                                    <div class="custom-control custom-radio custom-control-inline">\n' +
        '                                        <input name="dni" id="dni_2" type="radio" class="custom-control-input" value="21">\n' +
        '                                        <label for="dni_2" class="custom-control-label">21</label>\n' +
        '                                    </div>\n' +
        '                                    <div id="dni_error" class="text-danger"></div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <label class="col-4">Regulamin</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <div class="custom-control custom-checkbox custom-control-inline">\n' +
        '                                        <input name="regulamin" id="regulamin" type="checkbox" class="custom-control-input">\n' +
        '                                        <label for="regulamin" class="custom-control-label">Oświadczam, że zapoznałem/am się z Regulaminem Wycieczki i akceptuję wszystkie warunki</label>\n' +
        '                                    </div>\n' +
        '                                    <div id="regulamin_error" class="text-danger"></div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <label class="col-4 col-form-label" for="koszt">Koszt</label>\n' +
        '                                <div class="col-8">\n' +
        '                                    <input id="koszt" name="koszt" disabled="disabled" type="text" class="form-control">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row">\n' +
        '                                <div class="offset-4 col-8 d-inline w-100">\n' +
        '                                    <button id="button1" onclick="return pokazKoszt()" class="btn btn-primary bg-button col-lg-4 w-100">Oblicz cene</button>\n' +
        '                                    <input type="submit" value="Edytuj" onclick="return edytuj('+i+')" class="btn btn-primary bg-button col-lg-4 w-100"/>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </form>';

        document.getElementById('nazwisko').value=koszyk[i].nazwisko;
        document.getElementById('lu').value=koszyk[i].lu;
        document.getElementById('wycieczka').value=koszyk[i].wycieczka;
        document.getElementById('data').value=koszyk[i].data;


        document.getElementById('regulamin').checked=true;

        const radio=koszyk[i].dni;
        switch (radio) {
            case '7': document.getElementById('dni_0').checked=true; break;
            case '14': document.getElementById('dni_1').checked=true; break;
            case '21': document.getElementById('dni_2').checked=true; break;
        }

        const checkbox=koszyk[i].dane.split(" ");
        for(i=0;i<checkbox.length;i++){
            switch (checkbox[i]) {
                case 'sniadanie': document.getElementById('wyzywienie_0').checked=true;break;
                case 'obiad': document.getElementById('wyzywienie_1').checked=true; break;
                case 'kolacja': document.getElementById('wyzywienie_2').checked=true;break;
            }
        }
    }
    else return false;

}


function edytuj(i) {
    var koszyk=JSON.parse(localStorage.getItem('koszyk'));
    if(sprawdzDane()){
        koszyk.splice(i,1);
        localStorage.setItem('koszyk',JSON.stringify(koszyk));
        zapisz();
        wyswietl();
        return true;}
    else return false;
}

function zrezygnuj(i) {
    var koszyk=JSON.parse(localStorage.getItem('koszyk'));
    const str = koszyk[i].data.split("-");
    const data =new Date();
    data.setFullYear(parseInt(str[0]),parseInt(str[1])-1,parseInt(str[2]));

    if(sprawdzDate2(data)){
        if(confirm("Na pewno chcesz usunać produkt?"))koszyk.splice(i,1);
        localStorage.setItem('koszyk',JSON.stringify(koszyk));

        if(koszyk[0]==null) localStorage.clear();

        wyswietl();}
    else console.log("nie mozna zrezygnowac");
}

function oblicz(){
    if(sprawdzDane()){
        var ileOsob=parseInt(document.getElementById('lu').value);
        var wyzywienie= document.getElementsByName('wyzywienie');
        var wyzywienieIle=0;
        for(i=0;i<wyzywienie.length;i++){
            if(wyzywienie[i].checked){
                wyzywienieIle++;
            }
        }
        var tab=document.getElementsByName('dni');
        var dni;

        for (i=0;i<tab.length;i++){
            if (tab[i].checked) {
                dni= parseInt(tab[i].value); break; } }

        var wycieczka=document.getElementById('wycieczka').value;

        var k;
        switch (wycieczka) {
            case "Wśród kangurów":  k=dni*(150+20*wyzywienieIle)*ileOsob;
            case "Szlakiem Draculi": k=dni*(100+15*wyzywienieIle)*ileOsob;
            case "Parki Narodowe USA": k=dni*(200+15*wyzywienieIle)*ileOsob;
            case "Kraj kwitnącej wiśni": k=dni*(150+15*wyzywienieIle)*ileOsob;
            case "Śladami Faraona": k=dni*(100+15*wyzywienieIle)*ileOsob;
            case "Wyprawa po fiordach": k=dni*(200+15*wyzywienieIle)*ileOsob;
        }
        koszt=document.getElementById('koszt');
        koszt.value=k;
        return k;
    } else return false;
}

function pokazKoszt() {
    if(sprawdzDane()){
        var koszt=oblicz();
    } else console.log("Zly format");
    return false;
}