document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    // Inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const mobileInput = document.getElementById('mobile');
    const languageInput = document.getElementById('language');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const attachmentInput = document.getElementById('attachment');
    const termsInput = document.getElementById('terms');
    
    // Password Strength UI
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const fileNameDisplay = document.getElementById('fileName');

    // Validation Regex Patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[\d\s\-\(\)]{10,15}$/; // Supports formats like +1 555-555-5555 or 1234567890

    // File input change handler
    attachmentInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            const fileExt = file.name.split('.').pop().toLowerCase();
            const allowedExts = ['jpg', 'jpeg', 'png', 'pdf', 'zip'];
            
            if (allowedExts.includes(fileExt)) {
                e.target.closest('.file-label').classList.add('has-file');
                validateField(attachmentInput, true, 'attachmentError');
            } else {
                e.target.closest('.file-label').classList.remove('has-file');
                validateField(attachmentInput, false, 'attachmentError');
            }
        } else {
            fileNameDisplay.textContent = 'Choose a file...';
            e.target.closest('.file-label').classList.remove('has-file');
            validateField(attachmentInput, false, 'attachmentError');
        }
    });

    // Real-time validation listeners
    nameInput.addEventListener('input', () => validateName());
    emailInput.addEventListener('input', () => validateEmail());
    passwordInput.addEventListener('input', () => {
        validatePassword();
        checkPasswordStrength(passwordInput.value);
        if (confirmPasswordInput.value) validateConfirmPassword();
    });
    confirmPasswordInput.addEventListener('input', () => validateConfirmPassword());
    mobileInput.addEventListener('input', () => validateMobile());
    languageInput.addEventListener('change', () => validateLanguage());
    
    genderInputs.forEach(input => {
        input.addEventListener('change', () => validateGender());
    });
    
    termsInput.addEventListener('change', () => validateTerms());

    // Validation Functions
    function showError(elementId, show) {
        const errorEl = document.getElementById(elementId);
        if (show) {
            errorEl.style.display = 'block';
        } else {
            errorEl.style.display = 'none';
        }
    }

    function setValidationStatus(inputEl, isValid) {
        if (isValid) {
            inputEl.classList.remove('invalid');
            inputEl.classList.add('valid');
        } else {
            inputEl.classList.remove('valid');
            inputEl.classList.add('invalid');
        }
    }

    function validateField(inputEl, condition, errorId) {
        setValidationStatus(inputEl, condition);
        showError(errorId, !condition);
        return condition;
    }

    function validateName() {
        return validateField(nameInput, nameInput.value.trim() !== '', 'nameError');
    }

    function validateEmail() {
        return validateField(emailInput, emailPattern.test(emailInput.value.trim()), 'emailError');
    }

    function validatePassword() {
        return validateField(passwordInput, passwordInput.value.length >= 8, 'passwordError');
    }

    function validateConfirmPassword() {
        const isValid = confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value.length > 0;
        return validateField(confirmPasswordInput, isValid, 'confirmPasswordError');
    }

    function validateMobile() {
        const digits = mobileInput.value.replace(/\D/g, '');
        const isValid = digits.length >= 10 && phonePattern.test(mobileInput.value.trim());
        return validateField(mobileInput, isValid, 'mobileError');
    }

    function validateLanguage() {
        return validateField(languageInput, languageInput.value !== '', 'languageError');
    }

    function validateGender() {
        const isChecked = Array.from(genderInputs).some(radio => radio.checked);
        showError('genderError', !isChecked);
        return isChecked;
    }

    function validateAttachment() {
        const file = attachmentInput.files[0];
        if (!file) {
            showError('attachmentError', true);
            return false;
        }
        const fileExt = file.name.split('.').pop().toLowerCase();
        const allowedExts = ['jpg', 'jpeg', 'png', 'pdf', 'zip'];
        const isValid = allowedExts.includes(fileExt);
        showError('attachmentError', !isValid);
        return isValid;
    }

    function validateTerms() {
        showError('termsError', !termsInput.checked);
        return termsInput.checked;
    }

    // Password Strength Indicator
    function checkPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

        switch(strength) {
            case 0:
            case 1:
                strengthBar.style.width = '25%';
                strengthBar.style.backgroundColor = 'var(--strength-weak)';
                strengthText.textContent = 'Weak';
                strengthText.style.color = 'var(--strength-weak)';
                break;
            case 2:
                strengthBar.style.width = '50%';
                strengthBar.style.backgroundColor = 'var(--strength-fair)';
                strengthText.textContent = 'Fair';
                strengthText.style.color = 'var(--strength-fair)';
                break;
            case 3:
                strengthBar.style.width = '75%';
                strengthBar.style.backgroundColor = 'var(--strength-good)';
                strengthText.textContent = 'Good';
                strengthText.style.color = 'var(--strength-good)';
                break;
            case 4:
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = 'var(--strength-strong)';
                strengthText.textContent = 'Strong';
                strengthText.style.color = 'var(--strength-strong)';
                break;
            default:
                strengthBar.style.width = '0';
                strengthText.textContent = '';
        }
        
        if (password.length === 0) {
            strengthBar.style.width = '0';
            strengthText.textContent = '';
        }
    }

    // Form Submission
    form.addEventListener('submit', (e) => {
        // Prevent default submission to handle validation
        e.preventDefault();

        // Trigger all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isMobileValid = validateMobile();
        const isLanguageValid = validateLanguage();
        const isGenderValid = validateGender();
        const isAttachmentValid = validateAttachment();
        const isTermsValid = validateTerms();

        const isFormValid = isNameValid && isEmailValid && isPasswordValid && 
                           isConfirmPasswordValid && isMobileValid && isLanguageValid && 
                           isGenderValid && isAttachmentValid && isTermsValid;

        if (isFormValid) {
            // Animate button
            const submitBtn = document.getElementById('submitBtn');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;animation:spin 1s linear infinite;"><circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" style="stroke-dasharray: 90, 150; stroke-dashoffset: 0;"></circle></svg> <span>Processing...</span>';
            
            if (!document.getElementById('spinStyle')) {
                const style = document.createElement('style');
                style.id = 'spinStyle';
                style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
                document.head.appendChild(style);
            }

            // Simulate API call/Submission processing delay before actual form submission
            setTimeout(() => {
                submitBtn.style.backgroundColor = 'var(--success)';
                submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2001/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>Registration Successful!</span>';
                
                setTimeout(() => {
                    form.submit(); // Actually submit to Java Backend
                }, 1000);
            }, 1500);
        } else {
            // Shake animation for the form to indicate errors
            const wrapper = document.querySelector('.form-wrapper');
            wrapper.classList.add('shake');
            setTimeout(() => wrapper.classList.remove('shake'), 500);
            
            // Add shake animation if not exists
            if (!document.getElementById('shakeStyle')) {
                const style = document.createElement('style');
                style.id = 'shakeStyle';
                style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                `;
                document.head.appendChild(style);
            }
            
            // Scroll to the first error
            const firstInvalid = document.querySelector('.invalid, .error-message[style*="display: block"]');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});
