
     var myStorage = window.localStorage;
     //myStorage.clear();
     var luser;
     var email_t;

  function removeold(event)
  {
    document.getElementById("fP").style.display ='none';
     const sp=  document.getElementById("SP");
     sp.style.display = 'block'; 
  }
  function removeold2(event)
  {
    document.getElementById("fP").style.display ='none';
     const tp=  document.getElementById("TP");
     tp.style.display = 'block'; 
  }

  const fp = document.getElementById("fP");
  const b = fp.getElementsByTagName("button");
  b[0].addEventListener("click",removeold);
  b[1].addEventListener("click",removeold2);
  
 
  function saveuser(event)
  {
    
    let temp = [];
    let temp2 = "{}";
    let first_name = document.getElementById('fname').value;
    let last_name = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    temp = [first_name,last_name,password];
    let check = document.getElementById("chkbox").checked;
    if(check && first_name != "" && last_name != "" && email != "" && password != "")
    { 
      myStorage.setItem(email,temp);
      myStorage.setItem(password,temp2);
      luser =password;
      document.getElementById("SP").style.display ="none";
      const fourp =  document.getElementById("FourP");
      fourp.style.display ='block'; 

    }
    else
    {
      alert("PLEASE FILL ALL INFORMATION");
    }
     email_t = email;
    document.getElementById('fname').value="";
    document.getElementById('lname').value="";
    document.getElementById('email').value="";
    document.getElementById('password').value="";
    
  }
     var count = 0;
     var count1 = 0;

      function uniqueid()
     {
       count = count +1;
       return count;
     }
    function uniqueid1()
       {
         count1 = count1 +1;
         return count1;
       }

   function login(event)
   {

    let email1 = document.getElementById('email1').value;
    let password1 = document.getElementById('pass1').value;
    if(email1 === "" || password1 ==="")
    {
      alert("please fill email/password ");
    }
    else
    { 
      email_t = email1;
      let temp_str = myStorage.getItem(email1);
      if(temp_str === null)
      {
        alert("please fill correctly");
      }
      else
      {

        temp_str = temp_str.split(",");
        let password2 = temp_str[2];
         if(password1 === password2 )
        {
          luser = password1;
          //console.log("login successfully");
          document.getElementById("TP").style.display ="none";
          const fourp=  document.getElementById("FourP");
          fourp.style.display ='block'; 
         

          const list =myStorage.getItem(password1);
          var json_obj = JSON.parse(list);
          
          let divf = document.getElementById("first");
          const alllis = divf.querySelectorAll(".list");
           for(const prop of alllis)
            {
              divf.removeChild(prop);
            }


  
          for(let prop1 in json_obj)
          {
             
             let json_div = document.createElement("div");
             let br1 = document.createElement("br");
             json_div.id = uniqueid();
             let h2= document.createElement("h2");
             h2.innerText = prop1;
             json_div.classList.add("list");
             divf.appendChild(json_div);
             json_div.appendChild(h2);
             let buttonTemp2 = document.createElement("button");
             buttonTemp2.id = `b${uniqueid1()}` ;
            buttonTemp2.innerHTML=`<i class="fa fa-trash" aria-hidden="true">&nbsp;DELETE LIST</i>`;
            buttonTemp2.addEventListener("click",deletelist)
            buttonTemp2.value=(`${prop1}`);
            let buttonTemp5= document.createElement("button");
            buttonTemp5.id = `b${uniqueid()}`;
            buttonTemp5.innerHTML=`<i class="fa fa-plus" aria-hidden="true">&nbsp;ADD LIST ITEM</i>`;
            buttonTemp5.addEventListener("click",Newitem)
            buttonTemp5.value=(`${prop1}`);
            json_div.appendChild(buttonTemp5);
            json_div.appendChild(buttonTemp2);
            json_div.appendChild(br1);
            json_div.appendChild(br1);
             json_obj[prop1].forEach(function(d){
            let chkbx = document.createElement("input");
            chkbx.id = "chkbox" + uniqueid1();
            chkbx.type = "checkbox";
            let label = document.createElement("label");
            label.id="lbchk"+ uniqueid1();
            label.innerText= d;
            label.for=chkbx.id;
            let br = document.createElement("br");
            let buttonTemp = document.createElement("button");
            buttonTemp.id = `b${uniqueid1()}` ;
            buttonTemp.innerHTML=`<i class="fa fa-trash" aria-hidden="true"></i>`;
            buttonTemp.addEventListener("click",deleteitem)
            buttonTemp.value=(`${prop1},${d}`);
            let div = document.createElement("div");
            
            json_div.appendChild(div);
             div.appendChild(chkbx);
             div.appendChild(label);
             div.appendChild(buttonTemp);
            json_div.append(br);});
            
          }
          
        }
      }
    }
    document.getElementById('email1').value = "";
    document.getElementById('pass1').value = "";
    
   }
    
   function newlist(event)
   {
     
     let fd1  = document.getElementById("third");
     let text = fd1.getElementsByTagName("textarea");
     let listname = text['txt'].value;
     let list_real = myStorage.getItem(luser);
     
  
     if(list_real ==="{}")
     {
      x={};
     }
     else
     {
      var x= JSON.parse(list_real);
     }
     if(!(listname in x) == true )
     {
      x[listname] =[];
      let list_obj_str=JSON.stringify(x);
      myStorage.setItem(luser,list_obj_str);
     let divli = document.createElement("div");
     divli.id = uniqueid();
     let h2= document.createElement("h2");
     h2.innerText = listname;
     divli.classList.add("list");
     let fd2  = document.getElementById("first");
     fd2.appendChild(divli);
     divli.appendChild(h2);
    let buttonTemp3= document.createElement("button");
    buttonTemp3.id = `b${uniqueid1()}` ;
    buttonTemp3.innerHTML=`<i class="fa fa-trash" aria-hidden="true">&nbsp;DELETE LIST</i>`;
    buttonTemp3.addEventListener("click",deletelist)
    buttonTemp3.value=(`${listname}`);
    divli.appendChild(buttonTemp3);
    let buttonTemp5= document.createElement("button");
    buttonTemp5.id = `b${uniqueid()}`;
    buttonTemp5.innerHTML=`<i class="fa fa-plus" aria-hidden="true">&nbsp;ADD LIST ITEM</i>`;
    buttonTemp5.addEventListener("click",Newitem)
    buttonTemp5.value=(`${listname}`);
    divli.appendChild(buttonTemp5);
    let br1 = document.createElement("br");
    divli.appendChild(br1);
    divli.appendChild(br1);

     }

 
   }

   function deletelist()
   {
    let list_real = myStorage.getItem(luser);
    let arr= JSON.parse(list_real);
    //console.log(arr);
    let names = this.value;
    //console.log(names[0],names[1]);
    delete arr[names]
    //console.log(arr[names[0]]);
    let list_obj_str=JSON.stringify(arr);
   
    myStorage.setItem(luser,list_obj_str);
    this.parentNode.remove();
    console.log(myStorage.getItem(luser));
   }

   function deleteitem()
    {
      let list_real = myStorage.getItem(luser);
      let arr= JSON.parse(list_real);
      //console.log(arr);
      let names = this.value.split(",");
      //console.log(names[0],names[1]);
      let i = arr[names[0]];
      position = i.indexOf(names[1]);
     
      if(~position)
      {arr[names[0]].splice(position, 1);}
      //console.log(arr[names[0]]);
      let list_obj_str=JSON.stringify(arr);
     
      myStorage.setItem(luser,list_obj_str);
      this.parentNode.remove();
      
    }

    function Newitem()
    {
      let d  = document.getElementById("d");
      let text = d.getElementsByTagName("textarea");
      let div = document.createElement("div");
      const listitem = text['txt1'].value;
      if(listitem !="")
      {
        let list_real = myStorage.getItem(luser);
        var x= JSON.parse(list_real);
        x[this.value].push(listitem);
        let list_obj_str=JSON.stringify(x);
        let chkbx = document.createElement("input");
        chkbx.id = "chkbox" + uniqueid1();
        chkbx.type = "checkbox";
        let label = document.createElement("label");
        label.id="lbchk"+ uniqueid1();
        label.innerText=  listitem;
        label.for=chkbx.id;
        let br = document.createElement("br");
        let buttonTemp = document.createElement("button");
        buttonTemp.id = `b${uniqueid1()}` ;
        buttonTemp.innerHTML=`<i class="fa fa-trash" aria-hidden="true"></i>`;
        buttonTemp.addEventListener("click",deleteitem)
        buttonTemp.value=(`${this.value},${listitem}`);
      
       
        div.appendChild(chkbx);
        div.appendChild(label);
        div.appendChild(buttonTemp);
        this.parentNode.appendChild(div);
        this.parentNode.appendChild(br);
        myStorage.setItem(luser,list_obj_str);
        text['txt1'].value = "";
      }
      
      }

  
   function fpp(event)
   {
    document.getElementById("FourP").style.display = 'none';
    document.getElementById("fP").style.display = 'block';
   }
  function fpp1(event)
  {
    document.getElementById("FourP").style.display = 'none';
    document.getElementById("fiveP").style.display = 'block';
    let q = myStorage.getItem(email_t);
    let q_parse= q.split(",");
    document.getElementById("fname1").value = q_parse[0];
    document.getElementById("lname1").value = q_parse[1];
    document.getElementById("password1").value = q_parse[2];
    document.getElementById("email2").value = email_t;
    let p1 = myStorage.getItem(luser);
    let p2=p1;
    //console.log(myStorage);
    function newchanges(event)
    {
    let temp1 = [];
    let first_name1 = document.getElementById('fname1').value;
    let last_name1 = document.getElementById('lname1').value;
    let ee = document.getElementById('email2').value;
    let pass = document.getElementById('password1').value;
    temp1 = [first_name1,last_name1,pass];
    if(first_name1 != "" && last_name1 != "" && ee != "" && pass != "")
    { 
      myStorage.removeItem(email_t);
      myStorage.removeItem(luser);
      myStorage.setItem(ee,temp1);
      myStorage.setItem(pass,p2);
      //luser=pass;
      document.getElementById("fiveP").style.display ="none";
      const fp1= document.getElementById("fP");
      fp1.style.display ='block'; 
    }
    else
    {
      alert("PLEASE FILL ALL INFORMATION");
    }

    }


    const w = document.getElementById("fiveP");
    const e = w.getElementsByTagName("button");
    e[0].addEventListener("click",newchanges);
  }

  function back1(event)
  {
    document.getElementById("SP").style.display ="none";
    document.getElementById("fP").style.display ="block";
  }
  function back(event)
  {
    document.getElementById("TP").style.display ="none";
    document.getElementById("fP").style.display ="block";
  }

  const sp1 = document.getElementById("SP");
  const b1 = sp1.getElementsByTagName("button");
  b1['button1'].addEventListener("click", saveuser);
  b1['w'].addEventListener("click", back1);

  const tp1 =  document.getElementById("TP");
  const b2 = tp1.getElementsByTagName("button");
  b2['button2'].addEventListener("click", login);
  b2['q'].addEventListener("click",back);

 
  const fd  = document.getElementById("FourP");
  const b3 = fd.getElementsByTagName("button");
  b3['button3'].addEventListener("click",newlist);

  const bd  = document.getElementById("bdiv");
  const b4 = bd.getElementsByTagName("button");
  b4['b1'].addEventListener("click",fpp);
  b4['b2'].addEventListener("click",fpp1);
