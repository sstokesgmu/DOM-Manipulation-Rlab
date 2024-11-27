//import '.src/styles.css'
// Menu data structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

//Part 1: Getting Started
const mainEl = document.getElementsByTagName("main")[0];
const headerEl = document.getElementsByTagName("header")[0];
const bgColor = window
  .getComputedStyle(document.body)
  .getPropertyValue("--main-bg");
mainEl.style.backgroundColor = bgColor;

//In a single line we added the TextElement we want to add
mainEl.appendChild(document.createElement("h1")).textContent =
  "DOM Manipulation";

//Now the HTML file looks something like this:
//<main><h1>DOM Manipulation</h1></main>
mainEl.classList.add("flex-ctr");

//Part 2: Creating a Menu Bar
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
const navBgColor = window
  .getComputedStyle(document.body)
  .getPropertyValue("--top-menu-bg");

topMenuEl.style.backgroundColor = navBgColor;
topMenuEl.classList.add("flex-around");

//Part 3: Adding Menu Buttons
menuLinks.forEach((element, index) => {
  const anchor = document.createElement("a"); //Creat an anchor element
  anchor.appendChild(document.createTextNode(element.text));
  anchor.setAttribute("href", element.href);

  if(menuLinks[index].subLinks) //At what index does the elemen
    anchor.setAttribute("subLinks", menuLinks[index].subLinks);
  topMenuEl.append(anchor);
});
headerEl.append(topMenuEl);

//Output: <a href = index.href> index.text </a>
const subMenuEl = document.createElement("nav");
subMenuEl.setAttribute("id", "sub-menu");
headerEl.append(subMenuEl);
//console.log(headerEl.childNodes);

headerEl.style.position = "relative";
topMenuEl.style.position = "relative";
topMenuEl.style.zIndex = "20";

subMenuEl.style.width = "100%";
subMenuEl.style.zIndex = "10";
subMenuEl.style.transition = "top 0.5s ease-out";

subMenuEl.style.position = "absolute";
subMenuEl.style.height = "0%";
subMenuEl.style.backgroundColor = window
  .getComputedStyle(document.body)
  .getPropertyValue("--sub-menu-bg");

subMenuEl.classList.add("flex-around");

// Access the first stylesheet (assuming it's your styles.css)
const stylesheet = document.styleSheets[0];

// Add a new rule to the stylesheet
stylesheet.insertRule(
  `#sub-menu a:hover {
    background-color: var(--top-menu-bg);
}`,
  stylesheet.cssRules.length
);

stylesheet.insertRule(
  `nav a.active {
    background-color: var(--sub-menu-bg);
    color: var(--main-bg);
}`,
  stylesheet.cssRules.length
);

const topMenuLinks = topMenuEl.getElementsByTagName("a");
console.log(topMenuLinks);
// console.log(topMenuEl)
topMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    if (e.target.tagName !== "A")
      throw new Error("The object target is not an anchor tag");

    let queue = Array.from(topMenuLinks).reduce((newArray, element) =>{ //! What is []
        return element === e.target ? [...newArray,element]: [element,...newArray];},[]);

    for(let anchor of queue){ //! What is stored inside top menu sublinks
        if (anchor  === e.target){
          e.target.classList.add("active");
          if(e.target.hasAttribute('sublinks'))
            callSubMenu(e);
          continue;
        } 
        if(anchor.hasAttribute('sublinks')) //!I only want this to run once
          closeSubMenu(anchor);

          //! need to add a case where the anchor is active but doesn't have a sublinks
    }
  } catch (error) {
    console.error(error);
  }
});


function callSubMenu (eventObj){
   console.log(`${eventObj.target.textContent} has a sub-menu open`);
   subMenuEl.style.height = "100%";
}

function closeSubMenu(anchor) {
  subMenuEl.style.height = "0%";
  anchor.classList.remove('active');
  console.log('close subMenu');
 // console.log(`${eventObj.target.textContent} closed it's submenu`)
}

const completeHTML = document.documentElement.outerHTML;
//Print it to the console or save it
//console.log(completeHTML);
