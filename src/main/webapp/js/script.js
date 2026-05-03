(function () {
  /* ---- Utility ---- */
  const $ = id => document.getElementById(id);
  const show = (el, msg) => { el.textContent = msg || el.textContent; el.classList.add('show'); };
  const hide = el => el.classList.remove('show');
  const setValid = el => { el.classList.remove('invalid'); el.classList.add('valid'); };
  const setInvalid = el => { el.classList.remove('valid'); el.classList.add('invalid'); };
  const clearState = el => { el.classList.remove('valid', 'invalid'); };

  /* ---- Password toggle ---- */
  document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      const isText = target.type === 'text';
      target.type = isText ? 'password' : 'text';
      btn.querySelector('svg').innerHTML = isText
        ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
        : '<path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
    });
  });

  /* ---- Password strength ---- */
  const pwField = $('password');
  const segs = [1, 2, 3, 4].map(n => $('seg' + n));
  const strLabel = $('strength-label');
  const colors = { 0: 'var(--border)', 1: 'var(--weak)', 2: 'var(--fair)', 3: 'var(--strong)', 4: 'var(--strong)' };
  const labels = { 0: '', 1: 'Weak', 2: 'Fair', 3: 'Strong', 4: 'Very Strong' };

  function getStrength(v) {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[A-Z]/.test(v)) s++;
    if (/[0-9]/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v)) s++;
    return s;
  }

  pwField.addEventListener('input', () => {
    const v = pwField.value;
    const s = v ? getStrength(v) : 0;
    segs.forEach((seg, i) => {
      seg.style.background = i < s ? colors[s] : 'var(--border)';
      seg.style.transform = i < s ? 'scaleY(1.4)' : 'scaleY(1)';
    });
    strLabel.textContent = v ? labels[s] : '';
    strLabel.style.color = colors[s];
    validatePassword(false);
  });

  /* ---- Validators ---- */
  function validateName(show_err = true) {
    const el = $('name'), err = $('name-err'), v = el.value.trim();
    if (!v) {
      if (show_err) { setInvalid(el); show(err); } return false;
    }
    setValid(el); hide(err); return true;
  }

  function validateEmail(show_err = true) {
    const el = $('email'), err = $('email-err'), v = el.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v || !re.test(v)) {
      if (show_err) { setInvalid(el); show(err); } return false;
    }
    setValid(el); hide(err); return true;
  }

  function validatePassword(show_err = true) {
    const el = $('password'), err = $('password-err'), v = el.value;
    if (v.length < 8) {
      if (show_err) { setInvalid(el); show(err); } return false;
    }
    setValid(el); hide(err); return true;
  }

  function validateConfirm(show_err = true) {
    const el = $('confirm'), err = $('confirm-err');
    const v1 = $('password').value, v2 = el.value;
    if (!v2 || v1 !== v2) {
      if (show_err) { setInvalid(el); show(err); } return false;
    }
    setValid(el); hide(err); return true;
  }

  function validateMobile(show_err = true) {
    const el = $('mobile'), err = $('mobile-err'), v = el.value.trim();
    const re = /^\+?[\d\s\-().]{7,15}$/;
    if (!v || !re.test(v)) {
      if (show_err) { setInvalid(el); show(err); } return false;
    }
    setValid(el); hide(err); return true;
  }

  function validateLanguage(show_err = true) {
    const el = $('language'), err = $('language-err');
    if (!el.value) {
      if (show_err) { setInvalid(el); show(err); } return false;
    }
    setValid(el); hide(err); return true;
  }

  function validateAttachment(show_err = true) {
    const el = $('attachment'), err = $('attachment-err');
    const lbl = $('fileLabelEl');
    if (!el.files || !el.files.length) {
      if (show_err) { lbl.classList.add('invalid'); show(err); } return false;
    }
    const allowed = ['jpg', 'jpeg', 'png', 'pdf', 'zip'];
    const ext = el.files[0].name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) {
      if (show_err) { lbl.classList.add('invalid'); show(err, 'Invalid file type. Use JPG, PNG, PDF or ZIP.'); } return false;
    }
    lbl.classList.remove('invalid'); hide(err); return true;
  }

  function validateGender(show_err = true) {
    const err = $('gender-err');
    const checked = document.querySelector('input[name="gender"]:checked');
    if (!checked) {
      if (show_err) show(err); return false;
    }
    hide(err); return true;
  }

  function validateTerms(show_err = true) {
    const el = $('terms'), err = $('terms-err');
    if (!el.checked) {
      if (show_err) show(err); return false;
    }
    hide(err); return true;
  }

  /* ---- Real-time binding ---- */
  $('name').addEventListener('input', () => validateName());
  $('name').addEventListener('blur', () => validateName());
  $('email').addEventListener('input', () => validateEmail());
  $('email').addEventListener('blur', () => validateEmail());
  $('confirm').addEventListener('input', () => validateConfirm());
  $('mobile').addEventListener('input', () => validateMobile());
  $('mobile').addEventListener('blur', () => validateMobile());
  $('language').addEventListener('change', () => validateLanguage());
  document.querySelectorAll('input[name="gender"]').forEach(r => r.addEventListener('change', () => validateGender()));
  $('terms').addEventListener('change', () => validateTerms());

  $('attachment').addEventListener('change', () => {
    const el = $('attachment');
    const lbl = $('fileLabelEl');
    const txt = $('fileTextEl');
    if (el.files && el.files.length) {
      txt.textContent = el.files[0].name;
      lbl.classList.add('has-file');
    } else {
      txt.textContent = 'Upload .JPG, .PNG, .PDF or .ZIP';
      lbl.classList.remove('has-file');
    }
    validateAttachment();
  });

  /* ---- Toast ---- */
  function showToast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
  }

  /* ---- Submit ---- */
  $('regForm').addEventListener('submit', e => {
    e.preventDefault();
    const valid = [
      validateName(), validateEmail(), validatePassword(), validateConfirm(),
      validateMobile(), validateLanguage(), validateAttachment(),
      validateGender(), validateTerms()
    ].every(Boolean);

    if (!valid) {
      showToast('Please fix the errors before submitting.');
      const firstInvalid = document.querySelector('.invalid, .error-msg.show');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const btn = $('submitBtn');
    btn.textContent = 'Registering...';
    btn.disabled = true;

    // Real form submission to the servlet
    setTimeout(() => {
      $('regForm').submit();
    }, 1000);
  });

})();
