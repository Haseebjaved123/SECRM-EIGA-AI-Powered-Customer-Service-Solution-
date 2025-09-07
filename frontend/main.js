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
function init() {
  document.getElementById('app').innerHTML = `
    ${renderNavigation()}
    ${renderHomePage()}
    ${renderFeaturesPage()}
    ${renderPipelinePage()}
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


