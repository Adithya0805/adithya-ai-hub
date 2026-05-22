export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  featured?: boolean;
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'how-i-built-mediaguard-multi-agent-ai-system',
    title: 'How I Built MediGuard — A Multi-Agent Clinical AI System Using LangGraph, Pinecone & AWS Bedrock',
    date: '2026-05-22',
    excerpt: 'MediGuard is a clinical decision support system I built to stop patients from getting wrong medication information. Here is the full architecture breakdown — LangGraph agents, Pinecone RAG, and AWS Bedrock.',
    tags: ['LangGraph', 'RAG', 'AWS Bedrock', 'Pinecone', 'Python', 'AI', 'Project'],
    category: 'Machine Learning',
    readTime: '10 min read',
    featured: true,
    content: `
<h2>The Problem That Started Everything</h2>
<p>Patients in India regularly get wrong medication information. They Google their symptoms, land on unreliable websites, self-diagnose, and take the wrong medicines. In rural areas where access to doctors is limited, this is genuinely dangerous.</p>
<p>I wanted to build something that could act like a knowledgeable medical assistant — one that pulls from verified clinical data, reasons carefully before answering, and never just makes things up. That's MediGuard.</p>
<p>This is the full story of how I built it, what the architecture looks like, and the hardest problems I hit along the way.</p>

<h2>What MediGuard Does</h2>
<p>MediGuard is a <strong>clinical decision support system</strong> powered by multiple AI agents working together. A user asks a medication or symptom question. MediGuard:</p>
<ul>
  <li>Retrieves relevant clinical data from a verified knowledge base</li>
  <li>Runs it through specialized agents that reason about the information</li>
  <li>Returns a safe, accurate, sourced answer</li>
  <li>Flags dangerous drug interactions or symptoms that need immediate doctor attention</li>
</ul>
<p>It is not a replacement for a doctor. It is a first line of defense against misinformation.</p>

<h2>The Full Tech Stack</h2>
<ul>
  <li><strong>LangGraph</strong> — multi-agent orchestration and state management</li>
  <li><strong>Pinecone</strong> — vector database for clinical knowledge retrieval (RAG)</li>
  <li><strong>AWS Bedrock</strong> — LLM inference (Claude model via Bedrock API)</li>
  <li><strong>Python</strong> — core language throughout</li>
  <li><strong>LangChain</strong> — document loading and embedding pipeline</li>
  <li><strong>FastAPI</strong> — backend API layer</li>
</ul>

<h2>Architecture — How It All Connects</h2>
<p>The system has three main layers working together:</p>

<pre><code>
User Query
    ↓
[Intake Agent] — classifies query type
    ↓
[Retrieval Agent] — fetches relevant docs from Pinecone
    ↓
[Reasoning Agent] — analyzes retrieved data via AWS Bedrock
    ↓
[Safety Agent] — checks for dangerous interactions or red flags
    ↓
Final Response → User
</code></pre>

<p>Each agent is a node in the LangGraph state graph. They communicate by passing a shared state object — no agent works in isolation.</p>

<h2>The Part I'm Most Proud Of — LangGraph Multi-Agent Pipeline</h2>
<p>LangGraph changed how I think about AI systems. Before LangGraph, I thought of AI as a single model that takes input and gives output. LangGraph showed me that complex problems need <strong>multiple specialized agents</strong> — each doing one job well, then passing the result forward.</p>

<p>Here's the simplified version of how I set up the agent graph:</p>

<pre><code>
from langgraph.graph import StateGraph, END
from typing import TypedDict

class MediGuardState(TypedDict):
    query: str
    query_type: str
    retrieved_docs: list
    reasoning: str
    safety_flag: bool
    final_response: str

def intake_agent(state: MediGuardState):
    # Classify the query — medication, symptom, interaction, dosage
    query = state["query"]
    if any(word in query.lower() for word in ["drug", "medicine", "tablet", "dose"]):
        query_type = "medication"
    elif any(word in query.lower() for word in ["symptom", "pain", "fever", "dizzy"]):
        query_type = "symptom"
    else:
        query_type = "general"
    return {"query_type": query_type}

def retrieval_agent(state: MediGuardState):
    # Query Pinecone for relevant clinical documents
    results = pinecone_index.query(
        vector=embed(state["query"]),
        top_k=5,
        include_metadata=True
    )
    docs = [r["metadata"]["text"] for r in results["matches"]]
    return {"retrieved_docs": docs}

def reasoning_agent(state: MediGuardState):
    # Send retrieved docs + query to AWS Bedrock for analysis
    context = "\\n".join(state["retrieved_docs"])
    prompt = f"""
    Clinical Context: {context}
    Patient Question: {state["query"]}
    Provide a safe, accurate, sourced answer based only on the context above.
    """
    response = bedrock_client.invoke_model(prompt)
    return {"reasoning": response}

def safety_agent(state: MediGuardState):
    # Flag dangerous keywords
    dangerous = ["overdose", "interaction warning", "do not combine", "fatal"]
    flag = any(word in state["reasoning"].lower() for word in dangerous)
    final = state["reasoning"]
    if flag:
        final = "⚠️ WARNING: " + final + "\\n\\nPlease consult a doctor immediately."
    return {"safety_flag": flag, "final_response": final}

# Build the graph
graph = StateGraph(MediGuardState)
graph.add_node("intake", intake_agent)
graph.add_node("retrieval", retrieval_agent)
graph.add_node("reasoning", reasoning_agent)
graph.add_node("safety", safety_agent)

graph.set_entry_point("intake")
graph.add_edge("intake", "retrieval")
graph.add_edge("retrieval", "reasoning")
graph.add_edge("reasoning", "safety")
graph.add_edge("safety", END)

app = graph.compile()
</code></pre>

<p>This is the core of MediGuard. Four agents, each with a single responsibility, connected by a state graph. Clean, debuggable, and extensible.</p>

<h2>The RAG System — Pinecone Knowledge Base</h2>
<p>RAG stands for Retrieval Augmented Generation. Instead of the LLM relying on its training data alone, we give it relevant documents at query time. This is critical for medical information — you need sourced, current, verified data.</p>

<p>My Pinecone setup:</p>
<pre><code>
import pinecone
from langchain.embeddings import BedrockEmbeddings
from langchain.vectorstores import Pinecone as PineconeStore

# Initialize Pinecone
pinecone.init(api_key="your-api-key", environment="us-east-1-aws")
index_name = "mediaguard-clinical"

# Embed and upload clinical documents
embeddings = BedrockEmbeddings(
    model_id="amazon.titan-embed-text-v1",
    client=bedrock_client
)

vectorstore = PineconeStore.from_documents(
    documents=clinical_docs,
    embedding=embeddings,
    index_name=index_name
)
</code></pre>

<p>I uploaded clinical drug information documents, WHO medication guidelines, and common symptom reference data. Every answer MediGuard gives is grounded in this verified knowledge base — not hallucinated.</p>

<h2>The Hardest Part — AWS Bedrock API Configuration</h2>
<p>I'll be honest — AWS Bedrock nearly broke me.</p>
<p>The documentation is good but the setup has multiple layers that all have to be right simultaneously:</p>
<ul>
  <li>IAM role with correct Bedrock permissions</li>
  <li>Model access enabled in the correct AWS region</li>
  <li>Correct model ID format in the API call</li>
  <li>Request body structure varies by model</li>
</ul>

<p>The error that wasted most of my time:</p>
<pre><code>
# WRONG — this gave me AccessDeniedException for 2 hours
response = bedrock.invoke_model(
    modelId="claude-v2",
    body=json.dumps({"prompt": prompt})
)

# CORRECT — model ID must be exact, body format must match model spec
response = bedrock.invoke_model(
    modelId="anthropic.claude-v2",
    contentType="application/json",
    accept="application/json",
    body=json.dumps({
        "prompt": f"\\n\\nHuman: {prompt}\\n\\nAssistant:",
        "max_tokens_to_sample": 1000,
        "temperature": 0.3
    })
)
</code></pre>

<p>Two things that fixed everything:</p>
<ul>
  <li><strong>Model access must be manually enabled</strong> in AWS Console → Bedrock → Model access → Request access. It's not on by default.</li>
  <li><strong>Region matters</strong> — not all models are available in all regions. I used us-east-1.</li>
</ul>
<p>Once those two were sorted, Bedrock worked flawlessly. The latency is good and the Claude responses through Bedrock are high quality for clinical reasoning.</p>

<h2>What I Learned Building MediGuard</h2>
<ul>
  <li><strong>Agent design is architecture design.</strong> The hard part isn't writing the agent code — it's deciding what each agent is responsible for and where the boundaries are.</li>
  <li><strong>RAG quality depends on data quality.</strong> Garbage in, garbage out. I spent more time curating clinical documents than writing code.</li>
  <li><strong>AWS permissions are always the first thing to check.</strong> If something doesn't work in AWS, check IAM before anything else.</li>
  <li><strong>LangGraph state management is powerful.</strong> Being able to inspect exactly what each agent received and returned made debugging 10x easier than a monolithic chain.</li>
</ul>

<h2>What's Next for MediGuard</h2>
<ul>
  <li>Voice input support using Whisper — so rural patients can speak their symptoms</li>
  <li>Tamil language support — for non-English speaking patients in Tamil Nadu</li>
  <li>Drug interaction checker agent — dedicated node just for cross-checking medications</li>
  <li>MLOps pipeline on AWS SageMaker for continuous knowledge base updates</li>
</ul>

<h2>The Bigger Picture</h2>
<p>MediGuard taught me that AI systems are not just models. They are pipelines of reasoning, retrieval, and safety checks working together. Building it gave me hands-on experience with the exact stack that enterprise AI teams use — LLM orchestration, vector databases, cloud inference APIs.</p>
<p>More importantly it reminded me why I got into AI in the first place — to build things that actually help people. A patient in a village getting accurate medication information instead of dangerous misinformation — that's worth building for.</p>
<p>The code is on my GitHub. If you're building something similar or want to discuss the architecture, reach out on LinkedIn.</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
<p><em>GitHub: github.com/Adithya0805 | LinkedIn: linkedin.com/in/adithya-kuppusamy-76baab204</em></p>
  `
  },
  {
    slug: 'my-tcs-nqt-experience-2026-honest-review',
    title: 'My TCS NQT Experience 2026 — Honest Review from a Tamil Nadu Student',
    date: '2026-05-21',
    excerpt: 'I sat for TCS NQT 2026 at iON Digital Zone Vellore. Here is exactly what happened — section by section, no sugarcoating. Read this before you appear.',
    tags: ['TCS', 'NQT', 'Interview Prep', 'Campus Placement', 'Career'],
    category: 'Interview Prep',
    readTime: '7 min read',
    featured: true,
    content: `
<h2>Why I'm Writing This</h2>
<p>When I was preparing for TCS NQT, I searched everywhere for honest student experiences. Most blogs were either too vague or just copy-pasted syllabus content. So here's my real account — what I felt walking in, what the questions were like, what I got wrong, and what you should do differently.</p>
<p>I appeared for TCS NQT on <strong>April 3, 2026</strong> at <strong>iON Digital Zone, Vellore</strong>. B.Tech in AI & Data Science. This was one of my most important exams for landing a fresher IT job.</p>

<h2>Before the Exam — What I Did</h2>
<p>I prepared for about 3 weeks covering aptitude, reasoning, verbal, and Python coding. Honest confession — I underestimated the verbal section. That was my first mistake.</p>

<h2>Reaching the Exam Center</h2>
<p>iON Digital Zone Vellore is well-organized. Reach at least 45 minutes early. They verify hall ticket, ID proof, and do biometric registration. The lab had proper systems, good internet, no technical issues during my slot.</p>

<h2>Section 1 — Aptitude and Reasoning</h2>
<p><strong>My experience: Medium — manageable but tight on time.</strong></p>
<p>Standard questions — percentages, ratios, time and work, profit-loss, number series. Reasoning had blood relations, direction sense, and syllogisms. The problem was time — questions weren't hard but there were enough to keep you on your toes.</p>
<p><strong>Tricky patterns to practice:</strong></p>
<ul>
  <li>Two trains approaching each other — relative speed with a twist</li>
  <li>Coding-decoding where the pattern shifts mid-series</li>
  <li>Data sufficiency questions — these eat time if unpracticed</li>
  <li>Number series where the difference itself follows a pattern</li>
</ul>
<p><strong>Tip:</strong> Don't spend more than 90 seconds on any single question. Mark and move. Time management is the real test here.</p>

<h2>Section 2 — Verbal</h2>
<p><strong>My experience: Medium — harder than expected.</strong></p>
<p>Reading comprehension passages were long and inference-based. Sentence correction had subtle errors — wrong prepositions, misplaced modifiers, subject-verb agreement in complex sentences.</p>
<p><strong>What tripped me up:</strong></p>
<ul>
  <li>Fill in the blanks with two blanks — both options looked correct at first glance</li>
  <li>Para-jumbles with 5 sentences — need practice to crack fast</li>
  <li>Vocabulary in context — the word meant something different in that specific passage</li>
</ul>
<p><strong>Tip:</strong> Read one English article daily for 2 weeks before exam. The Hindu or BBC. Your comprehension speed will improve significantly.</p>

<h2>Section 3 — Coding Round</h2>
<p><strong>My experience: Q1 partially solved. Q2 not attempted.</strong></p>
<p>2 coding questions, 30 minutes. Platform accepts C, C++, Java, Python.</p>
<p>Q1 was array-based — find a specific pattern and return a result. My solution passed some test cases, not all. Partial marks secured. Q2 I understood the logic but ran out of time.</p>
<p><strong>Python patterns TCS NQT loves:</strong></p>
<pre><code>
# Pattern 1 — Conditional string reversal
def conditional_reverse(s):
    words = s.split()
    result = []
    for word in words:
        if len(word) > 4:
            result.append(word[::-1])
        else:
            result.append(word)
    return ' '.join(result)

# Pattern 2 — Find missing number
def find_missing(arr, n):
    expected = n * (n + 1) // 2
    return expected - sum(arr)

# Pattern 3 — Count vowels and consonants
def count_vc(s):
    vowels = sum(1 for c in s.lower() if c in 'aeiou')
    consonants = sum(1 for c in s.lower() if c.isalpha() and c not in 'aeiou')
    return vowels, consonants
</code></pre>
<p><strong>Tip:</strong> Solve Q1 in under 12 minutes so you have time for Q2. Speed matters more than perfection.</p>

<h2>What I Would Do Differently</h2>
<ul>
  <li>Practice verbal more seriously — 30 minutes daily</li>
  <li>Time-box every coding question to 12 minutes max</li>
  <li>Do 2 full mock tests before the actual exam</li>
  <li>Practice data sufficiency questions for aptitude</li>
</ul>

<h2>3-Week Prep Plan for You</h2>
<ul>
  <li><strong>Week 1:</strong> Aptitude — IndiaBix daily, 30 questions per day. Time-speed-distance, percentages, profit-loss.</li>
  <li><strong>Week 2:</strong> Verbal — Read English articles daily. RC passages on Oliveboard or PrepInsta. Para-jumbles every day.</li>
  <li><strong>Week 3:</strong> Coding — 2 Easy HackerRank problems daily in Python. Arrays, strings, number patterns.</li>
</ul>

<h2>Quick Q&A</h2>
<p><strong>Q: Is TCS NQT hard for an average student?</strong><br/>A: No. With 3 weeks of consistent practice it is manageable.</p>
<p><strong>Q: Which language to use for coding?</strong><br/>A: Python. Fastest to write, easy syntax, less boilerplate.</p>
<p><strong>Q: Is there negative marking?</strong><br/>A: No negative marking. Attempt every question.</p>
<p><strong>Q: What score is safe to clear?</strong><br/>A: Aim for 60%+ overall. Sectional cutoffs exist so don't skip any section.</p>
<p><strong>Q: Can I clear NQT without coaching?</strong><br/>A: Yes, absolutely. I prepared completely self-study using free resources.</p>

<h2>Final Thought</h2>
<p>TCS NQT is not the end of the world if things don't go perfectly. What matters is you showed up and gave your best. Keep moving — Infosys, Wipro, Cognizant are all hiring.</p>
<p>If this post helped you, share it with your classmates. Let's help each other crack these exams. 💪</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
    `
  },
  // ── NEW POSTS (5 rich posts) ────────────────────────────────────────────────
  {
    slug: "tcs-nqt-coding-questions-python-solutions",
    title: "TCS NQT Coding Questions 2026 — Python Solutions & Patterns",
    excerpt:
      "Complete walkthrough of the most common TCS NQT coding patterns with Python solutions. Covers arrays, strings, recursion, and greedy problems that appear every year.",
    category: "Interview Prep",
    tags: ["TCS", "NQT", "Python", "DSA", "Interview"],
    readTime: "12 min",
    date: "2026-05-19",
    featured: true,
    content: `
<h2>Why TCS NQT Coding Matters</h2>
<p>The TCS National Qualifier Test (NQT) has two coding questions in 30 minutes. They are not LeetCode Hard — they test fundamentals: loops, string manipulation, basic math, and sometimes recursion. If you know these patterns cold, you will clear the coding section even if you fail the MCQ.</p>

<h2>Pattern 1 — Frequency Count (Very Common)</h2>
<p>Almost every year, one of the two problems is a frequency/count problem — count vowels, count characters, count duplicates.</p>
<pre><code class="language-python"># Count vowels in a string
def count_vowels(s):
    vowels = set('aeiouAEIOU')
    return sum(1 for ch in s if ch in vowels)

# Count frequency of each character
def char_frequency(s):
    freq = {}
    for ch in s:
        freq[ch] = freq.get(ch, 0) + 1
    return freq

# Test
print(count_vowels("Adithya is learning AI"))   # 9
print(char_frequency("hello"))                  # {'h':1,'e':1,'l':2,'o':1}
</code></pre>

<h2>Pattern 2 — Number Reversal and Digit Extraction</h2>
<p>Second most common category. You'll get problems like "reverse a number", "check palindrome number", "sum of digits".</p>
<pre><code class="language-python"># Reverse a number without converting to string
def reverse_number(n):
    negative = n < 0
    n = abs(n)
    rev = 0
    while n > 0:
        rev = rev * 10 + n % 10
        n //= 10
    return -rev if negative else rev

# Sum of digits
def digit_sum(n):
    return sum(int(d) for d in str(abs(n)))

# Armstrong number check
def is_armstrong(n):
    digits = str(n)
    power = len(digits)
    return n == sum(int(d) ** power for d in digits)

print(reverse_number(12345))   # 54321
print(digit_sum(9876))         # 30
print(is_armstrong(153))       # True (1^3 + 5^3 + 3^3 = 153)
</code></pre>

<h2>Pattern 3 — String Manipulation</h2>
<p>Check palindrome, remove duplicates, Caesar cipher — these appear often in TCS NQT.</p>
<pre><code class="language-python"># Check palindrome
def is_palindrome(s):
    s = s.lower().replace(' ', '')
    return s == s[::-1]

# Remove consecutive duplicates
def remove_consec_duplicates(s):
    result = [s[0]]
    for i in range(1, len(s)):
        if s[i] != s[i-1]:
            result.append(s[i])
    return ''.join(result)

# Caesar cipher
def caesar_cipher(text, shift):
    result = []
    for ch in text:
        if ch.isalpha():
            base = ord('A') if ch.isupper() else ord('a')
            result.append(chr((ord(ch) - base + shift) % 26 + base))
        else:
            result.append(ch)
    return ''.join(result)

print(is_palindrome("Race car"))          # True
print(remove_consec_duplicates("aabbcc")) # "abc"
print(caesar_cipher("Hello", 3))          # "Khoor"
</code></pre>

<h2>Pattern 4 — Prime and Fibonacci</h2>
<p>Classic math problems. Know these by heart — they come up every exam cycle.</p>
<pre><code class="language-python"># Efficient prime check
def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

# Nth Fibonacci (iterative — DO NOT use recursion in timed tests)
def fibonacci(n):
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

# Primes up to N (Sieve of Eratosthenes)
def sieve(n):
    is_p = [True] * (n + 1)
    is_p[0] = is_p[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_p[i]:
            for j in range(i*i, n+1, i):
                is_p[j] = False
    return [i for i in range(2, n+1) if is_p[i]]

print(is_prime(97))      # True
print(fibonacci(10))     # 55
print(sieve(30))         # [2,3,5,7,11,13,17,19,23,29]
</code></pre>

<h2>Pattern 5 — Array Problems</h2>
<p>Finding max/min, second largest, rotating arrays, missing numbers in a range.</p>
<pre><code class="language-python"># Second largest element
def second_largest(arr):
    first = second = float('-inf')
    for x in arr:
        if x > first:
            second = first
            first = x
        elif x > second and x != first:
            second = x
    return second if second != float('-inf') else -1

# Missing number in 1..N
def missing_number(arr, n):
    return n * (n + 1) // 2 - sum(arr)

# Rotate array left by k positions
def rotate_left(arr, k):
    n = len(arr)
    k = k % n
    return arr[k:] + arr[:k]

print(second_largest([3, 1, 4, 1, 5, 9, 2, 6]))  # 6
print(missing_number([1, 2, 4, 5, 6], 6))          # 3
print(rotate_left([1, 2, 3, 4, 5], 2))             # [3, 4, 5, 1, 2]
</code></pre>

<h2>My Exam Day Strategy</h2>
<ul>
  <li>Read both problems first — pick the easier one, attempt it fully</li>
  <li>Write edge case checks at the top (n=0, empty string, negative numbers)</li>
  <li>Use <code>input()</code> for TCS compiler — not <code>sys.stdin</code></li>
  <li>Submit partial code even if wrong — partial marks exist</li>
  <li>Aim for O(n) or O(n log n) — avoid O(n²) loops inside loops</li>
</ul>

<h2>Practice Resources</h2>
<ul>
  <li>TCS iON Practice Portal (official, free)</li>
  <li>PrepInsta TCS NQT section</li>
  <li>HackerRank Python track (first 20 problems)</li>
  <li>GeeksForGeeks TCS NQT previous year questions</li>
</ul>
`,
  },
  {
    slug: "how-i-built-mediaguard-langgraph-rag",
    title: "How I Built MediGuard — A Multi-Agent Clinical AI with LangGraph + RAG",
    excerpt:
      "Full architecture breakdown of MediGuard: a clinical decision support system using LangGraph multi-agent orchestration, Pinecone RAG, and AWS Bedrock. From concept to working system.",
    category: "Machine Learning",
    tags: ["LangGraph", "RAG", "AWS Bedrock", "Pinecone", "Python", "AI"],
    readTime: "15 min",
    date: "2026-05-18",
    featured: true,
    content: `
<h2>What is MediGuard?</h2>
<p>MediGuard is a multi-agent clinical decision support system I built to assist doctors with real-time differential diagnosis and drug interaction checks. It combines three cutting-edge technologies: <strong>LangGraph</strong> for multi-agent orchestration, <strong>Pinecone</strong> for medical RAG (Retrieval-Augmented Generation), and <strong>AWS Bedrock</strong> for HIPAA-aware inference using Claude.</p>
<p>This project taught me more about production AI systems than any course ever did. Here's the full breakdown.</p>

<h2>Why Multi-Agent Architecture?</h2>
<p>A single LLM call cannot handle complex clinical reasoning reliably. You need specialized agents, each responsible for one task:</p>
<ul>
  <li><strong>Intake Agent</strong> — parses patient symptoms, age, history from unstructured text</li>
  <li><strong>Retrieval Agent</strong> — fetches relevant medical literature from Pinecone</li>
  <li><strong>Diagnosis Agent</strong> — generates differential diagnosis with confidence scores</li>
  <li><strong>Drug Check Agent</strong> — validates prescriptions against known interactions</li>
  <li><strong>Supervisor Agent</strong> — orchestrates the workflow, handles failures gracefully</li>
</ul>

<h2>LangGraph — The Orchestration Layer</h2>
<p>LangGraph lets you build stateful multi-agent workflows as directed graphs. Each node is an agent, edges define the flow.</p>
<pre><code class="language-python">from langgraph.graph import StateGraph, END
from typing import TypedDict, List

class ClinicalState(TypedDict):
    patient_input: str
    symptoms: List[str]
    retrieved_docs: List[str]
    diagnosis: str
    drug_interactions: List[str]
    final_report: str

# Build the graph
workflow = StateGraph(ClinicalState)

# Add nodes
workflow.add_node("intake", intake_agent)
workflow.add_node("retrieval", retrieval_agent)
workflow.add_node("diagnosis", diagnosis_agent)
workflow.add_node("drug_check", drug_check_agent)
workflow.add_node("supervisor", supervisor_agent)

# Define edges
workflow.set_entry_point("intake")
workflow.add_edge("intake", "retrieval")
workflow.add_edge("retrieval", "diagnosis")
workflow.add_edge("diagnosis", "drug_check")
workflow.add_edge("drug_check", "supervisor")
workflow.add_edge("supervisor", END)

app = workflow.compile()
</code></pre>

<h2>Pinecone RAG — Medical Knowledge Base</h2>
<p>I indexed 50,000+ medical documents (clinical guidelines, drug databases, case studies) into Pinecone. The retrieval agent queries this for every patient case.</p>
<pre><code class="language-python">import pinecone
from sentence_transformers import SentenceTransformer

# Initialize
pc = pinecone.Pinecone(api_key="YOUR_API_KEY")
index = pc.Index("mediaguard-medical-kb")
embedder = SentenceTransformer("all-MiniLM-L6-v2")

def retrieval_agent(state: ClinicalState) -> ClinicalState:
    # Embed the symptoms query
    query_embedding = embedder.encode(
        " ".join(state["symptoms"])
    ).tolist()
    
    # Fetch top-5 relevant docs
    results = index.query(
        vector=query_embedding,
        top_k=5,
        include_metadata=True
    )
    
    docs = [r["metadata"]["text"] for r in results["matches"]]
    return {**state, "retrieved_docs": docs}
</code></pre>

<h2>AWS Bedrock — Claude for Clinical Reasoning</h2>
<p>I used AWS Bedrock to call Claude (Anthropic's model) for the diagnosis step. Bedrock keeps data within AWS infrastructure — critical for any healthcare application thinking about HIPAA.</p>
<pre><code class="language-python">import boto3
import json

bedrock = boto3.client("bedrock-runtime", region_name="us-east-1")

def diagnosis_agent(state: ClinicalState) -> ClinicalState:
    context = "\n\n".join(state["retrieved_docs"])
    
    prompt = f"""You are a clinical decision support AI. 
Based on the following medical literature:
{context}

Patient symptoms: {', '.join(state['symptoms'])}

Provide a differential diagnosis with confidence scores (0-100) and 
reasoning for each. Format as JSON.
"""
    
    response = bedrock.invoke_model(
        modelId="anthropic.claude-3-sonnet-20240229-v1:0",
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1024,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response["body"].read())
    diagnosis = result["content"][0]["text"]
    return {**state, "diagnosis": diagnosis}
</code></pre>

<h2>Drug Interaction Check</h2>
<p>The drug check agent queries the OpenFDA API for known interactions between prescribed medications.</p>
<pre><code class="language-python">import requests

def drug_check_agent(state: ClinicalState) -> ClinicalState:
    # Extract drug names from diagnosis
    drugs = extract_drug_names(state["diagnosis"])
    interactions = []
    
    for drug in drugs:
        resp = requests.get(
            f"https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:{drug}&limit=5"
        )
        if resp.status_code == 200:
            data = resp.json()
            if data.get("results"):
                interactions.append(f"{drug}: {len(data['results'])} known interactions found")
    
    return {**state, "drug_interactions": interactions}
</code></pre>

<h2>What I Learned Building This</h2>
<ul>
  <li><strong>LangGraph state management</strong> is powerful but requires careful TypedDict design — get it wrong and debugging is painful</li>
  <li><strong>RAG quality depends on chunking strategy</strong> — I used 512-token chunks with 50-token overlap for medical docs</li>
  <li><strong>AWS Bedrock latency</strong> is higher than direct OpenAI calls — batch where possible, or cache common queries</li>
  <li><strong>Clinical AI needs guardrails</strong> — always include a confidence threshold below which the system defers to human review</li>
  <li><strong>Testing multi-agent systems</strong> — mock each agent independently first, then integration test the full graph</li>
</ul>

<h2>GitHub & Next Steps</h2>
<p>The source code is on my <a href="https://github.com/Adithya0805" target="_blank">GitHub</a>. Next steps for MediGuard: add a FastAPI layer, build a clinician UI with React, and explore FHIR integration for EHR compatibility.</p>
`,
  },
  {
    slug: "ml-engineer-roadmap-2026-tamil-student",
    title: "ML Engineer Roadmap 2026 — A Tamil Nadu Student's Honest Guide",
    excerpt:
      "From CGPA to job offer: a realistic, no-fluff roadmap for AI/ML engineering careers in India. What actually matters, what's overrated, and how to stand out as a Tamil Nadu engineering student.",
    category: "Career",
    tags: ["Roadmap", "Career", "Machine Learning", "India", "Tamil Nadu"],
    readTime: "10 min",
    date: "2026-05-17",
    featured: true,
    content: `
<h2>Who This Is For</h2>
<p>You're a B.Tech student in Tamil Nadu — probably from a tier-2 or tier-3 college — and you want to become an ML/AI engineer. You've heard "get placed in TCS/Infosys OR do a startup". That's a false binary. This roadmap is the middle path: build actual skills, get hired at product companies, and earn well without an IIT tag.</p>

<h2>The Honest Skill Stack (2026)</h2>
<p>Here's what hiring managers at ML-focused companies actually look for, in order of importance:</p>
<ul>
  <li><strong>1. Python proficiency</strong> — not just "can write code", but clean, readable, typed code with proper error handling</li>
  <li><strong>2. ML fundamentals</strong> — linear regression to gradient boosting. Understand bias-variance, cross-validation, metrics properly</li>
  <li><strong>3. One deep specialization</strong> — NLP/LLMs, Computer Vision, or MLOps. Pick one and go deep</li>
  <li><strong>4. Data skills</strong> — Pandas, SQL (at least intermediate), and basic data viz (matplotlib or Plotly)</li>
  <li><strong>5. One cloud platform</strong> — AWS is most in demand in India. Get the AWS Cloud Practitioner cert first</li>
  <li><strong>6. Git + GitHub</strong> — your public GitHub IS your resume at early career level</li>
</ul>

<h2>Month-by-Month Plan (Starting from Zero)</h2>
<pre><code>Month 1-2:  Python basics + NumPy + Pandas
            → Project: Exploratory Data Analysis on any Kaggle dataset

Month 3-4:  Scikit-learn + ML fundamentals (Andrew Ng's course)
            → Project: End-to-end classification model with deployment

Month 5-6:  Deep Learning (fast.ai or PyTorch)
            → Project: Image classifier or sentiment analyzer (deployed on Hugging Face)

Month 7-8:  LLMs + LangChain/LangGraph basics
            → Project: RAG chatbot over a domain-specific document set

Month 9-10: Cloud (AWS) + MLOps basics (Docker, basic CI/CD)
            → Project: Deploy your month 7-8 project to AWS EC2 or Lambda

Month 11-12: DSA prep for interviews (150 LeetCode problems)
             → Apply to 50+ companies with your polished portfolio
</code></pre>

<h2>What's Overrated (Honest Take)</h2>
<ul>
  <li><strong>Kaggle grandmaster rank</strong> — Good for signal, not for jobs. Two solid projects beat 100 Kaggle notebooks</li>
  <li><strong>Multiple certifications</strong> — 1-2 relevant certs (AWS, TensorFlow) are enough. Cert-collecting is procrastination</li>
  <li><strong>Knowing every framework</strong> — PyTorch OR TensorFlow, not both. LangChain OR LlamaIndex, not both</li>
  <li><strong>CGPA above 7.5</strong> — Below 7.5 is a filter issue. Above 7.5, CGPA doesn't differentiate you</li>
</ul>

<h2>What's Underrated</h2>
<ul>
  <li><strong>Writing online</strong> — this blog is me doing exactly this. Write about what you build. Recruiters read it</li>
  <li><strong>LinkedIn consistency</strong> — post once a week. One project update, one learning, one insight. Compound over 6 months</li>
  <li><strong>GitHub README quality</strong> — most students have repos with no README. A good README makes you look senior-level</li>
  <li><strong>Cold emailing</strong> — I emailed 30 engineers at startups in India. 6 replied. 2 led to referrals. It works</li>
</ul>

<h2>Tamil Nadu Specific Advice</h2>
<p>The tech job market in Chennai is growing fast. Companies like Zoho, Freshworks, Chargebee, and hundreds of startups are actively hiring ML engineers. You don't need to move to Bangalore immediately.</p>
<ul>
  <li>Attend Chennai's <strong>GDG (Google Developer Groups)</strong> meetups — great networking</li>
  <li>Join <strong>Tamil Nadu AI Community</strong> WhatsApp groups — job leads come through there</li>
  <li>Target <strong>Zoho's campus hiring</strong> — they take people from any college based on skills</li>
  <li>Use <strong>Naukri + LinkedIn both</strong> — Naukri has many Chennai/Tamil Nadu specific ML roles that LinkedIn misses</li>
</ul>

<h2>My Personal Timeline</h2>
<p>For context: I'm Adithya from Ambur, studied at a non-IIT college, CGPA 8.5. I built 7 AI projects, got AWS certified, wrote this blog, and am now actively applying. The roadmap above is exactly what I followed. It's not theoretical — it's lived experience.</p>

<h2>Final Advice</h2>
<p>Stop waiting until you feel "ready". Ship something. Break it. Fix it. Ship again. The gap between "learning ML" and "doing ML" is a project — just one project that you deploy and show to the world. That's the whole secret.</p>
`,
  },
  {
    slug: "langchain-rag-beginners-guide",
    title: "Build a RAG Chatbot from Scratch — LangChain Beginner's Guide",
    excerpt:
      "Step-by-step tutorial to build your first Retrieval-Augmented Generation (RAG) chatbot using LangChain, ChromaDB, and OpenAI. With working code you can run today.",
    category: "Machine Learning",
    tags: ["LangChain", "RAG", "Python", "OpenAI", "ChromaDB", "Tutorial"],
    readTime: "14 min",
    date: "2026-05-16",
    featured: false,
    content: `
<h2>What is RAG and Why Does It Matter?</h2>
<p>RAG (Retrieval-Augmented Generation) solves the biggest problem with LLMs: they don't know about your private data, and they hallucinate when they don't know something. RAG fixes this by retrieving relevant documents from your own knowledge base before generating a response.</p>
<p>Think of it like giving the LLM an open-book exam instead of asking it to recall from memory.</p>

<h2>What We're Building</h2>
<p>A chatbot that can answer questions about any PDF you give it — in under 100 lines of Python. We'll use:</p>
<ul>
  <li><strong>LangChain</strong> — orchestration framework</li>
  <li><strong>ChromaDB</strong> — local vector database (free, no API needed)</li>
  <li><strong>OpenAI</strong> — embeddings + GPT-4o-mini for generation</li>
</ul>

<h2>Step 1 — Install Dependencies</h2>
<pre><code class="language-bash">pip install langchain langchain-openai langchain-community chromadb pypdf python-dotenv
</code></pre>

<h2>Step 2 — Load and Split Your PDF</h2>
<pre><code class="language-python">from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load PDF
loader = PyPDFLoader("your_document.pdf")
pages = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,      # 500 tokens per chunk
    chunk_overlap=50,    # 50 token overlap to preserve context
    separators=["\n\n", "\n", ".", " "]
)
chunks = splitter.split_documents(pages)
print(f"Split into {len(chunks)} chunks")
</code></pre>

<h2>Step 3 — Create Vector Embeddings and Store in ChromaDB</h2>
<pre><code class="language-python">from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
import os

os.environ["OPENAI_API_KEY"] = "your-api-key"

# Create embeddings and store locally
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db"  # saves locally
)

print("Vector store created and saved!")
</code></pre>

<h2>Step 4 — Build the RAG Chain</h2>
<pre><code class="language-python">from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate

# Load existing vectorstore
vectorstore = Chroma(
    persist_directory="./chroma_db",
    embedding_function=OpenAIEmbeddings(model="text-embedding-3-small")
)

# Create retriever
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}  # retrieve top-4 most similar chunks
)

# Custom prompt
prompt_template = """You are a helpful assistant. Use ONLY the following context 
to answer the question. If the answer is not in the context, say 
"I don't have enough information about that."

Context:
{context}

Question: {question}

Answer:"""

prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["context", "question"]
)

# Create the RAG chain
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

rag_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    chain_type_kwargs={"prompt": prompt},
    return_source_documents=True
)
</code></pre>

<h2>Step 5 — Chat with Your Document</h2>
<pre><code class="language-python">def chat(question: str) -> str:
    result = rag_chain.invoke({"query": question})
    answer = result["result"]
    sources = result["source_documents"]
    
    print(f"\nAnswer: {answer}")
    print(f"\nSources: {len(sources)} chunks retrieved")
    for i, doc in enumerate(sources):
        print(f"  [{i+1}] Page {doc.metadata.get('page', '?')}: {doc.page_content[:100]}...")
    
    return answer

# Test it
chat("What is the main topic of this document?")
chat("Summarize the key findings")
chat("What are the recommendations?")
</code></pre>

<h2>Step 6 — Add a Simple CLI Interface</h2>
<pre><code class="language-python">if __name__ == "__main__":
    print("RAG Chatbot ready! Ask questions about your PDF.")
    print("Type 'quit' to exit.\n")
    
    while True:
        question = input("You: ").strip()
        if question.lower() in ["quit", "exit", "q"]:
            print("Goodbye!")
            break
        if question:
            chat(question)
        print()
</code></pre>

<h2>Understanding What's Happening</h2>
<ul>
  <li><strong>Chunking</strong>: We split the PDF into small pieces so the LLM can focus on relevant sections</li>
  <li><strong>Embedding</strong>: Each chunk is converted to a vector (list of numbers) that captures semantic meaning</li>
  <li><strong>Retrieval</strong>: When you ask a question, it's also embedded, then we find the chunks with the closest vectors (cosine similarity)</li>
  <li><strong>Generation</strong>: The retrieved chunks are injected into the prompt as context, and the LLM generates a grounded answer</li>
</ul>

<h2>Common Mistakes to Avoid</h2>
<ul>
  <li>Chunk size too large → retrieval is less precise (aim for 300-600 tokens)</li>
  <li>No overlap → context breaks at chunk boundaries (use 10-15% overlap)</li>
  <li>Asking the LLM to answer from memory → defeats the purpose; always use the "only use context" instruction</li>
  <li>Not filtering irrelevant retrievals → add a similarity score threshold</li>
</ul>

<h2>Where to Go Next</h2>
<ul>
  <li>Upgrade to <strong>LangGraph</strong> for multi-turn conversation with memory</li>
  <li>Replace ChromaDB with <strong>Pinecone</strong> for production-scale storage</li>
  <li>Add <strong>HyDE</strong> (Hypothetical Document Embeddings) for better retrieval</li>
  <li>Build a <strong>FastAPI endpoint</strong> to expose your RAG bot as an API</li>
</ul>
`,
  },
  {
    slug: "amazon-sde-interview-prep-dsa-guide",
    title: "Amazon SDE Interview Prep — Complete DSA Guide with Python",
    excerpt:
      "Everything you need to crack the Amazon SDE coding rounds: the exact topics they test, problem patterns with solutions, LP (Leadership Principles) tips, and a 8-week study plan.",
    category: "Interview Prep",
    tags: ["Amazon", "SDE", "DSA", "Interview", "Python", "LeetCode"],
    readTime: "18 min",
    date: "2026-05-15",
    featured: false,
    content: `
<h2>Amazon Interview Structure (2026)</h2>
<p>Amazon's SDE-1 interview process for freshers typically has:</p>
<ul>
  <li><strong>OA (Online Assessment)</strong>: 2 coding problems + work simulation (90 mins)</li>
  <li><strong>Technical Phone Screen</strong>: 1-2 coding problems + debugging (45-60 mins)</li>
  <li><strong>Virtual On-site</strong>: 4-5 rounds — 2-3 coding, 1 system design (simplified), 1-2 LP behavioral</li>
</ul>
<p>The coding rounds are LeetCode medium difficulty. The LP rounds are what trips most Indian candidates up. We'll cover both.</p>

<h2>DSA Topics Amazon Tests (Frequency Order)</h2>
<ul>
  <li>Arrays &amp; Strings — 30% of problems</li>
  <li>Trees &amp; Graphs (BFS/DFS) — 25%</li>
  <li>Dynamic Programming — 20%</li>
  <li>Linked Lists — 10%</li>
  <li>Stacks, Queues, Heaps — 10%</li>
  <li>Recursion &amp; Backtracking — 5%</li>
</ul>

<h2>Pattern 1 — Two Pointers (Must Know)</h2>
<pre><code class="language-python"># Two Sum II (sorted array) — O(n) instead of O(n²)
def two_sum_sorted(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        current = numbers[left] + numbers[right]
        if current == target:
            return [left + 1, right + 1]
        elif current < target:
            left += 1
        else:
            right -= 1
    return []

# Container With Most Water
def max_water(height):
    left, right = 0, len(height) - 1
    max_area = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        max_area = max(max_area, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_area

# 3Sum
def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # skip duplicates
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left+1]: left += 1
                while left < right and nums[right] == nums[right-1]: right -= 1
                left += 1; right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return result
</code></pre>

<h2>Pattern 2 — Sliding Window</h2>
<pre><code class="language-python"># Longest substring without repeating characters
def length_of_longest_substring(s):
    char_index = {}
    max_len = 0
    left = 0
    
    for right, ch in enumerate(s):
        if ch in char_index and char_index[ch] >= left:
            left = char_index[ch] + 1
        char_index[ch] = right
        max_len = max(max_len, right - left + 1)
    
    return max_len

# Maximum sum subarray of size k
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

print(length_of_longest_substring("abcabcbb"))  # 3
print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3)) # 9
</code></pre>

<h2>Pattern 3 — Trees (BFS + DFS)</h2>
<pre><code class="language-python">class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Level Order Traversal (BFS)
from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# Maximum Depth
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# Lowest Common Ancestor
def lca(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    return root if left and right else left or right
</code></pre>

<h2>Pattern 4 — Dynamic Programming</h2>
<pre><code class="language-python"># Classic: Longest Common Subsequence
def lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# Coin Change (minimum coins)
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

print(lcs("abcde", "ace"))             # 3
print(coin_change([1, 5, 11], 15))     # 3 (5+5+5)
</code></pre>

<h2>Amazon Leadership Principles — Interview Tips</h2>
<p>Amazon is unique in how much weight they give to LP rounds. Every behavioral question maps to one or more of their 16 LPs. Prepare 3-4 STAR stories that cover:</p>
<ul>
  <li><strong>Customer Obsession</strong> — "Tell me about a time you went above and beyond for a user/customer"</li>
  <li><strong>Bias for Action</strong> — "Tell me about a time you made a decision with incomplete information"</li>
  <li><strong>Dive Deep</strong> — "Tell me about a time you found the root cause of a problem others had missed"</li>
  <li><strong>Deliver Results</strong> — "Tell me about your most significant achievement" (use metrics!)</li>
</ul>

<h2>My 8-Week Study Plan</h2>
<pre><code>Week 1: Arrays + Strings (30 problems)
Week 2: Two Pointers + Sliding Window (20 problems)
Week 3: Linked Lists + Stacks/Queues (25 problems)
Week 4: Trees + Graphs BFS/DFS (30 problems)
Week 5: Dynamic Programming Part 1 — 1D (20 problems)
Week 6: Dynamic Programming Part 2 — 2D (15 problems)
Week 7: Mock interviews (2 per day) + LP story writing
Week 8: Revision + Amazon-specific problem list (Leetcode "Amazon" tag)
</code></pre>

<h2>Resources I Actually Used</h2>
<ul>
  <li>Neetcode.io — best structured roadmap, free videos</li>
  <li>LeetCode Premium — Amazon question bank worth it for 2 weeks before interview</li>
  <li>"Cracking the Coding Interview" — Chapter 1-5 for fundamentals</li>
  <li>Amazon SDE interview experiences on Glassdoor (read 20+)</li>
</ul>
`,
  },

  // ── ORIGINAL POSTS (kept, with featured flag) ──────────────────────────────
  {
    slug: "getting-started-with-machine-learning",
    title: "Getting Started With Machine Learning in 2026",
    excerpt:
      "A practical roadmap for absolute beginners — math, Python, frameworks, and the projects that actually build skill.",
    category: "Machine Learning",
    tags: ["ML", "Beginner", "Roadmap"],
    readTime: "8 min",
    date: "2026-05-10",
    featured: false,
    content: `
<h2>Why machine learning still matters</h2>
<p>Machine learning is no longer optional for technical roles. In 2026, almost every product team touches an ML-powered feature.</p>

<h2>The foundations you actually need</h2>
<p>You don't need a PhD. You need: linear algebra intuition, probability basics, and confident Python.</p>
<pre><code class="language-python">import numpy as np
from sklearn.linear_model import LogisticRegression

model = LogisticRegression().fit(X_train, y_train)
print(model.score(X_test, y_test))
</code></pre>

<h2>Build, don't just watch</h2>
<p>Three projects beat thirty tutorials. Pick a dataset that excites you and ship.</p>

<h2>Where to go next</h2>
<p>Move to deep learning with PyTorch, then start shipping end-to-end systems.</p>
`,
  },
  {
    slug: "aws-ec2-for-beginners",
    title: "AWS EC2 for Beginners: From Zero to First Deploy",
    excerpt:
      "Spin up your first EC2 instance, SSH in, and host a real app — no prior cloud experience required.",
    category: "Machine Learning",
    tags: ["AWS", "EC2", "Cloud"],
    readTime: "10 min",
    date: "2026-04-22",
    featured: false,
    content: `
<h2>What is EC2?</h2>
<p>EC2 is AWS's virtual server product — rent compute by the hour.</p>

<h2>Launching your first instance</h2>
<p>Pick an Ubuntu AMI, choose t2.micro (free tier), create a key pair, launch.</p>
<pre><code class="language-bash">ssh -i key.pem ubuntu@&lt;public-ip&gt;
sudo apt update && sudo apt install nginx -y
</code></pre>

<h2>Security groups matter</h2>
<p>Open only the ports you need. 22 for SSH, 80/443 for web.</p>

<h2>Wrap up</h2>
<p>You now have a real Linux box on the internet. Next: deploy a Flask app.</p>
`,
  },
  {
    slug: "ace-your-ai-engineer-interview",
    title: "How to Ace Your AI Engineer Interview",
    excerpt:
      "What recruiters actually look for, the questions you'll get, and how to talk about projects with impact.",
    category: "Career",
    tags: ["Interview", "Career", "AI"],
    readTime: "7 min",
    date: "2026-03-15",
    featured: false,
    content: `
<h2>The interview loop</h2>
<p>Expect a screen, a technical deep-dive, a system design round, and a behavioral.</p>

<h2>Talk about projects with the STAR method</h2>
<p>Situation, Task, Action, Result. Always quantify the result.</p>

<h2>Common technical questions</h2>
<ul>
  <li>Explain bias vs variance</li>
  <li>How would you deploy a model to production?</li>
  <li>Walk me through a Transformer</li>
</ul>

<h2>Mindset</h2>
<p>Be curious, be honest about what you don't know, and show how you learn fast.</p>
`,
  },
];
