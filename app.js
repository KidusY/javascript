let renderStore = [];
let currentRange = {
	start: 0,
	end: 20
};
let pageNumber = 1;
let buttonNext = document.getElementById('Next');
let buttonPrev = document.getElementById('Prev');
const fetchData = () => {
	//fetch data
	axios('https://jsonplaceholder.typicode.com/posts').then((res) => createRenderItem(res.data));
};

fetchData();

const renderHTML = () => {
	const tBody = document.querySelector('tbody');
	const pageNumberElem = document.querySelector('.pageNumber');
	//creates the render store where all the element(td) live
	console.log(currentRange);
	for (let i = currentRange.start; i < currentRange.end; i++) {
		tBody.appendChild(renderStore[i]);
	}
	console.log(tBody);
	pageNumberElem.innerHTML = `${pageNumber}`;
};
const createRenderItem = async (resData) => {
	let incomingData = await resData;
	if (incomingData) {
		incomingData.map((info) => {
			let tr = document.createElement('tr');
			tr.innerHTML = `
             <td>${info.id}</td>
             <td>${info.title}</td>
             <td>${info.body}</td>`;

			renderStore.push(tr);
		});
	}
	renderHTML();
};

//how to go to next page
const Next = () => {
	//controls the page, prevents index out of bound
	if (
		currentRange.start >= 0 &&
		currentRange.start < renderStore.length - 20 &&
		currentRange.end <= renderStore.length
	) {
		currentRange.start = currentRange.start + 20;
		currentRange.end = currentRange.end + 20;
		pageNumber++;
	}

	//render html with the current info
	renderHTML();
};

//how to go back
const Prev = () => {
	//controls the page, prevents index out of bound
	if (currentRange.start > 0 && currentRange.end >= 20) {
		currentRange.start = currentRange.start - 20;
		currentRange.end = currentRange.end - 20;
		pageNumber--;
	}

	//render html with the current info
	renderHTML();
};

//go to next page
buttonNext.addEventListener('click', () => {
	//remove all td element from the page before calling the next page
	const td = document.querySelectorAll('tbody tr');

	if (pageNumber < 5) {
		td.forEach((el) => {
			el.remove();
		});
	}
	Next();
});
buttonPrev.addEventListener('click', () => {
	//remove all td element from the page before calling the next page
	const td = document.querySelectorAll('tbody tr');

	if (pageNumber > 1) {
		td.forEach((el) => {
			el.remove();
		});
	}
	Prev();
});
