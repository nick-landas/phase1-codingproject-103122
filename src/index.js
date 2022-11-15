document.body.className = 'fade';
document.addEventListener('DOMContentLoaded',() => {
    window.setTimeout(function() {
        document.body.className = '';
      }, 230);
    




    const resultsDiv = document.querySelector('#results');
const apiSearchForm = document.querySelector('#api-search');


apiSearchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const query = encodeURI(e.target.search.value)
        const exampleQuery = document.querySelector('.artistName')
        exampleQuery.innerHTML = `Search results for: ${query}`
        e.target.reset()
        resultsDiv.innerHTML =''
        console.log(query)
        fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&query[term][is_public_domain]=true&limit=10`)
        .then(res => res.json())    
        .then(artWorks => {
            console.log(artWorks)
            Object.keys(artWorks).forEach(key =>{
                console.log(key); 
                console.log(artWorks[key]);
            })
        artWorks.data.forEach(art => {
            const div = document.createElement("div");
            div.className = "container";
            fetch(`${art.api_link}?fields=id,title,image_id,artist_title,style_title,classification_title`)
            .then(r => r.json())
            .then(metadata => {
                console.log(metadata)
                const artMeta = metadata;
                const img = document.createElement("img");
                const overlay = document.createElement('div')
                overlay.className = "overlay";
                img.setAttribute('class', "pictures")
                const titleHover = document.createElement('div')
                titleHover.className = "text";
                titleHover.textContent = metadata.data.title
                img.src = `https://www.artic.edu/iiif/2/${artMeta.data.image_id}/full/843,/0/default.jpg`
                img.alt= art.thumbnail.alt_text
                img.addEventListener('click', () => {

                })
                const h2 = document.createElement("h2");
                h2.textContent = art.title
            
                const h3 = document.createElement("h3");
                h3.textContent = art.id
            
            
                const p = document.createElement("p");
                // p.textContent = art.thumbnail.alt_text
                overlay.append(titleHover);
                div.append(img,overlay);
                resultsDiv.append(div);
            })
        })
        
    
        })

        
})
})

