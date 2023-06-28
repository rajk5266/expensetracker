window.addEventListener('DOMContentLoaded',
    async () => {
        try {
            const response = await axios.get('http://localhost:1000/actionendpoint')
            // console.log(response)
            for (let i = 0; i < response.data.length; i++) {

                showExpensesList(response.data[i])
            }
        }
        catch (error) {
            console.log(error)
        }
    })

// var liabilities = 0
async function adding(event) {
    event.preventDefault()

    var description = event.target.desc.value;
    var category = event.target.categ.value;
    var amount = event.target.amt.value;
    
    const obj = {
        description,
        category,
        amount
    }

    const updateId = document.getElementById('submitButton').dataset.updateId
    if(updateId){
        try{
            const response = await axios.put(`http://localhost:1000/actionendpoint/${updateId}`, obj)
            showExpensesList(response.data);
            delete document.getElementById('submitButon').dataset.updateId;
        }
        catch(err){
            console.log(err)
        }
        resetSubmitbuttonValue()
    }
    else{
        try{
            const response = await axios.post('http://localhost:1000/actionendpoint', obj)
            showExpensesList(response.data);

        }catch(err){
            console.log(err)
        }
    }
}

function resetSubmitbuttonValue(){
    document.getElementById('submitButton').innerText = 'add expense'
}

function showExpensesList(obj) {

    // console.log(expenseID)
    var parentelem = document.getElementById('listOfitems')
    var childelem = document.createElement('li')

    childelem.className = 'newexp'
    childelem.textContent = obj.description + '-' + obj.category + '-' + obj.amount

    const editbtn = document.createElement('input')
    editbtn.id = obj.id
    editbtn.type = 'button'
    editbtn.value = 'EDIT'
    editbtn.className = "editbtn"
    editbtn.onclick = () => {
       const buttonId = editbtn.id;
       console.log(buttonId)
        parentelem.removeChild(childelem)
        document.getElementById('desctag').value = obj.description
        document.getElementById('categtag').value = obj.category
        document.getElementById('amttag').value = obj.amount

        const subBtn = document.getElementById('submitButton').innerText = 'UPDATE';
        document.getElementById('submitButton').dataset.updateId = buttonId;
    }


    const delbtn = document.createElement('input')
    delbtn.id = 'del'
    delbtn.type = "button"
    delbtn.value = 'X'
    delbtn.onclick = async () => {
        try {
            const expenseID = obj.id
            // totalchild.innerHTML -= parseInt(amount)
            const response = axios.delete(`http://localhost:1000/actionendpoint/${expenseID}`)
            parentelem.removeChild(childelem)
        }
        catch(err){
            console.log(err)
        }
    }
    parentelem.appendChild(childelem)
    childelem.appendChild(delbtn)
    childelem.appendChild(editbtn)
}