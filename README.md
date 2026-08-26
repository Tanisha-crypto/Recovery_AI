# RecoverAI — AI Revenue Recovery Platform (Track 3)

> **Autonomous AI-Driven Revenue Recovery Platform for Modern Businesses**  
> *Track 3: AI Revenue Recovery MVP*

---

## 📌 Problem Statement

Subscription businesses, SaaS platforms, and modern e-commerce stores lose millions of rupees every month to involuntary churn and dropped checkouts:
1. **Failed UPI & Card Autopay Transactions:** Bank downtime, NPCI limit throttles, and expired card mandates cause recurring subscriptions to fail even when customers intend to pay.
2. **Abandoned Carts:** High checkout friction or last-minute tax/price hesitation causes customers to drop off at the final step.
3. **Involuntary Churn & Cancellations:** Customers cancel subscriptions due to temporary cash flow issues or perceived lack of immediate utility.
4. **Mandate & Tokenization Expiry:** Expired cards and outdated RBI tokenization lead to silent renewal failures.

Traditionally, businesses use dumb dunning (generic repeated payment retries or cold automated emails) that annoys customers and has low recovery rates (<15%).

---

## 💡 Solution: RecoverAI

**RecoverAI** utilizes intelligent heuristic AI to monitor real-time transaction drop-offs, diagnose failure root causes, and autonomously deploy high-conversion recovery workflows:
- **Intelligent Retry Timing:** Schedules UPI and Card retries at peak bank uptime windows rather than blindly retrying during outages.
- **WhatsApp Concierge & 1-Click Fallbacks:** Delivers instant, zero-friction 1-tap checkout and UPI links directly to customers.
- **Dynamic Retention Offers:** Identifies churn risk intent and automatically offers subscription pauses or targeted retention incentives.
- **Mandate Tokenization Refresh:** Proactively alerts customers before card expiry with a 1-tap token updater.

---

## 🚀 Key Features

### 1. FinTech Executive Dashboard
- **Live Financial Health Metrics:**
  - Total Tracked Revenue: **₹48.6 Lakhs**
  - Revenue At Risk: **₹12.5 Lakhs** (Live count of at-risk transactions)
  - Recoverable Revenue: **₹7.8 Lakhs** (Calculated AI yield)
  - Revenue Recovered: **₹4.2 Lakhs** (Dynamically increments as campaigns run)
- **Revenue Recovery Trajectory Graph:** Interactive Recharts area chart comparing total revenue, at-risk volume, and saved revenue over time.
- **Loss Breakdown Donut Chart:** Categorical distribution of revenue leakages (Failed Payments 41.6%, Abandoned Carts 27.2%, Cancellations 20.8%, Expired Cards 10.4%).

### 2. "Analyze Revenue" AI HUD
- Click the prominent **"Analyze Revenue"** button to trigger a 4-stage animated scanner:
  1. *Analyzing live transactions & gateway webhooks...*
  2. *Finding revenue loss patterns & gateway friction...*
  3. *Calculating dynamic recovery probabilities...*
  4. *Generating tailored recovery playbooks & multi-channel campaigns...*
- Synthesizes findings and routes to actionable playbooks.

### 3. Revenue Opportunities Explorer
- Full interactive dataset of **50+ realistic Indian customer transactions** with ₹ amounts.
- Categorical filter pills: **All**, **Failed Payment**, **Abandoned Cart**, **Subscription Cancelled**, **Expired Card**.
- Live search across customer name, city, transaction ID, and failure reason.
- Sorting by recovery probability, transaction amount, or name.
- **Customer Diagnostic Slide-over/Modal:** In-depth customer view showing past success rates, customer LTV, failure trigger logs, and a 1-click **"Start Recovery"** trigger.

### 4. AI Insights Hub
- Detailed diagnosis cards highlighting the problem detected, affected revenue, recovery probability, AI reasoning, and recommended actions.
- **AI Recovery Sensitivity Simulator:** Real-time slider to test aggressive vs balanced recovery strategies.

### 5. Automated Recovery Campaigns (Actions Page)
- 4 ready-to-deploy playbooks:
  - *Smart UPI & Card Auto-Dunning*
  - *Abandoned Checkout WhatsApp Concierge*
  - *Subscription Churn Rescue & Pause Offer*
  - *Proactive Mandate & Card Tokenization Refresh*
- Single-click **"Start Recovery"** button that executes campaigns, shows **"Recovery campaign started successfully!"** feedback, updates global recovered revenue, and logs actions into the live activity ticker.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 + Vite
- **Language:** JavaScript (ES6+ / JSX)
- **Styling:** Custom CSS (Modern FinTech Dark Theme, Glassmorphism, Responsive Grid)
- **Data Visualizations:** Recharts (AreaChart, PieChart, ResponsiveContainer)
- **Icons:** Lucide React
- **Data Layer:** In-memory Indian FinTech mock dataset (50+ transactions, metrics, playbooks)

---

## 🤖 How AI is Used in RecoverAI

The AI engine in RecoverAI simulates the following core heuristic models:
1. **Downtime & Latency Pattern Recognition:** Analyzes NPCI and bank gateway response codes (e.g. HDFC error 91, SBI timeout 92) to distinguish between transient technical failures and customer insolvency.
2. **Behavioral Recovery Scoring:** Calculates recovery probabilities (70% - 95%) based on historical customer LTV, past consecutive successful renewals, and checkout dwell time.
3. **Autonomous Channel Selection:** Matches customer profile with the highest-converting communication channel (WhatsApp Pay, Instant UPI intent, In-App pause modal, or SMS).
4. **Smart Incentive Optimization:** Predicts the minimum effective discount (5% - 10%) needed to recover abandoned carts without eroding profit margins.

---

## 💻 How to Run the Project Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Launch

1. **Clone or navigate to the project directory:**
   ```bash
   cd Ai_Project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173/`

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🎬 Suggested Demo Flow for Evaluators

1. **Open the App:** View the **Dashboard** displaying **₹12.5L Revenue At Risk** and the loss breakdown donut chart.
2. **Trigger AI Scan:** Click **"Analyze Revenue"** in the top navigation or banner to watch the 4-step AI scanning animation.
3. **Inspect AI Insights:** Review the synthesized AI recommendations and test the sensitivity slider.
4. **Explore Opportunities:** Switch to **Revenue Opportunities**, filter by *Failed Payment*, search for "Rahul", and click on a customer row to view the full diagnostic modal.
5. **Execute Recovery:** Click **"Start Recovery"** on any customer or go to **Recovery Actions** and click **"Start Recovery"** on a playbook.
6. **Watch Real-Time Impact:** Notice the toast notification **"Recovery campaign started successfully!"**, the live activity log update, and the **Revenue Recovered** metric dynamically increase!


