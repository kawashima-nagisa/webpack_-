// import文を使ってSassファイルを読み込む。
import "../scss/style.scss";

// //以下ハンバーガーメニューの際の記述
// const humburgerBox = document.getElementById("js-box");
// const nav = document.getElementById("js-nav");

// humburgerBox.addEventListener("click", function () {
// 	humburgerBox.classList.toggle("close");
// 	nav.classList.toggle("close");
// });

// // サブメニュー内のリンクに対して、クリックイベントリスナーを設定
// const subMenuLinks = document.querySelectorAll(".sp-menu__container a");
// subMenuLinks.forEach((link) => {
// 	link.addEventListener("click", function () {
// 		// ハンバーガーメニューを閉じる
// 		humburgerBox.classList.remove("close");
// 		nav.classList.remove("close");
// 		spHeader.classList.remove("close");
// 	});
// });

// //contact form7での日程項目　指定された月の第２土曜日の内容を取得する
// function getSecondSaturdays(fromDate, monthsAhead) {
// 	let dates = [];
// 	for (let i = 0; i < monthsAhead; i++) {
// 		let firstDayOfMonth = new Date(
// 			fromDate.getFullYear(),
// 			fromDate.getMonth() + i,
// 			1
// 		);
// 		let firstSaturday = new Date(firstDayOfMonth);
// 		while (firstSaturday.getDay() !== 6) {
// 			firstSaturday.setDate(firstSaturday.getDate() + 1);
// 		}
// 		let secondSaturday = new Date(firstSaturday);
// 		secondSaturday.setDate(secondSaturday.getDate() + 7);

// 		dates.push(secondSaturday);
// 	}
// 	return dates;
// }

// document.addEventListener("DOMContentLoaded", function () {
// 	let fromDate = new Date();
// 	let monthsAhead = 6;
// 	let saturdays = getSecondSaturdays(fromDate, monthsAhead);
// 	let selectElement = document.getElementById("your-date");

// 	saturdays.forEach(function (date) {
// 		let option = document.createElement("option");
// 		option.value = date.toISOString();
// 		option.text = date.toISOString().split("T")[0];
// 		selectElement.appendChild(option);
// 	});
// });

// WebPフォーマットの対応確認
function checkWebpSupport() {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = image.onerror = function () {
      resolve(image.height === 2);
    };
    image.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}

// 対応しているかどうかでクラスを付与
checkWebpSupport().then((isSupported) => {
  const htmlClassList = document.documentElement.classList;
  if (isSupported) {
    htmlClassList.add("is-webp");
  } else {
    htmlClassList.add("is-no-webp");
  }
});

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
