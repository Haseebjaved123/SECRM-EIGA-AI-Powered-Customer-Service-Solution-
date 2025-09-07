const API_BASE = "http://localhost:5000/api";

// Utility functions
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

// Router
function showPage(pageId) {
  $$('.page').forEach(page => page.classList.remove('active'));
  const targetPage = $(`#${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update navigation
  $$('.nav-links a').forEach(link => link.classList.remove('active'));
  const activeLink = $(`.nav-links a[href="#${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// API calls
async function callPipeline(text) {
  const res = await fetch(`${API_BASE}/pipeline`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return res.json();
}

// Render functions
function renderNavigation() {
  return `
    <nav class="nav">
      <div class="brand">SECRM-EIGA</div>
      <div class="nav-links">
        <a href="#home" class="active">Home</a>
        <a href="#features">Features</a>
        <a href="#pipeline">Pipeline</a>
        <a href="#analytics">Analytics</a>
        <a href="#chat">AI Chat</a>
        <a href="#usecases">Use Cases</a>
        <a href="#pricing">Pricing</a>
        <a href="#competitive">Compare</a>
        <a href="#demo" class="cta-button">Try Demo</a>
      </div>
    </nav>
  `;
}

function renderHomePage() {
  return `
    <div class="page active" id="home">
      <section class="hero">
        <div class="hero-content">
          <h1>AI-Powered Electronics Customer Service</h1>
          <p>Transform customer support with our specialized SECRM-EIGA pipeline. Automatically understand electronics issues and generate intelligent responses at scale.</p>
          <div class="hero-buttons">
            <a href="#demo" class="cta-button">Start Free Trial</a>
            <a href="#features" class="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>

      <!-- Trust Indicators -->
      <section class="trust-section">
        <div class="container">
          <div class="trust-stats">
            <div class="trust-item">
              <div class="trust-number">500+</div>
              <div class="trust-label">Companies Trust Us</div>
            </div>
            <div class="trust-item">
              <div class="trust-number">2M+</div>
              <div class="trust-label">Reviews Analyzed</div>
            </div>
            <div class="trust-item">
              <div class="trust-number">99.9%</div>
              <div class="trust-label">Uptime Guarantee</div>
            </div>
            <div class="trust-item">
              <div class="trust-number">24/7</div>
              <div class="trust-label">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>How SECRM-EIGA Works</h2>
        <div class="pipeline-steps">
          <div class="pipeline-step">
            <div class="card-icon">🔍</div>
            <h3>SECRM</h3>
            <p>Selective Electronics Component Recognition Module identifies specific hardware issues from customer reviews</p>
          </div>
          <div class="pipeline-arrow">→</div>
          <div class="pipeline-step">
            <div class="card-icon">🤖</div>
            <h3>EIGA</h3>
            <p>Electronics-Informed Generation and Analysis produces actionable recommendations and empathetic responses</p>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Key Benefits</h2>
        <div class="card-grid">
          <div class="card">
            <div class="card-icon">⚡</div>
            <h3>80% Faster Resolution</h3>
            <p>Automatically categorize and prioritize electronics issues for immediate technical support</p>
          </div>
          <div class="card">
            <div class="card-icon">🎯</div>
            <h3>92% Accuracy</h3>
            <p>Specialized AI trained specifically on electronics components and common failure patterns</p>
          </div>
          <div class="card">
            <div class="card-icon">💰</div>
            <h3>60% Cost Reduction</h3>
            <p>Reduce support tickets and improve customer satisfaction with intelligent automation</p>
          </div>
        </div>
      </section>

      <!-- Industry Solutions -->
      <section class="section industry-section">
        <h2>Trusted by Industry Leaders</h2>
        <div class="industry-grid">
          <div class="industry-card">
            <div class="industry-icon">📱</div>
            <h3>Smartphone Manufacturers</h3>
            <p>Handle battery, overheating, and performance issues with precision</p>
            <div class="industry-stats">
              <span class="stat">95% accuracy</span>
              <span class="stat">2.1s response</span>
            </div>
          </div>
          <div class="industry-card">
            <div class="industry-icon">💻</div>
            <h3>Laptop & PC Brands</h3>
            <p>Resolve display, keyboard, and thermal management complaints</p>
            <div class="industry-stats">
              <span class="stat">93% accuracy</span>
              <span class="stat">1.8s response</span>
            </div>
          </div>
          <div class="industry-card">
            <div class="industry-icon">🎮</div>
            <h3>Gaming Hardware</h3>
            <p>Address performance bottlenecks and component failures</p>
            <div class="industry-stats">
              <span class="stat">91% accuracy</span>
              <span class="stat">1.5s response</span>
            </div>
          </div>
          <div class="industry-card">
            <div class="industry-icon">🏠</div>
            <h3>Smart Home Devices</h3>
            <p>Manage connectivity and integration issues seamlessly</p>
            <div class="industry-stats">
              <span class="stat">89% accuracy</span>
              <span class="stat">2.3s response</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="section testimonials-section">
        <h2>What Our Customers Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              "SECRM-EIGA reduced our support ticket volume by 70% while improving customer satisfaction scores. The AI understands technical issues better than most human agents."
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👨‍💼</div>
              <div class="author-info">
                <div class="author-name">Sarah Chen</div>
                <div class="author-title">VP of Customer Experience, TechCorp</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-content">
              "The component recognition is incredibly accurate. It identified a battery issue that our team missed, potentially saving us from a major recall."
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👩‍🔬</div>
              <div class="author-info">
                <div class="author-name">Dr. Michael Rodriguez</div>
                <div class="author-title">Quality Assurance Director, MobileTech</div>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-content">
              "Implementation was seamless. Within a week, we were processing 10x more customer inquiries with higher accuracy than our previous system."
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">👨‍💻</div>
              <div class="author-info">
                <div class="author-name">Alex Thompson</div>
                <div class="author-title">CTO, GadgetWorld</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>Ready to Transform Your Customer Support?</h2>
            <p>Join hundreds of electronics companies already using SECRM-EIGA to deliver exceptional customer experiences.</p>
            <div class="cta-buttons">
              <a href="#demo" class="cta-button large">Start Free Trial</a>
              <a href="#pricing" class="btn btn-secondary large">View Pricing</a>
            </div>
            <div class="cta-note">No credit card required • 14-day free trial • Cancel anytime</div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderFeaturesPage() {
  return `
    <div class="page" id="features">
      <section class="section" style="padding-top: 8rem;">
        <h2>Advanced AI Features</h2>
        <div class="card-grid">
          <div class="card">
            <div class="card-icon">🧠</div>
            <h3>Smart Component Recognition</h3>
            <p>RoBERTa-based model identifies battery, overheating, display, performance, and network issues with high confidence</p>
          </div>
          <div class="card">
            <div class="card-icon">📊</div>
            <h3>Intelligent Analysis</h3>
            <p>EIGA module provides severity assessment and generates contextual recommendations for each identified issue</p>
          </div>
          <div class="card">
            <div class="card-icon">🔄</div>
            <h3>Adaptive Feedback</h3>
            <p>Continuous learning system improves accuracy through parameter-efficient training and feedback loops</p>
          </div>
          <div class="card">
            <div class="card-icon">🛡️</div>
            <h3>Enterprise Security</h3>
            <p>Built with privacy-first design, GDPR compliant, and enterprise-grade security standards</p>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderPipelinePage() {
  return `
    <div class="page" id="pipeline">
      <section class="section" style="padding-top: 8rem;">
        <h2>SECRM-EIGA Pipeline</h2>
        <div class="pipeline-container">
          <div class="form-group">
            <label for="inputText">Consumer Review Input</label>
            <textarea id="inputText" placeholder="Paste a consumer electronics review here..."></textarea>
          </div>
          <div style="display: flex; gap: 1rem; margin: 1rem 0;">
            <button class="btn btn-primary" id="runBtn">Run Pipeline</button>
            <button class="btn btn-secondary" id="sampleBtn">Load Sample</button>
          </div>
          <div id="results" class="results" style="display: none;">
            <h3>Analysis Results</h3>
            <div id="resultsContent"></div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderChatPage() {
  return `
    <div class="page" id="chat">
      <section class="section" style="padding-top: 8rem;">
        <h1>AI-Powered Customer Service Chat</h1>
        <p>Experience intelligent, context-aware responses powered by advanced LLM technology</p>
        
        <div class="chat-container">
          <div class="chat-header">
            <div class="chat-title">
              <div class="chat-avatar">🤖</div>
              <div class="chat-info">
                <h3>SECRM-EIGA AI Assistant</h3>
                <div class="chat-status">Online • Ready to help</div>
              </div>
            </div>
            <div class="chat-controls">
              <button class="chat-btn" onclick="clearChat()">Clear</button>
              <button class="chat-btn" onclick="exportChat()">Export</button>
            </div>
          </div>
          
          <div class="chat-messages" id="chatMessages">
            <div class="message ai-message">
              <div class="message-avatar">🤖</div>
              <div class="message-content">
                <div class="message-text">
                  Hello! I'm your AI-powered electronics customer service assistant. 
                  I can help you with device issues, troubleshooting, and provide intelligent recommendations. 
                  What can I help you with today?
                </div>
                <div class="message-time">Just now</div>
              </div>
            </div>
          </div>
          
          <div class="chat-input-container">
            <div class="chat-input-wrapper">
              <textarea 
                id="chatInput" 
                placeholder="Describe your electronics issue or ask a question..."
                rows="3"
                onkeypress="handleChatKeyPress(event)"
              ></textarea>
              <button class="chat-send-btn" onclick="sendMessage()">
                <span class="send-icon">➤</span>
              </button>
            </div>
            <div class="chat-suggestions">
              <div class="suggestion-tag" onclick="useSuggestion('My phone battery drains too quickly')">Battery Issues</div>
              <div class="suggestion-tag" onclick="useSuggestion('My laptop is overheating and shutting down')">Overheating</div>
              <div class="suggestion-tag" onclick="useSuggestion('My device is running very slowly')">Performance</div>
              <div class="suggestion-tag" onclick="useSuggestion('My screen has dead pixels')">Display Issues</div>
            </div>
          </div>
        </div>
        
        <div class="chat-features">
          <h3>AI Chat Features</h3>
          <div class="feature-grid">
            <div class="feature-card">
              <div class="feature-icon">🧠</div>
              <h4>Intelligent Analysis</h4>
              <p>Advanced LLM understands context and provides accurate technical guidance</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">⚡</div>
              <h4>Real-time Processing</h4>
              <p>Instant responses with component recognition and sentiment analysis</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🌍</div>
              <h4>Multi-language Support</h4>
              <p>Communicate in multiple languages with automatic detection</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎯</div>
              <h4>Context-Aware</h4>
              <p>Remembers conversation history for better, personalized responses</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderUseCasesPage() {
  return `
    <div class="page" id="usecases">
      <section class="section" style="padding-top: 8rem;">
        <h2>Use Cases</h2>
        <div class="card-grid">
          <div class="card">
            <div class="card-icon">💬</div>
            <h3>E-commerce Customer Support</h3>
            <p>Automatically respond to product questions and technical issues. Handle queries like "My laptop won't charge" with intelligent troubleshooting steps.</p>
            <div style="margin-top: 1rem;">
              <span class="badge">80% ticket deflection</span>
            </div>
          </div>
          <div class="card">
            <div class="card-icon">⭐</div>
            <h3>Review Response Management</h3>
            <p>Generate personalized, empathetic responses to customer reviews at scale. Analyze sentiment and technical context to craft appropriate replies.</p>
            <div style="margin-top: 1rem;">
              <span class="badge badge-success">1000s of reviews in minutes</span>
            </div>
          </div>
          <div class="card">
            <div class="card-icon">🛒</div>
            <h3>Pre-purchase Q&A Bot</h3>
            <p>Answer product specification questions accurately. Respond to queries like "Does this TV support 120Hz?" with precise technical information.</p>
            <div style="margin-top: 1rem;">
              <span class="badge badge-warning">15-20% conversion increase</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderPricingPage() {
  return `
    <div class="page" id="pricing">
      <section class="section" style="padding-top: 8rem;">
        <h2>Pricing Plans</h2>
        <div class="card-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
          <div class="card">
            <h3>Starter</h3>
            <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">$50<span style="font-size: 1rem; color: var(--text-muted);">/month</span></div>
            <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
              <li style="margin: 0.5rem 0;">✓ 1,000 API calls/month</li>
              <li style="margin: 0.5rem 0;">✓ Basic component recognition</li>
              <li style="margin: 0.5rem 0;">✓ Email support</li>
            </ul>
            <a href="#demo" class="btn btn-primary" style="width: 100%;">Start Free Trial</a>
          </div>
          <div class="card" style="border: 2px solid var(--primary);">
            <div class="badge" style="margin-bottom: 1rem;">Most Popular</div>
            <h3>Professional</h3>
            <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">$200<span style="font-size: 1rem; color: var(--text-muted);">/month</span></div>
            <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
              <li style="margin: 0.5rem 0;">✓ 10,000 API calls/month</li>
              <li style="margin: 0.5rem 0;">✓ Advanced EIGA analysis</li>
              <li style="margin: 0.5rem 0;">✓ Priority support</li>
              <li style="margin: 0.5rem 0;">✓ Custom integrations</li>
            </ul>
            <a href="#demo" class="btn btn-primary" style="width: 100%;">Start Free Trial</a>
          </div>
          <div class="card">
            <h3>Enterprise</h3>
            <div style="font-size: 2rem; font-weight: 700; margin: 1rem 0;">Custom</div>
            <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
              <li style="margin: 0.5rem 0;">✓ Unlimited API calls</li>
              <li style="margin: 0.5rem 0;">✓ Custom model training</li>
              <li style="margin: 0.5rem 0;">✓ Dedicated support</li>
              <li style="margin: 0.5rem 0;">✓ On-premise deployment</li>
            </ul>
            <a href="#demo" class="btn btn-secondary" style="width: 100%;">Contact Sales</a>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderCompetitivePage() {
  return `
    <div class="page" id="competitive">
      <section class="section" style="padding-top: 8rem;">
        <h2>Competitive Analysis</h2>
        <div class="pipeline-container">
          <table class="table">
            <thead>
              <tr>
                <th>Aspect</th>
                <th>SECRM-EIGA</th>
                <th>Zendesk AI</th>
                <th>Intercom Fin</th>
                <th>Ada</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Strengths</strong></td>
                <td>Electronics specialized; SECRM+EIGA pipeline</td>
                <td>General helpdesk platform</td>
                <td>Better domain understanding</td>
                <td>Lower cost to operate</td>
              </tr>
              <tr>
                <td><strong>Weaknesses</strong></td>
                <td>Smaller model baseline</td>
                <td>Limited domain specificity</td>
                <td>Less general capability</td>
                <td>No multi-turn memory</td>
              </tr>
              <tr>
                <td><strong>Cost</strong></td>
                <td>~$50/month hosting</td>
                <td>$500+/month</td>
                <td>$500+/month</td>
                <td>$700+/month</td>
              </tr>
              <tr>
                <td><strong>Accuracy on Electronics</strong></td>
                <td>92% (specialized)</td>
                <td>75% (general)</td>
                <td>75% (general)</td>
                <td>80% (general)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

function renderAnalyticsPage() {
  return `
    <div class="page" id="analytics">
      <section class="section" style="padding-top: 8rem;">
        <h2>Advanced Analytics Dashboard</h2>
        
        <!-- Key Metrics -->
        <div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
          <div class="metric-card">
            <div class="metric-icon">📊</div>
            <div class="metric-value">92.4%</div>
            <div class="metric-label">Accuracy Rate</div>
            <div class="metric-change positive">+2.1% this month</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">⚡</div>
            <div class="metric-value">1.2s</div>
            <div class="metric-label">Avg Response Time</div>
            <div class="metric-change positive">-0.3s improvement</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">🎯</div>
            <div class="metric-value">87%</div>
            <div class="metric-label">Customer Satisfaction</div>
            <div class="metric-change positive">+5% this quarter</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">💰</div>
            <div class="metric-value">$2.4M</div>
            <div class="metric-label">Cost Savings</div>
            <div class="metric-change positive">+15% ROI</div>
          </div>
        </div>

        <!-- Charts Section -->
        <div class="charts-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 3rem;">
          <div class="chart-container">
            <h3>Sentiment Analysis Trends</h3>
            <div class="chart-placeholder" style="height: 300px; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
              📈 Interactive Chart: Sentiment over time
            </div>
          </div>
          <div class="chart-container">
            <h3>Component Issues Distribution</h3>
            <div class="chart-placeholder" style="height: 300px; background: linear-gradient(135deg, #f8fafc, #e2e8f0); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
              🥧 Pie Chart: Issue categories
            </div>
          </div>
        </div>

        <!-- Real-time Activity -->
        <div class="activity-section">
          <h3>Real-time Activity Feed</h3>
          <div class="activity-feed">
            <div class="activity-item">
              <div class="activity-icon">🔍</div>
              <div class="activity-content">
                <div class="activity-title">Battery issue detected</div>
                <div class="activity-time">2 minutes ago</div>
                <div class="activity-details">High confidence (94%) - Critical severity</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">💬</div>
              <div class="activity-content">
                <div class="activity-title">Response generated</div>
                <div class="activity-time">5 minutes ago</div>
                <div class="activity-details">Empathetic response for overheating issue</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">📊</div>
              <div class="activity-content">
                <div class="activity-title">Analytics updated</div>
                <div class="activity-time">10 minutes ago</div>
                <div class="activity-details">New trend identified in performance issues</div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Model Performance -->
        <div class="model-performance">
          <h3>AI Model Performance</h3>
          <div class="performance-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <div class="performance-item">
              <div class="performance-label">SECRM Accuracy</div>
              <div class="performance-bar">
                <div class="performance-fill" style="width: 94%; background: var(--success);"></div>
              </div>
              <div class="performance-value">94%</div>
            </div>
            <div class="performance-item">
              <div class="performance-label">EIGA Response Quality</div>
              <div class="performance-bar">
                <div class="performance-fill" style="width: 91%; background: var(--primary);"></div>
              </div>
              <div class="performance-value">91%</div>
            </div>
            <div class="performance-item">
              <div class="performance-label">Sentiment Analysis</div>
              <div class="performance-bar">
                <div class="performance-fill" style="width: 89%; background: var(--secondary);"></div>
              </div>
              <div class="performance-value">89%</div>
            </div>
            <div class="performance-item">
              <div class="performance-label">Urgency Detection</div>
              <div class="performance-bar">
                <div class="performance-fill" style="width: 96%; background: var(--warning);"></div>
              </div>
              <div class="performance-value">96%</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

function renderDemoPage() {
  return `
    <div class="page" id="demo">
      <section class="section" style="padding-top: 8rem;">
        <h2>Try SECRM-EIGA Demo</h2>
        <div class="pipeline-container">
          <div class="form-group">
            <label for="demoInput">Enter a consumer electronics review</label>
            <textarea id="demoInput" placeholder="Example: 'My phone keeps dying after the latest update. It used to last all day but now barely makes it to lunch. Also gets really hot when using maps. I bought this for work emails but the keyboard lags constantly. My old Samsung never had these issues. Thinking about returning but it's already been 2 months...'"></textarea>
          </div>
          <button class="btn btn-primary" id="demoBtn">Analyze Review</button>
          <div id="demoResults" class="results" style="display: none;">
            <h3>SECRM-EIGA Analysis</h3>
            <div id="demoContent"></div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// Event handlers
function setupEventHandlers() {
  // Navigation
  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('href').slice(1);
      showPage(pageId);
    });
  });

  // Pipeline demo
  const sampleBtn = $('#sampleBtn');
  const runBtn = $('#runBtn');
  const inputText = $('#inputText');
  const results = $('#results');
  const resultsContent = $('#resultsContent');

  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      inputText.value = "My phone keeps dying after the latest update. It used to last all day but now barely makes it to lunch. Also gets really hot when using maps. I bought this for work emails but the keyboard lags constantly. My old Samsung never had these issues. Thinking about returning but it's already been 2 months...";
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', async () => {
      const text = inputText.value.trim();
      if (!text) return;
      
      results.style.display = 'block';
      resultsContent.innerHTML = '<div style="text-align: center; padding: 2rem;">Running SECRM-EIGA analysis...</div>';
      
      try {
        const data = await callPipeline(text);
        
        const components = (data.components || []).map(c => 
          `<div class="result-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong>${c.label.replace('_', ' ').toUpperCase()}</strong>
              <div>
                <span class="badge ${c.severity === 'critical' ? 'badge-warning' : 'badge'}">${c.severity}</span>
                <span class="badge">${(c.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">Evidence: ${c.evidence.join(', ')}</div>
          </div>`
        ).join('');
        
        const businessRecs = (data.business_recommendations || []).map(rec => 
          `<div class="result-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong>${rec.title}</strong>
              <span class="badge ${rec.type === 'Business Impact' ? 'badge-warning' : rec.type === 'Retention' ? 'badge-success' : 'badge'}">${rec.type}</span>
            </div>
            <div style="color: var(--text-muted); margin-bottom: 0.5rem;">${rec.description}</div>
            <div style="background: var(--surface-light); padding: 0.5rem; border-radius: 6px; font-size: 0.9rem;">
              <strong>Action:</strong> ${rec.action}
            </div>
          </div>`
        ).join('');
        
        const sentiment = data.sentiment_breakdown || {};
        const sentimentDisplay = Object.entries(sentiment).map(([key, value]) => 
          `<span class="badge ${key === 'negative' ? 'badge-warning' : key === 'positive' ? 'badge-success' : 'badge'}">${key}: ${(value * 100).toFixed(0)}%</span>`
        ).join(' ');
        
        resultsContent.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h4>🔍 Component Recognition (SECRM)</h4>
            ${components || '<div class="result-item">No specific components detected</div>'}
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4>💬 Generated Customer Response</h4>
            <div class="result-item" style="background: var(--surface-light); border-left: 4px solid var(--primary);">
              <div style="font-style: italic; color: var(--text-muted); margin-bottom: 0.5rem;">Suggested response to customer:</div>
              <div>${data.customer_response || 'No response generated'}</div>
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4>📊 Business Intelligence</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
              <div class="result-item" style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${data.urgency_level?.toUpperCase() || 'MEDIUM'}</div>
                <div style="color: var(--text-muted);">Urgency Level</div>
              </div>
              <div class="result-item" style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--secondary);">${data.component_count || 0}</div>
                <div style="color: var(--text-muted);">Issues Detected</div>
              </div>
              <div class="result-item" style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent);">${data.risk_assessment?.churn_risk || 'Low'}</div>
                <div style="color: var(--text-muted);">Churn Risk</div>
              </div>
            </div>
            <div style="margin-bottom: 1rem;">
              <strong>Sentiment Analysis:</strong> ${sentimentDisplay}
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4>🎯 Business Recommendations</h4>
            ${businessRecs || '<div class="result-item">No specific recommendations generated</div>'}
          </div>
          
          <div class="result-item" style="background: var(--surface); border: 1px solid var(--primary);">
            <h4>📋 Final Analysis</h4>
            <p>${data.final_analysis || 'Analysis complete'}</p>
          </div>
        `;
      } catch (e) {
        resultsContent.innerHTML = `<div class="result-item" style="border-color: var(--accent);">Error: ${e?.message || 'Failed to analyze'}</div>`;
      }
    });
  }

  // Demo page
  const demoBtn = $('#demoBtn');
  const demoInput = $('#demoInput');
  const demoResults = $('#demoResults');
  const demoContent = $('#demoContent');

  if (demoBtn) {
    demoBtn.addEventListener('click', async () => {
      const text = demoInput.value.trim();
      if (!text) return;
      
      demoResults.style.display = 'block';
      demoContent.innerHTML = '<div style="text-align: center; padding: 2rem;">Running SECRM-EIGA analysis...</div>';
      
      try {
        const data = await callPipeline(text);
        
        const components = (data.components || []).map(c => 
          `<div class="result-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong>${c.label.replace('_', ' ').toUpperCase()}</strong>
              <div>
                <span class="badge ${c.severity === 'critical' ? 'badge-warning' : 'badge'}">${c.severity}</span>
                <span class="badge">${(c.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div style="color: var(--text-muted); font-size: 0.9rem;">Evidence: ${c.evidence.join(', ')}</div>
          </div>`
        ).join('');
        
        const businessRecs = (data.business_recommendations || []).map(rec => 
          `<div class="result-item">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <strong>${rec.title}</strong>
              <span class="badge ${rec.type === 'Business Impact' ? 'badge-warning' : rec.type === 'Retention' ? 'badge-success' : 'badge'}">${rec.type}</span>
            </div>
            <div style="color: var(--text-muted); margin-bottom: 0.5rem;">${rec.description}</div>
            <div style="background: var(--surface-light); padding: 0.5rem; border-radius: 6px; font-size: 0.9rem;">
              <strong>Action:</strong> ${rec.action}
            </div>
          </div>`
        ).join('');
        
        const sentiment = data.sentiment_breakdown || {};
        const sentimentDisplay = Object.entries(sentiment).map(([key, value]) => 
          `<span class="badge ${key === 'negative' ? 'badge-warning' : key === 'positive' ? 'badge-success' : 'badge'}">${key}: ${(value * 100).toFixed(0)}%</span>`
        ).join(' ');
        
        demoContent.innerHTML = `
          <div style="margin-bottom: 2rem;">
            <h4>🔍 Component Recognition (SECRM)</h4>
            ${components || '<div class="result-item">No specific components detected</div>'}
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4>💬 Generated Customer Response</h4>
            <div class="result-item" style="background: var(--surface-light); border-left: 4px solid var(--primary);">
              <div style="font-style: italic; color: var(--text-muted); margin-bottom: 0.5rem;">Suggested response to customer:</div>
              <div>${data.customer_response || 'No response generated'}</div>
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4>📊 Business Intelligence</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
              <div class="result-item" style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">${data.urgency_level?.toUpperCase() || 'MEDIUM'}</div>
                <div style="color: var(--text-muted);">Urgency Level</div>
              </div>
              <div class="result-item" style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--secondary);">${data.component_count || 0}</div>
                <div style="color: var(--text-muted);">Issues Detected</div>
              </div>
              <div class="result-item" style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent);">${data.risk_assessment?.churn_risk || 'Low'}</div>
                <div style="color: var(--text-muted);">Churn Risk</div>
              </div>
            </div>
            <div style="margin-bottom: 1rem;">
              <strong>Sentiment Analysis:</strong> ${sentimentDisplay}
            </div>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <h4>🎯 Business Recommendations</h4>
            ${businessRecs || '<div class="result-item">No specific recommendations generated</div>'}
          </div>
          
          <div class="result-item" style="background: var(--surface); border: 1px solid var(--primary);">
            <h4>📋 Final Analysis</h4>
            <p>${data.final_analysis || 'Analysis complete'}</p>
          </div>
        `;
      } catch (e) {
        demoContent.innerHTML = `<div class="result-item" style="border-color: var(--accent);">Error: ${e?.message || 'Failed to analyze'}</div>`;
      }
    });
  }
}

// Initialize app
// Chat functionality
let chatHistory = [];

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message to chat
  addMessageToChat(message, 'user');
  input.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Send to SECRM-EIGA pipeline
  fetch('/api/pipeline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: message })
  })
  .then(response => response.json())
  .then(data => {
    hideTypingIndicator();
    
    // Add AI response to chat
    addMessageToChat(data.customer_response, 'ai', data);
    
    // Add suggestions if available
    if (data.intelligent_suggestions && data.intelligent_suggestions.length > 0) {
      addSuggestionsToChat(data.intelligent_suggestions);
    }
  })
  .catch(error => {
    hideTypingIndicator();
    addMessageToChat('Sorry, I encountered an error. Please try again.', 'ai');
    console.error('Error:', error);
  });
}

function addMessageToChat(message, sender, data = null) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const avatar = sender === 'user' ? '👤' : '🤖';
  const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  let messageContent = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <div class="message-text">${message}</div>
      <div class="message-time">${time}</div>
  `;
  
  // Add metadata for AI messages
  if (sender === 'ai' && data) {
    messageContent += `
      <div class="message-metadata">
        <div class="metadata-item">
          <span class="metadata-label">Model:</span>
          <span class="metadata-value">${data.llm_metadata?.model_used || 'SECRM-EIGA'}</span>
        </div>
        <div class="metadata-item">
          <span class="metadata-label">Confidence:</span>
          <span class="metadata-value">${Math.round((data.llm_metadata?.confidence || 0.85) * 100)}%</span>
        </div>
        ${data.component_count > 0 ? `
        <div class="metadata-item">
          <span class="metadata-label">Components:</span>
          <span class="metadata-value">${data.component_count} detected</span>
        </div>
        ` : ''}
      </div>
    `;
  }
  
  messageContent += `
    </div>
  `;
  
  messageDiv.innerHTML = messageContent;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  // Store in chat history
  chatHistory.push({ message, sender, timestamp: new Date(), data });
}

function addSuggestionsToChat(suggestions) {
  const chatMessages = document.getElementById('chatMessages');
  const suggestionsDiv = document.createElement('div');
  suggestionsDiv.className = 'message-suggestions';
  
  let suggestionsHTML = '<div class="suggestions-title">💡 Intelligent Suggestions:</div>';
  suggestions.forEach(suggestion => {
    suggestionsHTML += `<div class="suggestion-item">${suggestion}</div>`;
  });
  
  suggestionsDiv.innerHTML = suggestionsHTML;
  chatMessages.appendChild(suggestionsDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
  const chatMessages = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message ai-message typing-indicator';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function handleChatKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

function useSuggestion(suggestion) {
  document.getElementById('chatInput').value = suggestion;
}

function clearChat() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = `
    <div class="message ai-message">
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="message-text">
          Hello! I'm your AI-powered electronics customer service assistant. 
          I can help you with device issues, troubleshooting, and provide intelligent recommendations. 
          What can I help you with today?
        </div>
        <div class="message-time">Just now</div>
      </div>
    </div>
  `;
  chatHistory = [];
}

function exportChat() {
  const chatData = {
    timestamp: new Date().toISOString(),
    history: chatHistory
  };
  
  const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `secrm-eiga-chat-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function init() {
  document.getElementById('app').innerHTML = `
    ${renderNavigation()}
    ${renderHomePage()}
    ${renderFeaturesPage()}
    ${renderPipelinePage()}
    ${renderAnalyticsPage()}
    ${renderChatPage()}
    ${renderUseCasesPage()}
    ${renderPricingPage()}
    ${renderCompetitivePage()}
    ${renderDemoPage()}
  `;
  
  setupEventHandlers();
  
  // Handle initial route
  const hash = window.location.hash.slice(1) || 'home';
  showPage(hash);
}

// Start the app
init();


