const form = document.querySelector('#form')
const inputs = document.getElementsByTagName('input')
const itemsList = document.querySelector('#itemsList')
const clearBtn = document.querySelector('#clearBtn')
const errorText = document.querySelector('#errorText')

const getItems = () => {
    let items

    if(localStorage.getItem('items') === null){
        items = []
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }

    return items
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const storage = getItems()

    const name = inputs[0].value
    const quantity = inputs[1].value

    const item = {
        name: name,
        quantity: quantity
    }

    let i
    for(i = 0; i < storage.length; i++){
        if(item.name === storage[i].name){
            errorText.innerHTML = 'You already have this item in your list'

            return;
        }
    }

    storage.push(item)

    localStorage.setItem('items', JSON.stringify(storage))

    location.reload()
})


window.addEventListener('load', () => {
    const items = getItems()

    let content = ''

    
    Object.keys(items).map((item, index) => {
        return(
        content = content + `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${items[item].name}</td>
            <td>${items[item].quantity}</td>
            <td class="deleteBtn"><button class="btn btn-warning">delete</button></td>
        </tr>
        `
        )
    })

    itemsList.innerHTML = content

})

window.addEventListener('load', () => {
    const deleteBtns = document.querySelectorAll('.deleteBtn')
    const items = getItems()
    
    deleteBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            items.splice(index, 1)
            localStorage.setItem('items', JSON.stringify(items))

            location.reload()
        })
    })
})

window.addEventListener('load', () => {
    const items = getItems()

    //only show btn if there is at least 1 item
    if(items.length == 0){
        clearBtn.classList.add('d-none')
    }
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()

    location.reload()
})