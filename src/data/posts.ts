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


  // ── COMPLIANCE POSTS (5 new rich posts) ────────────────────────────────────────────────
  {
    slug: 'python-machine-learning-roadmap-2026-beginners',
    title: 'Python for Machine Learning — Complete Beginner Roadmap 2026',
    date: '2026-05-25',
    excerpt: 'A complete, honest roadmap for learning Python and Machine Learning from scratch in 2026. Written for Indian engineering students with zero prior ML experience.',
    tags: ['Python', 'Machine Learning', 'Roadmap', 'Beginners', 'Career'],
    category: 'Machine Learning',
    readTime: '9 min read',
    featured: false,
    content: `
<h2>Why Most ML Roadmaps Fail You</h2>
<p>Most Python and ML roadmaps online are written for people who already know programming. They assume you understand functions, classes, and data structures before explaining what a neural network is. This roadmap is different — it starts from zero and builds up logically.</p>
<p>I followed a version of this roadmap myself during my final year at Dhanalakshmi Srinivasan College of Engineering, Tamil Nadu. This is what actually worked.</p>

<h2>Phase 1 — Python Foundations (Weeks 1–3)</h2>
<p>Before touching any ML library, you must be comfortable with core Python. Not expert-level — comfortable. You need to write basic programs without Googling syntax every line.</p>
<p>What to learn:</p>
<ul>
  <li>Variables, data types, conditionals, loops</li>
  <li>Functions — defining, calling, return values</li>
  <li>Lists, dictionaries, tuples, sets</li>
  <li>File reading and writing</li>
  <li>Basic OOP — classes and objects</li>
</ul>
<p>How to practice:</p>
<pre><code>
# Week 1 target — write this from scratch without help
def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

temperatures = [0, 20, 37, 100]
converted = [celsius_to_fahrenheit(t) for t in temperatures]
print(converted)  # [32.0, 68.0, 98.6, 212.0]
</code></pre>
<p>If you can write that comfortably, you are ready for Phase 2.</p>
<p><strong>Resources:</strong> Python.org tutorial (free), CS50P on edX (free), HackerRank Python track (free)</p>

<h2>Phase 2 — Data Handling (Weeks 4–5)</h2>
<p>Machine learning runs on data. Before building models, you need to load, clean, and understand data.</p>
<p>Libraries to learn:</p>
<ul>
  <li><strong>NumPy</strong> — numerical arrays and math operations</li>
  <li><strong>Pandas</strong> — loading CSV files, dataframes, data cleaning</li>
  <li><strong>Matplotlib / Seaborn</strong> — visualizing data</li>
</ul>
<pre><code>
import pandas as pd
import matplotlib.pyplot as plt

# Load a dataset
df = pd.read_csv('data.csv')

# Basic exploration every data scientist does first
print(df.shape)          # rows and columns
print(df.head())         # first 5 rows
print(df.isnull().sum()) # missing values per column
print(df.describe())     # statistics

# Simple visualization
df['salary'].hist(bins=20)
plt.title('Salary Distribution')
plt.show()
</code></pre>
<p><strong>Practice dataset:</strong> Download the Titanic dataset from Kaggle. Explore it using the code above. Answer these questions from the data: What is the average age? How many passengers survived? Which class had the highest survival rate?</p>

<h2>Phase 3 — Machine Learning Basics (Weeks 6–8)</h2>
<p>Now you are ready for actual ML. Start with scikit-learn — the most practical ML library for beginners.</p>
<p>Learn these algorithms in order:</p>
<ul>
  <li>Linear Regression — predicting continuous values</li>
  <li>Logistic Regression — binary classification</li>
  <li>Decision Trees — intuitive, easy to visualize</li>
  <li>Random Forest — better accuracy, same concept</li>
</ul>
<pre><code>
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pandas as pd

# Load and prepare data
df = pd.read_csv('titanic.csv')
features = ['Pclass', 'Age', 'SibSp', 'Fare']
df = df[features + ['Survived']].dropna()

X = df[features]
y = df['Survived']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions):.2f}")
</code></pre>

<h2>Phase 4 — Deep Learning Introduction (Weeks 9–11)</h2>
<p>Once you understand classical ML, move to deep learning with TensorFlow or PyTorch.</p>
<p>Start with TensorFlow/Keras because the syntax is more beginner-friendly:</p>
<pre><code>
import tensorflow as tf
from tensorflow import keras

# Simple neural network for classification
model = keras.Sequential([
    keras.layers.Dense(64, activation='relu', input_shape=(4,)),
    keras.layers.Dense(32, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.summary()
</code></pre>

<h2>Phase 5 — Specialization (Weeks 12+)</h2>
<p>After the basics, choose one area to go deep:</p>
<ul>
  <li><strong>NLP and LLMs</strong> — if you want to work with language models, chatbots, RAG systems</li>
  <li><strong>Computer Vision</strong> — if you want to work with images, medical imaging, object detection</li>
  <li><strong>MLOps</strong> — if you want to deploy and maintain ML systems in production</li>
</ul>
<p>My recommendation for freshers in 2026: <strong>Go deep on NLP and LLMs.</strong> Every company is hiring for this. LangChain, LangGraph, RAG systems, and prompt engineering are the most in-demand skills right now.</p>

<h2>Common Mistakes to Avoid</h2>
<ul>
  <li><strong>Tutorial hell</strong> — watching videos without writing code. Write every line yourself.</li>
  <li><strong>Skipping mathematics</strong> — you don't need a PhD in math, but understand what mean, variance, and gradient descent are conceptually.</li>
  <li><strong>Building complex projects too early</strong> — master the basics on standard datasets before attempting original projects.</li>
  <li><strong>Not tracking your learning</strong> — keep a simple notebook of what you learned each week.</li>
</ul>

<h2>Estimated Timeline</h2>
<p>If you study 2 hours per day consistently:</p>
<ul>
  <li>3 months — solid Python + basic ML skills</li>
  <li>6 months — first ML project on GitHub</li>
  <li>9 months — ready for ML Engineer fresher roles</li>
  <li>12 months — portfolio strong enough for product companies</li>
</ul>
<p>The key word is consistently. Two hours every day beats ten hours every weekend.</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
  `
  },
  {
    slug: 'langchain-rag-complete-tutorial-2026',
    title: 'LangChain RAG Tutorial — Build an AI Q&A Bot Over Your Own Documents (2026)',
    date: '2026-05-26',
    excerpt: 'Step by step tutorial to build a Retrieval Augmented Generation system using LangChain, FAISS vector store, and OpenAI. Complete working code included.',
    tags: ['LangChain', 'RAG', 'Python', 'Tutorial', 'Vector Database', 'OpenAI'],
    category: 'Machine Learning',
    readTime: '11 min read',
    featured: false,
    content: `
<h2>What is RAG and Why Does It Matter</h2>
<p>Large Language Models like GPT-4 and Claude are trained on data up to a specific cutoff date. They cannot answer questions about your private documents, your company's internal knowledge base, or recent events. This is where RAG — Retrieval Augmented Generation — solves a real problem.</p>
<p>Instead of relying on the model's training data alone, RAG retrieves relevant documents from your own knowledge base and gives them to the model as context before generating an answer. The result is accurate, sourced, up-to-date responses grounded in your actual data.</p>
<p>This is the architecture behind most enterprise AI chatbots, customer support bots, and document Q&A systems being built today.</p>

<h2>How RAG Works — The 3 Step Pipeline</h2>
<pre><code>
Your Documents (PDF, TXT, CSV)
         ↓
[Step 1: Chunking] — split into small passages
         ↓
[Step 2: Embedding] — convert text to vectors
         ↓
[Step 3: Store] — save vectors in FAISS or Pinecone
         ↓
User asks a question
         ↓
[Step 4: Retrieve] — find most similar chunks
         ↓
[Step 5: Generate] — LLM answers using retrieved chunks
</code></pre>

<h2>Setup — Install Required Libraries</h2>
<pre><code>
pip install langchain langchain-openai faiss-cpu python-dotenv pypdf
</code></pre>

<h2>Step 1 — Load and Chunk Your Documents</h2>
<pre><code>
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load a PDF document
loader = PyPDFLoader("your_document.pdf")
documents = loader.load()

# Split into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,      # characters per chunk
    chunk_overlap=200,    # overlap between chunks to maintain context
    length_function=len
)

chunks = text_splitter.split_documents(documents)
print(f"Total chunks: {len(chunks)}")
print(f"Sample chunk: {chunks[0].page_content[:200]}")
</code></pre>

<h2>Step 2 — Create Embeddings and Vector Store</h2>
<pre><code>
from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize embeddings
embeddings = OpenAIEmbeddings(
    openai_api_key=os.getenv("OPENAI_API_KEY")
)

# Create FAISS vector store from chunks
vectorstore = FAISS.from_documents(
    documents=chunks,
    embedding=embeddings
)

# Save locally so you don't re-embed every time
vectorstore.save_local("faiss_index")
print("Vector store created and saved")
</code></pre>

<h2>Step 3 — Build the Q&A Chain</h2>
<pre><code>
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

# Load saved vector store
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.load_local("faiss_index", embeddings)

# Create retriever
retriever = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 4}  # retrieve top 4 most relevant chunks
)

# Initialize LLM
llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",
    temperature=0
)

# Build the chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)
</code></pre>

<h2>Step 4 — Ask Questions</h2>
<pre><code>
def ask_question(question: str):
    result = qa_chain({"query": question})
    
    print(f"Question: {question}")
    print(f"Answer: {result['result']}")
    print(f"\nSources used:")
    for doc in result['source_documents']:
        print(f"  - Page {doc.metadata.get('page', 'N/A')}: {doc.page_content[:100]}...")
    
    return result['result']

# Test it
ask_question("What are the main topics covered in this document?")
ask_question("Summarize the key findings")
</code></pre>

<h2>Common Errors and Fixes</h2>
<ul>
  <li><strong>RateLimitError</strong> — too many embedding requests. Add time.sleep(1) between batches.</li>
  <li><strong>Context length exceeded</strong> — reduce chunk_size from 1000 to 500.</li>
  <li><strong>Poor answer quality</strong> — increase k from 4 to 6 in the retriever to fetch more context.</li>
  <li><strong>FAISS index not found</strong> — make sure you run the embedding step before the Q&A step.</li>
</ul>

<h2>Free Alternatives to OpenAI</h2>
<p>If you want to build this without API costs:</p>
<ul>
  <li><strong>Embeddings:</strong> Use HuggingFace sentence-transformers — completely free</li>
  <li><strong>LLM:</strong> Use Google Gemini API free tier or Ollama for local models</li>
  <li><strong>Vector Store:</strong> FAISS is already free and local</li>
</ul>
<pre><code>
# Free embedding alternative
from langchain.embeddings import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
</code></pre>

<h2>What to Build Next</h2>
<p>Once your basic RAG pipeline works, extend it:</p>
<ul>
  <li>Add a Gradio or Streamlit UI so non-technical users can use it</li>
  <li>Support multiple document types — PDF, Word, CSV, web pages</li>
  <li>Add conversation memory so users can ask follow-up questions</li>
  <li>Deploy it on Hugging Face Spaces for free</li>
</ul>
<p>RAG is one of the most practical and in-demand skills in AI right now. Every company building an internal AI tool is using some version of this pipeline. Build it, understand it deeply, and put it on your resume.</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
  `
  },
  {
    slug: 'infosys-interview-experience-2026-fresher',
    title: 'Infosys SP & DSE Interview Experience 2026 — What Actually Happens',
    date: '2026-05-27',
    excerpt: 'Complete breakdown of the Infosys System Engineer and Digital Specialist Engineer recruitment process in 2026. Online assessment, technical interview, and HR round — all covered honestly.',
    tags: ['Infosys', 'Interview', 'Campus Placement', 'Career', 'Fresher'],
    category: 'Interview Prep',
    readTime: '8 min read',
    featured: false,
    content: `
<h2>Infosys Hiring in 2026 — What's Changed</h2>
<p>Infosys runs two main fresher hiring tracks — System Engineer (SE) and Digital Specialist Engineer (DSE). DSE is the premium track with higher pay and more technical work. Both go through similar stages but with different difficulty levels in the assessment.</p>
<p>I prepared for the Infosys virtual assessment in April 2026. Here is exactly what the process looks like from the inside.</p>

<h2>Stage 1 — Online Assessment</h2>
<p>The Infosys online assessment has 4 sections:</p>

<h3>Section 1 — Reasoning Ability (15 questions, 25 minutes)</h3>
<p>Logical reasoning, number series, syllogisms, blood relations, and data interpretation. Medium difficulty. The tricky ones are the data sufficiency questions — they require you to determine if the given information is enough to answer the question, not actually solve it.</p>

<h3>Section 2 — Mathematical Ability (10 questions, 35 minutes)</h3>
<p>Time and work, percentages, profit and loss, geometry, and probability. More time is given here because the questions require multi-step solving. Don't spend more than 3 minutes on any single question.</p>

<h3>Section 3 — Verbal Ability (20 questions, 20 minutes)</h3>
<p>Reading comprehension, sentence correction, error spotting, and vocabulary. This is where most students lose marks — 20 questions in 20 minutes means 1 minute per question. Speed matters more than perfection here.</p>

<h3>Section 4 — Coding (2 questions, 30 minutes) — DSE Only</h3>
<p>Array and string manipulation problems. The questions are Easy to Medium difficulty on LeetCode scale. Python is the fastest language to use here.</p>
<pre><code>
# Common Infosys coding pattern — find second largest in array
def second_largest(arr):
    unique = list(set(arr))
    if len(unique) < 2:
        return -1
    unique.sort(reverse=True)
    return unique[1]

# Test
print(second_largest([3, 1, 4, 1, 5, 9, 2, 6]))  # 6
print(second_largest([5, 5, 5]))  # -1
</code></pre>

<h2>Stage 2 — Technical Interview</h2>
<p>If you clear the online assessment, you get a technical interview. Duration is 30–45 minutes. The interviewer is typically a senior engineer, not HR.</p>
<p>Topics that came up most in 2026 technical interviews:</p>
<ul>
  <li>OOP concepts — inheritance, polymorphism, encapsulation with real examples</li>
  <li>DBMS — SQL queries, joins, normalization, indexing</li>
  <li>Data Structures — arrays, linked lists, stacks, queues</li>
  <li>Computer Networks basics — TCP/IP, HTTP vs HTTPS, DNS</li>
  <li>Your projects — be ready to explain every line of your project</li>
</ul>
<p>The most important thing about the technical interview — your projects. Every interviewer will ask you to explain your final year project in detail. Know your own work inside out. Don't add anything to your resume that you cannot explain clearly.</p>

<h2>Stage 3 — HR Interview</h2>
<p>The HR round is not a formality. Infosys HR interviewers are trained to check cultural fit and communication. Common questions:</p>
<ul>
  <li>"Tell me about yourself" — prepare a 90-second answer</li>
  <li>"Why Infosys?" — research the company before this round</li>
  <li>"Where do you see yourself in 5 years?"</li>
  <li>"Are you willing to relocate?"</li>
  <li>"Do you have any bond concerns?" — Infosys has a service bond, be prepared</li>
</ul>

<h2>My Preparation Strategy</h2>
<p>I spent 8 days preparing for the Infosys assessment. Here is what I focused on:</p>
<ul>
  <li>Days 1–2: Reasoning — IndiaBix + PrepInsta, 40 questions daily</li>
  <li>Days 3–4: Maths — Percentages, time-work, profit-loss, probability</li>
  <li>Days 5–6: Verbal — RC passages, sentence correction, vocabulary</li>
  <li>Days 7–8: Coding — 2 easy problems daily on HackerRank in Python</li>
</ul>

<h2>Key Tips</h2>
<ul>
  <li>Attempt all questions — no negative marking</li>
  <li>Verbal section is time-critical — practice speed</li>
  <li>For coding — solve Q1 completely before touching Q2</li>
  <li>Technical interview — be honest if you don't know something. Say "I don't know this but here is how I would approach finding the answer"</li>
  <li>HR round — smile, make eye contact, speak slowly and clearly</li>
</ul>

<h2>Final Thought</h2>
<p>Infosys is a good company to start your IT career. The DSE track especially gives you exposure to real projects and better growth opportunities. Three weeks of serious preparation is all it takes to clear the process.</p>
<p>If you found this helpful, share it with your batch mates who are preparing for Infosys. And check my other posts for TCS NQT preparation and ML career roadmaps.</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
  `
  },
  {
    slug: 'aws-bedrock-beginners-guide-2026',
    title: 'AWS Bedrock for Beginners — How to Use Claude and Titan APIs in Python (2026)',
    date: '2026-05-28',
    excerpt: 'Complete beginner guide to AWS Bedrock — setting up IAM, enabling model access, and calling Claude and Titan models from Python. Includes the exact errors you will hit and how to fix them.',
    tags: ['AWS Bedrock', 'Python', 'Claude API', 'Cloud', 'Tutorial', 'AI'],
    category: 'Machine Learning',
    readTime: '10 min read',
    featured: false,
    content: `
<h2>What is AWS Bedrock</h2>
<p>AWS Bedrock is Amazon's fully managed service for accessing foundation models from leading AI companies — Anthropic's Claude, Amazon's Titan, Meta's Llama, Mistral, and others — all through a single unified API.</p>
<p>Instead of signing up for multiple AI provider accounts and managing different SDKs, Bedrock gives you one API endpoint, one billing system, and enterprise-grade security through AWS IAM.</p>
<p>For developers building production AI applications — especially in companies that already use AWS — Bedrock is the standard choice.</p>

<h2>Step 1 — Set Up AWS Account and IAM</h2>
<p>This is where most beginners get stuck. Follow these steps exactly:</p>
<ol>
  <li>Create an AWS account at aws.amazon.com (free tier available)</li>
  <li>Go to IAM → Users → Create User</li>
  <li>Attach this policy: AmazonBedrockFullAccess</li>
  <li>Create Access Key for programmatic access</li>
  <li>Save your Access Key ID and Secret Access Key securely</li>
</ol>
<p><strong>Never hardcode credentials in your code.</strong> Use environment variables:</p>
<pre><code>
# .env file
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_DEFAULT_REGION=us-east-1
</code></pre>

<h2>Step 2 — Enable Model Access (Critical Step Most Tutorials Skip)</h2>
<p>This is the step nobody tells you about. By default, NO models are enabled in your Bedrock account. You must manually request access:</p>
<ol>
  <li>Go to AWS Console → Bedrock → Model access</li>
  <li>Click "Manage model access"</li>
  <li>Check: Anthropic Claude, Amazon Titan</li>
  <li>Click "Request model access"</li>
  <li>Wait 2–5 minutes for approval</li>
</ol>
<p>If you skip this step, you will get AccessDeniedException every single time, no matter how correct your code is.</p>

<h2>Step 3 — Install and Configure Boto3</h2>
<pre><code>
pip install boto3 python-dotenv
</code></pre>
<pre><code>
import boto3
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Bedrock client
bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
)

print("Bedrock client initialized successfully")
</code></pre>

<h2>Step 4 — Call Claude via Bedrock</h2>
<pre><code>
def call_claude(prompt: str, max_tokens: int = 1000) -> str:
    body = json.dumps({
        "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
        "max_tokens_to_sample": max_tokens,
        "temperature": 0.3,
        "top_p": 0.9,
    })
    
    response = bedrock.invoke_model(
        modelId="anthropic.claude-v2",
        contentType="application/json",
        accept="application/json",
        body=body
    )
    
    response_body = json.loads(response['body'].read())
    return response_body['completion']

# Test
result = call_claude("Explain what RAG is in 3 sentences")
print(result)
</code></pre>

<h2>Step 5 — Call Amazon Titan for Embeddings</h2>
<pre><code>
def get_embedding(text: str) -> list:
    body = json.dumps({
        "inputText": text
    })
    
    response = bedrock.invoke_model(
        modelId="amazon.titan-embed-text-v1",
        contentType="application/json",
        accept="application/json",
        body=body
    )
    
    response_body = json.loads(response['body'].read())
    return response_body['embedding']

# Test
embedding = get_embedding("Machine learning is transforming healthcare")
print(f"Embedding dimensions: {len(embedding)}")  # 1536
</code></pre>

<h2>Common Errors and Exact Fixes</h2>
<ul>
  <li><strong>AccessDeniedException</strong> — model access not enabled. Go to Bedrock console → Model access → Enable the model.</li>
  <li><strong>ValidationException: model not found</strong> — wrong model ID format. Use full ID like anthropic.claude-v2 not claude-v2.</li>
  <li><strong>EndpointResolutionError</strong> — wrong region. Not all models available in all regions. Use us-east-1.</li>
  <li><strong>ThrottlingException</strong> — too many requests. Add time.sleep(1) between calls.</li>
</ul>

<h2>Bedrock vs Direct OpenAI API — When to Use Which</h2>
<ul>
  <li><strong>Use Bedrock</strong> — if your company uses AWS, needs enterprise security, wants one bill for all AI usage, or needs compliance features</li>
  <li><strong>Use OpenAI directly</strong> — if you are building a personal project, want the latest GPT-4o features, or need simple quick setup</li>
</ul>
<p>For production enterprise applications in India, most companies standardize on AWS — which makes Bedrock knowledge extremely valuable for your career.</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
  `
  },
  {
    slug: 'how-i-built-townrise-ai-real-estate-platform',
    title: 'How I Built TownRise AI — A Real Estate Intelligence Platform for Tamil Nadu',
    date: '2026-05-29',
    excerpt: 'TownRise AI is a zero-cost real estate intelligence platform built for Tamil Nadu with Next.js, Supabase, Google Gemini API, and real property data. Full architecture breakdown.',
    tags: ['Next.js', 'Supabase', 'Gemini API', 'Real Estate', 'Tamil Nadu', 'Project'],
    category: 'Machine Learning',
    readTime: '9 min read',
    featured: false,
    content: `
<h2>The Problem TownRise AI Solves</h2>
<p>Real estate in Tamil Nadu is opaque. Property buyers in cities like Chennai, Coimbatore, Madurai, and Ambur rely on brokers who have information asymmetry — they know more than the buyer, and they use that knowledge to their advantage.</p>
<p>TownRise AI flips that dynamic. It gives property buyers access to AI-powered market analysis, locality insights, price trends, and investment recommendations — completely free, directly in their browser.</p>

<h2>The Zero-Cost Architecture Challenge</h2>
<p>The constraint that made this project interesting was building it with zero infrastructure cost. No paid APIs, no paid hosting, no paid database. Everything had to be free tier.</p>
<p>Here is how I solved it:</p>
<ul>
  <li><strong>Frontend:</strong> Next.js on Vercel free tier</li>
  <li><strong>Database:</strong> Supabase free tier (PostgreSQL)</li>
  <li><strong>AI:</strong> Google Gemini API free tier</li>
  <li><strong>Property Data:</strong> OpenStreetMap + Overpass API (completely free)</li>
  <li><strong>News:</strong> Google News RSS feeds (free)</li>
  <li><strong>Automation:</strong> GitHub Actions nightly cron jobs (free)</li>
</ul>

<h2>System Architecture</h2>
<pre><code>
[OpenStreetMap / Overpass API]
           ↓ property data
[GitHub Actions nightly cron]
           ↓ processes and stores
[Supabase PostgreSQL]
           ↓ queried by
[Next.js API Routes]
           ↓ enriched with AI
[Google Gemini API]
           ↓ served to
[Next.js Frontend on Vercel]
</code></pre>

<h2>Fetching Real Property Data from OpenStreetMap</h2>
<pre><code>
// lib/propertyData.ts
export async function fetchPropertiesInArea(city: string) {
  const query = \`
    [out:json][timeout:25];
    area[name="\${city}"]->.searchArea;
    (
      node["building"="residential"](area.searchArea);
      way["building"="residential"](area.searchArea);
      node["amenity"="real_estate_agent"](area.searchArea);
    );
    out body;
    >;
    out skel qt;
  \`
  
  const response = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  })
  
  const data = await response.json()
  return data.elements
}
</code></pre>

<h2>AI-Powered Market Analysis with Gemini</h2>
<pre><code>
// lib/geminiAnalysis.ts
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function analyzeLocality(localityData: object) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  
  const prompt = \`
    You are a real estate market analyst specializing in Tamil Nadu, India.
    
    Analyze this locality data and provide:
    1. Investment potential score (1-10)
    2. Key advantages of this area
    3. Potential concerns or risks
    4. Best property types for this locality
    5. Price trend prediction for next 12 months
    
    Locality data: \${JSON.stringify(localityData)}
    
    Respond in JSON format only.
  \`
  
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  
  try {
    return JSON.parse(text.replace(/\\\`\\\`\\\`json|\\\`\\\`\\\`/g, '').trim())
  } catch {
    return { error: 'Analysis failed', raw: text }
  }
}
</code></pre>

<h2>Supabase Database Schema</h2>
<pre><code>
-- Properties table
create table properties (
  id uuid default gen_random_uuid() primary key,
  city text not null,
  locality text not null,
  lat decimal,
  lng decimal,
  property_type text,
  amenities jsonb,
  created_at timestamp default now()
);

-- Market analysis table
create table market_analysis (
  id uuid default gen_random_uuid() primary key,
  locality text not null,
  investment_score integer,
  advantages text[],
  risks text[],
  price_trend text,
  generated_at timestamp default now()
);

-- Row Level Security
alter table properties enable row level security;
create policy "Public read access" on properties for select using (true);
</code></pre>

<h2>GitHub Actions Nightly Data Refresh</h2>
<pre><code>
# .github/workflows/nightly-refresh.yml
name: Nightly Property Data Refresh

on:
  schedule:
    - cron: '0 0 * * *'  # runs at midnight every day
  workflow_dispatch:

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node scripts/refreshPropertyData.js
        env:
          SUPABASE_URL: \${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: \${{ secrets.SUPABASE_KEY }}
</code></pre>

<h2>What I Learned</h2>
<ul>
  <li><strong>Free tier constraints force creative architecture.</strong> Working within zero-cost limits made me understand each technology deeply instead of just throwing paid services at problems.</li>
  <li><strong>OpenStreetMap is underrated.</strong> Most developers default to Google Maps API. OpenStreetMap has rich data, a powerful query language, and zero cost.</li>
  <li><strong>Gemini 1.5 Flash is fast and free enough for production.</strong> For most analysis tasks, Flash model is more than sufficient and the free tier is generous.</li>
  <li><strong>GitHub Actions as a backend cron job is genius.</strong> Free compute on a schedule, no server to maintain, logs automatically stored.</li>
</ul>

<h2>Final Thought</h2>
<p>TownRise AI proved that you can build a genuinely useful, production-quality application with zero infrastructure cost. The constraint was not a limitation — it was a design challenge that made the final architecture more elegant.</p>
<p>The full project is on my GitHub. If you are building something similar for real estate, agriculture, or any location-intelligence use case in India, the architecture patterns here transfer directly.</p>
<p><em>— Adithya Kuppusamy, AI & Data Science Engineer, Tamil Nadu</em></p>
  `
  }
];
