const accessKey = "crLLGSyA0k4zU8d5Fob6r4ywkukopQtoa3egE7cT0b8";
const formElement = document.querySelector("form");
const searchInputElement = document.getElementById("search-input")
const searchResultsElement = document.querySelector(".search-results")
const showMoreButton = document.getElementById("show-more-button")
let input = "";
let page = 1;

formElement.addEventListener("submit", (event)=>{
    event.preventDefault();
    page=1;
    searchImages();

    showMoreButton.addEventListener("click", ()=>{
        searchImages();
    })
})

async function searchImages(){
    input = searchInputElement.value;
    /**
     * Unsplash Api returns data in this format:
     *      {
                "total": 10000,
                "total_pages": 1000,
                "results": []  //10 items
            }

            where 1 page has 10 images, and result contains the same, we can get as many images by changing the pages, which we will do by "show more" button
     */
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if(page == 1) searchResultsElement.innerHTML = "";

    const results = data.results

    results.map((result) => {

        const imageWrapper = document.createElement("div")
        imageWrapper.className = "search-result w-[80%] md:w-[45%] lg:w-[30%] bg-slate-300 mb-8 rounded-md hover:scale-105 hover:transition-all hover:duration-200 hover:bg-slate-500 hover:text-white font-semibold max-w-lg min-w-fit"

        const image = document.createElement("img")
        image.src = result.urls.small;
        image.alt = result.alt_description;
        image.className = "object-cover w-full  h-[200px] overflow-hidden rounded-t-md "

        const linkWrapper = document.createElement("div");
        linkWrapper.className = "h-14 flex w-full justify-center items-center"

        const imageLink = document.createElement("a")
        imageLink.href = result.links.html;
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        linkWrapper.appendChild(imageLink)

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(linkWrapper)

        searchResultsElement.appendChild(imageWrapper)
    })

    page++;

    if(page>1) {
        showMoreButton.style.display = "block";
    }
}