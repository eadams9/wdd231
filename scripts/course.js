// Course list. Replace with the official array from the assignment if yours differs,
// then set completed to true for each course you have finished.
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduces programming concepts and problem solving using Python.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduces the World Wide Web and how to create web pages with HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Teaches how to write and use functions to organize and reuse code.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Introduces object-oriented programming with classes.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Adds JavaScript to HTML and CSS to build dynamic, interactive pages.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on responsive design, accessibility, and modern frontend practices.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Store elements
const courseList = document.querySelector('#course-list');
const totalCredits = document.querySelector('#total-credits');
const filterButtons = document.querySelectorAll('.filters button');

// Build the cards for whichever courses are passed in
function displayCourses(list) {
    courseList.innerHTML = '';

    list.forEach(course => {
        const card = document.createElement('li');
        card.classList.add('course-card');

        const label = `${course.subject} ${course.number}`;

        if (course.completed) {
            card.classList.add('completed');
            card.textContent = `\u2713 ${label}`;
            card.setAttribute('aria-label', `${label}, completed`);
        } else {
            card.textContent = label;
        }

        card.title = course.title;
        courseList.appendChild(card);
    });

    // Total credits for the courses currently displayed
    const total = list.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = total;
}

// Filter by subject using the array filter method
function filterCourses(subject) {
    if (subject === 'all') {
        return courses;
    }
    return courses.filter(course => course.subject === subject);
}

// Button events
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        displayCourses(filterCourses(button.dataset.filter));
    });
});

// Initial display
displayCourses(courses);
