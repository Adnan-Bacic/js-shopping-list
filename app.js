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

    
    //only shows the last element

    Object.keys(items).map((item, index) => {
        //console.log(item, index)

        return(
        content = content + `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${items[item].name}</td>
            <td>${items[item].quantity}</td>
            <td class="deleteBtn" name="${items[item].name}">delete</td>
        </tr>
        `
        )
    })

    //forEach
    /*
   Object.keys(items).forEach((item, index) => {
            //console.log(data.rates); //shows all names and rates
                        content = content +
                            `
                            <tr>
            <th scope="row">${index + 1}</th>
            <td>${items[item].name}</td>
            <td>${items[item].quantity}</td>
        </tr>
                            `
                    });
                    */

    itemsList.innerHTML = content

})

window.addEventListener('load', () => {
    const deleteBtns = document.querySelectorAll('.deleteBtn')

    const items = getItems()
    console.log('items', items)

    console.log('btns', deleteBtns)
    

    deleteBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            console.log(items[0], index)
            
            let i
            for(i = 0; i < items.length; i++){
                if(btn[index] === items[i]){
                    console.log(1)
                } else {
                    console.log(2)
                }
            }

        })
    })
})





clearBtn.addEventListener('click', () => {
    localStorage.clear()

    location.reload()
})