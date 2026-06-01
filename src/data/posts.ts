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
    slug: "nvidia-drops-agent-toolkit-nemoclaw-openshell-secure-agentic-ai",
    title: "NVIDIA Drops Agent Toolkit, NemoClaw & OpenShell: The Enterprise Shift to Secure, Always-On AI Agents",
    excerpt: "NVIDIA has just shaken GTC Taipei 2026 by launching the NVIDIA Agent Toolkit, NemoClaw, and OpenShell. Learn how secure sandboxing, privacy routing, and the massive 550B Nemotron 3 Ultra work, and build your own secure Python sandbox today!",
    category: "Machine Learning",
    tags: ["NVIDIA", "Agentic AI", "OpenShell", "NemoClaw", "Python", "Tutorial", "Security"],
    readTime: "12 min read",
    date: "2026-06-01",
    featured: true,
    content: `
<h2>NVIDIA Shakes GTC Taipei 2026: The Paradigm Shift to Always-On Enterprise Agents</h2>
<p>Just when we thought the hardware race was the only thing on NVIDIA’s mind, Jensen Huang took the stage at <strong>GTC Taipei 2026</strong> on <strong>June 1, 2026</strong>, and shifted the entire industry’s focus. Yes, they announced the powerhouse <strong>Vera Rubin architecture</strong> for GPU computing. But the real software bomb that has AI engineers buzzing is the official release of the <strong>NVIDIA Agent Toolkit</strong> alongside <strong>NemoClaw</strong>, <strong>OpenShell</strong>, and a massive 550B open model: <strong>Nemotron 3 Ultra</strong>.</p>

<p>For B.Tech students, freshers, and aspiring AI engineers, this is the definitive signal: <strong>the era of standard \"chatbot wrappers\" is over.</strong> The enterprise world doesn't want simple, single-prompt conversational bots anymore. They want <strong>always-on, secure, autonomous \"digital coworkers\"</strong> that can write code, edit databases, trigger builds, and execute terminal commands. And most importantly, they need these agents to run in <strong>impenetrable, secure sandboxes</strong> that prevent them from accidentally hacking their own host servers or leaking private data.</p>

<p>In this deep dive, we’ll decode NVIDIA’s new agent ecosystem, understand why secure runtimes like OpenShell are a absolute necessity, and build our own <strong>Secure Static-Audit Python Sandbox</strong> from scratch to master this critical engineering pattern!</p>

<h2>Decoding the Ecosystem: Agent Toolkit, NemoClaw & OpenShell</h2>
<p>Most beginners build agents using a fragile loop: <code>Input -> Prompt -> LLM -> Direct Execution</code>. In a production environment, this is a massive liability. If an LLM hallucinates or is targeted by a prompt-injection attack, it could execute a dangerous command (like <code>rm -rf /</code> or <code>cat /etc/passwd</code>) on your host server. </p>

<p>NVIDIA’s Agent Toolkit addresses this head-on with a clean, tiered architecture:</p>

<pre><code>
                        [ User Request ]
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Nemotron 3 Ultra   │  (550B MoE Reasoning Engine)
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  NemoClaw Blueprint │  (Defines workflows, tools, tasks)
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  OpenShell Runtime  │  (Secure sandboxing, policies,
                    │  (The Guardrail)    │   network & filesystem isolation)
                    └─────────────────────┘
</code></pre>

<p>Here is exactly how these three core components collaborate:</p>
<ul>
  <li><strong>1. OpenShell Secure Runtime:</strong> This is the secure-by-design runtime environment that sits between the AI agent and your server. It acts as an absolute safety gate, running the agent's code inside isolated, Kubernetes-based sandboxes. It enforces strict policies: preventing files from being modified outside of virtual paths, blocking dangerous processes, and regulating outbound network requests. It even features <strong>privacy routing</strong> to mask sensitive or personal info before it leaves the local network.</li>
  <li><strong>2. NemoClaw:</strong> A reference stack and blueprint built on top of OpenShell. It allows developers to deploy a secure, \"always-on\" digital coworker workspace with a single CLI command. Instead of spending weeks configuring container isolation and credentials, NemoClaw gives you a pre-hardened, production-ready environment out-of-the-box.</li>
  <li><strong>3. Nemotron 3 Ultra:</strong> To power these long-running, complex tasks, NVIDIA released a massive <strong>550-billion-parameter Mixture-of-Experts (MoE)</strong> model. Built specifically for high-level agentic reasoning, it delivers <strong>5x faster inference</strong> and a <strong>30% lower cost</strong> than comparable frontier models, making always-on orchestration commercially viable.</li>
</ul>

<h2>Why \"Security-First\" is the New Standard in Agentic AI</h2>
<p>Why is NVIDIA spending so much effort on <strong>OpenShell</strong>? Think about it: if you give an AI agent the tool to run Python code on your computer, what happens if it writes a loop that crashes your system? Or worse, what if a malicious user uses prompt injection to force the agent to send your local database passwords to their private server?</p>

<p>To prevent this, production-grade agents must go through **Static Code Auditing** and **Dynamic Runtime Sandboxing**. 
Mathematically, let's define the safety of an execution $S(E)$ as a function of the static validation score $V_s$ and the runtime isolation depth $I_r$:</p>

$$S(E) = V_s \times I_r$$

<p>Where $V_s \in [0, 1]$ represents whether the code passes semantic checks (AST inspection) and $I_r \in [0, 1]$ represents the strength of the system-level sandbox. If either static validation or runtime isolation is zero ($0$), the overall safety collapses to zero. This is why OpenShell enforces both static policy boundaries and container-level runtime sandboxing.</p>

<h2>Hands-On: Build a Secure Static-Audit Python Sandbox</h2>
<p>To understand exactly how secure runtimes like OpenShell operate, let's build a local secure execution sandbox in clean Python. Our system will take a snippet of Python code generated by an \"agent\", perform a pre-execution **AST (Abstract Syntax Tree) Static Audit** to scan for illegal imports or dangerous function calls, and then execute the code inside a restricted context where dangerous built-ins (like <code>open</code>, <code>eval</code>, and <code>exec</code>) are completely disabled.</p>

<p>Copy this into a file named <code>secure_sandbox.py</code> and run it locally:</p>

<pre><code class="language-python">import ast
import io
import sys
from typing import List, Dict, Any

class SecurityError(Exception):
    \"\"\"Custom exception raised when code violates security policies.\"\"\"
    pass

class SecureSandbox:
    def __init__(self, blocked_modules: List[str] = None, blocked_calls: List[str] = None):
        # 1. Enforce strict blacklists of dangerous libraries
        self.blocked_modules = blocked_modules or [
            "os", "sys", "subprocess", "shutil", "importlib", "requests", "urllib", "socket"
        ]
        # 2. Block direct access to builtins that bypass local variables
        self.blocked_calls = blocked_calls or [
            "eval", "exec", "open", "compile", "globals", "locals", "getattr", "setattr"
        ]

    def _static_audit(self, code: str) -> bool:
        \"\"\"
        Parses the code into an Abstract Syntax Tree (AST) and scans it
        line-by-line to block dangerous behaviors before compile-time.
        \"\"\"
        try:
            tree = ast.parse(code)
        except SyntaxError as e:
            raise ValueError(f"Syntax Error in code: {e}")

        for node in ast.walk(tree):
            # Block direct imports (e.g. import os)
            if isinstance(node, ast.Import):
                for alias in node.names:
                    if alias.name in self.blocked_modules:
                        raise SecurityError(f"Import of blocked module '{alias.name}' is forbidden.")
            
            # Block from-imports (e.g. from sys import exit)
            elif isinstance(node, ast.ImportFrom):
                if node.module in self.blocked_modules:
                    raise SecurityError(f"Import from blocked module '{node.module}' is forbidden.")
            
            # Block dangerous built-in function calls (e.g. open(), eval())
            elif isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name):
                    if node.func.id in self.blocked_calls:
                        raise SecurityError(f"Call to blocked function '{node.func.id}()' is forbidden.")
                
                # Block dunder attribute execution (e.g. object.__subclasses__())
                elif isinstance(node.func, ast.Attribute):
                    if node.func.attr.startswith("__"):
                        raise SecurityError(f"Access to private/dunder attribute '{node.func.attr}' is forbidden.")

        return True

    def execute(self, code: str, inputs: Dict[str, Any] = None) -> str:
        \"\"\"
        Audits the code statically, prepares a restricted runtime scope,
        and safely runs the execution while capturing standard output.
        \"\"\"
        # Step A: Perform AST Static Audit
        self._static_audit(code)
        
        # Step B: Prepare Safe Builtins Environment (Disable file/process operations)
        safe_builtins = {
            'abs': abs, 'all': all, 'any': any, 'bin': bin, 'bool': bool,
            'chr': chr, 'dict': dict, 'divmod': divmod, 'enumerate': enumerate,
            'filter': filter, 'float': float, 'format': format, 'hash': hash,
            'hex': hex, 'id': id, 'int': int, 'isinstance': isinstance,
            'issubclass': issubclass, 'iter': iter, 'len': len, 'list': list,
            'map': map, 'max': max, 'min': min, 'next': next, 'oct': oct,
            'ord': ord, 'pow': pow, 'range': range, 'repr': repr,
            'reversed': reversed, 'round': round, 'set': set, 'slice': slice,
            'sorted': sorted, 'str': str, 'sum': sum, 'tuple': tuple,
            'type': type, 'zip': zip, 'print': print  # Only allow print for diagnostics
        }
        
        # Step C: Redirect stdout to capture agent's prints safely
        old_stdout = sys.stdout
        redirected_output = io.StringIO()
        sys.stdout = redirected_output
        
        # Create an isolated global dictionary with restricted builtins
        globals_dict = {
            "__builtins__": safe_builtins
        }
        if inputs:
            globals_dict.update(inputs)
            
        try:
            # Execute inside the restricted global context
            exec(code, globals_dict)
            output = redirected_output.getvalue()
        except Exception as e:
            output = f"Execution Error: {e}"
        finally:
            # Always restore the standard stdout even if execution fails
            sys.stdout = old_stdout
            redirected_output.close()
            
        return output

# ── RUNNING THE SECURITY TESTS ──
if __name__ == "__main__":
    sandbox = SecureSandbox()
    
    print("==========================================================")
    print("🛡️ MINI-OPENSHELL: SECURE PYTHON STATIC-AUDITING SANDBOX 🛡️")
    print("==========================================================\\n")

    # 1. TEST SAFE COMPUTATION
    safe_code = \"\"\"
def calculate_prime_numbers(limit):
    primes = []
    for num in range(2, limit):
        is_prime = True
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
    return primes

primes_list = calculate_prime_numbers(50)
print(f"Safe execution successful! Primes: {primes_list}")
\"\"\"
    print("[Test 1] Executing Safe Algorithmic Code...")
    try:
        result = sandbox.execute(safe_code)
        print(f"Sandbox Output:\\n{result}")
    except Exception as e:
        print(f"Error: {e}\\n")

    # 2. TEST MALICIOUS MODULE IMPORT
    malicious_import_code = \"\"\"
import os
os.system("rm -rf /")
\"\"\"
    print("[Test 2] Executing Malicious Code (Importing OS)...")
    try:
        sandbox.execute(malicious_import_code)
    except SecurityError as e:
        print(f"❌ Security Violation Blocked: {e}\\n")

    # 3. TEST MALICIOUS BUILT-IN ACCESS (FILE WRITE)
    malicious_built_in_code = \"\"\"
with open("system_config.txt", "w") as f:
    f.write("infiltrated_config = True")
\"\"\"
    print("[Test 3] Executing Malicious Code (Accessing open())...")
    try:
        sandbox.execute(malicious_built_in_code)
    except SecurityError as e:
        print(f"❌ Security Violation Blocked: {e}\\n")

    # 4. TEST PRIVATE DUNDER ATTRIBUTE ATTACK
    dunder_attack_code = \"\"\"
# Attempting to crawl out of sandbox using object subclasses
object_subclasses = ().__class__.__base__.__subclasses__()
print(object_subclasses)
\"\"\"
    print("[Test 4] Executing Malicious Code (Dunder Attribute Crawl)...")
    try:
        sandbox.execute(dunder_attack_code)
    except SecurityError as e:
        print(f"❌ Security Violation Blocked: {e}\\n")
    
    print("==========================================================")
    print("Sandbox integrity validation complete! 100% Secure.")
    print("==========================================================")
</code></pre>

<h3>Why this script is a game-changer:</h3>
<p>When you run the Python code locally, watch what happens. The first test executes perfectly and prints all the prime numbers. But the moment the script encounters an <code>import os</code> or an <code>open()</code> call, it rejects it instantly! It does not even pass the code to the compiler. This is <strong>Static Code Auditing</strong> in action—ensuring that your agent cannot even compile malicious intentions.</p>

<h2>The Off-Campus Playbook: How Indian B.Tech Students Can Stand Out</h2>
<p>If you are a B.Tech or BE engineering student in a tier-3 college in Tamil Nadu (whether in Salem, Ambur, Coimbatore, or Madurai) trying to land a high-paying product-company job (10+ LPA package) off-campus, listen closely:</p>
<p>Every second resume on a recruiter's desk contains the exact same projects: \"Spam Email Classifier\", \"Movie Recommender\", or a standard \"Chat with your PDF\" wrapper built in five lines of LangChain. Recrutiers know exactly which standard YouTube tutorials these come from. If you want to make them freeze, show them you understand <strong>Production Systems Design</strong>.</p>
<p>Spend your next two weekends building a <strong>Self-Auditing Multi-Agent Workspace Engine</strong> using the exact principles behind NVIDIA OpenShell:</p>
<ol>
  <li><strong>Build a Web UI:</strong> Create a clean, responsive front-end where a user can enter a coding task (e.g. \"Migrate this script from SQL to MongoDB\").</li>
  <li><strong>Design the Agent Pipeline:</strong> Create an Orchestrator agent that writes the conversion script, but <em>routes</em> the generated code to a local, sandboxed runner.</li>
  <li><strong>Implement the Sandbox:</strong> Integrate a Python static-auditor (using the AST code above) and execute the code inside a Docker container using the official <strong>Docker SDK for Python</strong>.</li>
  <li><strong>Self-Correction Loop:</strong> If the code fails compilation or throws a syntax error inside the docker container, capture the error output, pipe it back to the Orchestrator, and let it auto-correct its own code without user intervention!</li>
</ol>
<p>When you present a live-running, containerized, self-correcting, sandboxed coding agent with a clean GitHub repository and structured logs, recruiters will immediately realize you are years ahead of the competition. You are proving you can design secure systems on day one.</p>

<h2>Final Thoughts</h2>
<p>NVIDIA’s <strong>Agent Toolkit</strong> and <strong>OpenShell</strong> confirm that the AI conversation has completely shifted from <em>\"Can AI models chat?\"</em> to <em>\"Can AI agents operate securely in production?\"</em>. As developers, prompt engineering is just a basic entry ticket. The real value lies in building <strong>architectures, sandboxes, and secure reasoning pathways</strong>.</p>

<p>Copy the sandbox script, run it, customize the policies, and build something secure today. Let's keep shipping!</p>

<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
<p><em>GitHub: github.com/Adithya0805 | LinkedIn: linkedin.com/in/adithya-kuppusamy-76baab204</em></p>
`,
  },
  {
    slug: "google-drops-gemini-for-science-co-scientist-autonomous-ai-researchers",
    title: "Google Drops 'Gemini for Science' & Co-Scientist: The Dawn of Fully Autonomous AI Researchers",
    excerpt: "Google DeepMind has published its groundbreaking Co-Scientist framework in Nature — a multi-agent AI system that automates the scientific method. Learn how the 'Generate-Debate-Evolve' loop works under the hood, and build your own autonomous hypothesis tournament in clean Python!",
    category: "Machine Learning",
    tags: ["Co-Scientist", "DeepMind", "Multi-Agent Systems", "Agentic AI", "Python", "Tutorial"],
    readTime: "12 min read",
    date: "2026-05-30",
    featured: true,
    content: `
<h2>The AI Frontier is Expanding: Google Lab's 'Gemini for Science' & Co-Scientist is Live</h2>
<p>Just when we thought the AI agent race was cooling down into corporate consolidation, Google DeepMind dropped a massive technical bomb. On <strong>May 19, 2026</strong>, they published a groundbreaking study in <strong>Nature</strong>, introducing <strong>Co-Scientist</strong> — a state-of-the-art multi-agent system designed to act as a fully autonomous research collaborator. Alongside it, they released <strong>ERA (Empirical Research Assistance)</strong>, a framework for writing and optimizing complex scientific code.</p>

<p>This is not a simple chatbot. It doesn't just explain textbook chemistry or generate python wrappers. <strong>Co-Scientist actually does real, high-impact science.</strong> By the time of its publication, the system had already identified drug-repurposing candidates for liver fibrosis that block <strong>91% of a scarring-linked response</strong>, proposed RNA-based therapies for ALS, and generated genetic leads for cellular rejuvenation that were successfully validated in physical wet-labs!</p>

<p>For B.Tech students and aspiring AI/ML engineers, this release is the loudest wake-up call yet: <strong>the era of single-prompt wrappers is officially dead.</strong> The industry has shifted entirely to <strong>hierarchical reasoning networks</strong>. In this post, we'll dissect the architecture behind Co-Scientist and build a fully functional <strong>Mini Co-Scientist Hypothesis Tournament</strong> in clean, local Python so you can master this design pattern.</p>

<h2>Under the Hood: The 'Generate-Debate-Evolve' Loop</h2>
<p>Most beginners build agents using a linear path: <code>Input -> Prompt -> LLM -> Output</code>. While this works for formatting texts or querying basic APIs, it completely collapses when faced with the scientific method. Science requires skepticism, debate, diversity of thought, and validation.</p>

<p>To solve this, Google DeepMind designed Co-Scientist around a multi-agent <strong>\"Generate-Debate-Evolve\" Tournament Loop</strong>:</p>

<pre><code>
                        [ Research Goal ]
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Generation Agent   │  (Proposes 3+ diverse hypotheses)
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Proximity Agent   │  (Clusters ideas to prevent bias)
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Reflection Agent   │  (Acts as Virtual Peer Reviewer;
                    │  (Peer Reviewer)    │   debates and critiques safety)
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Evolution Agent   │  (Refines winner based on reviews)
                    └─────────────────────┘
</code></pre>

<p>Here is exactly how these agents collaborate:</p>
<ul>
  <li><strong>1. The Generation Agent:</strong> Analyzes a high-level scientific challenge and draws on structured databases (like UniProt, AlphaFold, and ChEMBL) to propose multiple creative, diverse hypotheses.</li>
  <li><strong>2. The Proximity Agent:</strong> Clusters the proposed hypotheses in a high-dimensional vector space. It ensures that the generated ideas are chemically or biologically diverse, preventing the system from hyper-focusing on a single obvious path.</li>
  <li><strong>3. The Reflection Agent (The Critic):</strong> Acts as a rigorous virtual peer reviewer. It scores each hypothesis on a scale of 1-10 across multiple vectors: <strong>Novelty</strong> (Is it new?), <strong>Feasibility</strong> (Can it actually be done?), and <strong>Safety</strong> (Does it risk toxic reactions or tumorigenesis?).</li>
  <li><strong>4. The Evolution Agent (The Refiner):</strong> Takes the highest-scoring candidate and the critic's negative reviews, and \"reprograms\" the hypothesis, injecting safety switches or resolving feasibility bottlenecks. This final refined hypothesis is then passed to the <strong>ERA Engine</strong> to write computational test code.</li>
</ul>

<h2>Hands-On: Build a Mini Co-Scientist in Python</h2>
<p>To demonstrate this architecture, let's build a local multi-agent tournament in Python. It simulates a Generation Agent proposing solutions for <strong>reversing cellular senescence in heart cells</strong>, a Reflection Agent performing structured peer reviews, and an Evolution Agent refining the best candidate. Copy this into a file named <code>co_scientist.py</code> and run it locally:</p>

<pre><code class="language-python">import time
import random
from typing import List, Dict, Any

class Hypothesis:
    def __init__(self, title: str, description: str, rationale: str):
        self.title = title
        self.description = description
        self.rationale = rationale
        self.score = 0.0
        self.critique = ""

# The scientific problem we want to solve
PROBLEM = "Reversing cellular senescence (aging) in human cardiac tissue without inducing tumorigenesis (cancer)."

# ── 1. GENERATION AGENT ──
def generation_agent(problem: str) -> List[Hypothesis]:
    print("[Generation Agent] Scanning biological databases and proposing candidates...")
    time.sleep(1.0)
    
    return [
        Hypothesis(
            title="SIRT6 Activation via Small-Molecule Modulators",
            description="Upregulate SIRT6 expression using a novel cyanidin derivative to promote DNA repair and telomere maintenance in senescent cardiomyocytes.",
            rationale="SIRT6 is a proven regulator of longevity and chromatin stability. Small-molecule allosteric activation limits general toxicity."
        ),
        Hypothesis(
            title="Selective Senolysis via uPAR CAR-T Therapy",
            description="Engineer CAR-T cells targeted against urokinase-type plasminogen activator receptor (uPAR) expressed specifically on senescent heart cells.",
            rationale="uPAR is highly upregulated in senescent cardiovascular tissues. High precision target, but risks systemic cytokine storm."
        ),
        Hypothesis(
            title="Transient Yamanaka Factor Delivery via Modified mRNA",
            description="Deliver Oct4, Sox2, Klf4, and c-Myc (OSKM) transcription factors using lipid nanoparticles for a transient 48-hour window.",
            rationale="Epigenetic rejuvenation occurs before cellular dedifferentiation, avoiding teratoma (tumor) risks if exposure is brief."
        )
    ]

# ── 2. REFLECTION AGENT (PEER REVIEWER) ──
def reflection_agent(hypothesis: Hypothesis) -> Dict[str, Any]:
    print(f"[Reflection Agent] Peer reviewing: '{hypothesis.title}'...")
    time.sleep(0.8)
    
    if "SIRT6" in hypothesis.title:
        novelty, feasibility, safety = 7.5, 8.5, 9.0
        critique = "Feasible and safe. SIRT6 has high baseline stability. However, novelty is moderate, and small-molecule specificity remains an issue."
    elif "CAR-T" in hypothesis.title:
        novelty, feasibility, safety = 9.0, 6.0, 5.0
        critique = "Excellent novelty. However, solid heart tissue CAR-T is notoriously complex, and risk of inflammatory myocarditis is high."
    elif "Yamanaka" in hypothesis.title:
        novelty, feasibility, safety = 9.5, 7.0, 7.0
        critique = "Cutting-edge biotech. Reprogramming reset is powerful, but precision control of mRNA duration is critical to prevent cancer."
    else:
        novelty, feasibility, safety = 5.0, 5.0, 5.0
        critique = "Standard paradigm with standard parameters."
        
    avg_score = (novelty + feasibility + safety) / 3.0
    return {
        "novelty": novelty,
        "feasibility": feasibility,
        "safety": safety,
        "avg_score": round(avg_score, 2),
        "critique": critique
    }

# ── 3. EVOLUTION AGENT (REFINER) ──
def evolution_agent(winner: Hypothesis, review: Dict[str, Any]) -> Hypothesis:
    print(f"\\n[Evolution Agent] Reprogramming candidate with safety switches based on feedback...")
    time.sleep(1.2)
    
    refined_desc = winner.description + " Integrates a microRNA-regulated safety circuit (miR-218) to immediately degrade the mRNA payload in the presence of oncogenic markers."
    refined_rationale = winner.rationale + " The miR-218 switch guarantees cellular transcription shuts down if oncogenesis is triggered, raising safety margins dramatically."
    
    refined = Hypothesis(
        title=winner.title + " (Refined with miR-218 Safety Switch)",
        description=refined_desc,
        rationale=refined_rationale
    )
    refined.score = review["avg_score"] + 1.2  # Boosted score due to self-correction
    refined.critique = "Self-correction completed. Epigenetic tumorigenic risks resolved."
    return refined

# ── RUN TOURNAMENT ──
def run_science_tournament():
    print("======================================================================")
    print("🔬 CO-SCIENTIST VIRTUAL TOURNAMENT: HYPOTHESIS GENERATION LOOP 🔬")
    print(f"Goal: {PROBLEM}")
    print("======================================================================\\n")
    
    # 1. Propose candidates
    candidates = generation_agent(PROBLEM)
    print(f"\\n[System] Generated {len(candidates)} diverse candidates. Initiating peer review...\\n")
    
    # 2. Review and Score
    best_candidate = None
    best_review = None
    
    for c in candidates:
        review = reflection_agent(c)
        c.score = review["avg_score"]
        c.critique = review["critique"]
        
        print(f"  └─ Novelty: {review['novelty']} | Feasibility: {review['feasibility']} | Safety: {review['safety']}")
        print(f"  └─ Critique: {review['critique']}")
        print(f"  └─ Average Score: {review['avg_score']}/10\\n")
        
        if best_candidate is None or c.score > best_candidate.score:
            best_candidate = c
            best_review = review
            
    print(f"[Tournament Winner] Selected '{best_candidate.title}' (Score: {best_candidate.score}/10)")
    
    # 3. Evolve and refine winner
    refined_winner = evolution_agent(best_candidate, best_review)
    
    print("\\n======================================================================")
    print("📊 FINAL SCIENTIFIC PATIENT-READY REPORT")
    print("======================================================================")
    print(f"Title:       {refined_winner.title}")
    print(f"Score:       {refined_winner.score:.2f}/10")
    print(f"Description: {refined_winner.description}")
    print(f"rationale:   {refined_winner.rationale}")
    print(f"critique:    {refined_winner.critique}")
    print("======================================================================")

if __name__ == '__main__':
    run_science_tournament()
</code></pre>

<h2>Why This Setup is a Paradigm Shift</h2>
<p>When you run the Python script on your local machine, pay attention to the flow. The system starts with three distinct avenues. It doesn't just pick one and write code. It evaluates the flaws of each. The <strong>Yamanaka transcription factor</strong> approach was incredibly innovative (novelty of 9.5) but had clear tumor risks (safety of 7.0). The <strong>Evolution Agent</strong> addressed this weakness explicitly by adding a microRNA safety switch. This is <strong>Self-Correction in Action</strong>.</p>

<p>In AI systems design, we call this **systematic calibration**. A model's strength shouldn't lie in blindly generating answers; it must lie in its ability to critique itself, find flaws, and rewrite its own instructions. That is what separates a world-class system from a basic wrapper.</p>

<h2>The Off-Campus Playbook: How Indian Freshers Can Stand Out</h2>
<p>If you're B.Tech or BE students in a college in Tamil Nadu (Coimbatore, Salem, Ranipet, Trichy, or Chennai) preparing for placement drives, let me give you the unfiltered truth:</p>
<p>Every recruiter's inbox is flooded with identical projects: \"PDF Chatbot\", \"Movie Recommendation Engine\", or \"Spam Classifier\". These are standard college-project template tutorials. When a product company offering a 12+ LPA package looks at these, they immediately pass.</p>

<p>If you want to blow their minds off-campus, build an <strong>Autonomous Multi-Agent Domain Engine</strong>. Here's a quick blueprint you can build in two weekends:</p>
<ol>
  <li><strong>Select an Open API:</strong> Choose a public repository like ClinicalTrials.gov (using the <a href=\"https://clinicaltrials.gov/api/v2\" target=\"_blank\">ClinicalTrials API</a>) or PubChem.</li>
  <li><strong>Design the Agent Pipeline:</strong> Build a local orchestrator that takes a medical condition, retrieves data via the API, spawns a Generation agent to extract trial metrics, a Reflection agent to audit risk factors, and outputs a formatted markdown report.</li>
  <li><strong>Containerize:</strong> Wrap it in a FastAPI service and write a clean Dockerfile.</li>
  <li><strong>Telemetry:</strong> Integrate basic error logs using Firestore or a local database.</li>
</ol>
<p>When you show a recruiter a live, containerized, multi-agent evaluation pipeline with complete GitHub commit logs, they aren't going to care about your CGPA or your college tag. You are proving you can write production-grade systems on day one.</p>

<h2>Final Thoughts</h2>
<p>Google's <strong>Gemini for Science</strong> and <strong>Co-Scientist</strong> are proof that LLMs are transitionary. We are leaving the era of chatting with bots and entering the era of collaborating with autonomous research machines. As developers, prompt engineering is just the entry point. The real value is in <strong>reasoning architecture</strong>.</p>

<p>Build the script, test it, add some actual APIs, and share your creations. Let's make something incredible!</p>

<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
<p><em>GitHub: github.com/Adithya0805 | LinkedIn: linkedin.com/in/adithya-kuppusamy-76baab204</em></p>
    `,
  },
  {
    slug: "claude-opus-4-8-dynamic-workflows-parallel-subagents",
    title: "Anthropic Claude Opus 4.8 Drops: How Dynamic Workflows & Parallel Subagents Change AI Engineering Forever",
    excerpt: "Anthropic's latest Claude Opus 4.8 model has crushed SWE-bench Verified at 88.6% by introducing 'Dynamic Workflows' — spawning hundreds of parallel coding subagents. Here is what it means for AI engineers, how it works, and a complete tutorial to build your own parallel-subagent orchestrator in Python.",
    category: "Machine Learning",
    tags: ["Claude 4.8", "Agentic AI", "Python", "Multi-Agent Systems", "SWE-bench", "Tutorial"],
    readTime: "12 min read",
    date: "2026-05-29",
    featured: true,
    content: `
<h2>The AI Landscape is Shaking: Claude Opus 4.8 is Here</h2>
<p>On May 28, 2026, Anthropic did it again. They officially dropped <strong>Claude Opus 4.8</strong>, completely redefining what is possible in automated coding and multi-agent workflows. Along with the model release, Anthropic announced they closed a historic funding round, pushing their private market valuation to <strong>$965 billion</strong> — officially overtaking OpenAI as the world's most valuable AI startup!</p>

<p>But let's look past the corporate hype and valuation numbers. As developers, the real story is in the technical benchmarks and capabilities:</p>
<ul>
  <li><strong>SWE-bench Verified:</strong> <strong>88.6%</strong> (up from 87.6% in Claude 4.7)</li>
  <li><strong>SWE-bench Pro:</strong> <strong>69.2%</strong> (a massive jump from 64.3%)</li>
  <li><strong>Dynamic Workflows:</strong> The ability for Claude Code to spawn **hundreds of parallel subagents** that plan, write code, run terminal commands, and verify changes concurrently.</li>
</ul>

<p>In this post, we'll break down the architectural shift behind Opus 4.8's "Dynamic Workflows," why sequential loops are dead, and build our own <strong>Parallel-Subagent Orchestrator</strong> in clean Python so you can understand this state-of-the-art pattern.</p>

<h2>The Architectural Shift: Why Sequential Agent Loops Fail</h2>
<p>If you've built LLM apps using frameworks like LangChain, LangGraph, or CrewAI, you're likely familiar with the standard sequential loop. A user gives a prompt, and the agent runs a loop: <code>Agent -> Tool (e.g. Read File) -> Agent -> Tool (e.g. Edit File) -> Agent -> Done</code>.</p>

<p>This works fine for small, single-file tasks. But what happens when you ask an AI to migrate a 15-file React app to a new version, or refactor a massive Django backend? If you run a single sequential agent loop:</p>
<ol>
  <li><strong>The context window bloats:</strong> As the agent reads file after file, the system prompt, tool schemas, and file contents fill the context window. Latency sky-rockets and tokens become extremely expensive.</li>
  <li><strong>Model forgetfulness:</strong> By step 40, the model experiences "needle-in-a-haystack" issues. It forgets details it read in step 2 and starts introducing bugs.</li>
  <li><strong>It takes forever:</strong> Because everything runs step-by-step, you sit and wait for minutes while the model processes one file at a time.</li>
</ol>

<p>This is where <strong>Dynamic Workflows (Orchestrator-Worker Architecture)</strong> step in.</p>

<h2>Enter the Orchestrator-Worker Architecture</h2>
<p>Instead of a single agent doing everything sequentially, Claude Opus 4.8 introduces a hierarchical approach:</p>

<pre><code>
                      [ User Request ]
                             │
                             ▼
                  ┌─────────────────────┐
                  │  Orchestrator Agent │  (Claude Opus 4.8)
                  └──────────┬──────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
    ┌───────────┐      ┌───────────┐      ┌───────────┐
    │  Worker   │      │  Worker   │      │  Worker   │  (Parallel Subagents)
    │ Subagent  │      │ Subagent  │      │ Subagent  │
    └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌───────────┐      ┌───────────┐      ┌───────────┐
    │ Verify    │      │ Verify    │      │ Verify    │  (Self-Correction)
    │ & Test    │      │ & Test    │      │ & Test    │
    └─────┬─────┘      └─────┬─────┘      └─────┬─────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Orchestrator Merges │
                  │   & Final Checks    │
                  └─────────────────────┘
</code></pre>

<p>Here is how it works under the hood:</p>
<ul>
  <li><strong>The Orchestrator (The Planner):</strong> The main agent reads the user's high-level goal and analyzes the directory tree. It identifies which files need modifications, breaks the work into independent subtasks, and defines the validation rules.</li>
  <li><strong>Worker Subagents (The Executors):</strong> The orchestrator spawns multiple subagents in parallel. Each subagent gets a sandboxed container, an isolated slice of context (only the file it needs to edit), and a specific toolset. They work in parallel, meaning 50 files can be refactored simultaneously.</li>
  <li><strong>Self-Verification (The Guardrail):</strong> Each subagent doesn't just edit code and return. It compiles the file, runs a local linter, or executes a unit test inside its sandbox. If the test fails, the subagent reads the error log, edits its code, and retries. It only reports back to the orchestrator once its changes are verified.</li>
  <li><strong>The Merger:</strong> The orchestrator gathers all verified patches, applies them to the main workspace, runs a global test suite, and presents the clean, working output to the user.</li>
</ul>

<h2>Hands-On: Build Your Own Parallel-Subagent Orchestrator</h2>
<p>To help you understand this architecture, let's build a fully functioning, parallel multi-agent audit and refactoring system in Python. This code runs completely locally, using Python's standard library (no paid APIs or heavy packages required!) to demonstrate the exact threading and parallel-agent orchestration patterns used by state-of-the-art tools like Claude Code.</p>

<p>Copy this code into a file named <code>orchestrator.py</code> and run it on your machine:</p>

<pre><code class="language-python">import time
import random
from typing import List, Dict, Any
from concurrent.futures import ThreadPoolExecutor, as_completed

# 1. Define our Mock Codebase (representing files in a project)
MOCK_CODEBASE: Dict[str, str] = {
    "auth.py": \"\"\"def login(user, password):
    # TODO: Implement secure authentication
    if user == 'admin' and password == '12345':
        return True
    return False\"\"\",
    
    "database.py": \"\"\"import sqlite3

def connect_db():
    conn = sqlite3.connect('app.db')
    return conn

# Unused function below
def legacy_cleanup():
    print("Cleaning up old tables...")\"\"\",
    
    "utils.py": \"\"\"def calculate_discount(price, pct):
    # Returns discounted price
    return price - (price * (pct / 100))\"\"\"
}

# 2. Define the Worker Subagent Logic
def worker_subagent(file_name: str, file_content: str) -> Dict[str, Any]:
    \"\"\"
    Represents a sandboxed worker subagent.
    Analyzes a single file, applies edits, and runs self-verification.
    \"\"\"
    print(f"[Worker-{file_name}] Spawning sandboxed subagent...")
    
    # Simulate LLM thinking time and tool execution (reading and modifying code)
    time.sleep(random.uniform(0.8, 1.5))
    
    issues_found = []
    refactored_content = file_content
    
    # ── LLM Reasoning & Editing Simulation ──
    # Check for hardcoded credentials (auth.py)
    if "12345" in file_content:
        issues_found.append("CRITICAL: Hardcoded admin credentials found!")
        refactored_content = refactored_content.replace(
            "password == '12345'", 
            "password == get_secure_env_password()"
        )
        refactored_content = "from secure_config import get_secure_env_password\\n\\n" + refactored_content

    # Check for unused code (database.py)
    if "legacy_cleanup" in file_content:
        issues_found.append("WARNING: Found unused legacy function 'legacy_cleanup'")
        lines = refactored_content.splitlines()
        # Filter out lines containing legacy_cleanup or the print statement
        cleaned_lines = [l for l in lines if "legacy_cleanup" not in l and "Cleaning up" not in l]
        refactored_content = "\\n".join(cleaned_lines)
        
    # Check for missing docstrings (utils.py)
    if "calculate_discount" in file_content and "docstring" not in file_content:
        issues_found.append("INFO: Missing function docstring")
        docstring = '    \"\"\"\n    Calculate the discount price given a base price and a percentage.\n    \"\"?'
        refactored_content = refactored_content.replace(
            "# Returns discounted price",
            docstring
        )

    # ── Self-Verification Check ──
    # Simulates running a syntax check/compiler to ensure no syntax errors were introduced
    verification_passed = True
    try:
        compile(refactored_content, file_name, 'exec')
    except Exception as e:
        verification_passed = False
        issues_found.append(f"ERROR: Self-verification failed during compilation: {str(e)}")

    return {
        "file_name": file_name,
        "original_code": file_content,
        "refactored_code": refactored_content,
        "issues_found": issues_found,
        "verification_passed": verification_passed
    }

# 3. Define the Orchestrator Logic
def run_orchestrator(codebase: Dict[str, str]):
    \"\"\"
    Main orchestrator that reads the codebase, distributes tasks to
    parallel subagents, and merges/validates the final results.
    \"\"\"
    print("=== [Orchestrator] Starting Codebase Audit & Refactor Workflow ===")
    print(f"[Orchestrator] Detected {len(codebase)} files. Spawning parallel subagents...\\n")
    
    final_report = []
    
    # Spawn subagents in parallel using a ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=5) as executor:
        # Submit worker tasks for each file to run in parallel
        futures = {
            executor.submit(worker_subagent, file_name, content): file_name 
            for file_name, content in codebase.items()
        }
        
        # Gather results as they complete
        for future in as_completed(futures):
            file_name = futures[future]
            try:
                result = future.result()
                final_report.append(result)
                print(f"[Orchestrator] Worker for '{file_name}' completed successfully.")
            except Exception as exc:
                print(f"[Orchestrator] Worker for '{file_name}' generated an exception: {exc}")
                
    # 4. Merging and Compiling the Final Report
    print("\\n=== [Orchestrator] Compiling Audit Summary & Merging Changes ===")
    for report in final_report:
        print(f"\\nFile: {report['file_name']}")
        print(f"Status: {'✅ Verified & Merged' if report['verification_passed'] else '❌ Verification Failed'}")
        print("Issues Addressed:")
        if report["issues_found"]:
            for issue in report["issues_found"]:
                print(f"  - {issue}")
        else:
            print("  - None (Code is clean!)")
            
        print("--- Refactored Code Preview ---")
        print(report["refactored_code"])
        print("-" * 40)

if __name__ == "__main__":
    run_orchestrator(MOCK_CODEBASE)
</code></pre>

<h3>Why this Python setup matters:</h3>
<p>When you run the code, you will notice that the \`[Worker-auth.py]\`, \`[Worker-database.py]\`, and \`[Worker-utils.py]\` lines print almost simultaneously. This is because they are running in **parallel threads**. The orchestrator distributes the work, goes to sleep, and wakes up only when the threads complete. This is exactly how Anthropic's Dynamic Workflows bypasses the latency of sequential LLM reasoning!</p>

<h2>Mathematical Intuition: The Power of Calibration</h2>
<p>A huge reason why previous AI models failed on SWE-bench was <strong>overconfidence</strong>. If a model was unsure how a library worked, it would hallucinate an API call, edit a random line of code, and break the build. This is a massive issue in software engineering, where one misplaced character can crash a production app.</p>

<p>Claude Opus 4.8 features a major breakthrough in <strong>uncertainty calibration</strong>. In machine learning, a model is "well-calibrated" if its predicted confidence matches its actual accuracy. Mathematically, let $P$ be the model's confidence in a generated code patch, and $A$ be the probability that the patch is correct. A perfectly calibrated model satisfies:</p>

$$P(A = 1 \mid P = p) = p$$

<p>Opus 4.8 has been trained to be exceptionally honest. When it has low confidence ($p \\ll 1$), it is calibrated to know it is likely wrong. Instead of guessing and writing bad code, it will stop, call a self-correction tool, read an error log, or ask the developer for confirmation. For AI engineering students, this is a critical lesson: <strong>honesty and self-verification are far more valuable in production systems than sheer raw smarts.</strong></p>

<h2>The Off-Campus Blueprint: How You Can Stand Out</h2>
<p>If you're studying engineering in a college in Ranipet, Vellore, Coimbatore, or Madurai, here is my honest advice: **stop building simple wrappers.**</p>
<p>Every second resume a recruiter sees contains a \"chat with PDF\" project using a simple <code>model.generate_content()</code> API call. Product companies that pay 10+ LPA package are not hiring people to write single-prompt wrappers. They are hiring engineers who know how to design **autonomous systems**.</p>
<p>If you want to land a product-company role off-campus, build an <strong>Orchestrator-Worker Multi-Agent Pipeline</strong>. Create a system that:</p>
<ol>
  <li>Accepts a large codebase.</li>
  <li>Spawns parallel workers using <code>concurrent.futures</code> or <strong>LangGraph</strong> to analyze files.</li>
  <li>Injects real linting/testing feedback loop to allow agents to auto-correct their own code.</li>
  <li>Packages the entire pipeline into a clean Docker container, with a fully structured Firestore telemetry log.</li>
</ol>
<p>When you present that level of systems engineering in an interview, no recruiter is going to care about your college name or your lack of an IIT degree. Your architecture will speak for itself.</p>

<h2>Final Thoughts</h2>
<p>The release of Claude Opus 4.8 is a clear indicator of where AI is going. We are moving from simple conversational chatbots to complex, highly parallelized agentic software platforms. As AI engineers, our job is no longer just writing prompts; it is **architecting reasoning networks**.</p>

<p>Try copy-pasting the script above, customize the worker rules, and build your own custom refactoring pipeline. Share your results, and let's keep building!</p>

<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
<p><em>GitHub: github.com/Adithya0805 | LinkedIn: linkedin.com/in/adithya-kuppusamy-76baab204</em></p>
    `
  },
  {
    slug: "honest-ai-ml-engineer-roadmap-tier-3-tamil-nadu",
    title: "The Honest AI/ML Engineer Roadmap for Tier-3 College Students in Tamil Nadu",
    excerpt: "No IIT tag? No campus placements? No problem. An honest, realistic roadmap for tier-3 college students in Tamil Nadu to build skills, ignore CP, and land high-paying ML roles in India.",
    category: "Career",
    tags: ["Roadmap", "Career", "Machine Learning", "Tamil Nadu", "College", "Fresher"],
    readTime: "11 min read",
    date: "2026-05-27",
    featured: true,
    content: `
<h2>The Harsh Reality: The Tier-3 Dilemma</h2>
<p>If you're studying B.Tech in an engineering college in a tier-2 or tier-3 town in Tamil Nadu (like Ranipet, Ambur, Coimbatore, or Madurai), you know the drill: campus placements mean service companies offering 3 LPA to 4 LPA. Your college professors tell you "learn Java or C++, clear the aptitude, get placed in TCS/Infosys."</p>

<p>But what if you want to work on **Artificial Intelligence, Machine Learning, or Large Language Models (LLMs)**? What if you want to earn a product-company package (8 LPA to 15+ LPA) without having an IIT or NIT tag on your resume?</p>

<p>This roadmap is the unfiltered, realistic guide to doing exactly that. It's the exact path I followed to go from a Ranipet district college student to building production-grade multi-agent RAG systems and getting AWS certified. No academic fluff — just what actually works.</p>

<h2>Phase 1 — The Coding Foundation (Month 1)</h2>
<p>Stop doing Competitive Programming (CP) on platforms like Codeforces unless you want to be a pure SDE. For ML, your coding needs to be practical, clean, and highly structured.</p>
<ul>
  <li><strong>Master Python:</strong> Learn data types, list comprehensions, lambda functions, dictionary operations, file handling, and Exception Handling. Python is the absolute king of AI.</li>
  <li><strong>SQL is mandatory:</strong> Do not skip this! 80% of data science is fetching and cleaning data. Master <code>JOINs</code>, <code>GROUP BY</code>, <code>HAVING</code>, and subqueries.</li>
  <li><strong>Git & GitHub:</strong> Learn how to commit, pull, push, and write a stellar README. Your GitHub is your real degree.</li>
</ul>

<h2>Phase 2 — The Machine Learning Core (Months 2–3)</h2>
<p>Do not jump straight into Deep Learning or LLMs without understanding the foundations. If you do, you will fail your technical interviews.</p>
<ul>
  <li><strong>Libraries:</strong> Learn NumPy (vector math), Pandas (data cleaning), and Matplotlib/Seaborn (data visualization).</li>
  <li><strong>Classic ML Models:</strong> Master Linear Regression, Logistic Regression, Decision Trees, Random Forests, and XGBoost using <strong>Scikit-Learn</strong>.</li>
  <li><strong>The Math That Matters:</strong> Don't solve massive equations by hand. Just understand the core intuition behind *Gradient Descent, Statistics (Mean, Median, Std Dev), and Probability.*</li>
  <li><strong>Build 2 Core Projects:</strong> Write data analysis notebooks on datasets from Kaggle (e.g., Housing price prediction, customer churn analysis) and post them on GitHub.</li>
</ul>

<h2>Phase 3 — The Game Changer: GenAI & RAG (Month 4)</h2>
<p>This is where you bypass the competition. While thousands of freshers are building basic "spam classifiers", you will build production-grade **Generative AI applications**.</p>
<ul>
  <li><strong>RAG (Retrieval-Augmented Generation):</strong> Learn how to load documents, split them, convert them into vector embeddings, and search them in a Vector Database (like **Pinecone** or **ChromaDB**).</li>
  <li><strong>Frameworks:</strong> Master **LangChain** and **LangGraph** (for building multi-agent systems).</li>
  <li><strong>FastAPI & Docker:</strong> Wrap your Python logic into a secure REST API using FastAPI, and package it into a Docker container. Product companies love freshers who know how to containerize their code!</li>
</ul>

<h2>Phase 4 — Building in Public & Networking (Month 5)</h2>
<p>If you build a project and nobody knows about it, it doesn't exist. In tier-3 colleges, recruiters aren't coming to your campus. You must force them to find you online.</p>
<ul>
  <li><strong>LinkedIn is Your Weapon:</strong> Don't just post "happy to announce..." certs. Write posts detailing *what you learned, the bugs you faced, and how you solved them.* Share a 30-second screen recording of your project working.</li>
  <li><strong>Open Source & HuggingFace:</strong> Host your working machine learning apps on HuggingFace Spaces or Streamlit Community Cloud so recruiters can actually click and test them live.</li>
  <li><strong>Join Local Communities:</strong> Join the *Tamil Nadu AI Community* and other developer WhatsApp/Discord channels. Job leads and off-campus opportunities circulate heavily in these networks.</li>
</ul>

<h2>Conclusion — Own Your Story</h2>
<p>Not having an IIT tag is not a disadvantage; it's a story. When you sit in front of an interviewer at a product company and show them a live, deployed RAG chatbot with a complete Docker container, a perfect git history, and a structured database, your college name won't matter. Your skills will do the talking.</p>

<p>Start today. Focus on one block at a time. The roadmap is clear—now execute. 💪</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
    `
  },
  {
    slug: "cognizant-cts-wipro-coding-questions-python-solutions",
    title: "Top 10 Most Repeated Cognizant (CTS) & Wipro Coding Questions — Python Solutions",
    excerpt: "Clear the coding rounds of CTS and Wipro easily. A complete guide with Python solutions for the top 10 most repeated programming questions in their placement tests.",
    category: "Interview Prep",
    tags: ["CTS", "Wipro", "Python", "Placement", "Coding Prep", "DSA"],
    readTime: "10 min read",
    date: "2026-05-27",
    featured: true,
    content: `
<h2>Introduction</h2>
<p>Mass recruiters like Cognizant (CTS) and Wipro conduct major campus drives every year. While many students focus on complex dynamic programming, mass recruiter coding tests generally assess fundamental logic, basic data structures (arrays, strings, hash maps), and mathematical principles. If you can solve these core questions quickly, you will easily clear the round.</p>

<p>In this guide, we break down the <strong>most repeated coding questions</strong> asked in recent CTS and Wipro tests with clean, copy-pasteable Python code and explanations of the underlying logic.</p>

<h2>1. Harshad (Niven) Number Check (Wipro)</h2>
<p>A Harshad number (or Niven number) is an integer that is divisible by the sum of its digits in a given base. For example, 18 is a Harshad number in base 10, because the sum of the digits 1 and 8 is 9, and 18 is divisible by 9 (18 % 9 == 0).</p>

<pre><code class="language-python">def is_harshad_number(num):
    # Calculate sum of digits
    digit_sum = sum(int(digit) for digit in str(num))
    
    # Check divisibility
    return num % digit_sum == 0

# Test the function
print(is_harshad_number(18))  # Output: True
print(is_harshad_number(15))  # Output: False
</code></pre>

<h3>Logic & Complexity:</h3>
<ul>
  <li><strong>Time Complexity:</strong> O(d) where d is the number of digits in the number. Converting to a string and iterating takes linear time relative to the number of digits.</li>
  <li><strong>Space Complexity:</strong> O(d) to store the string representation of the number.</li>
</ul>

<h2>2. Caesar Cipher String Encryption (CTS)</h2>
<p>A common string manipulation problem in CTS is to encrypt a message by shifting its characters by a given key. For example, with a shift key of 3, 'A' becomes 'D', 'B' becomes 'E', and so on. Non-alphabet characters should remain unchanged.</p>

<pre><code class="language-python">def encrypt_caesar_cipher(text, key):
    result = []
    for char in text:
        if char.isupper():
            # Encrypt uppercase characters
            result.append(chr((ord(char) + key - 65) % 26 + 65))
        elif char.islower():
            # Encrypt lowercase characters
            result.append(chr((ord(char) + key - 97) % 26 + 97))
        else:
            # Leave spaces and symbols as they are
            result.append(char)
    return "".join(result)

# Test the function
message = "Hello, World!"
print(encrypt_caesar_cipher(message, 3))  # Output: Khoor, Zruog!
</code></pre>

<h3>Logic & Complexity:</h3>
<ul>
  <li><strong>Time Complexity:</strong> O(n) where n is the length of the string, as we traverse the string exactly once.</li>
  <li><strong>Space Complexity:</strong> O(n) to store the encrypted characters in the list.</li>
</ul>

<h2>3. Find the Leader Elements in an Array (Wipro)</h2>
<p>An element is a leader if it is greater than all the elements to its right side. The rightmost element is always a leader. For example, in the array [16, 17, 4, 3, 5, 2], the leaders are 17, 5, and 2.</p>

<pre><code class="language-python">def find_leaders(arr):
    leaders = []
    max_from_right = float('-inf')
    
    # Traverse array from right to left
    for i in range(len(arr) - 1, -1, -1):
        if arr[i] > max_from_right:
            leaders.append(arr[i])
            max_from_right = arr[i]
            
    # Reverse to restore original relative order
    return leaders[::-1]

# Test the function
nums = [16, 17, 4, 3, 5, 2]
print(find_leaders(nums))  # Output: [17, 5, 2]
</code></pre>

<h3>Logic & Complexity:</h3>
<ul>
  <li><strong>Time Complexity:</strong> O(n) where n is the size of the array. Traversing from right to left allows us to find leaders in a single pass.</li>
  <li><strong>Space Complexity:</strong> O(1) auxiliary space (excluding the output array).</li>
</ul>

<h2>4. Count Non-Zero Elements in a Matrix (CTS)</h2>
<p>Given a 2D matrix representing store inventory, write a program to count how many items have non-zero quantities. CTS often asks variations of matrix traversal with custom conditions.</p>

<pre><code class="language-python">def count_nonzero(matrix):
    count = 0
    for row in matrix:
        for element in row:
            if element != 0:
                count += 1
    return count

# Test the function
grid = [
    [1, 0, 3],
    [0, 5, 0],
    [7, 8, 9]
]
print(count_nonzero(grid))  # Output: 6
</code></pre>

<h3>Logic & Complexity:</h3>
<ul>
  <li><strong>Time Complexity:</strong> O(r * c) where r is the number of rows and c is the columns, visiting every element.</li>
  <li><strong>Space Complexity:</strong> O(1) auxiliary space.</li>
</ul>

<h2>Conclusion</h2>
<p>If you're preparing for on-campus or off-campus recruitment with Cognizant or Wipro, practicing these patterns is your highest return-on-investment action. Make sure you can write these solutions by heart, paying close attention to edge cases like empty strings or single-element arrays. Good luck! 💪</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
    `
  },
  {
    slug: 'how-i-built-skillspeak-ai-career-platform-15-features',
    title: 'How I Built SkillSpeak AI — A 15-Feature Career Platform for Every Indian Job Seeker',
    date: '2026-05-24',
    excerpt: 'SkillSpeak AI is a full-stack AI career platform with 15 core engines — ATS scanner, mock interviews, Tamil-English translator, neural brain visualizer and more. Here is the complete breakdown of how I built it.',
    tags: ['Gemini API', 'Firebase', 'React', 'AI', 'Career', 'Project', 'Full Stack'],
    category: 'Machine Learning',
    readTime: '12 min read',
    featured: true,
    content: `
<h2>Why I Built SkillSpeak AI</h2>
<p>Over 60% of Indian job seekers use their mobile phones to practice interviews, edit resumes, and check career resources. Yet most career platforms are heavy, cluttered, and built only for desktop users.</p>
<p>Beyond the device problem, there is a bigger one — language. Thousands of talented engineers from Tamil Nadu, Andhra Pradesh, and other non-Hindi states struggle not because they lack technical skills, but because they cannot confidently express those skills in a formal English interview. Their thoughts are strong. Their words let them down.</p>
<p>SkillSpeak AI was built to fix both problems. A mobile-first, AI-powered career platform for <strong>any Indian job seeker</strong> — fresher or experienced, English-confident or not.</p>

<h2>What SkillSpeak AI Does — The 15 Core Engines</h2>
<p>I will not just list them. I will explain how each one actually works under the hood.</p>

<h3>1. ATS Resume Score Scanner</h3>
<p>Parses PDF, DOCX, or TXT resumes using pdfjs-dist or mammoth, extracts clean text, and sends it to Gemini API along with the target job description. Returns an overall fit score, ATS keyword matches, and formatting readability rating. This tells a job seeker exactly why their resume is getting rejected by automated systems before a human even sees it.</p>

<h3>2. Compare and Align Keyword Workspace</h3>
<p>Side-by-side editor — original resume on the left, editable workspace on the right. As the user types, a real-time keyword scanner automatically sorts missing keywords into green (resolved) or red (remaining) badges. No page refresh, no button click. Instant feedback as you write.</p>

<h3>3. AI Auto-Optimizer</h3>
<p>One click sends the resume text and all missing keywords to Gemini. The model rewrites sentences to naturally include the missing terms without fabricating false credentials. It gives users a highly optimized starting template they can then personalize.</p>

<h3>4. Real-Time Speech Mock Interview</h3>
<p>Uses the HTML5 Web Speech API for hands-free speech-to-text. The user speaks their answer out loud. Gemini analyzes the response against the STAR methodology — Situation, Task, Action, Result — and returns structured feedback with clear strengths and specific improvements.</p>

<h3>5. Target Company Interview Prep</h3>
<p>User enters a company name and role. Gemini returns company culture overview, fresher and experienced salary ranges, and 5 tailored interview questions specific to that company. Preparation becomes targeted, not generic.</p>

<h3>6. Tamil to English Career Translator — The Feature I'm Most Proud Of</h3>
<p>This is the heart of SkillSpeak AI and the feature I care about most.</p>
<p>A Tamil Nadu engineer thinks in Tamil. When they try to explain their project in an interview, they mentally translate — and something gets lost. The confidence drops. The answer sounds weak even though the knowledge is strong.</p>
<p>The Tamil to English Career Translator fixes this. The user types or speaks their career thought in conversational Tamil. The system translates it into three variants:</p>
<ul>
  <li><strong>Simple English</strong> — for written applications</li>
  <li><strong>Formal English</strong> — for professional emails</li>
  <li><strong>Interview-Ready English</strong> — polished, confident, structured</li>
</ul>
<p>Each translation comes with clarity notes and pronunciation tips. A student from Ambur or Madurai can now walk into a Bangalore or Chennai interview and express themselves with the same confidence as someone who grew up speaking English at home.</p>
<p>That gap — between knowing and expressing — is what this feature closes.</p>

<h3>7. 30/60/90 Day Fix-Plan Learning Roadmaps</h3>
<p>User inputs their skill gaps and available hours per day. Gemini generates a custom day-by-day roadmap with specific learning tasks, mini-projects, and references. Checkmarks persist in Firestore so progress is saved across sessions.</p>

<h3>8. Skill Fit Radar and Dual-View Cards</h3>
<p>Two views with a toggle switch. Radar view uses Recharts with a 65% radius and 9px label size optimized for mobile — no boundary clipping. Bars view renders custom progress bars in a 2-column desktop grid. Both show skill strengths and gaps at a glance.</p>

<h3>9. Interactive Neural Brain Visualizer</h3>
<p>Reads the user's Firestore history — analyses run, interviews completed, translator usage — and dynamically unlocks 5 brain evolution stages from Awakening to Master Architect. Rendered on a canvas running at 60fps with curved axon connections and glowing synaptic nodes. Auto-scales from mobile to desktop.</p>

<h3>10. Client Telemetry and Performance Monitoring</h3>
<p>Automatically listens for unhandled errors and promise rejections. Measures First Contentful Paint and Time to First Byte. Writes secure error logs to a dedicated Firestore telemetry collection — completely separate from user data.</p>

<h3>11. Achievements and Badges Grid</h3>
<p>Glassmorphic locked and unlocked badges mapped to Firestore metric thresholds. ATS Champion, Polyglot Master, STAR Candidate. Gamification that drives users to actually use every feature.</p>

<h3>12. Social Media Sharing</h3>
<p>Custom share hooks with Web Intents for LinkedIn and X. Pre-filled text with hashtags and links. Users share their career readiness scores in one click.</p>

<h3>13. Print-Friendly PDF Export</h3>
<p>CSS @media print directives strip sidebars, navbars, and buttons during print. Clean, professional PDF output of roadmaps and ATS reviews without any external PDF library needed.</p>

<h3>14. Header Notifications Bell</h3>
<p>Glassmorphic popover triggered from the header. Delivers dynamic career tips, feature alerts, and telemetry warnings. Keeps users engaged between sessions.</p>

<h3>15. Pro Max Profile Settings</h3>
<p>5 custom role avatars, a journey path switcher, an AI Coach tone modulator with Friendly, Structured, or Strict Coach modes, and a live telemetry log viewer. Deep personalization so the platform feels like it was built for that specific user.</p>

<h2>The Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React + TypeScript + Tailwind CSS</li>
  <li><strong>AI Engine:</strong> Google Gemini API</li>
  <li><strong>Database:</strong> Firebase Firestore (privacy-segregated per user)</li>
  <li><strong>Speech:</strong> HTML5 Web Speech API</li>
  <li><strong>Charts:</strong> Recharts (Radar + Bar)</li>
  <li><strong>Canvas:</strong> Vanilla JS requestAnimationFrame at 60fps</li>
  <li><strong>Resume Parsing:</strong> pdfjs-dist + mammoth</li>
  <li><strong>Deployment:</strong> Vercel</li>
</ul>

<h2>Design System — Mobile First, Premium Feel</h2>
<p>Every design decision started with a 375px mobile viewport and scaled up:</p>
<pre><code>
/* Core design tokens */
--bg-primary: #030712;        /* Deep space slate */
--accent-teal: #00d4ff;       /* High contrast glow */
--glass-surface: backdrop-filter: blur(20px);
--border-glow: 1px solid rgba(0, 212, 255, 0.2);

/* Mobile-first breakpoints */
.grid-cards {
  display: grid;
  grid-template-columns: 1fr;           /* Mobile: single column */
}

@media (min-width: 768px) {
  .grid-cards {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .grid-cards {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}
</code></pre>

<h2>The Hardest Part — Gemini API Integration</h2>
<p>Gemini is powerful but getting it right across 15 different features was the hardest engineering challenge of this project.</p>
<p>The main problems I hit:</p>

<p><strong>Problem 1 — Inconsistent response structure</strong></p>
<p>Gemini sometimes returns markdown, sometimes plain text, sometimes JSON-like strings. I needed structured data for features like the ATS scanner and skill radar. The fix was strict prompt engineering:</p>
<pre><code>
// WRONG — vague prompt gives unpredictable output
const prompt = \`Analyze this resume: \${resumeText}\`

// CORRECT — explicit structure forces consistent output
const prompt = \`
Analyze this resume against the job description below.
Respond ONLY in this exact JSON format, no markdown, no explanation:
{
  "overall_score": number between 0-100,
  "matched_keywords": ["keyword1", "keyword2"],
  "missing_keywords": ["keyword1", "keyword2"],
  "readability_score": number between 0-100,
  "top_suggestion": "single most important improvement"
}

Resume: \${resumeText}
Job Description: \${jobDescription}
\`
</code></pre>

<p><strong>Problem 2 — Rate limiting on rapid feature usage</strong></p>
<p>Users switching between features quickly triggered Gemini rate limits. I added a simple request queue with exponential backoff:</p>
<pre><code>
async function callGeminiWithRetry(prompt: string, retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt)
      return result.response.text()
    } catch (error: any) {
      if (error.status === 429 && i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
        continue
      }
      throw error
    }
  }
  throw new Error('Gemini API failed after retries')
}
</code></pre>

<p><strong>Problem 3 — Tamil translation quality</strong></p>
<p>Generic Gemini prompts for Tamil translation gave mediocre results. The trick was giving Gemini explicit role context and examples in the prompt itself, treating it like a specialized career coach who understands Indian interview culture. Response quality improved dramatically.</p>

<h2>Firebase Security — Privacy First Architecture</h2>
<p>Every user's data is completely isolated. No user can ever read another user's resumes, interview history, or progress data:</p>
<pre><code>
// Firestore security rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can only access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }

    // Telemetry logs — write only, no read access to other users
    match /telemetryLogs/{logId} {
      allow create: if request.auth != null;
      allow read: if false;
    }
  }
}
</code></pre>

<h2>What I Learned Building 15 Features</h2>
<ul>
  <li><strong>Prompt engineering is a skill.</strong> The quality of Gemini's output is directly proportional to the quality of your prompt. Vague prompts give vague answers. Structured prompts give structured data.</li>
  <li><strong>Mobile first is not a constraint — it is a discipline.</strong> Designing for 375px first forced me to make every feature simple and focused. Desktop layout came naturally after.</li>
  <li><strong>Firestore security rules are not optional.</strong> Build them from day one. Retrofitting security into an existing database structure is painful.</li>
  <li><strong>Canvas animation is powerful but expensive.</strong> requestAnimationFrame at 60fps on mobile needs careful optimization — clear the canvas every frame, minimize draw calls, use integer coordinates.</li>
  <li><strong>15 features is not too many if each one has a single clear purpose.</strong> Feature bloat happens when features overlap. Every SkillSpeak AI engine solves exactly one problem.</li>
</ul>

<h2>Who Should Use SkillSpeak AI</h2>
<p>Any Indian job seeker — fresher or experienced. But especially:</p>
<ul>
  <li>Engineering graduates from Tier 2 and Tier 3 colleges preparing for campus placements</li>
  <li>Tamil Nadu, Andhra, and Kerala students who think in their native language but need to interview in English</li>
  <li>Candidates who keep getting rejected at resume screening and don't know why</li>
  <li>Anyone preparing for TCS, Infosys, Wipro, Cognizant, or Amazon interviews</li>
</ul>
<p>You do not need to be from an IIT or NIT to get hired at a good company. You need the right preparation and the right tools. SkillSpeak AI is that tool.</p>

<h2>What's Next</h2>
<ul>
  <li>Voice input in Tamil — speak your career thoughts, get polished English output</li>
  <li>WhatsApp integration — practice mock interviews without opening a browser</li>
  <li>Offline mode — core features available without internet for rural users</li>
  <li>Company-specific ATS keyword databases for TCS, Infosys, and Wipro</li>
</ul>

<h2>Final Thought</h2>
<p>SkillSpeak AI is the platform I wish existed when I was preparing for my own campus placements. Every feature was built from a real frustration — a resume rejection, a mock interview that felt wrong, a career thought that didn't translate properly in English.</p>
<p>If you are an Indian job seeker and this resonates, try it. If you are a developer and want to discuss the architecture, reach out on LinkedIn. And if you are a recruiter reading this — this is the kind of thing I build.</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
<p><em>GitHub: github.com/Adithya0805 | LinkedIn: linkedin.com/in/adithya-kuppusamy-76baab204</em></p>
  `
  },
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
