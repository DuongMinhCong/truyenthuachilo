function applySettings() {
    const fontSize = document.getElementById('fontSize').value;
    const bgColor = document.getElementById('bgColor').value;
    const textColor = document.getElementById('textColor').value;
    const fontFamily = document.getElementById('fontFamily').value;

    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--font-family', fontFamily);

    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('bgColor', bgColor);
    localStorage.setItem('textColor', textColor);
    localStorage.setItem('fontFamily', fontFamily);
  }

  function resetDefaults() {
    localStorage.setItem('fontSize', '18px');
    localStorage.setItem('bgColor', '#ffffff');
    localStorage.setItem('textColor', '#000000');
    localStorage.setItem('fontFamily', '"Segoe UI", sans-serif');
    loadSettings();
  }

  function loadSettings() {
    const fontSize = localStorage.getItem('fontSize') || '18px';
    const bgColor = localStorage.getItem('bgColor') || '#ffffff';
    const textColor = localStorage.getItem('textColor') || '#000000';
    const fontFamily = localStorage.getItem('fontFamily') || '"Segoe UI", sans-serif';

    document.documentElement.style.setProperty('--font-size', fontSize);
    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--font-family', fontFamily);

    document.getElementById('fontSize').value = fontSize;
    document.getElementById('bgColor').value = bgColor;
    document.getElementById('textColor').value = textColor;
    document.getElementById('fontFamily').value = fontFamily;
  }

  document.getElementById('toggleSettingsBtn').addEventListener('click', () => {
    const panel = document.getElementById('settingsPanel');
    panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('reading-mode');
    loadSettings();
  });

  function closeSettings() {
    document.getElementById('settingsPanel').style.display = 'none';
  }
