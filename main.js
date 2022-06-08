let THE_MOST_HIDDEN_CHOICE_OF_ALL = Math.floor(Math.random() * 3);
let SHUFFLING = false;
let ROUND_ENDED = false;

function addTarget() {
	const target = document.querySelector('.ball-target');
	let left = 231;
	if (THE_MOST_HIDDEN_CHOICE_OF_ALL == 0) left = 64;
	else if (THE_MOST_HIDDEN_CHOICE_OF_ALL == 2) left = 400;
	target.style.left = left + 'px';
}

window.onload = (event) => {
	
	let generateTarget = setTimeout(() => {
		addTarget();
		document.querySelector('.ball-target').style.display = 'block';
	}, 300);
		
	document.querySelectorAll('.card').forEach((element) => {
		element.addEventListener('click', (e) => {
			e.target.blur();
			
			if (SHUFFLING || ROUND_ENDED) return;
			
			const index = e.target.getAttribute('data-indice');
			
			ROUND_ENDED = true;
			
			document.querySelectorAll('.card').forEach((element) => {
				element.classList.remove('chosen');
			});
			e.target.classList.add('chosen');
			
			if (index == THE_MOST_HIDDEN_CHOICE_OF_ALL) {
				e.target.classList.add('right');
			} else {
				e.target.classList.add('wrong');
				document.querySelector(`.card:nth-child(${THE_MOST_HIDDEN_CHOICE_OF_ALL + 1})`).classList.add('chosen');
				document.querySelector(`.card:nth-child(${THE_MOST_HIDDEN_CHOICE_OF_ALL + 1})`).classList.add('right');
			}
			document.querySelector('#shuffle').classList.add('button--focus');
		});
	});
	
	document.querySelector('#shuffle').addEventListener('click', (e) => {
		if (e.target.classList.contains('loading')) return false;
		document.querySelector('#shuffle').classList.remove('button--focus');
		document.querySelector('.ball-target').style.display = 'none';
		document.querySelectorAll('.card').forEach((element) => {
			element.classList.remove('chosen');
			element.classList.remove('wrong');
			element.classList.remove('right');
		});
		SHUFFLING = true;
		e.target.classList.add('loading');
		e.target.innerHTML = '<img src="loader.gif" width="24" height="24" />';
		e.target.setAttribute('disabled', true);
		document.querySelector('.container').classList.add('shuffle');
		let t = setTimeout(() => {
			THE_MOST_HIDDEN_CHOICE_OF_ALL = Math.floor(Math.random() * 3);
			e.target.classList.remove('loading');
			document.querySelector('.container').classList.remove('shuffle');
			e.target.innerHTML = 'ESCOLHA!';
			SHUFFLING = false;
			ROUND_ENDED = false;
		}, 1500);
		let generateTarget = setTimeout(() => {
			addTarget();
			document.querySelector('.ball-target').style.display = 'block';
		}, 2200);
		let reanableTimer = setTimeout(() => {
			e.target.innerHTML = 'SHUFFLE';
			e.target.removeAttribute('disabled');
		}, 2800);
	});
	
	document.querySelectorAll('.theme').forEach((element) => {
		element.addEventListener('click', (e) => {
			document.querySelector('body').classList.remove('default');
			document.querySelector('body').classList.remove('dark-city');
			document.querySelector('body').classList.remove('black-parade');
			document.querySelector('body').classList.remove('sunset');
			document.querySelector('body').classList.remove('muddy-waters');
			document.querySelector('body').classList.remove('mirkwood');
			
			const theme = e.target.getAttribute('id');
			document.querySelector('body').classList.add(theme);
		});
	});
}