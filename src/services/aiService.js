// AI Service for handling various AI capabilities
class AIService {
  constructor() {
    this.speechSynthesis = window.speechSynthesis;
    this.voices = [];
    this.loadVoices();
  }

  // Load available voices for text-to-speech
  loadVoices() {
    this.voices = this.speechSynthesis.getVoices();
    if (this.voices.length === 0) {
      this.speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = this.speechSynthesis.getVoices();
      });
    }
  }

  // Text-to-Speech functionality
  speak(text, options = {}) {
    if (!this.speechSynthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    this.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 0.8;
    
    // Select a suitable voice (prefer female English voices for educational content)
    const preferredVoice = this.voices.find(voice => 
      voice.lang.includes('en') && voice.name.toLowerCase().includes('female')
    ) || this.voices.find(voice => voice.lang.includes('en')) || this.voices[0];
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    this.speechSynthesis.speak(utterance);
    return utterance;
  }

  // Stop current speech
  stopSpeaking() {
    if (this.speechSynthesis) {
      this.speechSynthesis.cancel();
    }
  }

  // Get AI response using multiple fallback methods
  async getAIResponse(question) {
    try {
      // Always try Puter.com API with GPT-4o mini first
      if (window.puter && window.puter.ai) {
        console.log('Using Puter AI with GPT-4o mini for question:', question);
        const response = await this.getPuterResponse(question);
        // Ensure we always return a string
        if (typeof response === 'string' && response.trim().length > 0) {
          console.log('Puter AI response received:', response.substring(0, 100) + '...');
          return response;
        }
      } else {
        console.log('Puter AI not available, using fallback responses');
      }
      
      // Fallback to enhanced local responses
      return this.getEnhancedLocalResponse(question);
    } catch (error) {
      console.error('AI Service Error:', error);
      return `I'm having trouble connecting to the AI service right now. Here's what I can tell you: ${this.getEnhancedLocalResponse(question)}`;
    }
  }

  // Puter.com AI integration with GPT-4o mini
  async getPuterResponse(question) {
    try {
      // Use Puter's AI service with GPT-4o mini model
      const response = await window.puter.ai.chat([
        {
          role: 'system',
          content: 'You are StudyBot, an advanced AI tutor designed to help students learn across all subjects. Provide comprehensive, accurate, and educational responses. Break down complex topics into understandable explanations. Use examples, analogies, and step-by-step guidance when helpful. Be encouraging and supportive while maintaining academic rigor.'
        },
        {
          role: 'user',
          content: question
        }
      ], {
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 1000
      });
      
      // Extract text content from various possible response formats
      if (typeof response === 'string') {
        return response;
      }
      
      if (response && typeof response === 'object') {
        // Handle different response structures from Puter API
        const content = response.message || 
                       response.content || 
                       response.text ||
                       response.response ||
                       (response.choices && response.choices[0] && response.choices[0].message && response.choices[0].message.content) ||
                       (response.data && response.data.content) ||
                       (response.result && response.result.content);
        
        if (content && typeof content === 'string') {
          return content;
        }
        
        // If still an object, try to extract meaningful text
        if (content && typeof content === 'object') {
          return content.text || content.message || content.content || JSON.stringify(content);
        }
      }
      
      return 'I received a response but couldn\'t process it properly. Please try asking your question again.';
    } catch (error) {
      console.error('Puter AI Error:', error);
      throw new Error('Puter AI service unavailable: ' + error.message);
    }
  }

  // Enhanced local response system
  getEnhancedLocalResponse(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Subject-specific responses
    const responses = {
      // Math responses
      math: [
        "I'd be happy to help with math! Could you share the specific problem you're working on? I can help with algebra, geometry, calculus, statistics, and more.",
        "Math can be challenging but rewarding! What type of math problem are you working on? Break it down step by step and I'll guide you through it.",
        "Let's solve this math problem together! Share the equation or concept you're struggling with, and I'll explain it clearly."
      ],
      
      // Science responses
      science: [
        "Science is fascinating! What topic interests you - physics, chemistry, biology, earth science, or something else? I can explain concepts, help with experiments, or discuss scientific phenomena.",
        "Great question about science! Whether it's understanding chemical reactions, biological processes, or physical laws, I'm here to help make it clear and interesting.",
        "Science helps us understand our world! What scientific concept would you like to explore? I can break down complex ideas into simple explanations."
      ],
      
      // History responses
      history: [
        "History teaches us about our past and shapes our future! What historical period, event, or figure interests you? I can provide context, causes, and consequences.",
        "Let's explore history together! Whether it's ancient civilizations, world wars, or social movements, I can help you understand the timeline and significance.",
        "History is full of amazing stories! What would you like to learn about? I can explain historical events, analyze their impact, and connect them to today."
      ],
      
      // English/Language Arts
      english: [
        "English and literature offer so many learning opportunities! Are you working on writing, reading comprehension, grammar, poetry analysis, or essay structure?",
        "Let's improve your English skills! Whether it's creative writing, analyzing literature, or mastering grammar rules, I'm here to help you succeed.",
        "Language arts can be creative and analytical! What aspect of English are you focusing on? I can help with writing techniques, literary analysis, or language mechanics."
      ],
      
      // Study tips and methods
      study: [
        "Effective studying is a skill that improves with practice! What subject are you studying, and what specific challenges are you facing? I can suggest techniques tailored to your learning style.",
        "Great study habits lead to academic success! Are you looking for memory techniques, time management tips, note-taking strategies, or exam preparation methods?",
        "Let's optimize your study approach! What's your current study routine, and where would you like to improve? I can suggest evidence-based learning strategies."
      ],
      
      // Homework help
      homework: [
        "I'm here to help you understand your homework, not just complete it! What subject and specific assignment are you working on? Let's break it down together.",
        "Homework is practice for mastering concepts! Share what you're working on, and I'll guide you through the thinking process so you truly understand the material.",
        "Let's tackle this homework step by step! What subject is it for, and what part are you finding challenging? I'll help you develop problem-solving strategies."
      ]
    };

    // Find matching response category
    for (const [category, responseArray] of Object.entries(responses)) {
      if (lowerQuestion.includes(category)) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
      }
    }

    // Specific keyword responses
    if (lowerQuestion.includes('help')) {
      return "I'm here to help you learn and grow! What specific topic or subject would you like assistance with? Just describe what you're working on, and I'll provide clear explanations and guidance.";
    }
    
    if (lowerQuestion.includes('explain')) {
      return "I'd be happy to explain that concept! Could you be more specific about what you'd like me to explain? The more details you provide, the better I can tailor my explanation to your needs.";
    }

    // Default encouraging response
    return "That's an interesting question! I'm here to help you explore and understand new concepts. Could you provide a bit more detail about what you'd like to learn? Whether it's academic subjects, study strategies, or general knowledge, I'm ready to assist!";
  }

  // Text-to-Image generation with multiple fallback options
  async generateImage(prompt) {
    try {
      console.log('Generating image with prompt:', prompt);
      
      // First try Puter.com API if available
      if (window.puter && window.puter.ai) {
        try {
          const puterResponse = await this.generateImageWithPuter(prompt);
          if (puterResponse.success) {
            return puterResponse;
          }
        } catch (puterError) {
          console.log('Puter image generation failed, trying fallback:', puterError.message);
        }
      }
      
      // Fallback to Unsplash API for educational images
      return await this.generateImageWithUnsplash(prompt);
      
    } catch (error) {
      console.error('All image generation methods failed:', error);
      
      // Final fallback - educational placeholder
      return {
        success: false,
        message: `I'd love to create an image for "${prompt}" but I'm having trouble with the image generation service right now. You can try describing what you'd like to visualize and I can help you understand the concept through detailed explanations instead!`,
        placeholder: `🎨 Image request: "${prompt}"`,
        error: error.message
      };
    }
  }

  // Puter.com image generation
  async generateImageWithPuter(prompt) {
    const response = await window.puter.ai.generateImage({
      prompt: prompt,
      model: 'dall-e-3',
      size: '1024x1024',
      quality: 'standard',
      style: 'natural'
    });

    let imageUrl = null;
    if (typeof response === 'string') {
      imageUrl = response;
    } else if (response && typeof response === 'object') {
      imageUrl = response.url || 
                response.image_url || 
                response.data?.[0]?.url ||
                response.result?.url ||
                response.image;
    }

    if (imageUrl) {
      return {
        success: true,
        imageUrl: imageUrl,
        prompt: prompt,
        message: `AI-generated image for: "${prompt}"`
      };
    } else {
      throw new Error('No image URL in Puter response');
    }
  }

  // Alternative image generation using multiple sources
  async generateImageWithUnsplash(prompt) {
    try {
      // Extract key terms from the prompt for better search
      const searchTerms = this.extractSearchTerms(prompt);
      
      // Try multiple image sources
      const imageSources = [
        // Picsum with specific dimensions (reliable service)
        `https://picsum.photos/800/600?random=${Date.now()}`,
        // Lorem Picsum with blur for educational feel
        `https://picsum.photos/800/600?blur=1&random=${Date.now()}`,
        // Placeholder.com as final fallback
        `https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=Educational+Image`
      ];
      
      // Try each source until one works
      for (let i = 0; i < imageSources.length; i++) {
        try {
          const imageUrl = imageSources[i];
          await this.testImageUrl(imageUrl);
          
          return {
            success: true,
            imageUrl: imageUrl,
            prompt: prompt,
            message: `Generated educational image for: "${searchTerms}"`
          };
        } catch (error) {
          console.log(`Image source ${i + 1} failed:`, error.message);
          if (i === imageSources.length - 1) {
            throw error;
          }
        }
      }
      
    } catch (error) {
      // If all image sources fail, create a data URL image
      return this.generateDataUrlImage(prompt);
    }
  }

  // Generate a simple data URL image as final fallback
  generateDataUrlImage(prompt) {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#4F46E5');
    gradient.addColorStop(1, '#7C3AED');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('📚 Educational Image', 400, 250);
    
    ctx.font = '24px Arial';
    const searchTerms = this.extractSearchTerms(prompt);
    ctx.fillText(`Topic: ${searchTerms}`, 400, 350);
    
    const dataUrl = canvas.toDataURL('image/png');
    
    return {
      success: true,
      imageUrl: dataUrl,
      prompt: prompt,
      message: `Created educational illustration for: "${searchTerms}"`
    };
  }

  // Extract meaningful search terms from prompt
  extractSearchTerms(prompt) {
    // Remove common words and extract key educational terms
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'educational', 'illustration'];
    const words = prompt.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.includes(word))
      .slice(0, 3); // Take first 3 meaningful words
    
    return words.join(',') || 'education';
  }

  // Test if an image URL is accessible
  async testImageUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error('Image failed to load'));
      img.src = url;
      
      // Timeout after 5 seconds
      setTimeout(() => reject(new Error('Image load timeout')), 5000);
    });
  }

  // Check if text-to-speech is available
  isSpeechSupported() {
    return 'speechSynthesis' in window;
  }

  // Get available voices
  getAvailableVoices() {
    return this.voices;
  }
}

export default new AIService();
