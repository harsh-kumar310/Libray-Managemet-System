
const STORAGE_KEY = 'libraryBooks';
let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const libraryForm = document.getElementById('libraryForm');
const titleInput  = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput   = document.getElementById('year');
const rollNoInput = document.getElementById('rollNo');
const rackNoInput = document.getElementById('rackNo');
const booksTable  = document.querySelector('#booksTable tbody');
const formTitle   = document.getElementById('form-title');
const bookIndexInput = document.getElementById('bookIndex');
const cancelEditBtn  = document.getElementById('cancelEdit');
const searchInput    = document.getElementById('searchInput');

const saveBooks = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(books));

const resetForm = () => {
  libraryForm.reset();
  formTitle.textContent = 'Add New Book';
  bookIndexInput.value = '';
  cancelEditBtn.style.display = 'none';
};

function renderBooks(filter = '') {
  booksTable.innerHTML = '';
  const term = filter.toLowerCase();
  const view = books.filter(b =>
    b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)
  );

  if (!view.length) {
    booksTable.innerHTML =
      '<tr><td colspan="6" style="text-align:center;">No books found.</td></tr>';
    return;
  }

  view.forEach((b, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${b.title}</td>
      <td>${b.author}</td>
      <td>${b.year}</td>
      <td>${b.rollNo}</td>
      <td>${b.rackNo}</td>
      <td>
        <button onclick="editBook(${i})">Edit</button>
        <button class="danger" onclick="deleteBook(${i})">Delete</button>
      </td>`;
    booksTable.appendChild(row);
  });
}

libraryForm.addEventListener('submit', e => {
  e.preventDefault();
  const entry = {
    title : titleInput.value.trim(),
    author: authorInput.value.trim(),
    year  : yearInput.value.trim(),
    rollNo: rollNoInput.value.trim(),
    rackNo: rackNoInput.value.trim()
  };

  const idx = bookIndexInput.value;
  idx === '' ? books.push(entry) : (books[idx] = entry);

  saveBooks();
  renderBooks(searchInput.value);
  resetForm();
});

window.editBook = i => {
  const b = books[i];
  titleInput.value  = b.title;
  authorInput.value = b.author;
  yearInput.value   = b.year;
  rollNoInput.value = b.rollNo;
  rackNoInput.value = b.rackNo;

  formTitle.textContent = 'Edit Book';
  bookIndexInput.value  = i;
  cancelEditBtn.style.display = 'inline-block';
};

window.deleteBook = i => {
  if (confirm('Delete this book?')) {
    books.splice(i, 1);
    saveBooks();
    renderBooks(searchInput.value);
    if (bookIndexInput.value === String(i)) resetForm();
  }
};

cancelEditBtn.addEventListener('click', resetForm);
searchInput.addEventListener('input', e => renderBooks(e.target.value));
renderBooks();


const BORROW_KEY = 'borrowRecords';
let issues = JSON.parse(localStorage.getItem(BORROW_KEY)) || [];

const issueForm       = document.getElementById('issueBookForm');
const studentNameIn   = document.getElementById('studentName');
const studentMobileIn = document.getElementById('studentMobile');
const subjectTitleIn  = document.getElementById('subjectTitle');
const subjectAuthorIn = document.getElementById('subjectAuthor');
const issueDateIn     = document.getElementById('issueDate');
const dueDateIn       = document.getElementById('dueDate');
const issuesTable     = document.querySelector('#issuesTable tbody');
const issueIndexIn    = document.getElementById('issueIndex');
const cancelIssueBtn  = document.getElementById('cancelIssueEdit');
const issueTitle      = document.getElementById('issue-title');

const saveIssues = () => localStorage.setItem(BORROW_KEY, JSON.stringify(issues));

const resetIssueForm = () => {
  issueForm.reset();
  issueTitle.textContent = 'Issue Book to Student';
  issueIndexIn.value = '';
  cancelIssueBtn.style.display = 'none';
};

function renderIssues() {
  issuesTable.innerHTML = '';
  if (!issues.length) {
    issuesTable.innerHTML =
      '<tr><td colspan="7" style="text-align:center;">No records found.</td></tr>';
    return;
  }
  issues.forEach((r, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${r.student}</td>
      <td>${r.mobile}</td>
      <td>${r.subject}</td>
      <td>${r.author}</td>
      <td>${r.issueDate}</td>
      <td>${r.dueDate}</td>
      <td>
        <button onclick="editIssue(${i})">Edit</button>
        <button class="danger" onclick="deleteIssue(${i})">Delete</button>
      </td>`;
    issuesTable.appendChild(row);
  });
}

issueForm.addEventListener('submit', e => {
  e.preventDefault();
  const record = {
    student  : studentNameIn.value.trim(),
    mobile   : studentMobileIn.value.trim(),
    subject  : subjectTitleIn.value.trim(),
    author   : subjectAuthorIn.value.trim(),
    issueDate: issueDateIn.value,
    dueDate  : dueDateIn.value
  };

  const idx = issueIndexIn.value;
  idx === '' ? issues.push(record) : (issues[idx] = record);

  saveIssues();
  renderIssues();
  resetIssueForm();
});

window.editIssue = i => {
  const r = issues[i];
  studentNameIn.value   = r.student;
  studentMobileIn.value = r.mobile;
  subjectTitleIn.value  = r.subject;
  subjectAuthorIn.value = r.author;
  issueDateIn.value     = r.issueDate;
  dueDateIn.value       = r.dueDate;

  issueTitle.textContent = 'Edit Issue Record';
  issueIndexIn.value = i;
  cancelIssueBtn.style.display = 'inline-block';
};

window.deleteIssue = i => {
  if (confirm('Delete this record?')) {
    issues.splice(i, 1);
    saveIssues();
    renderIssues();
    if (issueIndexIn.value === String(i)) resetIssueForm();
  }
};

cancelIssueBtn.addEventListener('click', resetIssueForm);
renderIssues();