alert('in construction...')
fetch('https://api.github.com/users/gabriecgaldino/repos')
    .then(async res => {
        
        if (!res.ok) {
            throw new Error(res.status)
        }

        const data = await res.json()

        data.map(item => {
            let blockDiv = {
                type: 'projects',
                name: item.name.toUpperCase(),
                created_at: Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at))
            }
            blocks.push(blockDiv)
        })
    }).catch( e => console.log(e))
fetch('../scripts/experience.json')
    .then(response => {
        return response.json()
    })
    .then(jsondata => {
        jsondata.map(item => {
            let exp = {
                type: 'experience',
                title: item.title,
                office: item.office,
                description: item.description
            }
            blocks.push(exp)
        })
    })

var blocks = []
const projects = document.querySelector('#projects')

function newblock() {
    const newItem = document.createElement('div')
    var random = blocks[Math.ceil(Math.random() * ((blocks.length - 1)))]
    
    if(random.type == 'experience'){
        newItem.innerHTML = `
        <strong> ${random.title} </strong>
        <p> ${random.office} </p>
        
        `
    } else {
        newItem.innerHTML = `
        <strong> ${random.name} </strong >
        <p> ${random.created_at} </p>
        `
    }

    if(projects.children.length < 9){
        projects.append(newItem)
    } else {
        projects.children[Math.ceil(Math.random() * ((8 - 0)))].innerHTML = `${newItem.innerHTML}`
    }
    


    

}
setInterval(newblock, 500)

