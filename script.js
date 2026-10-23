// Small progressive enhancements: mobile navigation and project filters.
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }));
}
const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".project-card");
filters.forEach(filter => filter.addEventListener("click", () => {
  filters.forEach(item => item.classList.toggle("active", item === filter));
  const category = filter.dataset.filter;
  cards.forEach(card => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
}));
// Update your real contact links here or directly in index.html before publishing.

const slideProjects = {
  "Resume Processing & OCR": {
    output: "Structured candidate JSON with name, email, phone, skills, and experience.",
    considerations: "scanned PDFs, missing fields, invalid links, OCR latency, and schema validation",
    branches: [["Required fields missing?","Run OCR fallback on the relevant page."],["Invalid PDF / URL?","Skip safely and record the reason."],["Batch item fails?","Continue processing other resumes and collect skipped items."]],
    category: "DOCUMENT AI / AUTOMATION",
    description: "A workflow for extracting structured candidate information from PDF resumes.",
    focus: "Convert resume documents into structured candidate data.",
    problem: "Resume formats vary, and scanned PDFs may not contain extractable text. Missing fields can reduce the usefulness of automated processing.",
    solution: "Extract PDF text, use an LLM to structure candidate fields, validate the output, and run OCR fallback when required fields are missing.",
    workflow: [
      "Resume PDF / URL",
      "PDF Text Extraction",
      "LLM Field Extraction",
      "Validation",
      "OCR Fallback if Needed",
      "Structured Output"
    ],
    tech: ["Python", "FastAPI", "PyMuPDF", "EasyOCR", "LLMs", "MongoDB"],
    details: [
      "Extract name, email, phone number, skills, and experience.",
      "Apply OCR fallback for incomplete fields.",
      "Support batch processing where implemented.",
      "Add actual evaluation results and repository links before publishing."
    ],
    github: ""
  },
  "Customer Support Chatbot": {
    output: "Suggested answer, predicted intent/category, and routing destination.",
    considerations: "ambiguous intents, unsupported answers, privacy, and confidence thresholds",
    branches: [["Intent unclear?","Ask a clarifying question or route to a human."],["Answer unsupported?","Use approved knowledge or say it cannot answer."],["Urgent / complex issue?","Escalate to the appropriate support queue."]],
    category: "NLP / CONVERSATIONAL AI",
    description: "A support workflow combining text classification with conversational responses.",
    focus: "Classify customer messages and guide them to the right workflow.",
    problem: "Incoming support messages may be unstructured and need consistent categorization.",
    solution: "Preprocess text, predict a category with a trained classifier, and use the prediction to guide the next step.",
    workflow: [
      "Customer Message",
      "Text Preprocessing",
      "Classification Model",
      "Predicted Category",
      "Support Workflow"
    ],
    tech: ["Python", "Scikit-learn", "NLP", "Logistic Regression", "SVM", "FastAPI"],
    details: [
      "Prepare labeled customer messages.",
      "Train and compare classification models.",
      "Evaluate precision, recall, F1-score, and confusion matrix.",
      "Connect predictions to a chatbot when implemented."
    ],
    github: ""
  },
  "Agentic Workflow Automation": {
    output: "Execution summary with tool results and traceable steps.",
    considerations: "tool permissions, timeouts, bounded retries, approval, and audit trail",
    branches: [["Tool call fails?","Retry within limits or return a safe failure."],["Sensitive action?","Pause for human approval before execution."],["Result incomplete?","Feed verified feedback into planning or ask the user."]],
    category: "AGENTIC AI",
    description: "An agent workflow concept for coordinating tools and multi-step tasks.",
    focus: "Plan tasks, use approved tools, and verify results.",
    problem: "Multi-step tasks may require external data and multiple tool calls rather than a single response.",
    solution: "Interpret the request, plan the steps, select approved tools, execute calls, and verify the results.",
    workflow: [
      "User Request",
      "Planner Agent",
      "Tool Selection",
      "API / MCP Tool",
      "Result Verification",
      "Final Response"
    ],
    agentFlow: true,
    tech: ["Python", "LLMs", "LangGraph", "MCP", "REST APIs"],
    details: [
      "Define agent instructions and tool schemas.",
      "Validate inputs and tool outputs.",
      "Handle tool failures and retries.",
      "Use human approval for sensitive actions where appropriate."
    ],
    github: ""
  },
  "Chat with Documents": {
    output: "Answer grounded in retrieved passages, with source references.",
    considerations: "chunk size, retrieval relevance, hallucination checks, and document access",
    branches: [["No relevant chunks?","Explain that the document does not provide enough evidence."],["Sources conflict?","Show the relevant passages and disclose the conflict."],["Answer generated?","Attach source/page references where available."]],
    category: "GENERATIVE AI / RAG",
    description: "A retrieval-augmented generation workflow for answering questions about documents.",
    focus: "Generate answers grounded in retrieved document passages.",
    problem: "Users need answers based on their own documents rather than generic model knowledge.",
    solution: "Extract and chunk text, generate embeddings, retrieve relevant passages, and pass the context to an LLM.",
    workflow: [
      "Upload Document",
      "Text Extraction",
      "Chunking & Embeddings",
      "Vector Search",
      "LLM Answer",
      "Source References"
    ],
    tech: ["Python", "LangChain", "Embeddings", "Vector DB", "LLMs"],
    details: [
      "Extract and chunk document text.",
      "Generate embeddings and index chunks.",
      "Retrieve relevant passages for each query.",
      "Evaluate answer grounding and retrieval quality."
    ],
    github: ""
  },
  "Video & Object Analysis": {
    output: "Annotated frames or video with detected labels, boxes, and confidence scores.",
    considerations: "frame sampling, lighting, small objects, false positives, and inference latency",
    branches: [["Low confidence?","Flag the detection for review."],["Too many frames?","Sample frames or batch inference to control cost."],["Tracking required?","Associate detections across frames only if implemented."]],
    category: "COMPUTER VISION",
    description: "A computer vision workflow for analyzing images or video frames.",
    focus: "Detect and visualize objects in visual data.",
    problem: "Manual review of long videos can be time-consuming when specific objects or people need to be identified.",
    solution: "Extract video frames, preprocess images, run a detection model, and visualize the results.",
    workflow: [
      "Image / Video",
      "Frame Extraction",
      "Image Preprocessing",
      "YOLO Inference",
      "Detection Results",
      "Annotated Output"
    ],
    tech: ["Python", "OpenCV", "YOLO", "Deep Learning"],
    details: [
      "Prepare images or extract video frames.",
      "Run object detection on selected frames.",
      "Review bounding boxes and confidence scores.",
      "Measure accuracy and inference latency."
    ],
    github: ""
  },
  "Message Classification": {
    output: "Predicted category with confidence and optional review flag.",
    considerations: "class imbalance, data leakage, unseen categories, and per-class metrics",
    branches: [["Low confidence?","Send the message to a review queue."],["New category?","Return unknown / needs labeling instead of guessing."],["Model comparison?","Choose using validation metrics, not accuracy alone."]],
    category: "MACHINE LEARNING",
    description: "A supervised machine learning workflow for categorizing text messages.",
    focus: "Convert unstructured text into consistent categories.",
    problem: "Manual classification can be slow and inconsistent across large volumes of messages.",
    solution: "Prepare labeled data, extract text features, train classifiers, and compare their evaluation metrics.",
    workflow: [
      "Labeled Messages",
      "Text Cleaning",
      "Feature Extraction",
      "Train Classifier",
      "Model Evaluation",
      "Predicted Category"
    ],
    tech: ["Python", "Scikit-learn", "Logistic Regression", "SVM", "TF-IDF"],
    details: [
      "Split the dataset into training and testing sets.",
      "Train baseline classification models.",
      "Compare precision, recall, F1-score, and confusion matrices.",
      "Investigate misclassified examples."
    ],
    github: ""
  }
};

const projectPresentation = document.getElementById("projectSlides");
const slidesTrack = document.getElementById("slidesTrack");
const slideElements = [...document.querySelectorAll(".project-slide")];
const slideCounter = document.getElementById("slideCounter");
const slideDots = document.getElementById("slideDots");
const previousSlide = document.getElementById("slidePrev");
const nextSlide = document.getElementById("slideNext");
const closeSlides = document.getElementById("slideClose");

let currentSlide = 0;
let lastProjectCard = null;

function renderSlideDots() {
  slideDots.replaceChildren();

  slideElements.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "slide-dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    slideDots.appendChild(dot);
  });
}



function fillList(element, items, className) {
  element.replaceChildren();
  items.forEach(item => {
    const node = document.createElement("span");
    node.className = className;
    node.textContent = item;
    element.appendChild(node);
  });
}

function renderWorkflow(project) {
  const workflow = document.getElementById("slideWorkflow");
  const subtitle = document.getElementById("slideWorkflowSubtitle");
  workflow.replaceChildren();
  workflow.classList.add("agentic-flow");

  const flows = {
    "Resume Processing & OCR": [
      ["Resume PDF / URL","Receive document","input"],
      ["PDF Validation","Check file type","guard"],
      ["Text Extraction","Read digital text","tool"],
      ["LLM Extraction","Structure candidate fields","agent"],
      ["Field Validation","Check missing values","guard"],
      ["OCR Fallback","Run if fields are missing","tool"],
      ["Structured Result","Return validated JSON","output"]
    ],
    "Customer Support Chatbot": [
      ["Customer Message","Question or issue","input"],
      ["Normalize Text","Clean and prepare input","tool"],
      ["Intent / Category","Predict support category","agent"],
      ["Retrieve Context","Find relevant help content","tool"],
      ["Compose Response","Generate grounded answer","agent"],
      ["Safety / Confidence","Check answer quality","guard"],
      ["Reply + Routing","Answer or escalate","output"]
    ],
    "Agentic Workflow Automation": [
      ["User Request","Goal + context","input"],
      ["Planner Agent","Break task into steps","agent"],
      ["Policy Check","Validate permissions","guard"],
      ["Tool Selection","Choose an approved tool","agent"],
      ["API / MCP Tool","Execute bounded action","tool"],
      ["Result Verification","Check output and errors","guard"],
      ["Final Response","Return validated result","output"]
    ],
    "Chat with Documents": [
      ["PDF / DOCX Upload","Select source document","input"],
      ["Text Extraction","Parse document text","tool"],
      ["Chunking","Split into useful passages","tool"],
      ["Embeddings + Index","Prepare vector representation","agent"],
      ["Similarity Search","Retrieve relevant chunks","tool"],
      ["LLM Answer","Use retrieved context","agent"],
      ["Answer + Sources","Show grounded response","output"]
    ],
    "Video & Object Analysis": [
      ["Video / Image","Upload visual input","input"],
      ["Frame Sampling","Select frames to inspect","tool"],
      ["Preprocessing","Resize / normalize frames","tool"],
      ["Detection Model","Run YOLO inference","agent"],
      ["Post-processing","Filter boxes and scores","guard"],
      ["Tracking / Review","Optional across-frame analysis","agent"],
      ["Annotated Output","Show labels and boxes","output"]
    ],
    "Message Classification": [
      ["Raw Message","Text and optional metadata","input"],
      ["Text Cleaning","Normalize message","tool"],
      ["TF-IDF / Features","Convert text to features","tool"],
      ["Classifier","Logistic Regression or SVM","agent"],
      ["Confidence Check","Review uncertain predictions","guard"],
      ["Category Mapping","Map to business labels","tool"],
      ["Predicted Class","Return label and score","output"]
    ]
  };
  const stages = flows[document.getElementById("flowTitle").textContent] ||
    (project.workflow || []).map((name, i) => [name, "Workflow stage", i === 0 ? "input" : i === (project.workflow || []).length - 1 ? "output" : "agent"]);

  subtitle.textContent = "Select any stage to see its role. The diagram is an illustrative workflow; confirm each component against your implementation.";
  const lane = document.createElement("div");
  lane.className = "agentic-flow-lane";
  stages.forEach((stage, index) => {
    const node = document.createElement("button");
    node.type = "button";
    node.className = `agentic-node agentic-${stage[2]}`;
    node.innerHTML = `<span class="agentic-step">STEP ${String(index + 1).padStart(2, "0")}</span><strong></strong><small></small>`;
    node.querySelector("strong").textContent = stage[0];
    node.querySelector("small").textContent = stage[1];
    node.addEventListener("click", () => {
      workflow.querySelectorAll(".agentic-node").forEach(n => n.classList.remove("selected"));
      node.classList.add("selected");
      subtitle.textContent = `${stage[0]} — ${stage[1]}. Verify that this step matches your actual project before describing it as implemented.`;
    });
    lane.appendChild(node);
    if (index < stages.length - 1) {
      const arrow = document.createElement("span");
      arrow.className = "agentic-arrow";
      arrow.textContent = "→";
      lane.appendChild(arrow);
    }
  });
  workflow.appendChild(lane);

  const branchData = project.branches || [
    ["Validation fails?","Show a useful error and avoid returning unverified output."],
    ["Low confidence?","Flag the result for review instead of overstating certainty."],
    ["Processing error?","Log the failure and retry only within configured limits."]
  ];
  const branches = document.createElement("div");
  branches.className = "agentic-branches";
  branchData.forEach((branch, i) => {
    const card = document.createElement("div");
    card.className = `agentic-branch ${["branch-retry", "branch-human", "branch-loop"][i % 3]}`;
    const title = document.createElement("strong");
    title.textContent = branch[0];
    const desc = document.createElement("span");
    desc.textContent = branch[1];
    card.append(title, desc);
    branches.appendChild(card);
  });
  workflow.appendChild(branches);
  const foot = document.createElement("p");
  foot.className = "agentic-flow-footnote";
  foot.textContent = `Expected output: ${project.output || "validated result"} • Consider: ${project.considerations || "input validation, error handling, and evaluation"}`;
  workflow.appendChild(foot);
}

function openProjectSlides(title, card) {
  const project=slideProjects[title];
  if(!project) return;
  lastProjectCard=card;
  document.getElementById("slideCategory").textContent=project.category || "PROJECT WORKFLOW";
  document.getElementById("flowTitle").textContent=title;
  document.getElementById("slideDescription").textContent=project.description || "";
  document.getElementById("slideFocus").textContent=project.focus || "";
  document.getElementById("slideProblem").textContent=project.problem || "";
  document.getElementById("slideSolution").textContent=project.solution || "";
  fillList(document.getElementById("slideTech"),project.tech || [],"slide-tech-item");
  const details=document.getElementById("slideDetails");details.replaceChildren();
  (project.details || []).forEach(detail=>{const li=document.createElement("li");li.textContent=detail;details.appendChild(li);});
  document.getElementById("slideRepoNote").textContent="Workflow diagram is a portfolio illustration. Only claim integrations and agent behavior you have implemented and tested.";
  renderWorkflow(project);
  projectPresentation.classList.add("active");
  projectPresentation.setAttribute("aria-hidden","false");
  document.body.classList.add("slides-open");
  closeSlides.focus();
}
function closeProjectSlides(){
  projectPresentation.classList.remove("active");
  projectPresentation.setAttribute("aria-hidden","true");
  document.body.classList.remove("slides-open");
  if(lastProjectCard) lastProjectCard.focus();
}
document.querySelectorAll(".project-card").forEach(card=>{
  const title=card.querySelector("h3")?.textContent.trim();
  if(!title || !slideProjects[title]) return;
  card.style.cursor="pointer";card.setAttribute("tabindex","0");card.setAttribute("role","button");
  card.setAttribute("aria-label",`Open ${title} workflow`);
  card.addEventListener("click",event=>{if(event.target.closest("a"))return;openProjectSlides(title,card);});
  card.addEventListener("keydown",event=>{if(event.target===card&&(event.key==="Enter"||event.key===" ")){event.preventDefault();openProjectSlides(title,card);}});
});
closeSlides.addEventListener("click",closeProjectSlides);
projectPresentation.addEventListener("click",event=>{if(event.target===projectPresentation)closeProjectSlides();});
document.addEventListener("keydown",event=>{if(!projectPresentation.classList.contains("active"))return;if(event.key==="Escape")closeProjectSlides();});
