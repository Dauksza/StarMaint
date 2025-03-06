// ...existing code...

// Keyboard navigation: Alt+S to focus search input
document.addEventListener('keydown', (e) => {
	if (e.altKey && e.key.toLowerCase() === 's') {
		const searchInput = document.querySelector('.nav-search input');
		if (searchInput) searchInput.focus();
	}
});

// Voice command integration using the Web Speech API
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;

	// Start voice input on Alt+V
	document.addEventListener('keydown', (e) => {
		if (e.altKey && e.key.toLowerCase() === 'v') {
			recognition.start();
		}
	});

	recognition.onresult = (event) => {
		const transcript = event.results[0][0].transcript.trim();
		// Simple command: if voice input starts with 'search', put the rest in the search bar
		if (transcript.toLowerCase().startsWith('search')) {
			const query = transcript.substr(6).trim();
			const searchInput = document.querySelector('.nav-search input');
			if (searchInput) searchInput.value = query;
			// Trigger further search actions here if needed
		}
	};

	recognition.onerror = (error) => {
		console.error('Speech recognition error:', error);
	};
}

// ...existing code...
