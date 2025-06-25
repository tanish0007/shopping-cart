const nav = document.querySelector(".nav");
const pageData = document.querySelector("#page-Data");
let items = JSON.parse(localStorage.getItem("items")) || [];
const itemsBox = document.createElement("div");
itemsBox.classList.add("items-box");

const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

if(!loggedInUser) {
    window.location.href = "index.html";
} else {
    showPageData();
}


function showPageData (){
    const heading = document.createElement("h1");
    heading.innerText = `Welcome ${loggedInUser.name}`;
    nav.appendChild(heading);

    const sideNav = document.createElement("div");
    if(loggedInUser.isAdmin){
        const span = document.createElement('span');
        span.innerHTML = "Admin";
        sideNav.appendChild(span);
    }
    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.id = "logoutBtn"
    logoutButton.innerText = "Logout";
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });

    sideNav.appendChild(logoutButton);
    nav.appendChild(sideNav);

    showItems();
}

function showItems () {
    if (items.length === 0) {
        itemsBox.innerText = "No items Present";
        pageData.appendChild(itemsBox);
        return;
    }

    if (loggedInUser.isAdmin) {
        renderAdminInterface();
    }
    else {
        renderUserView();
    }

    // render everything on page-Data
    pageData.appendChild(itemsBox);
}

function renderAdminInterface(){
    const upperDiv = document.createElement("div");
    upperDiv.classList.add("upper-div");

    const inputsBox = document.createElement("div");
    inputsBox.classList.add("inputs");

    const nameBox = document.createElement("input");
    nameBox.id = "nameBox";
    nameBox.type = "text";
    nameBox.placeholder = "Name of item..";

    const quanBox = document.createElement("input");
    quanBox.id = "quanBox";
    quanBox.type = "number";
    quanBox.placeholder = "Quantity..";

    const priceBox = document.createElement("input");
    priceBox.id = "priceBox";
    priceBox.type = "number";
    priceBox.placeholder = "Price..";

    const descBox = document.createElement("input");
    descBox.id = "descBox";
    descBox.type = "text";
    descBox.placeholder = "Description";

    inputsBox.appendChild(nameBox);
    inputsBox.appendChild(quanBox);
    inputsBox.appendChild(priceBox);
    inputsBox.appendChild(descBox);

    const buttonsBox = document.createElement("div");
    buttonsBox.classList.add("Buttons");

    const addBtn = document.createElement("button");
    addBtn.id = "addBtn";
    addBtn.innerText = "Add Item"; 
    addBtn.addEventListener("click", () => {
        const existingUpdNow = document.querySelector("#updNowBtn");
        if (existingUpdNow) existingUpdNow.remove();

        if (!nameBox.value || !quanBox.value || !priceBox.value || !descBox.value) {
            alert("Please fill in all fields.");
            return;
        }

        const item = {
            id: Date.now(),
            name: nameBox.value,
            quantity: quanBox.value,
            price: priceBox.value,
            description: descBox.value
        };

        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
        lowerDiv.innerHTML = "";
        items.forEach(i => addToDom(i, lowerDiv, items));
    });

    buttonsBox.appendChild(addBtn);

    upperDiv.appendChild(inputsBox);
    upperDiv.appendChild(buttonsBox);

    
    const lowerDiv = document.createElement("div");
    lowerDiv.classList.add("lower-div");

    items.forEach(item => {
        addToDom(item, lowerDiv, items);
    })

    itemsBox.appendChild(upperDiv)
    itemsBox.appendChild(lowerDiv);
}

function addToDom(item, container, itemsArray) {
    const div = document.createElement("div");
    div.setAttribute("id", item.id);
    div.classList.add("item");

    const ul = document.createElement("ul");

    const firstLI = document.createElement("li");
    firstLI.classList.add("itemName");
    firstLI.innerText = `Name : ${item.name}`;
    ul.appendChild(firstLI);

    const secondLI = document.createElement("li");
    secondLI.classList.add("itemQuantity");
    secondLI.innerText = `Quantity : ${item.quantity}`;
    ul.appendChild(secondLI);

    const thirdLI = document.createElement("li");
    thirdLI.classList.add("itemPrice");
    thirdLI.innerText = `Price : ${item.price}`;
    ul.appendChild(thirdLI);

    const fourthLI = document.createElement("li");
    fourthLI.classList.add("itemDesc");
    fourthLI.innerText = `Description : ${item.description}`;
    ul.appendChild(fourthLI);

    div.appendChild(ul);

    const btnBox = document.createElement("div");
    btnBox.classList.add("button-box");

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.addEventListener("click", () => {
        const confirmDelete = confirm(`Are you sure you want to delete "${item.name}"?`);
        if (!confirmDelete) return;

        const updatedItems = itemsArray.filter(i => i.id !== item.id);
        localStorage.setItem("items", JSON.stringify(updatedItems));
        div.remove();
    });
    btnBox.appendChild(delBtn);

    const updBtn = document.createElement("button");
    updBtn.innerText = "Edit";
    updBtn.addEventListener("click", () => {
        const confirmUpdate = confirm(`Are you sure you want to update "${item.name}"?`);
        if (!confirmUpdate) return;

        // Pre-fill the admin input fields
        document.querySelector("#nameBox").value = item.name;
        document.querySelector("#quanBox").value = item.quantity;
        document.querySelector("#priceBox").value = item.price;
        document.querySelector("#descBox").value = item.description;

        // Remove existing Update Now button if any
        const existingUpdNow = document.querySelector("#updNowBtn");
        if (existingUpdNow) existingUpdNow.remove();

        //  Remove Add Item button
        const addBtn = document.querySelector("#addBtn");
        if (addBtn) {
            addBtn.disabled = true;
            addBtn.style.cursor = "not-allowed";
        }

        // Disable Logout button
        const logoutBtn = document.querySelector("#logoutBtn") 

        if (logoutBtn) {
            logoutBtn.disabled = true;
            logoutBtn.style.cursor = "not-allowed";
        }

        // Creating Update Now Button
        const updNow = document.createElement("button");
        updNow.id = "updNowBtn";
        updNow.innerText = "Update Now";
        document.querySelector(".Buttons").appendChild(updNow);

        updNow.addEventListener("click", () => {
            let changed = false;
            const nameInput = document.querySelector("#nameBox").value;
            const quanInput = document.querySelector("#quanBox").value;
            const priceInput = document.querySelector("#priceBox").value;
            const descInput = document.querySelector("#descBox").value;

            itemsArray = itemsArray.map(elem => {
                if (elem.id === item.id) {
                    if (elem.name !== nameInput && nameInput) {
                        elem.name = nameInput;
                        changed = true;
                    }
                    if (elem.quantity !== quanInput && quanInput) {
                        elem.quantity = quanInput;
                        changed = true;
                    }
                    if (elem.price !== priceInput && priceInput) {
                        elem.price = priceInput;
                        changed = true;
                    }
                    if (elem.description !== descInput && descInput) {
                        elem.description = descInput;
                        changed = true;
                    }
                }
                return elem;
            });

            if (changed) {
                localStorage.setItem("items", JSON.stringify(itemsArray));
                container.innerHTML = "";
                itemsArray.forEach(i => addToDom(i, container, itemsArray));
                updNow.remove();
            } else {
                alert("No changes were made");
            }


            if (addBtn) {
                addBtn.disabled = false;
                addBtn.style.cursor = "pointer";
            }
            if (logoutBtn) {
                logoutBtn.disabled = false;
                logoutBtn.style.cursor = "pointer";
            }

            updNow.remove();
        });
    });
    btnBox.appendChild(updBtn);

    div.appendChild(btnBox);
    container.appendChild(div);
}

function renderUserView(){
    const lowerDiv = document.createElement("div");
    lowerDiv.classList.add("lower-div");

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");

        const ul = document.createElement("ul");

        ul.innerHTML = `
            <li>Name: ${item.name}</li>
            <li>Quantity: ${item.quantity}</li>
            <li>Price: ${item.price}</li>
            <li>Description: ${item.description}</li>
        `;

        div.appendChild(ul);
        lowerDiv.appendChild(div);
    })
    itemsBox.appendChild(lowerDiv);
}