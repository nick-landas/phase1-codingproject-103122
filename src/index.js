document.addEventListener("DOMContentLoaded", () => {

  const resultsDiv = document.querySelector("#results");
  const apiSearchForm = document.querySelector("#api-search");

  apiSearchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = encodeURI(e.target.search.value);
    const inputQuery = document.querySelector(".artistName");
    inputQuery.innerHTML = `Search results for: ${query}`;
    e.target.reset();
    resultsDiv.innerHTML = "";
    //console.log(query)
    fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}&page=1&limit=12`)
      .then((res) => res.json())
      .then((artWorks) => {
        // console.log(artWorks)
        Object.keys(artWorks).forEach((key) => {
        //console.log(key);
        //console.log(artWorks[key]);
        });
        artWorks.data.forEach((art) => {
          const div = document.createElement("div");
          div.className = "container";
          fetch(`${art.api_link}?fields=id,title,image_id,artist_title,style_title,classification_title`)

          
            .then((r) => r.json())
            .then((metadata) => {
              console.log(metadata);
              const artMeta = metadata;
              const img = document.createElement("img");
              const overlay = document.createElement("div");
              overlay.className = "overlay";
              img.setAttribute("class", "pictures");
              const titleHover = document.createElement("div");
              titleHover.className = "text";
              titleHover.textContent = metadata.data.title;
              img.src = `https://www.artic.edu/iiif/2/${artMeta.data.image_id}/full/843,/0/default.jpg`;
              img.alt = art.thumbnail.alt_text;

              overlay.addEventListener("click", () => {
                //console.log("Hello");
                const hiddenInfo = document.getElementById("facts");
                hiddenInfo.innerHTML = "";
                const metaBox = document.createElement("ul");
                metaBox.className = "no-bullets"

                const artist = document.createElement("li");
                artist.innerText = artMeta.data.artist_title;

                const style = document.createElement("li");
                style.innerText = artMeta.data.style_title;

                // const classification = document.createElement("li");
                // classification.innerText = artMeta.data.classification_title;

                const artworkID = document.createElement("li");
                let learnMore = `https://artic.edu/artworks/${artMeta.data.id}`
                artworkID.innerHTML = '<a href="'+ learnMore +'"target="_blank">Learn more about this piece</a>';

                //console.log(artworkID);

                metaBox.append(artist,style,artworkID);
                hiddenInfo.append(metaBox);
                setTimeout(() => {
                  //console.log('Hello World!');
                  hiddenInfo.innerHTML = "";
                }, 10000);
              });
              overlay.append(titleHover);
              div.append(img, overlay);
              resultsDiv.append(div);

              overlay.addEventListener("mouseenter", enlargeImg)
              function enlargeImg() {
                img.style.transform = "scale(2.0)";
                img.style.transition = "transform 2s ease";
              }
              overlay.addEventListener("mouseleave", resetImg)
              function resetImg() {
                img.style.transform = "scale(1)";
                img.style.transition = "transform 1s ease";
              }
            });
        });
      });
  });
});
