/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   


/*** 
   Global Variables
***/

const studentList = document.getElementsByClassName('student-item');
const numberOfItems = 10;
let searchInput;

// Accessor for notifying user of no results found, would usually add this to html but project specifically says not to touch html

const noResultsMessage = document.createElement("p");
document.querySelector('.student-list').appendChild(noResultsMessage);

/*** 
   Showpage function takes in a list parameter and a page paramenter and only shows 
   the number of items above for each individual page
***/

function showPage (list, page) {
   const startIndex = (page * numberOfItems) - numberOfItems;
   const endIndex = page * numberOfItems;

   for (var i = 0; i < list.length; i++) {
      if (i >= startIndex && i <= endIndex) {
         list[i].style.display = "";
      } 
      else
      list[i].style.display = 'none';
   }
}
/*** 
   appendPageLinks function takes in a list and appends navigation links to call showPage 
   and set/unset active status for links
***/

function appendPageLinks (list) {
   const pageElement = document.querySelector('.page');
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   const numberOfPages = list.length / numberOfItems;
 
   div.className = 'pagination';
   pageElement.appendChild(div);
   div.appendChild(ul);

   for (var i = 1; i < numberOfPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = "#";
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
      if (i === 1) {
         a.className = "active";
      }
   }

   const links = document.querySelectorAll('a');

   links.forEach((a) => {
      a.addEventListener("click", (e) => {
         links.forEach((a) => {
            a.classList.remove('active');
         });
         e.target.className = "active";
         showPage(list, e.target.textContent);
      })
   })
}

/*** 
   appendSearchBar function adds the search input and submit button to the page, also adds the event listeners on those elements
***/

function appendSearchBar() {
   const headerElement = document.querySelector(".page-header");
   const div = document.createElement('div');
   searchInput = document.createElement("input");
   const button = document.createElement("button");

   div.className = "student-search";
   searchInput.placeholder = "Search for students...";
   button.innerText = "Search";
   button.addEventListener("click", () => {
      event.preventDefault();
      performSearch(searchInput, studentList);
   })
   searchInput.addEventListener('keyup', () => {
      performSearch(searchInput, studentList);
   })

   headerElement.appendChild(div);
   div.appendChild(searchInput);
   div.appendChild(button);
}

/*** 
   performSearch function loops through the student list and compares the input value to the students name, pushing them to a new array if they match and shows the new results
***/

function performSearch (searchInput, students) {
   const searchArray = [];
   for (let i = 0; i < students.length; i++) {
      const studentName = students[i].querySelector('h3').textContent;
      const inputValue = searchInput.value;
      students[i].style.display = "none";
      if (inputValue.length !== 0 && studentName.toLowerCase().includes(inputValue.toLowerCase())){
         students[i].style.display = "";
         searchArray.push(students[i])
      }
    }
    checkForNoResults(searchArray);
    resetPage(searchArray);
   }

   /*** 
   checkForNoResults function test to see if the search results come up empty and then alerts the user if so
***/

   function checkForNoResults(results) {
      if (results.length === 0) {
         noResultsMessage.textContent = "Sorry your search returned no matches.";
      } else {
         noResultsMessage.textContent = "";
      }
   }

   /*** 
   resetPage function updates nav links and shows new results based of the searchArray coming in
***/

   function resetPage(searchArray) {
      const page = document.querySelector('.page');
      const pageLinks = document.querySelector("div.pagination");
      page.removeChild(pageLinks);
      showPage(searchArray, 1);
      appendPageLinks(searchArray);
   }

   /*** 
   Init calling of functions
***/

appendSearchBar();
showPage(studentList, 1);
appendPageLinks(studentList);