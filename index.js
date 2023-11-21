let mail = document.getElementById('email');
      email.addEventListener('input',()=> mailvalidate(mail));
      function Mailvalidate(element){
        if(element.validity.typeMismatch){
          element.setCustomValidity("Format of email is not correct");
          element.reportValidity();
        }
        else{
          element.setCustomValidity("");
        }
      }
 

     var obj = document.getElementById("dob");
      
      obj.addEventListener('input', ()=> validdate(obj));

    function Difference(user_dob, today) {  
        const date1 = Date.UTC(user_dob.getFullYear(), user_dob.getMonth(), user_dob.getDate());
        const date2= Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
          day = 1000*3600*24;
        return(date2- date1)/day
    }
      
      
      function Validdate(obj) {
        
        let user_dob = new Date(obj.value);
        let today_date = new Date();
        time_differ = difference(user_dob,today_date);

        console.log(time_differ);
        if ((time_differ < 6570) || (time_differ>=20075)){
          obj.setCustomValidity("You are not eligible as you are not  belong to 18 - 55 age group");
          obj.reportValidity();
      }
      else{
        obj.setCustomValidity('');
      }
      
   }

    let retrieveddata = () => {
          let userentries = localStorage.getItem("user_details");
          if(userentries){
            userentries = JSON.parse(userentries);
          }
          else{
            userentries = [];
          }
          return userentries;
        }

   let details_form = document.getElementById("details");
   let entries = retrieveddata();
   let display_data = () => {
          let entries = retrieveddata();

          let tableentries = entries.map((val)=>{
            let namecell = <td> ${val.name} </td>;
            let emailcell = <td> ${val.email} </td>;
            let passwordcell = <td> ${val.password} </td>;
            let dobcell = <td> ${val.dob} </td>;
            let acceptedcell = <td> ${val.accepted} </td>;

            let trow = <tr>${namecell} ${emailcell} ${passwordcell} ${dobcell} ${acceptedcell}</tr>;
            return trow;
          }).join("\n");


let table = <table style = 'width: 51%;border: 3px solid black;'><tr class="rk"style = 'border: 3px solid black;'><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th></tr>${tableentries} </table>;
          let details = document.getElementById("user-entries");
          details.innerHTML = table;
        }

let final_details = (event) => {
          event.preventDefault();
          let name = document.getElementById("username").value;
          console.log(name);
          let email = document.getElementById("email").value;
          let password = document.getElementById("password").value;
          let dob = document.getElementById("dob").value;
          let accepted = document.getElementById("accept").checked;

          let entry_data = {
             name,
             email,
             password,
             dob,
             accepted
          };

          entries.push(entry_data);
          localStorage.setItem("user_details", JSON.stringify(entries));
         
          display_data();

        };
        
details_form.addEventListener('submit', final_details);
display_data();
