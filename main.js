const name_inp = document.querySelector("#name");

window.addEventListener('load', () => {
       todo = JSON.parse(localStorage.getItem('todo'))|| [];
       const username = localStorage.getItem('username') || '';
       name_inp.value = username;
 
       const form = document.querySelector('#add-task')
       const inp = document.querySelector('#input_tk')
       const list_tk = document.querySelector('#tasks')
       
       name_inp.addEventListener('change',e=>{
              localStorage.setItem('username',e.target.value);
       });


const modify_tasks = () => {
       list_tk.innerHTML = ''; 
      
       todo.forEach(task => {
         const task_el = document.createElement("div");
         task_el.classList.add("task");
   
         const task_content_el = document.createElement("div");
         task_content_el.classList.add("content");
   
         task_el.appendChild(task_content_el);
         const task_input_el = document.createElement("input");
         task_input_el.classList.add("text");
         task_input_el.type = "text";
         task_input_el.value = task;
         task_input_el.setAttribute("readonly", "readonly");
         task_content_el.appendChild(task_input_el);
   
         const task_action_el = document.createElement("div");
         task_action_el.classList.add("actions");
   
         const task_edit_el = document.createElement("button");
         task_edit_el.classList.add("edit");
         task_edit_el.innerHTML = "edit";
   
         const task_delete_el = document.createElement("button");
         task_delete_el.classList.add("delete");
         task_delete_el.innerHTML = "Delete";
   
         const task_comp_el = document.createElement("button");
         task_comp_el.innerHTML = "completed";
   
         task_action_el.appendChild(task_edit_el);
         task_action_el.appendChild(task_delete_el);
         task_action_el.appendChild(task_comp_el);
         task_el.appendChild(task_action_el);
         list_tk.appendChild(task_el);
   
         task_edit_el.addEventListener('click', () => {
           if (task_edit_el.innerText.toLowerCase() == "edit") {
              task_input_el.removeAttribute("readonly");
              task_input_el.focus();
              task_input_el.style.textDecoration = "none";
              task_edit_el.innerText = "Save";
           } else {
              task_input_el.setAttribute("readonly", "readonly");
              task_edit_el.innerText = "Edit";
              todo = todo.map(t => t === task ? task_input_el.value : t); 
              localStorage.setItem('todo', JSON.stringify(todo)); 
            
              
           }
          
          
         });

         task_edit_el.addEventListener('click', () =>{
          todo = todo.map(t => t === task ? task_input_el.value : t); 
          localStorage.setItem('todo', JSON.stringify(todo));
         })
   
         task_delete_el.addEventListener('click', () => {
              list_tk.removeChild(task_el);
              todo = todo.filter(t => t !== task); 
              localStorage.setItem('todo', JSON.stringify(todo)); 
         });
   
         task_comp_el.addEventListener('click', () => {
              task_input_el.style.textDecoration = "line-through";
        
              
         });
       });
     }

     form.addEventListener('submit', (e) => {
       e.preventDefault();
   
       const task = inp.value;
   
       if (!task) {
         alert('Oops you forgot to add');
         return;
       }
   
       todo.push(task); 
       localStorage.setItem('todo', JSON.stringify(todo)); 
   
       inp.value = "";
       modify_tasks(); 
     });
     modify_tasks();

})


