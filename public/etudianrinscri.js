
let id_service ;
let service = document.getElementById("service")
let course = document.getElementById("cours")
service.addEventListener('change',function(){
     id_service = service.value;
     datatosend = {id_service:id_service}
     fetch('/getelemnts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datatosend)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.result)
    // Handle the response from the server
    for(let i =0;i<(data.result).length;i++){

        var option = document.createElement("option");
        option.value = data.result[i].course_id;
        option.text = data.result[i].label;
        cours.appendChild(option)
    }
    })
    .catch(error => {
    // Handle errors
    console.error('Error:', error);
    });

})