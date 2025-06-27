document.getElementById("add-subject").addEventListener("click", () => {
  const subjectHTML = `
    <div class="row mb-3 subject">
      <div class="col-md-5">
        <input type="number" step="0.01" class="form-control grade-point" placeholder="SGPA" min="0" max="10" required />
      </div>
      <div class="col-md-5">
        <input type="number" class="form-control credit mt-1" placeholder="Credit" min="0.1" step="0.1" required />
      </div>
      <div class="col-md-2">
        <button type="button" class="btn btn-danger remove-subject mt-1">Remove</button>
      </div>
    </div>
  `;
  document.getElementById("subjects").insertAdjacentHTML("beforeend", subjectHTML);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-subject")) {
    e.target.closest(".subject").remove();
  }
});

document.getElementById("cgpa-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const grades = document.querySelectorAll(".grade-point");
  const credits = document.querySelectorAll(".credit");

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach((gradeInput, i) => {
    const gp = parseFloat(gradeInput.value);
    const cr = parseFloat(credits[i].value);

    if (!isNaN(gp) && !isNaN(cr)) {
      totalPoints += gp * cr;
      totalCredits += cr;
    }
  });

  const result = document.getElementById("result");
  if (totalCredits > 0) {
    const cgpa = totalPoints / totalCredits;
    result.innerHTML = `<h4>Your CGPA is: <strong>${cgpa.toFixed(2)}</strong></h4>`;
  } else {
    result.innerHTML = `<h5 class="text-dnger">Please enter valid inputs.</h5>`;
  }
});

// predict.html

function predictSGPA() {
      const curCGPA = parseFloat(document.getElementById('curCGPA').value);
      const pastCredits = parseFloat(document.getElementById('pastCredits').value);
      const semCredits = parseFloat(document.getElementById('semCredits').value);
      const targetCGPA = parseFloat(document.getElementById('targetCGPA').value);
      const resultBox = document.getElementById('sgpaResult');

      if (!isNaN(curCGPA) && !isNaN(pastCredits) && !isNaN(semCredits) && !isNaN(targetCGPA) && semCredits > 0) {
        const totalCredits = pastCredits + semCredits;
        const requiredSGPA = ((targetCGPA * totalCredits) - (curCGPA * pastCredits)) / semCredits;
        resultBox.style.display = 'block';
        resultBox.innerText = `You need an SGPA of ${requiredSGPA.toFixed(2)} this semester.`;
      } else {
        resultBox.style.display = 'block';
        resultBox.classList.replace('alert-primary', 'alert-danger');
        resultBox.innerText = 'Please enter all fields correctly.';
      }
    }