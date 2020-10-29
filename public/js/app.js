console.log("Loading successfull")



const weatherform = document.querySelector('form')
const search = document.querySelector('input')

const m1=document.querySelector('#message-one')
const m2=document.querySelector('#message-two')
// m1.textContent=""
// m2.textContent=""
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    // console.log(location)
    m1.textContent="Loading......."
    m2.textContent=""
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            m1.textContent=data.error
        }
        else{
            console.log(data.response)
            m1.textContent=data.response.x2;
            m2.textContent=data.response.x1;
        }
    })
})
})