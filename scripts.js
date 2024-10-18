//#region const get.element
const themswitcher = document.getElementById("theme-switcher");
const bodytag = document.querySelector("body");
const addplus = document.getElementById("add-btn");
const addInput = document.getElementById("addt");
const ul = document.querySelector(".todos");
const filter = document.querySelector(".filter");
const btnclear = document.querySelector("#clear-completed");
//#endregion
//#region main
function main(e) {
  e.preventDefault();
  //theme switcher
  themswitcher.addEventListener("click", () => {
    bodytag.classList.toggle("light");
    const theme = themswitcher.children[0]; //این یعنی فرزند های  آی دی تم سویچر اول به صورت ارایه بهت میده برای اشاره دقیق تر از ایندکس مورد نظز استفاده میکنیم
    theme.setAttribute(
      "src",
      theme.getAttribute("src") === "./assets/images/icon-sun.svg"
        ? "./assets/images/icon-moon.svg"
        : "./assets/images/icon-sun.svg"
    );
  });

  todoselectior(JSON.parse(localStorage.getItem("todos")));
  //#region مربوط به قسمت سه اپ تو دو لیست
  ul.addEventListener("dragover", (e) => {
    //درگ اوور یعنی اون شی یا ال آی که روش داره اون شی یا ال آّی درگ شده میشینه و جایگزین میشه
    e.preventDefault(); //تارگت اشاره به رویدادی که اان در ایونت لیستنر ما قرار گرفتع یعنی درگ اوور
    if (
      e.target.classList.contains("card") &&
      !e.target.classList.contains("dragging")
    ) {
      const dragcard = document.querySelector(".dragging");
      const cards = [...ul.querySelectorAll(".card")]; //با اضافه کردن سپریت اپریتور ایندکس های کلاس های که کارد دارن واکشی میشه
      const conspos = cards.indexOf(dragcard); //ایندکس اونی که بلند شده یا درگ شده
      const newPos = cards.indexOf(e.target); //اندکس اونی که روش درگ اوور انجام میشه یعنی زیر اونی که بلندش شده داره قرار میگیره
      console.log(conspos, newPos);
      if (conspos > newPos) {
        ul.insertBefore(dragcard, e.target);
      } else {
        ul.insertBefore(dragcard, e.target.nextSibling); //درگ سبلینگ یعنی برادر بعدی  مثلا در یو ال همه ای آ ی ها برادرند و فرزند یو ال
        //حالا ما میگیم بیا قبل فرزند بعدی بزار یعنی اگه ایندکس یک میزاری جای دو میشه قبل سه
      }
      //ثبت حالت در لوکال استوریج
      const todos = JSON.parse(localStorage.getItem("todos")); //دوباره استرینگ جنسون تبدیل به ارایه میکنیم
      const removed = todos.splice(conspos, 1); //یدونه رو که درگ کرده بردار و بریز توی ریموو
      todos.splice(newPos, 0, removed[0]); //هیچی از نیو پوزیشن بر ندار او یدونه که داخل ریمو بریز داخلش
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
  //#endregion
  //#region add to task in localstorage
  addplus.addEventListener("click", () => {
    //localStorage.setItem("tasks",addtInput.value); چون اعتبار سنجی نشده این روش غلط

    const task = addInput.value.trim(); //تابع تریم فضاها اضافی که کاربر با اسپیس ایجاد کرده رو موقع نوشتن تسک میگیرد
    if (task) {
      addInput.value = "";

      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));
      //جیسون دات پرس عکس جیسون استرینیگ فای یعنی خروجی رو از یک رشته استرینگ تبدیل به یک پکیج ارایه یا شی میکنه
      const currentTask = {
        item: task, //اینجا تسک خودمون که اطلاعات اینپوت بود دادیم داخل شی کارنت تسک
        iscompleted: false,
      };

      todos.push(currentTask); //کارنت تسک دادیم داخل  تودوز که  شرطشو پیاده کنه
      localStorage.setItem("todos", JSON.stringify(todos)); //یا جسون استرینگ فای شی ما تبدیل به رشتع جاوا اسکریپتی شد
      todoselectior([currentTask]); //به صورت ارایه پاسش میده شی و دیگه لازم نیست هر سری صفحه رفرش بشخ
    }
  });
  //#endregion
  //#region  مربوط به قسمت چهار و اضافه کردن کلید اینتر
  addInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      addplus.click();
    }
  });
  //#endregion
  filter.addEventListener("click", (e) => {
    const id = e.target.id;
    if (id) {
      document.querySelector(".on").classList.remove("on");
      document.getElementById(id).classList.add("on");
      document.querySelector(".todos").className = `todos ${id}`;
    }
  });
  btnclear.addEventListener("click", () => {
    var deleteindex = []; 
    document.querySelectorAll(".card.checked").forEach((card) => {
      deleteindex.push(
        [...document.querySelectorAll(".todos .card")].indexOf(card)
      );
      // card.classList.add("fall");
      // card.addEventListener('animationend', () => {card.remove()});
      card.remove();
    });
    multidelete(deleteindex);
  });
}
//#endregion
//#region remove todo قسمت 4
function removeTodo(index) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//#endregion
//#region todocomplete
function todocomplete(index, isComplete) {
  const todoList1 = JSON.parse(localStorage.getItem("todos"));
  todoList1[index].iscompleted = isComplete;
  localStorage.setItem("todos", JSON.stringify(todoList1));
}
//#endregion
//#region multidelete
function multidelete(indexes) {
  var todos = JSON.parse(localStorage.getItem("todos"));
  todos.filter((todos, index) => {
    return  !indexes.includes(index);
    
  });
  console.log(todos);
}
//#endregion
//#region selected html todo
function todoselectior(todoselect) {
  const time_left = document.getElementById("items-left");
  if (!todoselect) {
    return null;
  }
  todoselect.forEach((todoarray) => {
    //#region create html element
    const cardli = document.createElement("li");
    const cbcontainer = document.createElement("div");
    const cbinput = document.createElement("input");
    const span = document.createElement("span");
    const itemp = document.createElement("p");
    const btnclear = document.createElement("button");
    const images = document.createElement("img");
    //#endregion
    //#region set class html element
    cardli.classList.add("card");
    cbcontainer.classList.add("cb-container");
    cbinput.classList.add("cb-input");
    span.classList.add("check");
    itemp.classList.add("item");
    btnclear.classList.add("clear");
    //#endregion
    //#region set attributes html element
    cardli.setAttribute("draggable", true);
    cbinput.setAttribute("type", "checkbox");
    images.setAttribute("src", "./assets/images/icon-cross.svg");
    images.setAttribute("alt", "Clear it");
    itemp.textContent = todoarray.item; //میگم تسکی که توی تابع مین در شی کارنت هست بیاد نشون بده
    if (todoarray.iscompleted) {
      cardli.classList.add("checked");
      cbinput.setAttribute("checked", "checked");
    }
    //#endregion
    //#region set event elements
    cardli.addEventListener("dragstart", () => {
      //در سایت دبلیو تیری اسکول قسمت ایونت دام
      //درگ دستور داخل ال ای بود در اچ تی ام ال در قسمت اتربیوت ها بالا هم اشاره شده
      //این میگه زمانی که اون شی یا ال ای برداشتی
      cardli.classList.add("dragging");
    });

    cbinput.addEventListener("click", (e) => {
      const currentCard = cbinput.parentElement.parentElement;
      const indexOfCard = [
        ...document.querySelectorAll(".todos .card"),
      ].indexOf(currentCard);
      const check = cbinput.checked;
      todocomplete(indexOfCard, check);
      check
        ? currentCard.classList.add("checked")
        : currentCard.classList.remove("checked");
      time_left.textContent = document.querySelectorAll(
        ".todos .card:not(.checked)"
      ).length;
    });
    cardli.addEventListener("dragend", () => {
      cardli.classList.remove("dragging");
    });
    btnclear.addEventListener("click", (e) => {
      const currentCard = btnclear.parentElement;
      currentCard.classList.add("fall");
      const indexOfCurrentCard = [
        ...document.querySelectorAll(".todos .card"),
      ].indexOf(currentCard);
      removeTodo(indexOfCurrentCard);
      currentCard.addEventListener("animationend", () => {
        setTimeout(() => {
          currentCard.remove();
          time.textContent = document.querySelectorAll(
            ".todos .card:not(.checked)"
          ).length;
        }, 100);
      });
    });
    //#endregion
    //#region set children
    cbcontainer.appendChild(cbinput);
    cbcontainer.appendChild(span);
    btnclear.appendChild(images);
    cardli.appendChild(cbcontainer);
    cardli.appendChild(itemp);
    cardli.appendChild(btnclear);
    document.querySelector(".todos").appendChild(cardli);
    //#endregion
  });
  time_left.textContent = document.querySelectorAll(
    ".todos .card:not(.checked)"
  ).length;
}
//#endregion
document.addEventListener("DOMContentLoaded", main); //این ایونت تا زمانی که تمتم عکس هامون لود نشه اجازه شروع جاوا اسکریپتو نمیده
