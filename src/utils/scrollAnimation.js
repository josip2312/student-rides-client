const observer = new IntersectionObserver((entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("enter");
			observer.unobserve(entry.target);
		}
	});
});

export default {
	bind(el) {
		el.classList.add(`before-enter`);
		observer.observe(el);
	}
};
