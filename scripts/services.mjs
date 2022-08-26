class Experience {
    constructor(title, office, description) {
        this.title = title
        this.office = office
        this.description = description
    }

    newExperience() {
        let div = document.createElement('div')
        div.innerHTML = 
        ` 
            <h1> ${this.title} </h1>
            <span> ${this.office} </span>
            <p> ${this.description} </p>
        `
        return div
    }
}

var blocks = []
const div = document.querySelector('.blockpage')
const request = fetch('../scripts/experience.json')
        .then(response => {
            return response.json()
        })
        .then(jsondata => {
            for(let a= 0; a < jsondata.length; a++){
                let exp = new Experience(jsondata[a].title, jsondata[a].office, jsondata[a].description)
                blocks.push(exp.newExperience())
            }
        })


function getRepository() {
    fetch('https://api.github.com/users/gabriecgaldino/repos')
    .then(async res => {
        
        if (!res.ok) {
            throw new Error(res.status)
        }

        const data = await res.json()

        data.map(item => {
            let blockDiv = document.createElement('div')

            blockDiv.innerHTML =  `
            <strong>${item.name.toUpperCase()}</strong>
            <span> ${Intl.DateTimeFormat('pt-BR')
                .format(new Date(item.created_at))}
            </span>
            `
            blocks.push(blockDiv)
        })
    }).catch( e => console.log(e))

    function newblock() {
        const selectItems = blocks[Math.ceil(Math.random() * (blocks.length - 0) + 0)]

        if(div.children.length >= 9){
            div.children[Math.ceil(Math.random() * (9 - 0) + 0)].append = `${selectItems}`
        }

        div.appendChild(selectItems)
    }

    setInterval(newblock, 100)
}

getRepository()