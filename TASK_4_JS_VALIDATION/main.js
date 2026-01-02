
document.addEventListener("DOMContentLoaded", () => {
  const pw = document.getElementById("password");
  const strength = document.getElementById("strength");
  const form = document.getElementById("regForm");

  // Password strength indicator code//
  if (pw) {
    pw.addEventListener("input", () => {
      const val = pw.value;
      let msg = "Weak ";
      let score = 0;
      if (val.length >= 8) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      if (score >= 3) msg = "Strong ";
      else if (score === 2) msg = "Medium ";
      strength.textContent = "Password Strength: " + msg;
    });
  }

  // Client-side //
  if (form) {
    form.addEventListener("submit", (e) => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      if (!name || name.length < 3) {
        e.preventDefault();
        alert("Name must be at least 3 characters");
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        e.preventDefault();
        alert("Please enter a valid email");
        return;
      }

    });
  }
});
