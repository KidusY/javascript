const deepMerge = (obj1, obj2) => {
	return { ...obj1, ...obj2 };
};

const obj1 = {
	a: 'a',
	b: 'b',
	c: 'c'
};
const obj2 = {
	d: 'd',
	e: 'e',
	f: 'f'
};


//console.log(deepMerge(obj1, obj2));



